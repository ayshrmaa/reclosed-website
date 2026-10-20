import Link from "next/link";
import { Button } from "@/components/button";
import { Container } from "@/components/container";
import { Logo, LogoMark } from "@/components/logo";
import { CAL_URL, CLIENT_TOOLS, CONTACT_EMAIL, FEATURES, SOCIALS } from "@/data/site";
import { InstagramIcon, LinkedInIcon, YouTubeIcon } from "@/icons/general";

const columns = [
  {
    title: "Features",
    links: [
      ...FEATURES.map(({ name, href }) => ({ label: name, href })),
      { label: CLIENT_TOOLS.label, href: CLIENT_TOOLS.href },
      { label: "How it works", href: "/#how-it-works" },
      { label: "Integrations", href: "/#integrations" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Contact", href: "/contact" },
      { label: "Book a call", href: CAL_URL },
      { label: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` },
      { label: "FAQ", href: "/#faq" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms of Service", href: "/terms-of-service" },
    ],
  },
];

const socialIcons = { Instagram: InstagramIcon, LinkedIn: LinkedInIcon, YouTube: YouTubeIcon };

export function Footer() {
  return (
    <footer id="footer" aria-label="Reclosed footer" className="reclosed-footer">
      <Container className="px-5 sm:px-8 lg:px-10">
        <div className="footer-top">
          <div className="min-w-0 max-w-[410px]">
            <Logo className="w-fit text-primary" />
            <p className="mt-6 max-w-80 text-lg leading-7 tracking-tight text-neutral-600 dark:text-neutral-400">
              Your next booked call is already in your CRM. Let&apos;s find it.
            </p>
            <div className="mt-7">
              <Button href={CAL_URL} external className="inline-flex min-h-11 items-center gap-3">Book a call <span aria-hidden="true">↗</span></Button>
              <p className="mt-4 max-w-80 text-sm leading-6 text-neutral-500 dark:text-neutral-400">We&apos;ll walk through your goals, the workflow, and how Reclosed fits your business.</p>
            </div>
            {SOCIALS.some(({ href }) => href) && (
              <div className="mt-6 flex items-center gap-4">
                {SOCIALS.filter(({ href }) => href).map(({ label, href }) => {
                  const Icon = socialIcons[label];
                  return <a key={label} href={href} aria-label={label} target="_blank" rel="noopener noreferrer" className="footer-link"><Icon aria-hidden="true" /></a>;
                })}
              </div>
            )}
          </div>
          <nav aria-label="Footer navigation" className="footer-links-grid">
            {columns.map(({ title, links }) => (
              <div key={title} className="min-w-0">
                <h2 className="mb-4 font-mono text-xs font-normal tracking-wide text-neutral-900 uppercase dark:text-neutral-200">{title}</h2>
                <ul className="space-y-1">
                  {links.map(({ label, href }) => (
                    <li key={href}>
                      {/^(https?:|mailto:)/i.test(href) || href.includes("#") ? (
                        <a href={href} {...(/^https?:/i.test(href) ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="footer-link">{label}</a>
                      ) : (
                        <Link href={href} className="footer-link">{label}</Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="footer-wordmark" aria-hidden="true">
          <LogoMark className="footer-large-mark" />
          <span role="img" aria-label="Reclosed">Reclosed</span>
        </div>

        <div className="footer-bottom">
          <p>© 2026 Reclosed</p>
          <p className="hidden sm:block">All rights reserved.</p>
          <a href="#" className="footer-back-top">Back to top <span aria-hidden="true">↑</span></a>
        </div>
      </Container>
    </footer>
  );
}
