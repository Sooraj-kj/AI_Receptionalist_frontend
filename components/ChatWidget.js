"use client";

import { useState } from "react";
import { MessageCircle, Send, X } from "lucide-react";
import { api } from "@/lib/api";

const starters = ["What are your opening hours?", "Who are the doctors?", "I want to book an appointment tomorrow"];

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi, I am the SmileCare AI receptionist. I can answer clinic FAQs or help request an appointment." },
  ]);

  async function send(text = message) {
    if (!text.trim()) return;
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
    <div className="fixed bottom-5 right-5 z-40">
      {open && (
        <div className="mb-3 flex h-[34rem] w-[calc(100vw-2.5rem)] max-w-sm flex-col overflow-hidden rounded border border-ink/10 bg-white shadow-soft">
          <div className="flex items-center justify-between bg-clinic px-4 py-3 text-white">
            <div>
              <p className="font-semibold">AI Receptionist</p>
              <p className="text-xs text-white/75">SmileCare Dental Clinic</p>
            </div>
            <button className="focus-ring rounded p-1" onClick={() => setOpen(false)} aria-label="Close chat">
              <X size={18} />
            </button>
          </div>
          <div className="flex-1 space-y-3 overflow-y-auto bg-paper p-4">
            {messages.map((item, index) => (
              <div
                key={`${item.role}-${index}`}
                className={`max-w-[85%] rounded px-3 py-2 text-sm leading-6 ${
                  item.role === "user" ? "ml-auto bg-clinic text-white" : "bg-white text-ink shadow-sm"
                }`}
              >
                {item.content}
              </div>
            ))}
            {loading && <div className="w-fit rounded bg-white px-3 py-2 text-sm text-ink/60 shadow-sm">Checking...</div>}
          </div>
          <div className="border-t border-ink/10 bg-white p-3">
            <div className="mb-3 flex flex-wrap gap-2">
              {starters.map((starter) => (
                <button
                  key={starter}
                  className="focus-ring rounded border border-ink/10 px-2 py-1 text-xs text-ink/70"
                  onClick={() => send(starter)}
                >
                  {starter}
                </button>
              ))}
            </div>
            <form
              className="flex gap-2"
              onSubmit={(event) => {
                event.preventDefault();
                send();
              }}
            >
              <input
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                className="focus-ring min-w-0 flex-1 rounded border border-ink/15 px-3 py-2 text-sm"
                placeholder="Type your message"
              />
              <button className="focus-ring rounded bg-coral p-2 text-white" aria-label="Send message">
                <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      )}
      <button
        className="focus-ring ml-auto grid h-14 w-14 place-items-center rounded-full bg-coral text-white shadow-soft"
        onClick={() => setOpen(!open)}
        aria-label="Open AI receptionist chat"
      >
        <MessageCircle size={24} />
      </button>
    </div>
  );
}
