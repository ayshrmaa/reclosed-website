import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";
import { ShimmerText } from "@/components/shimmer-text";
import { SubHeading } from "@/components/sub-heading";
import { ChannelsIcon, EngageIcon, RoutingIcon } from "@/icons/card-icons";
import { Card, CardDescription, CardTitle } from "./card";
import { ConversationSkeleton, EngageSkeleton, RoutingGraph } from "./skeletons";

export function Reactivation() {
  return (
    <Container id="features" className="border-divide border-x">
      <div className="flex flex-col items-center py-16">
        <ShimmerText>CRM Reactivation</ShimmerText>
        <SectionHeading>Every lead, worked to the maximum.</SectionHeading>
        <SubHeading className="px-2">Reclosed sets the new standard for revenue recovery.</SubHeading>
        <div className="border-divide divide-divide mt-16 grid grid-cols-1 divide-y border-y md:grid-cols-2 md:divide-x">
          <Card className="overflow-hidden mask-b-from-80%">
            <CardTitle icon={<EngageIcon />}>Engage, Qualify, and Book. Period.</CardTitle>
            <CardDescription>Reclosed operates with only one goal in mind: book as many qualified calls as possible from the CRM list. Reach out, qualify, book. Leads either opt-out, are unqualified, or are booked in as a qualified call. Period.</CardDescription>
            <EngageSkeleton />
          </Card>
          <Card className="overflow-hidden mask-b-from-80%">
            <CardTitle icon={<ChannelsIcon />}>Multi channel. Multi context. One conversation.</CardTitle>
            <CardDescription>Different leads have different communication behaviors. We hit leads through multi-channel approach such as iMessage, custom WhatsApp voice notes, emails and SMS with cross-platform live context. Reclosed also uses existing CRM notes and tags as context.</CardDescription>
            <ConversationSkeleton />
          </Card>
        </div>
        <div className="w-full">
          <Card className="relative w-full max-w-none overflow-hidden">
            <div className="pointer-events-none absolute inset-0 h-full w-full bg-[radial-gradient(var(--color-dots)_1px,transparent_1px)] mask-radial-from-10% [background-size:10px_10px]" />
            <CardTitle icon={<RoutingIcon />}>Grading, Routing, Downsells and Upsells.</CardTitle>
            <CardDescription>Reclosed grades and routes leads into specific pipelines and sales teams based on a custom criteria like financial, and can even directly conduct low ticket downsells for ascension later on.</CardDescription>
            <RoutingGraph />
          </Card>
        </div>
      </div>
    </Container>
  );
}
