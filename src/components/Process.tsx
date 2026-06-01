import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Sparkles, AlertCircle, Bot, User, RefreshCw } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Ahoj! Jsem AI asistent pana Filipa Hirta. Rád ti odpovím na jakékoli otázky ohledně pana Hirta, jeho webdesignérské práce, zkušeností s programováním nebo služeb, které nabízí. Na co se chceš zeptat?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [provider, setProvider] = useState<string>("AI Agent");

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const suggestedPrompts = [
    "Kolik ti je let a odkud jsi?",
    "Jaké služby nabízíš?",
    "V jakých technologiích vyvíjíš?",
    "Kolik máš za sebou projektů?",
    "Jak tě mohu kontaktovat?",
  ];

  // Scroll to bottom of the chat container whenever messages or loading state changes
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async (text: string) => {
    if (!text.trim() || isLoading) return;

    setError(null);
    const userMessage: Message = { role: "user", content: text };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Send the entire chat history (excluding the first welcome message to keep prompt window clean)
      const chatHistory = messages
        .slice(1)
        .concat(userMessage)
        .map((m) => ({
          role: m.role,
          content: m.content,
        }));

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: chatHistory,
        }),
      });

      if (!response.ok) {
        throw new Error("Nepodařilo se získat odpověď od serveru.");
      }

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.message },
      ]);

      if (data.provider) {
        setProvider(data.provider === "groq" ? "Groq (Llama 3)" : "Ollama (Llama 3)");
      }
    } catch (err: any) {
      console.error(err);
      setError(
        err.message || "Nastala neočekávaná chyba při spojení s AI asistentem."
      );
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Omlouvám se, ale momentálně se mi nedaří spojit s mým neuronovým centrem. Zkontroluj prosím připojení nebo to zkus za chvíli.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSend(input);
  };

  return (
    <section id="chatbot" className="chatbot-section">
      {/* Glow ambient background lights */}
      <div className="chatbot-glow-top" />
      <div className="chatbot-glow-bottom" />

      <div className="container">
        <div className="chatbot-grid">
          {/* Left Column: Assistant Information */}
          <div className="chatbot-info-col reveal">
            <span className="section-number" style={{ opacity: 0.05 }}>
              04
            </span>
            <div className="section-label">AI Konzultant</div>
            <h2 className="chatbot-title">
              Digitální dvojče <br />
              <span className="lime">poháněné AI</span>
            </h2>
            <p className="chatbot-subtitle">
              Napište mému virtuálnímu já. Je vycvičeno na mých reálných zkušenostech a odpoví vám okamžitě na jakékoli dotazy ohledně tvorby webů, technologií či nacenění.
            </p>

            {/* Status indicators */}
            <div className="chatbot-status-card">
              <div className="status-header">
                <span className="status-pulse" />
                <span className="status-text">AI Asistent Aktivní</span>
              </div>
              <div className="status-meta">
                <div className="meta-item">
                  <span className="meta-label">Model:</span>
                  <span className="meta-value">{provider}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Rychlost:</span>
                  <span className="meta-value">~150ms / token</span>
                </div>
              </div>
            </div>

            {/* Suggested prompts list */}
            <div className="chatbot-prompts-wrap">
              <span className="prompts-title">Časté dotazy (klikněte pro odeslání):</span>
              <div className="prompts-list">
                {suggestedPrompts.map((prompt, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSend(prompt)}
                    disabled={isLoading}
                    className="prompt-chip"
                  >
                    <Sparkles className="w-3 h-3 text-lime shrink-0" />
                    <span>{prompt}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Chatbox Interface */}
          <div className="chatbot-chat-col reveal">
            <div className="chatbox-container">
              {/* Top window bar */}
              <div className="chatbox-header">
                <div className="window-dots">
                  <span className="dot dot-red" />
                  <span className="dot dot-yellow" />
                  <span className="dot dot-green" />
                </div>
                <div className="chatbox-title">
                  <Bot className="w-4 h-4 text-lime" />
                  <span>filip_hirt_assistant.exe</span>
                </div>
                <div className="chatbox-active-badge">
                  <span className="active-dot" />
                  <span>ONLINE</span>
                </div>
              </div>

              {/* Chat messages body */}
              <div ref={chatContainerRef} className="chatbox-body">
                <AnimatePresence initial={false}>
                  {messages.map((msg, index) => {
                    const isUser = msg.role === "user";
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 15, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className={`chat-message-wrapper ${isUser ? "user" : "assistant"}`}
                      >
                        {/* Avatar */}
                        <div className={`message-avatar ${isUser ? "user" : "assistant"}`}>
                          {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                        </div>

                        {/* Content */}
                        <div className={`message-bubble ${isUser ? "user" : "assistant"}`}>
                          <div className="message-text">{msg.content}</div>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>

                {/* Loading indicator */}
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="chat-message-wrapper assistant"
                  >
                    <div className="message-avatar assistant">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div className="message-bubble assistant typing-bubble">
                      <div className="typing-indicator">
                        <span />
                        <span />
                        <span />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Error Banner */}
                {error && (
                  <div className="chat-error-banner">
                    <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input Form Footer */}
              <form onSubmit={handleFormSubmit} className="chatbox-footer">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Zeptejte se na mou práci, technologie, cenu..."
                  disabled={isLoading}
                  className="chatbox-input"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="chatbox-send-btn"
                  aria-label="Odeslat zprávu"
                >
                  {isLoading ? (
                    <RefreshCw className="w-4 h-4 animate-spin text-black" />
                  ) : (
                    <Send className="w-4 h-4 text-black" />
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
