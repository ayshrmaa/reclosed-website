import type { Metadata } from "next";
import { Container } from "@/components/container";
import { DivideX } from "@/components/divide";
import { Footer } from "@/components/footer";
import { Heading } from "@/components/heading";
import { Navbar } from "@/components/navbar";
import { SubHeading } from "@/components/sub-heading";
import { CONTACT_EMAIL } from "@/data/site";

export const metadata: Metadata = { title: "Terms of service | Reclosed" };

export default function TermsOfServicePage() {
  return (
    <div>
      <main className="h-full bg-white antialiased dark:bg-black">
        <Navbar />
        <main className="">
          <DivideX />
          <Container className="border-divide border-x px-4 py-20 md:px-8">
            <Heading as="h1" className="text-left">Terms of service</Heading>
            <SubHeading className="mx-0 text-left">This page is being prepared. For any privacy or terms question, email <a href={`mailto:${CONTACT_EMAIL}`} className="underline">{CONTACT_EMAIL}</a>.</SubHeading>
          </Container>
          <DivideX />
        </main>
        <Footer />
      </main>
    </div>
  );
}
