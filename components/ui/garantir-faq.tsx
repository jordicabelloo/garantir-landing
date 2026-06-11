"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ_ITEMS = [
  {
    question: "Does our data leave our systems?",
    answer:
      "No. Garantir creates a Protected Twin on your machine using format-preserving encryption. The AI vendor only ever sees the twin — different values, same structure. Your original invoices and financial documents are never uploaded, transmitted, or stored outside your environment.",
  },
  {
    question: "What format is the output report?",
    answer:
      "Garantir produces a structured Evidence Pack: a PDF report with per-field accuracy scores, a grading CSV, and a JSON summary. It is designed to be readable by CFOs, compliance leads, and external auditors — not just technical teams.",
  },
  {
    question: "Which AI vendors can Garantir validate?",
    answer:
      "Any vendor that accepts text input: GPT-4o, Claude, Gemini, and local models via Ollama. You connect the vendor once with an API key and Garantir handles the rest. No changes required on the vendor side.",
  },
  {
    question: "What types of documents does it work with?",
    answer:
      "Garantir is built for structured financial documents — invoices, purchase orders, and AP workflows are fully supported at launch. Support for contracts and compliance forms is on the roadmap.",
  },
  {
    question: "When will Garantir be available?",
    answer:
      "We are running a closed pilot with a small group of finance and legal teams. Join the waitlist to be considered for the first cohort. Priority access goes to teams with an AI vendor evaluation already in progress.",
  },
];

export function GarantirFaq() {
  return (
    <div style={{ maxWidth: 680 }}>
      <Accordion type="single" collapsible className="w-full">
        {FAQ_ITEMS.map((item, index) => (
          <AccordionItem
            key={index}
            value={`item-${index}`}
            style={{ borderColor: "rgba(14,13,11,0.18)" }}
          >
            <AccordionTrigger
              style={{
                fontFamily: "var(--sans)",
                fontSize: 15,
                fontWeight: 500,
                color: "#0e0d0b",
                textAlign: "left",
                paddingTop: "1.25rem",
                paddingBottom: "1.25rem",
              }}
            >
              {item.question}
            </AccordionTrigger>
            <AccordionContent
              style={{
                fontFamily: "var(--sans)",
                fontSize: 14,
                color: "rgba(14,13,11,0.58)",
                lineHeight: 1.7,
              }}
            >
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
