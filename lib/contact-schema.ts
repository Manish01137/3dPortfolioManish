import { z } from "zod";

export { budgets } from "./budgets";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name"),
  email: z.string().trim().email("Please enter a valid email"),
  company: z.string().trim().max(120).optional(),
  budget: z.string().optional(),
  services: z.array(z.string()),
  message: z.string().trim().min(10, "A couple of sentences helps (10+ characters)").max(5000),
  website: z.string().max(0).optional(), // honeypot
});
