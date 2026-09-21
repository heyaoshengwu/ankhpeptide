"use client";

import { useState } from "react";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const mockFaqs: FAQItem[] = [
  {
    id: "1",
    question: "What is the minimum order quantity for custom peptides?",
    answer: "The minimum order quantity for custom peptides is typically 1mg. For bulk orders above 10mg, we offer significant discounts. Please contact our sales team for a detailed quote based on your specific requirements."
  },
  {
    id: "2",
    question: "What is your typical lead time for peptide synthesis?",
    answer: "Standard lead time is 3-5 business days for peptides up to 30 amino acids. Longer sequences or modified peptides may require additional time. Rush services are available for expedited delivery."
  },
  {
    id: "3",
    question: "Do you provide quality analysis certificates?",
    answer: "Yes, every peptide comes with a Certificate of Analysis (CoA) including HPLC and mass spectrometry data. Additional characterization methods like amino acid analysis are available upon request."
  },
  {
    id: "4",
    question: "What purity levels are available?",
    answer: "We offer multiple purity grades: Crude (50-70%), Desalted (70-80%), Standard (85-95%), High Purity (95-99%), and PepGLY purity (>99%). The appropriate purity depends on your application."
  },
  {
    id: "5",
    question: "Can you synthesize peptides with modifications?",
    answer: "Yes, we support a wide range of modifications including D-amino acids, N-methylation, stapling, cyclization, fluorescent labels, and biomolecule conjugations. Contact us to discuss your specific modification requirements."
  }
];

interface AccordionItemProps {
  item: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
}

function AccordionItem({ item, isOpen, onToggle }: AccordionItemProps) {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden mb-4">
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 text-left bg-white hover:bg-gray-50 flex justify-between items-center transition-colors"
      >
        <span className="font-medium text-gray-900">{item.question}</span>
        <span className={`ml-4 text-gray-500 transition-transform ${isOpen ? "rotate-180" : ""}`}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>
      {isOpen && (
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <p className="text-gray-600 leading-relaxed">{item.answer}</p>
        </div>
      )}
    </div>
  );
}

interface FAQListProps {
  faqs?: FAQItem[];
}

export default function FAQList({ faqs = mockFaqs }: FAQListProps) {
  const [openId, setOpenId] = useState<string | null>("1");

  const handleToggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="faq-list max-w-3xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Frequently Asked Questions</h2>
        <p className="text-gray-600">Find answers to common questions about our peptide products and services.</p>
      </div>
      <div className="space-y-2">
        {faqs.map((faq) => (
          <AccordionItem
            key={faq.id}
            item={faq}
            isOpen={openId === faq.id}
            onToggle={() => handleToggle(faq.id)}
          />
        ))}
      </div>
    </div>
  );
}