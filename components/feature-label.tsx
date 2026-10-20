import "./feature-label.css";

export function FeatureLabel({ number, name, prefix = "Feature" }: { number?: string; name: string; prefix?: string }) {
  return (
    <p className="feature-label mx-auto flex w-fit max-w-full flex-wrap items-center justify-center gap-x-2.5 gap-y-2 rounded-2xl bg-brand/5 px-3.5 py-2 text-center text-xs font-medium leading-5 text-brand sm:rounded-full sm:text-sm dark:bg-brand/10">
      <span className="whitespace-nowrap">{number ? `${prefix} ${number}` : prefix}</span>
      <span aria-hidden="true" className="h-3 w-px bg-brand/20 dark:bg-brand/30" />
      <span>{name}</span>
    </p>
  );
}
