export const SITE = { name: "Reclosed", url: "https://reclosed.io", title: "Reclosed | Context-Aware AI Lead Reactivation", description: "The world's first context-aware AI lead reactivation platform." };
export const CAL_URL = "https://cal.com/nathan-chen/walkthrough";
export const CONTACT_EMAIL = "nathan@reclosed.io";
export const FEATURES = [
  { number: "01", name: "CRM Reactivation", href: "/#platform", audience: "Leads already in your CRM", description: "Restart conversations and turn dormant leads into qualified calls.", outcome: "Dormant lead → booked call", status: null },
  { number: "02", name: "Anonymous Traffic Reactivation", href: "/#anonymous-traffic", audience: "Visitors who leave without opting in", description: "Identify visitors, connect them to your CRM, and start the conversation.", outcome: "Anonymous visitor → known lead", status: null },
  { number: "03", name: "Reactivation Retargeting Sync", href: "/#retargeting-sync", audience: "Leads moving through reactivation", description: "Keep Meta ad audiences in step with each lead’s reactivation status.", outcome: "Lead status → matching ad audience", status: "In development" },
] as const;
export const CLIENT_TOOLS = { label: "MCP & CLI", href: "/#client-tools", description: "Ask your pipeline from Claude, Cursor, or your terminal." } as const;
export const NAV_LINKS = [{ label: CLIENT_TOOLS.label, href: CLIENT_TOOLS.href }, { label: "How it works", href: "/#how-it-works" }, { label: "FAQ", href: "/#faq" }] as const;
export const SOCIALS: { label: "Instagram" | "LinkedIn" | "YouTube"; href: string }[] = []; // fill when URLs are supplied
