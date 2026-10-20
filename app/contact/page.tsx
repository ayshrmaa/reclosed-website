import type { Metadata } from "next";
import { Button } from "@/components/button";
import { CAL_URL } from "@/data/site";
import { ContactForm } from "@/components/contact-form";
import { ContactIllustration } from "@/components/contact-illustration";
import { Container } from "@/components/container";
import { DivideX } from "@/components/divide";
import { Footer } from "@/components/footer";
import { LogoMark } from "@/components/logo";
import { Navbar } from "@/components/navbar";

export const metadata: Metadata = {
  title: "Book a call | Reclosed",
};

export default function ContactPage() {
  return (
    <div>
      <main className="h-full bg-white antialiased dark:bg-black">
        <Navbar />
        <main className="">
          <DivideX />
          <Container className="min-h-[calc(100vh-8rem)] py-10 md:py-20">
            <div className="grid grid-cols-1 gap-10 px-4 md:grid-cols-2 md:px-8 lg:gap-40">
              <div>
                <LogoMark />
                <h1 className="text-3xl font-medium tracking-tight text-black md:text-4xl dark:text-white mt-4 text-left lg:text-4xl">Book a call</h1>
                <p className="text-sm font-medium tracking-tight text-gray-600 md:text-sm lg:text-base dark:text-gray-300 mt-4 max-w-xl text-left">Let&apos;s walk through your goals, your CRM, and how Reclosed works from setup to ongoing support. Bring your questions.</p>
                <Button href={CAL_URL} external className="mt-6 inline-flex">Book a call</Button>
                <h2 className="mt-10 border-t border-divide pt-8 text-base font-medium text-primary">Prefer to leave a message?</h2>
                <ContactForm />
              </div>
              <ContactIllustration />
            </div>
          </Container>
          <DivideX />
        </main>
        <Footer />
      </main>
    </div>
  );
}
