// Generates public/me.jpg (portrait placeholder) and public/Manish-Beniwal-CV.pdf (placeholder).
import sharp from "sharp";
import fs from "node:fs/promises";

(async () => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="1500">
    <defs><radialGradient id="g" cx="30%" cy="25%" r="80%"><stop offset="0" stop-color="#C6F432" stop-opacity=".35"/><stop offset="1" stop-color="#151515" stop-opacity="1"/></radialGradient></defs>
    <rect width="100%" height="100%" fill="url(#g)"/>
    <text x="80" y="1400" font-family="Helvetica, Arial, sans-serif" font-weight="700" font-size="320" fill="#F2F0EB" letter-spacing="-12">MB</text>
    <text x="86" y="140" font-family="monospace" font-size="34" fill="#F2F0EB" opacity=".6" letter-spacing="4">PORTRAIT — REPLACE public/me.jpg</text>
  </svg>`;
  await sharp(Buffer.from(svg)).jpeg({ quality: 82 }).toFile("public/me.jpg");
  // Minimal valid single-page PDF
  const text = "Manish Beniwal - CV placeholder. Replace public/Manish-Beniwal-CV.pdf";
  const stream = `BT /F1 18 Tf 60 760 Td (${text}) Tj ET`;
  const objs = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 842] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>",
    `<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`,
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
  ];
  let pdf = "%PDF-1.4\n";
  const offs: number[] = [];
  objs.forEach((o, i) => { offs.push(pdf.length); pdf += `${i + 1} 0 obj\n${o}\nendobj\n`; });
  const xref = pdf.length;
  pdf += `xref\n0 ${objs.length + 1}\n0000000000 65535 f \n${offs.map((o) => String(o).padStart(10, "0") + " 00000 n \n").join("")}`;
  pdf += `trailer\n<< /Size ${objs.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`;
  await fs.writeFile("public/Manish-Beniwal-CV.pdf", pdf);
  console.log("placeholders written");
})();
