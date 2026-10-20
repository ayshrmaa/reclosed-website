"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring, useTransform } from "motion/react";
import { useEffect, useId, useRef, useState } from "react";
import { Button } from "@/components/button";
import { Logo } from "@/components/logo";
import { ModeToggle } from "@/components/mode-toggle";
import { FeaturesMenu } from "@/components/features-menu";
import { CAL_URL, NAV_LINKS } from "@/data/site";
import { CloseIcon, HamburgerIcon } from "@/icons/general";

function NavLinks() {
  return (
    <div className="flex items-center gap-10">
      <FeaturesMenu />
      {NAV_LINKS.map(({ label, href }) => (
        <a key={href} href={href} className="font-medium text-gray-600 transition duration-200 hover:text-neutral-900 dark:text-gray-300 dark:hover:text-neutral-300">
          {label}
        </a>
      ))}
    </div>
  );
}

function NavActions() {
  return (
    <div className="flex items-center gap-2">
      <ModeToggle />
      <Button variant="primary" href={CAL_URL} external>Book a call</Button>
    </div>
  );
}

function FloatingNav() {
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);
  useMotionValueEvent(scrollY, "change", (value) => setVisible(value > 100));
  const y = useSpring(useTransform(scrollY, [100, 120], [-100, 10]), { stiffness: 300, damping: 30 });

  return (
    <motion.div inert={!visible} aria-hidden={!visible} style={{ y }} className="shadow-aceternity fixed inset-x-0 top-0 z-50 mx-auto hidden max-w-[calc(80rem-4rem)] items-center justify-between bg-white/80 px-2 py-2 backdrop-blur-sm md:flex xl:rounded-2xl dark:bg-neutral-900/80 dark:shadow-[0px_2px_0px_0px_var(--color-neutral-800),0px_-2px_0px_0px_var(--color-neutral-800)]">
      <Logo />
      <NavLinks />
      <NavActions />
    </motion.div>
  );
}

function DesktopNav() {
  return (
    <div className="hidden items-center justify-between px-4 py-4 md:flex">
      <Logo />
      <NavLinks />
      <NavActions />
    </div>
  );
}

function MobileNav() {
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
      if (event.key !== "Tab") return;

      const controls = panelRef.current?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
      if (!controls?.length) return;
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    const desktop = window.matchMedia("(min-width: 768px)");
    const handleResize = () => { if (desktop.matches) setOpen(false); };
    document.addEventListener("keydown", handleKeyDown);
    desktop.addEventListener("change", handleResize);
    const trigger = triggerRef.current;

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      desktop.removeEventListener("change", handleResize);
      trigger?.focus({ preventScroll: true });
    };
  }, [open]);

  return (
    <div className="relative flex items-center justify-between p-2 md:hidden">
      <Logo />
      <button ref={triggerRef} type="button" aria-label="Open menu" aria-expanded={open} aria-controls={menuId} onClick={() => setOpen(true)} className="shadow-aceternity flex size-6 flex-col items-center justify-center rounded-md">
        <HamburgerIcon aria-hidden="true" className="size-4 shrink-0 text-gray-600" />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            ref={panelRef}
            id={menuId}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-white dark:bg-black"
            onClick={(event) => {
              if (event.target instanceof Element && event.target.closest("a")) setOpen(false);
            }}
          >
            <div className="relative flex items-center justify-between p-2 md:hidden">
              <Logo />
              <button ref={closeRef} type="button" aria-label="Close menu" onClick={() => setOpen(false)} className="shadow-aceternity flex size-6 flex-col items-center justify-center rounded-md">
                <CloseIcon aria-hidden="true" className="size-4 shrink-0 text-gray-600" />
              </button>
            </div>
            <div className="divide-divide border-divide flex flex-col divide-y border-y">
              <FeaturesMenu mobile />
              {NAV_LINKS.map(({ label, href }) => (
                <a key={href} href={href} onClick={() => setOpen(false)} className="px-4 py-5 text-xl text-gray-600 dark:text-gray-300">
                  {label}
                </a>
              ))}
            </div>
            <div className="px-4 pt-6">
              <Button variant="primary" href={CAL_URL} external className="w-full" onClick={() => setOpen(false)}>Book a call</Button>
            </div>
            <div className="mt-auto flex justify-end p-4">
              <ModeToggle />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Navbar() {
  return (
    <nav className="max-w-7xl mx-auto">
      <FloatingNav />
      <DesktopNav />
      <MobileNav />
    </nav>
  );
}
