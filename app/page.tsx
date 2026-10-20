import { DivideX } from "@/components/divide";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { LogoCloud } from "@/components/logo-cloud";
import { Platform } from "@/components/platform";
import { Problem } from "@/components/problem";
import { HowItWorks } from "@/components/how-it-works";
import { Reactivation } from "@/components/reactivation";
import { AnonymousTraffic } from "@/components/anonymous-traffic";
import { ClientTools } from "@/components/client-tools";
import { Compliance } from "@/components/compliance";
import { FAQs } from "@/components/faqs";
import { RetargetingSync } from "@/components/retargeting-sync";
import { Results } from "@/components/results";

export default function Home() {
  return (
    <div>
      <main className="h-full bg-white antialiased dark:bg-black">
        <Navbar />
        <main className="">
          <DivideX />
          <Hero />
          <DivideX />
          <LogoCloud />
          <DivideX />
          <Problem />
          <DivideX />
          <Reactivation />
          <DivideX />
          <Platform />
          <DivideX />
          <AnonymousTraffic />
          <DivideX />
          <RetargetingSync />
          <DivideX />
          <Results />
          <DivideX />
          <ClientTools />
          <DivideX />
          <Compliance />
          <DivideX />
          <HowItWorks />
          <DivideX />
          <FAQs />
          <DivideX />
        </main>
        <Footer />
      </main>
    </div>
  );
}
