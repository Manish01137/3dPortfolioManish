/**
 * Captures desktop + mobile screenshots of every project URL into public/projects/<slug>/.
 * Falls back to a branded placeholder (gradient + project name) when a site fails or has no URL.
 *
 *   npm run screenshots            # all projects
 *   npm run screenshots -- zeqon   # only the given slugs
 *   npm run screenshots -- --placeholders   # placeholders only, no network
 */
import { chromium, type Browser } from "playwright";
import sharp from "sharp";
import fs from "node:fs/promises";
import path from "node:path";
import { projects } from "../content/projects";

const OUT = path.join(process.cwd(), "public", "projects");
const args = process.argv.slice(2);
const placeholdersOnly = args.includes("--placeholders");
const only = args.filter((a) => !a.startsWith("--"));

const BAD_PAGE = /store is currently unavailable|account suspended|domain (is )?for sale|404 not found|this site can.t be reached/i;

/** Runs in the page: hides popups, cookie banners, chat widgets and modal backdrops. */
function hideOverlays() {
  const vw = innerWidth, vh = innerHeight;
  const re = /cookie|consent|gdpr|popup|modal|newsletter|klaviyo|privy|giveaway|appointment|chat|whatsapp|tawk|intercom|crisp|preloader|loader/i;
  document.querySelectorAll<HTMLElement>("body *").forEach((el) => {
    const cs = getComputedStyle(el);
    if (cs.position !== "fixed" && cs.position !== "sticky") return;
    const r = el.getBoundingClientRect();
    const label = `${el.id} ${el.className} ${el.getAttribute("role") ?? ""} ${el.getAttribute("aria-label") ?? ""}`;
    const isHeader = r.top <= 2 && r.height < vh * 0.2;
    const coversMuch = r.width * r.height > vw * vh * 0.12 && !isHeader && !el.querySelector("h1, h2, main, section, nav");
    if (re.test(label) || el.getAttribute("role") === "dialog" || el.getAttribute("aria-modal") === "true" || coversMuch || (r.top > vh * 0.6 && r.width < vw * 0.3)) {
      el.style.setProperty("display", "none", "important");
    }
  });
  document.documentElement.style.overflow = "auto";
  document.body.style.overflow = "auto";
}

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");

async function placeholder(file: string, w: number, h: number, title: string, sub: string) {
  const fs1 = Math.round(Math.min(w / (title.length * 0.62), h * 0.22));
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
    <defs>
      <radialGradient id="a" cx="15%" cy="20%" r="70%"><stop offset="0" stop-color="#819FFE" stop-opacity=".5"/><stop offset="1" stop-color="#0F0F0F" stop-opacity="0"/></radialGradient>
      <radialGradient id="b" cx="90%" cy="90%" r="60%"><stop offset="0" stop-color="#002BBA" stop-opacity=".6"/><stop offset="1" stop-color="#0F0F0F" stop-opacity="0"/></radialGradient>
    </defs>
    <rect width="100%" height="100%" fill="#141414"/><rect width="100%" height="100%" fill="url(#a)"/><rect width="100%" height="100%" fill="url(#b)"/>
    <text x="${w * 0.06}" y="${h * 0.12}" font-family="monospace" font-size="${Math.round(h * 0.028)}" fill="#F2F0EB" opacity=".6" letter-spacing="3">MANISH BENIWAL — ${esc(sub.toUpperCase())}</text>
    <text x="${w * 0.06}" y="${h * 0.9}" font-family="Helvetica, Arial, sans-serif" font-weight="700" font-size="${fs1}" fill="#F2F0EB" letter-spacing="-2">${esc(title)}</text>
  </svg>`;
  await sharp(Buffer.from(svg)).webp({ quality: 82 }).toFile(file);
}

async function shoot(browser: Browser, url: string, file: string, w: number, h: number, mobile: boolean) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1, isMobile: mobile, hasTouch: mobile, userAgent: mobile ? "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1" : undefined });
  const page = await ctx.newPage();
  try {
    // networkidle can time out on chatty sites; fall back to "load" but surface real failures (DNS, TLS, HTTP).
    const res = await page.goto(url, { waitUntil: "networkidle", timeout: 45_000 }).catch(async (e: Error) => {
      if (/net::ERR_/.test(e.message)) throw e;
      return page.waitForLoadState("load").then(() => null);
    });
    if (res && res.status() >= 400) throw new Error(`HTTP ${res.status()}`);
    const body = (await page.textContent("body").catch(() => "")) ?? "";
    if (BAD_PAGE.test(body)) throw new Error("site shows an error/unavailable page");
    // Trigger scroll-reveal content, then return to the top.
    await page.evaluate(async () => {
      for (let y = 0; y < Math.min(document.body.scrollHeight, 4000); y += 400) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 120)); }
      window.scrollTo(0, 0);
    });
    let png: Buffer | undefined;
    for (const wait of [3500, 6000, 9000]) {
      await page.waitForTimeout(wait);
      await page.keyboard.press("Escape").catch(() => {});
      await page.evaluate(hideOverlays);
      await page.waitForTimeout(400);
      png = await page.screenshot({ type: "png" });
      const { channels } = await sharp(png).stats();
      if (channels.some((c) => c.stdev > 12)) break; // not a blank frame
      png = undefined;
    }
    if (!png) throw new Error("page rendered blank");
    await sharp(png).resize(w, h, { fit: "cover", position: "top" }).webp({ quality: 80 }).toFile(file);
  } finally {
    await ctx.close();
  }
}

(async () => {
  const list = projects.filter((p) => !only.length || only.includes(p.slug));
  const browser = placeholdersOnly ? null : await chromium.launch();
  for (const p of list) {
    const dir = path.join(OUT, p.slug);
    await fs.mkdir(dir, { recursive: true });
    const cover = path.join(dir, "cover.webp"), mobile = path.join(dir, "mobile.webp");
    let ok = false;
    if (browser && p.url) {
      try {
        await shoot(browser, p.url, cover, 1600, 1000, false);
        await shoot(browser, p.url, mobile, 390, 844, true);
        ok = true;
        console.log(`✓ ${p.slug}`);
      } catch (e) {
        console.warn(`✗ ${p.slug}: ${(e as Error).message.split("\n")[0]} — using placeholder`);
      }
    }
    if (!ok) {
      await placeholder(cover, 1600, 1000, p.title, p.category);
      await placeholder(mobile, 390, 844, p.title, p.category);
      if (!browser || !p.url) console.log(`◻ ${p.slug} (placeholder)`);
    }
  }
  await browser?.close();
})();
