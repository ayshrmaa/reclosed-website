import type { ComponentType, SVGProps } from "react";

type FeatureCardProps = {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
};

export function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <div className="relative z-10 rounded-lg bg-gray-50 p-4 transition duration-200 hover:bg-transparent md:p-5 dark:bg-neutral-800">
      <div className="flex items-center gap-2">
        <Icon className="size-5 text-brand" aria-hidden="true" />
      </div>
      <h3 className="mt-4 mb-2 text-lg font-medium">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
