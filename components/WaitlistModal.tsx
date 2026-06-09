"use client";

import { useState, useEffect, useRef } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
}

type State = "idle" | "submitting" | "success" | "error";

export default function WaitlistModal({ open, onClose }: Props) {
  const [state, setState] = useState<State>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("submitting");
    setErrorMsg("");

    const fd = new FormData(e.currentTarget);
    const payload = {
      fullName: fd.get("fullName") as string,
      email: fd.get("email") as string,
      company: fd.get("company") as string,
      aiVendor: fd.get("aiVendor") as string,
      useCase: fd.get("useCase") as string,
    };

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error ?? "Something went wrong");
        setState("error");
      } else {
        setState("success");
      }
    } catch {
      setErrorMsg("Network error. Please try again.");
      setState("error");
    }
  }

  if (!open) return null;

  return (
    <div
      ref={overlayRef}
      className="modal-overlay"
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
    >
      <div className="modal-box" role="dialog" aria-modal="true" aria-label="Join the waitlist">
        <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>

        {state === "success" ? (
          <div className="modal-success">
            <div className="success-icon">●</div>
            <h2>You&rsquo;re on the list.</h2>
            <p>We&rsquo;ll be in touch when we&rsquo;re ready for your team. Keep building.</p>
          </div>
        ) : (
          <>
            <div className="modal-eyebrow">Early access · waitlist</div>
            <h2 className="modal-title">Get the Garantir verdict</h2>
            <p className="modal-lead">
              Tell us about the AI you&rsquo;re evaluating. We&rsquo;ll be in touch when we&rsquo;re ready for your files.
            </p>

            <form onSubmit={handleSubmit} noValidate>
              <div className="field-row">
                <div className="field">
                  <label htmlFor="fullName">Full name</label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    required
                    placeholder="Alex Chen"
                    disabled={state === "submitting"}
                  />
                </div>
                <div className="field">
                  <label htmlFor="email">Work email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="alex@yourcompany.com"
                    disabled={state === "submitting"}
                  />
                </div>
              </div>

              <div className="field">
                <label htmlFor="company">Company</label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  required
                  placeholder="Acme Finance Ltd"
                  disabled={state === "submitting"}
                />
              </div>

              <div className="field">
                <label htmlFor="aiVendor">
                  Which AI product are you evaluating?{" "}
                  <span className="optional">optional</span>
                </label>
                <input
                  id="aiVendor"
                  name="aiVendor"
                  type="text"
                  placeholder="e.g. Basware AI, Yooz, Rossum, custom LLM…"
                  disabled={state === "submitting"}
                />
              </div>

              <div className="field">
                <label htmlFor="useCase">
                  Use case <span className="optional">optional</span>
                </label>
                <textarea
                  id="useCase"
                  name="useCase"
                  rows={3}
                  placeholder="Invoice processing, AP automation, financial reporting…"
                  disabled={state === "submitting"}
                />
              </div>

              {state === "error" && (
                <div className="form-error">{errorMsg}</div>
              )}

              <button
                type="submit"
                className="submit-btn"
                disabled={state === "submitting"}
              >
                {state === "submitting" ? "Sending…" : "Join the waitlist →"}
              </button>

              <p className="form-note">No spam. No sales pressure. Just a verdict when the time is right.</p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
