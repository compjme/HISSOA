import Footer from "../components/layout/Footer";

import { useState } from "react";
import "../App.css";

type FAQ = {
  question: string;
  answer: string;
};

const faqs: FAQ[] = [
  {
    question: "What is ISSO?",
    answer:
      "ISSO stands for Immigrant Student Success Office. It supports immigrant, undocumented, first-generation, and allied students at Brooklyn College.",
  },
  {
    question: "How do I schedule an appointment?",
    answer:
      "You can schedule through the Scheduling page. Students will be directed to Navigate360 or can email ISSO for support.",
  },
  {
    question: "Do I need to sign in?",
    answer:
      "You can view public pages without signing in, but signing in may be required for posting in the community section or scheduling actions.",
  },
  {
    question: "Who can use ISSO resources?",
    answer:
      "ISSO resources are mainly for immigrant, undocumented, first-generation, and supportive student communities at Brooklyn College.",
  },
  {
    question: "How can I contact ISSO?",
    answer:
      "You can contact ISSO by email or through the resources and scheduling pages once those sections are finalized.",
  },
];

export default function FAQChatbot() {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hi! Ask me a question about ISSO, scheduling, resources, or community support.",
    },
  ]);
  const [input, setInput] = useState("");

  function findAnswer(question: string) {
    const lowerQuestion = question.toLowerCase();

    const match = faqs.find(
      (faq) =>
        lowerQuestion.includes(faq.question.toLowerCase().replace("?", "")) ||
        faq.question.toLowerCase().includes(lowerQuestion)
    );

    if (match) return match.answer;

    if (lowerQuestion.includes("appointment") || lowerQuestion.includes("schedule")) {
      return faqs[1].answer;
    }

    if (lowerQuestion.includes("sign") || lowerQuestion.includes("login")) {
      return faqs[2].answer;
    }

    if (lowerQuestion.includes("resource")) {
      return faqs[3].answer;
    }

    if (lowerQuestion.includes("contact") || lowerQuestion.includes("email")) {
      return faqs[4].answer;
    }

    return "idk yet lol";
  }

  function handleSend() {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    const botMessage = { sender: "bot", text: findAnswer(input) };

    setMessages((prev) => [...prev, userMessage, botMessage]);
    setInput("");
  }

  return (
    <div className="faq-page">
      <h1>FAQ Chatbot</h1>
      <p>Ask common questions about ISSO support, scheduling, and resources.</p>

      <div className="faq-chatbox">
        <div className="faq-messages">
          {messages.map((message, index) => (
            <div
              key={index}
              className={
                message.sender === "user" ? "faq-message user" : "faq-message bot"
              }
            >
              {message.text}
            </div>
          ))}
        </div>

        <div className="faq-input-row">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your question..."
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSend();
            }}
          />
          <button onClick={handleSend}>Send</button>
        </div>
      </div>
    </div>
  );
}