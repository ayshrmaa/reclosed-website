import { LogoMark } from "@/components/logo";
import { MailIcon } from "@/icons/general";
import type { ReactNode } from "react";
import "./channel-previews.css";

type PreviewProps = { message: string; reply: string };

function ChromeIcon({ kind }: { kind: "back" | "phone" | "video" | "mic" | "camera" | "reply" | "calendar" }) {
  const paths = {
    back: <path d="m15 5-7 7 7 7" />,
    phone: <path d="m7 3 3 5-2 2c1 3 3 5 6 6l2-2 5 3c0 3-2 5-5 4C9 19 5 15 3 8 2 5 4 3 7 3Z" />,
    video: <><rect x="3" y="6" width="12" height="12" rx="3" /><path d="m15 10 6-3v10l-6-3" /></>,
    mic: <><rect x="9" y="2" width="6" height="13" rx="3" /><path d="M5 11a7 7 0 0 0 14 0m-7 7v4m-4 0h8" /></>,
    camera: <><path d="m8 6 2-3h4l2 3h4a2 2 0 0 1 2 2v11H2V8a2 2 0 0 1 2-2Z" /><circle cx="12" cy="12" r="4" /></>,
    reply: <path d="m9 5-7 6 7 6v-4c7-1 10 1 13 5-1-8-6-10-13-9Z" />,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="3" /><path d="M7 2v6m10-6v6M3 11h18m-11 4h4" /></>,
  };
  return <svg aria-hidden="true" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">{paths[kind]}</svg>;
}

function Avatar({ children, brand = false }: { children?: ReactNode; brand?: boolean }) {
  return <span className={`native-avatar ${brand ? "native-avatar-brand" : ""}`} aria-hidden="true">{brand ? <LogoMark className="h-5" /> : children || "L"}</span>;
}

export function AppleMessagePreview({ message, reply, sms = false }: PreviewProps & { sms?: boolean }) {
  const name = sms ? "SMS" : "iMessage";
  return <div className={`native-chat native-apple ${sms ? "native-sms" : "native-imessage"}`} role="group" aria-label={`${name} example, shown from Reclosed's side of the conversation`}>
    <div className="native-apple-header"><span className="native-back"><ChromeIcon kind="back" /><span>Messages</span></span><div className="native-contact"><Avatar /><strong>Lead <span aria-hidden="true">›</span></strong></div><span className="native-header-action"><ChromeIcon kind="video" /></span></div>
    <div className="native-message-body"><p className="native-date">{sms ? "Text Message · SMS" : "iMessage"}<br /><span>{sms ? "Wednesday 1:00 PM" : "Monday 10:24 AM"}</span></p><div className="native-bubble native-outgoing">{message}</div>{!sms && <p className="native-delivery">Delivered</p>}<div className="native-bubble native-incoming">{reply}</div></div>
    <div className="native-composer" aria-hidden="true"><span className="native-plus">+</span><div><span>{sms ? "Text Message" : "iMessage"}</span><ChromeIcon kind="mic" /></div></div>
  </div>;
}

export function WhatsAppPreview({ message, reply }: PreviewProps) {
  return <div className="native-chat native-whatsapp" role="group" aria-label="WhatsApp example, shown from Reclosed's side of the conversation">
    <div className="native-wa-header"><ChromeIcon kind="back" /><Avatar /><div><strong>Lead</strong><span>WhatsApp</span></div><span className="native-wa-actions"><ChromeIcon kind="video" /><ChromeIcon kind="phone" /><span aria-hidden="true">⋮</span></span></div>
    <div className="native-message-body"><span className="native-wa-day">MONDAY</span><div className="native-bubble native-outgoing">{message}<span className="native-wa-time">10:28 <span className="native-wa-checks" aria-label="Read">✓✓</span></span></div><div className="native-bubble native-incoming">{reply}<span className="native-wa-time">10:29</span></div></div>
    <div className="native-wa-composer" aria-hidden="true"><div><span className="native-smile">☺</span><span>Message</span><span className="native-wa-camera"><ChromeIcon kind="camera" /></span></div><span className="native-wa-mic"><ChromeIcon kind="mic" /></span></div>
  </div>;
}

export function EmailPreview({ message, reply }: PreviewProps) {
  return <div className="native-mail" role="group" aria-label="Email example with subject, sender, calendar invitation, and reply">
    <div className="native-mail-toolbar"><span><MailIcon aria-hidden="true" />Mail</span><span className="native-mail-inbox">Inbox</span><span aria-hidden="true">•••</span></div>
    <div className="native-mail-content"><div className="native-mail-subject">Your Wednesday call <span>2</span></div><div className="native-mail-sender"><Avatar brand /><div><strong>Reclosed</strong><small>to Lead</small></div><time>Mon, 10:31 AM</time></div><div className="native-mail-copy"><p>{message}</p><div className="native-calendar"><ChromeIcon kind="calendar" /><div><strong>Your call with our team</strong><span>Wednesday · 2:00 PM</span></div></div><p className="native-mail-signoff">See you Wednesday,<br />The Reclosed team</p></div><div className="native-mail-reply"><div className="native-mail-sender"><Avatar>L</Avatar><div><strong>Lead</strong><small>to Reclosed</small></div><time>10:32 AM</time></div><p>{reply}</p></div></div>
    <div className="native-mail-footer" aria-hidden="true"><span><ChromeIcon kind="reply" />Reply</span><span>Forward →</span></div>
  </div>;
}
