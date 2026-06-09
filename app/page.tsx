"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import WaitlistModal from "@/components/WaitlistModal";

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const climaxRef = useRef<HTMLDivElement>(null);
  const [climaxIn, setClimaxIn] = useState(false);

  // Nav scroll state
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Reveal on scroll
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            e.target.querySelectorAll<HTMLElement>(".count").forEach(runCount);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" }
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Climax band observer
  useEffect(() => {
    if (!climaxRef.current) return;
    const io2 = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) { setClimaxIn(true); io2.unobserve(e.target); }
        });
      },
      { threshold: 0.35 }
    );
    io2.observe(climaxRef.current);
    return () => io2.disconnect();
  }, []);

  const openModal = useCallback(() => setModalOpen(true), []);
  const closeModal = useCallback(() => setModalOpen(false), []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
        {/* NAV */}
        <nav id="nav" className={scrolled ? "scrolled" : ""}>
          <span className="brand" onClick={() => scrollTo("top")}>
            <span className="dot" />Garantir
          </span>
          <div className="nav-links">
            <a onClick={() => scrollTo("problem")}>The problem</a>
            <a onClick={() => scrollTo("how")}>How it works</a>
            <a onClick={() => scrollTo("tested")}>What we test</a>
            <a className="nav-cta" onClick={openModal}>Get the verdict</a>
          </div>
        </nav>

        {/* HERO */}
        <section className="hero" id="top">
          <div className="wrap hero-grid">
            <div>
              <span className="eyebrow reveal">Pre-deployment validation · finance &amp; regulated teams</span>
              <h1 className="reveal" data-d="1">
                Test it on<br />the files that<br /><em>scare</em> you.
              </h1>
              <p className="deck reveal" data-d="2">
                Not demo data. Not fake invoices. Not the perfect files built for a sales call.
                Garantir proves whether a finance AI works on <b>your</b> edge cases — before it ever touches real money.
              </p>
              <div className="hero-cta reveal" data-d="3">
                <button className="btn btn-primary" onClick={openModal}>
                  Get the Garantir verdict <span className="arr">→</span>
                </button>
                <button className="btn btn-ghost" onClick={() => scrollTo("tested")}>
                  See what we test
                </button>
              </div>
              <div className="hero-meta reveal" data-d="4">
                <span>Real data never leaves</span>
                <span>Graded independently</span>
                <span>One verdict, whole committee</span>
              </div>
            </div>

            {/* twinning visual */}
            <div className="twin-stage reveal" data-d="3">
              <div className="doc real">
                <span className="doc-tag">Your file · sealed</span>
                <div className="doc-head">
                  <div className="ti">Invoice</div>
                  <div className="sub">AP-0481</div>
                </div>
                <div className="row sensitive"><span className="k">Supplier</span><span className="v">Halden &amp; Roe Ltd</span></div>
                <div className="row"><span className="k">Invoice&nbsp;no</span><span className="v">INV-99204</span></div>
                <div className="row sensitive"><span className="k">Total</span><span className="v">£18,420.00</span></div>
                <div className="row sensitive"><span className="k">IBAN</span><span className="v">GB29 NWBK 6016</span></div>
                <div className="row"><span className="k">Due&nbsp;date</span><span className="v">30 Jun 2026</span></div>
              </div>

              <div className="doc twin ticked">
                <span className="doc-tag">Local twin</span>
                <div className="doc-head">
                  <div className="ti">Invoice</div>
                  <div className="sub">AP-0481</div>
                </div>
                <div className="row sensitive"><span className="k">Supplier</span><span className="v">Halden &amp; Roe Ltd</span></div>
                <div className="row kept"><span className="k">Invoice&nbsp;no</span><span className="v">INV-99204</span></div>
                <div className="row sensitive"><span className="k">Total</span><span className="v">£18,420.00</span></div>
                <div className="row sensitive"><span className="k">IBAN</span><span className="v">GB29 NWBK 6016</span></div>
                <div className="row kept"><span className="k">Due&nbsp;date</span><span className="v">30 Jun 2026</span></div>
                <div className="doc-foot">
                  <span>structure preserved</span>
                  <span className="ok">● re-id check passed</span>
                </div>
              </div>
              <div className="caption-pill">real → twin · <b>keep the shape, replace the secrets</b></div>
            </div>
          </div>
        </section>

        {/* PROBLEM */}
        <section className="problem" id="problem">
          <div className="wrap">
            <div className="section-head">
              <h2 className="reveal">AI breaks on<br />the ugly ones.</h2>
              <span className="sec-no reveal" data-d="1">/ 01 — the failure surface</span>
            </div>

            <div className="litany reveal" data-d="1">
              <div className="lit"><span className="n">01</span><div className="t">The blurry scan</div><div className="d">Photographed at an angle, half a stamp over the total.</div></div>
              <div className="lit"><span className="n">02</span><div className="t">The missing PO</div><div className="d">No purchase order to match against. Now what?</div></div>
              <div className="lit"><span className="n">03</span><div className="t">The duplicate</div><div className="d">Same invoice, second time — and it&apos;s already been paid.</div></div>
              <div className="lit"><span className="n">04</span><div className="t">The renamed supplier</div><div className="d">Same company, slightly different name since last quarter.</div></div>
              <div className="lit"><span className="n">05</span><div className="t">The off VAT</div><div className="d">A tax line that&apos;s almost right. Almost.</div></div>
              <div className="lit"><span className="n">06</span><div className="t">Two totals, one page</div><div className="d">Gross and net, and a due date hiding in the footer.</div></div>
            </div>

            <p className="problem-tail reveal" data-d="2">
              Demos never show you these. <span className="hl">Your Tuesday is made of them.</span>
            </p>
          </div>
        </section>

        {/* PROOF */}
        <section className="proof">
          <div className="wrap">
            <div className="section-head">
              <h2 className="reveal">Caution isn&apos;t fear.<br />It&apos;s <em>arithmetic.</em></h2>
              <span className="sec-no reveal" data-d="1">/ 02 — the evidence</span>
            </div>

            <div className="stats">
              <div className="stat reveal" data-d="1">
                <div className="num"><span className="count" data-to="95">0</span><span className="u">%</span></div>
                <div className="lbl">of enterprise GenAI pilots show no measurable P&amp;L impact.</div>
                <div className="src">MIT NANDA · 2025</div>
              </div>
              <div className="stat reveal" data-d="2">
                <div className="num"><span className="count" data-to="40">0</span><span className="u">%+</span></div>
                <div className="lbl">of agentic-AI projects are forecast to be scrapped by 2027.</div>
                <div className="src">Gartner</div>
              </div>
              <div className="stat reveal" data-d="3">
                <div className="num"><span className="count" data-to="78">0</span><span className="u">%</span></div>
                <div className="lbl">of CFOs report serious AI security and privacy concerns.</div>
                <div className="src">Kyriba · 2025</div>
              </div>
            </div>

            <p className="proof-tail reveal" data-d="2">
              Trying AI was never the hard part. <b>Proving it works — before it reaches the ledger — is.</b>
            </p>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="how" id="how">
          <div className="wrap">
            <div className="section-head">
              <h2 className="reveal">The best test data<br />there is. <em>Yours.</em><br />Without the risk.</h2>
              <span className="sec-no reveal" data-d="1">/ 03 — the mechanism</span>
            </div>

            <p className="how-lead reveal" data-d="1">
              Your real files never leave your environment. Garantir builds a <b>twin</b> of them — locally.
              The twin keeps everything the AI reacts to:{" "}
              <span className="sig">layout, totals, dates, PO numbers, supplier patterns, duplicates, scanned pages, edge cases.</span>{" "}
              The sensitive details — names, account numbers, real amounts — are replaced.
            </p>

            <div className="flow reveal" data-d="2">
              <div className="flow-node">
                <div className="ic">
                  <svg viewBox="0 0 24 24"><path d="M6 2h8l4 4v16H6z"/><path d="M14 2v4h4"/><path d="M9 13h6M9 17h6"/></svg>
                </div>
                <div className="step">Step 01</div>
                <div className="nm">Real files</div>
                <div className="ds">Your historical invoices and the human answer key. Read-only. They stay home.</div>
              </div>
              <div className="flow-arrow"><div className="track" /></div>
              <div className="flow-node mid">
                <div className="ic">
                  <svg viewBox="0 0 24 24"><rect x="3" y="4" width="9" height="16" rx="1"/><rect x="12" y="4" width="9" height="16" rx="1"/><path d="M12 9h3M12 13h3"/></svg>
                </div>
                <div className="step">Step 02</div>
                <div className="nm">Local twin</div>
                <div className="ds">Structure preserved, secrets replaced — then a re-identification check before anything moves.</div>
              </div>
              <div className="flow-arrow"><div className="track" /></div>
              <div className="flow-node">
                <div className="ic">
                  <svg viewBox="0 0 24 24"><path d="M20 7L10 17l-5-5"/></svg>
                </div>
                <div className="step">Step 03</div>
                <div className="nm">Safe test</div>
                <div className="ds">The vendor&apos;s AI runs the twin. Garantir grades every field against the twinned answer key.</div>
              </div>
            </div>

            <div className="trust-line reveal" data-d="3">
              <span className="lk">▸ Provably local.</span>{" "}
              Every byte that crosses the line is logged, hashed, and tamper-evident — so &quot;your data stays home&quot; is a fact, not a promise.
            </div>
          </div>
        </section>

        {/* WHAT GETS TESTED */}
        <section className="tested" id="tested">
          <div className="wrap">
            <div className="section-head">
              <h2 className="reveal">We ask the questions<br />a demo <em>won&apos;t.</em></h2>
              <span className="sec-no reveal" data-d="1">/ 04 — the test</span>
            </div>

            <div className="checks reveal" data-d="1">
              <div className="chk"><span className="mark"><svg viewBox="0 0 24 24"><path d="M20 7L10 17l-5-5"/></svg></span><div className="q">Can it read the invoice — even the bad scan?</div></div>
              <div className="chk"><span className="mark"><svg viewBox="0 0 24 24"><path d="M20 7L10 17l-5-5"/></svg></span><div className="q">Does it pull the right total?</div></div>
              <div className="chk"><span className="mark"><svg viewBox="0 0 24 24"><path d="M20 7L10 17l-5-5"/></svg></span><div className="q">Does it match the purchase order?</div></div>
              <div className="chk"><span className="mark"><svg viewBox="0 0 24 24"><path d="M20 7L10 17l-5-5"/></svg></span><div className="q">Does it catch the duplicate that&apos;s already paid?</div></div>
              <div className="chk"><span className="mark"><svg viewBox="0 0 24 24"><path d="M20 7L10 17l-5-5"/></svg></span><div className="q">Does it flag the exception instead of guessing?</div></div>
              <div className="chk crit"><span className="mark"><svg viewBox="0 0 24 24"><path d="M20 7L10 17l-5-5"/></svg></span><div className="q">And the one that matters most: <b>does it know when it doesn&apos;t know?</b></div></div>
            </div>
          </div>

          {/* climax band */}
          <div className={`climax${climaxIn ? " in" : ""}`} id="climax" ref={climaxRef}>
            <div className="wrap">
              <div className="pre reveal">In finance, the dangerous answer was never</div>
              <div className="big reveal" data-d="1">&ldquo;I don&apos;t know.&rdquo;</div>
              <div className="reveal" data-d="2" style={{ marginTop: 30 }}>
                <div className="pre">It&apos;s</div>
                <div className="wrong-wrap">
                  <div className="wrong">&ldquo;I&apos;m certain.&rdquo;</div>
                </div>
                <div className="big" style={{ fontSize: "clamp(34px,6vw,72px)", marginTop: 4 }}>
                  And&nbsp;<span style={{ color: "var(--red)" }}>wrong.</span>
                  <span className="stamp">✕ confident&nbsp;error</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* VERDICT */}
        <section className="verdict" id="verdict">
          <div className="wrap">
            <div className="section-head">
              <h2 className="reveal">No hype.<br />A <em>verdict.</em></h2>
              <span className="sec-no reveal" data-d="1">/ 05 — the decision</span>
            </div>

            <p className="verdict-lead reveal" data-d="1">
              One decision-grade answer your CFO, compliance, IT, and auditors can all act on — backed by what was tested,
              what was protected, and how confident the test is that it predicts production.
            </p>

            <div className="vgrid">
              <div className="vcard go reveal" data-d="1"><span className="vdot" /><div className="vno">Verdict A</div><div className="vt">Deploy</div><div className="vd">It earns the ledger. Turn it on.</div></div>
              <div className="vcard lim reveal" data-d="2"><span className="vdot" /><div className="vno">Verdict B</div><div className="vt">Deploy with limits</div><div className="vd">Cleared — within defined guardrails.</div></div>
              <div className="vcard hum reveal" data-d="3"><span className="vdot" /><div className="vno">Verdict C</div><div className="vt">Keep a human</div><div className="vd">Not yet autonomous. Keep review on.</div></div>
              <div className="vcard no reveal" data-d="4"><span className="vdot" /><div className="vno">Verdict D</div><div className="vt">Don&apos;t deploy</div><div className="vd">It isn&apos;t ready. Here&apos;s exactly why.</div></div>
            </div>

            <p className="verdict-tail reveal" data-d="2">
              Garantir turns <span className="hl">&ldquo;should we trust this AI?&rdquo;</span> into a decision you can defend.
            </p>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="final" id="cta">
          <div className="wrap">
            <div className="inner">
              <span className="eyebrow reveal" style={{ justifyContent: "center" }}>Before go-live</span>
              <h2 className="reveal" data-d="1">Prove it before<br />it touches <em>real money.</em></h2>
              <div className="pipe reveal" data-d="2">
                <span>Your data</span><span>twinned locally</span><span>tested on your edge cases</span><span>graded independently</span>
              </div>
              <div className="reveal" data-d="3">
                <button
                  className="btn btn-primary"
                  style={{ padding: "17px 30px", fontSize: 14 }}
                  onClick={openModal}
                >
                  Get the Garantir verdict <span className="arr">→</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        <footer>
          <div className="wrap foot-grid">
            <div>
              <div className="foot-brand"><span className="dot" />Garantir</div>
              <p className="foot-tag">The independent proving ground between &ldquo;interested in an AI automation&rdquo; and &ldquo;approved to deploy it.&rdquo;</p>
            </div>
            <div className="foot-note">
              Independent · provably local · finance-specific<br />
              Functional-correctness validation, not AI security.<br />
              The failure mode we catch is wrong numbers in the ledger.
            </div>
          </div>
        </footer>

        <WaitlistModal open={modalOpen} onClose={closeModal} />
      </>
  );
}

function runCount(node: HTMLElement) {
  if (node.dataset.done) return;
  node.dataset.done = "1";
  const to = parseInt(node.dataset.to ?? "0", 10);
  const dur = 1200;
  const start = performance.now();
  const ease = (t: number) => 1 - Math.pow(1 - t, 3);
  function tick(now: number) {
    const p = Math.min((now - start) / dur, 1);
    node.textContent = String(Math.round(ease(p) * to));
    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}
