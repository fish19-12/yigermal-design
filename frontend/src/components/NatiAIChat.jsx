import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPaperPlane, FaTimes, FaMagic } from "react-icons/fa";

import axios from "axios";
import logo from "../assets/logo.jpg";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const starterPrompts = [
  "How can I order a chiffon dress?",

  "What services does Feyorina Chiffon provide?",

  "I need a traditional Ethiopian wedding dress",

  "How do I request a custom design?",
];

function renderMarkdownContent(content) {
  if (!content) return null;

  return content.split("\n\n").map((block, index) => {
    if (block.includes("- ")) {
      return (
        <ul
          key={index}
          className="
        list-disc
        pl-5
        space-y-1
        "
        >
          {block.split("\n").map((line, i) => (
            <li key={i}>{line.replace("- ", "")}</li>
          ))}
        </ul>
      );
    }

    return (
      <p
        key={index}
        className="
      whitespace-pre-wrap
      "
      >
        {block}
      </p>
    );
  });
}

export default function NatiAIChat() {
  const [open, setOpen] = useState(false);

  const [input, setInput] = useState("");

  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState([
    {
      role: "assistant",

      content: `

Hello 👋 I’m Feyorina AI.

Your luxury fashion assistant for Fiyorina Chiffon.

I can help you with:

- Chiffon dress orders
- Custom fashion designs
- Ethiopian traditional clothing
- Bridal collections
- Textile materials
- Fashion recommendations
- Booking consultations

How can I help you today?

`,
    },
  ]);

  const [sessionId] = useState(() => {
    return crypto?.randomUUID?.() || Date.now().toString();
  });

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, open]);

  async function sendMessage(text = input.trim()) {
    if (!text || loading) return;

    setMessages((prev) => [
      ...prev,

      {
        role: "user",
        content: text,
      },
    ]);

    setInput("");

    setLoading(true);

    try {
      const res = await axios.post(
        `${API_URL}/api/ai-chat`,

        {
          message: text,

          sessionId,
        },
      );

      setMessages((prev) => [
        ...prev,

        {
          role: "assistant",

          content:
            res.data.reply || "How can I help you with Feyorina Chiffon?",
        },
      ]);
    } catch (error) {
      console.log(error);

      setMessages((prev) => [
        ...prev,

        {
          role: "assistant",

          content: "Sorry, Feyorina AI is temporarily unavailable.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* FLOATING AI BUTTON */}

      <button
        onClick={() => setOpen(!open)}
        className="

fixed

bottom-[95px]

sm:bottom-6

right-4

sm:right-5

z-[9999]

flex

items-center

gap-3

rounded-full

bg-gradient-to-r

from-[#FF2D6F]

to-[#F59E0B]

px-4

sm:px-5

py-3

text-white

shadow-2xl

transition

hover:scale-105

"
      >
        <img
          src={logo}
          alt="Fiyorina AI"
          className="

h-9

w-9

rounded-full

object-cover

"
        />

        <span
          className="

font-bold

text-sm

sm:text-base

"
        >
          Feyorina AI
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{
              opacity: 0,

              y: 40,
            }}
            animate={{
              opacity: 1,

              y: 0,
            }}
            exit={{
              opacity: 0,

              y: 40,
            }}
            className="

fixed


bottom-[160px]


sm:bottom-24


right-3


sm:right-5


z-[9998]


w-[94vw]


max-w-[430px]


rounded-3xl


overflow-hidden


bg-white


shadow-2xl


border


border-pink-200

"
          >
            {/* HEADER */}

            <div
              className="

flex

items-center

justify-between

bg-gradient-to-r

from-[#FF2D6F]

to-[#F59E0B]

px-4

py-3

text-white

"
            >
              <div
                className="

flex

items-center

gap-3

"
              >
                <img
                  src={logo}
                  alt="Fiyorina"
                  className="

h-10

w-10

rounded-full

object-cover

"
                />

                <div>
                  <p className="font-bold">Feyorina AI</p>

                  <p className="text-xs">Luxury Fashion Concierge</p>
                </div>
              </div>

              <button onClick={() => setOpen(false)}>
                <FaTimes />
              </button>
            </div>

            {/* CHAT BODY */}

            <div
              className="

h-[420px]

flex

flex-col

"
            >
              <div
                className="

flex-1

overflow-y-auto

p-4

"
              >
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`

mb-3

rounded-2xl

px-4

py-3

text-sm

max-w-[90%]


${
  msg.role === "assistant"
    ? "bg-pink-50 text-gray-800"
    : "ml-auto bg-gradient-to-r from-[#FF2D6F] to-[#F59E0B] text-white"
}


`}
                  >
                    {msg.role === "assistant"
                      ? renderMarkdownContent(msg.content)
                      : msg.content}
                  </div>
                ))}

                {loading && (
                  <div
                    className="

rounded-xl

bg-gray-100

p-3

text-sm

text-gray-500

"
                  >
                    Feyorina AI is thinking...
                  </div>
                )}

                {messages.length === 1 && (
                  <div
                    className="

mt-4

space-y-2

"
                  >
                    {starterPrompts.map((prompt) => (
                      <button
                        key={prompt}
                        onClick={() => sendMessage(prompt)}
                        className="

flex

items-center

gap-2

w-full

rounded-full

border

border-pink-200

px-4

py-2

text-left

text-xs

hover:bg-pink-50

"
                      >
                        <FaMagic className="text-[#FF2D6F]" />

                        {prompt}
                      </button>
                    ))}
                  </div>
                )}

                <div ref={bottomRef} />
              </div>

              {/* INPUT */}

              <div
                className="

border-t

p-3

bg-white

"
              >
                <div
                  className="

flex

items-center

gap-2

rounded-full

border

border-pink-200

px-3

"
                >
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") sendMessage();
                    }}
                    placeholder="Ask Fiyorina AI..."
                    className="

flex-1

py-3

outline-none

text-sm

"
                  />

                  <button
                    onClick={() => sendMessage()}
                    disabled={loading}
                    className="

rounded-full

bg-gradient-to-r

from-[#FF2D6F]

to-[#F59E0B]

p-3

text-white

disabled:opacity-50

"
                  >
                    <FaPaperPlane />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
