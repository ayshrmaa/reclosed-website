"use client";

import { useId, useState, type FormEvent } from "react";
import { Button } from "@/components/button";
import { CONTACT_EMAIL } from "@/data/site";

const labelClassName = "text-charcoal-700 flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50 dark:text-neutral-100";
const inputClassName = "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground border-input shadow-aceternity flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:bg-neutral-800 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive mt-4 border-none focus:ring-gray-300";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const id = useId();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;
    const data = new FormData(event.currentTarget);
    setStatus("sending");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: String(data.get("name") ?? "").trim(),
          email: String(data.get("email") ?? "").trim(),
          message: String(data.get("message") ?? "").trim(),
        }),
      });
      setStatus(response.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      {status === "sent" ? (
        <p role="status" className="text-sm font-medium text-gray-600">Sent. We reply within one business day.</p>
      ) : (
        <form onSubmit={handleSubmit} aria-label="Contact Reclosed" aria-busy={status === "sending"} className="mt-6 flex flex-col gap-8">
          <div className="h-full w-full rounded-2xl">
            <label htmlFor={`${id}-name`} className={labelClassName}>Name</label>
            <input id={`${id}-name`} name="name" type="text" autoComplete="name" placeholder="Your name" className={inputClassName} />
          </div>
          <div className="h-full w-full rounded-2xl">
            <label htmlFor={`${id}-email`} className={labelClassName}>Work email</label>
            <input id={`${id}-email`} name="email" type="email" autoComplete="email" placeholder="youremail@yourdomain.com" required className={inputClassName} />
          </div>
          <div className="h-full w-full rounded-2xl">
            <label htmlFor={`${id}-message`} className={labelClassName}>Message</label>
            <textarea id={`${id}-message`} name="message" placeholder="Your message" required className="border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive shadow-aceternity flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:bg-neutral-800 mt-4 border-none focus:ring-gray-300" />
          </div>
          <Button type="submit" variant="primary" disabled={status === "sending"}>
            {status === "sending" ? "Sending…" : "Send message"}
          </Button>
        </form>
      )}
      {status === "error" && (
        <p role="alert" className="mt-4 text-sm text-red-500">
          Couldn&apos;t send. Email <a className="underline" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
        </p>
      )}
    </>
  );
}
