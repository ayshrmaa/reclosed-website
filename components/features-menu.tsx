"use client";

import { useEffect, useId, useRef, useState } from "react";
import { FEATURES } from "@/data/site";
import "./features.css";

export function FeaturesMenu({ mobile = false }: { mobile?: boolean }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const hovered = useRef(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (closeTimer.current !== null) clearTimeout(closeTimer.current);
  }, []);

  useEffect(() => {
    if (!open) return;
    const outside = (event: PointerEvent) => {
      if (event.target instanceof Node && !root.current?.contains(event.target)) setOpen(false);
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        setOpen(false);
        trigger.current?.focus();
      }
    };
    document.addEventListener("pointerdown", outside);
    const element = root.current;
    element?.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("pointerdown", outside);
      element?.removeEventListener("keydown", escape);
    };
  }, [open]);

  return (
    <div ref={root} className={`features-menu${mobile ? " features-menu-mobile" : ""}`} onPointerEnter={(event) => {
      if (mobile || event.pointerType !== "mouse") return;
      if (closeTimer.current !== null) clearTimeout(closeTimer.current);
      hovered.current = true;
      setOpen(true);
    }} onPointerLeave={(event) => {
      if (mobile || event.pointerType !== "mouse") return;
      hovered.current = false;
      closeTimer.current = setTimeout(() => setOpen(false), 150);
    }} onBlur={(event) => {
      if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
    }}>
      <button ref={trigger} type="button" className="features-trigger" aria-expanded={open} aria-controls={id} onClick={(event) => {
        // Keyboard-generated clicks still toggle when the mouse rests over the menu.
        if (event.detail !== 0 && open && hovered.current) return;
        setOpen(!open);
      }}>
        Features <span aria-hidden="true" className="features-chevron">⌄</span>
      </button>
      {open && <div id={id} className="features-dropdown">
        <p className="features-menu-caption">Three features. One connected platform.</p>
        <ul>
          {FEATURES.map((feature) => <li key={feature.number}>
            <a href={feature.href} onClick={() => setOpen(false)} className="feature-menu-link">
              <span className="feature-number" aria-hidden="true">{feature.number}</span>
              <span><strong>{feature.name}</strong><span className="feature-menu-description">{feature.description}</span>{feature.status && <span className="feature-development">{feature.status}</span>}</span>
              <span aria-hidden="true" className="feature-menu-arrow">↗</span>
            </a>
          </li>)}
        </ul>
      </div>}
    </div>
  );
}
