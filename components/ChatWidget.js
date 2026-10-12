"use client";

import { useEffect, useRef, useState } from "react";
import { Bot, MessageCircle, Send, X } from "lucide-react";
import { api } from "@/lib/api";

const starters = ["What are your opening hours?", "Who are the doctors?", "I want to book an appointment tomorrow"];

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi, I am the SmileCare AI receptionist. I can answer clinic FAQs or help request an appointment." },
  ]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ block: "end" });
  }, [messages, loading, open]);

  async function send(text = message) {
    if (!text.trim() || loading) return;
    const next = [...messages, { role: "user", content: text }];
    setMessages(next);
    setMessage("");
    setLoading(true);
    try {
      const response = await api("/ai/chat", {
        method: "POST",
        auth: false,
        body: JSON.stringify({ message: text, session_id: sessionId }),
      });
      setSessionId(response.session_id);
      setMessages([...next, { role: "assistant", content: response.reply }]);
    } catch (error) {
      setMessages([...next, { role: "assistant", content: error.message }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-x-3 bottom-3 z-40 flex flex-col items-end sm:inset-x-auto sm:bottom-5 sm:right-5">
      {open && (
        <div className="mb-3 flex h-[min(38rem,calc(100vh-2rem))] w-full max-w-[28rem] flex-col overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-soft ring-1 ring-white/70">
          <div className="flex items-center justify-between bg-clinic px-4 py-3.5 text-white">
            <div className="flex min-w-0 items-center gap-3">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/15 ring-1 ring-white/20">
                <Bot size={21} />
              </div>
              <div className="min-w-0">
                <p className="truncate text-base font-semibold leading-5">AI Receptionist</p>
                <p className="truncate text-xs text-white/75">SmileCare Dental Clinic</p>
              </div>
            </div>
            <button className="focus-ring rounded-full p-2 text-white/85 transition hover:bg-white/10 hover:text-white" onClick={() => setOpen(false)} aria-label="Close chat">
              <X size={18} />
            </button>
          </div>
          <div className="chat-scroll flex-1 space-y-3 overflow-y-auto bg-gradient-to-b from-paper to-white px-4 py-4">
            {messages.map((item, index) => (
              <div
                key={`${item.role}-${index}`}
                className={`max-w-[86%] [overflow-wrap:anywhere] px-3.5 py-2.5 text-sm leading-6 shadow-sm ${
                  item.role === "user"
                    ? "ml-auto rounded-2xl rounded-br-md bg-clinic text-white"
                    : "rounded-2xl rounded-bl-md border border-ink/5 bg-white text-ink"
                }`}
              >
                {item.content}
              </div>
            ))}
            {loading && (
              <div className="flex w-fit items-center gap-2 rounded-2xl rounded-bl-md border border-ink/5 bg-white px-3.5 py-2.5 text-sm text-ink/60 shadow-sm">
                <span className="h-2 w-2 animate-pulse rounded-full bg-clinic" />
                Checking
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className="border-t border-ink/10 bg-white/95 p-3 shadow-[0_-12px_30px_rgba(23,33,38,0.04)]">
            <div className="mb-3 flex max-h-20 flex-wrap gap-2 overflow-y-auto pr-1">
              {starters.map((starter) => (
                <button
                  key={starter}
                  className="focus-ring rounded-full border border-ink/10 bg-white px-3 py-1.5 text-xs font-medium text-ink/70 transition hover:border-clinic/30 hover:bg-mint/70 hover:text-clinic disabled:cursor-not-allowed disabled:opacity-60"
                  onClick={() => send(starter)}
                  disabled={loading}
                >
                  {starter}
                </button>
              ))}
            </div>
            <form
              className="flex items-center gap-2"
              onSubmit={(event) => {
                event.preventDefault();
                send();
              }}
            >
              <input
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                className="focus-ring min-w-0 flex-1 rounded-xl border border-ink/15 bg-white px-3.5 py-3 text-sm text-ink placeholder:text-ink/40"
                placeholder="Type your message"
                disabled={loading}
              />
              <button
                className="focus-ring grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-coral text-white shadow-sm transition hover:bg-[#ef684f] disabled:cursor-not-allowed disabled:opacity-60"
                aria-label="Send message"
                disabled={loading || !message.trim()}
              >
                <Send size={20} />
              </button>
            </form>
          </div>
        </div>
      )}
      <button
        className="focus-ring ml-auto grid h-14 w-14 place-items-center rounded-full bg-coral text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-[#ef684f]"
        onClick={() => setOpen(!open)}
        aria-label="Open AI receptionist chat"
      >
        <MessageCircle size={24} />
      </button>
    </div>
  );
}
