"use client";

import { useTheme } from "next-themes";
import { useSyncExternalStore, type JSX } from "react";
import { MoonIcon, SunIcon } from "@/icons/general";

const subscribe = () => () => {};
const clientMounted = () => true;
const serverMounted = () => false;

export function ModeToggle(): JSX.Element {
  const { resolvedTheme, setTheme } = useTheme();
  // The server and first hydration render share the neutral accessible name.
  const mounted = useSyncExternalStore(subscribe, clientMounted, serverMounted);

  return (
    <button
      type="button"
      className="hover:shadow-input relative flex cursor-pointer items-center justify-center rounded-xl p-2 text-neutral-500 dark:text-neutral-500"
      aria-label={mounted ? `Switch to ${resolvedTheme === "dark" ? "light" : "dark"} theme` : undefined}
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      <SunIcon aria-hidden="true" className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <MoonIcon aria-hidden="true" className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
