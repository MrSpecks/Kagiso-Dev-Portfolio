// /src/components/ChatBotButton.tsx
"use client";
import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const ChatbotButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<
    { role: "user" | "assistant"; content: string }[]
  >([
    {
      role: "assistant",
      content:
        "Hi! I'm Kae's AI assistant. Ask me anything about Kagiso's projects, skills, or certifications — I'm trained on it all.",
    },
  ]);
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom whenever messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!message.trim()) return;

    const userMessage = message;
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setMessage("");
    setLoading(true);

    // 1. Initialize a new assistant message for streaming
    setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

    try {
      // FIX: Changed hardcoded 'http://localhost:5000/api/ask' to a relative path '/api/ask'.
      // This is the correct way to call serverless functions deployed alongside the site (e.g., on Vercel/Netlify).
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: userMessage }),
      });

      if (!res.ok || !res.body) {
        throw new Error("Failed to fetch from agent API.");
      }

      // 2. Set up the streaming reader
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let streamFinished = false;

      while (!streamFinished) {
        const { value, done } = await reader.read();
        if (done) {
          streamFinished = true;
          break;
        }

        const chunk = decoder.decode(value, { stream: true });
        
        // 3. Update the last assistant message with the new chunk
        setMessages((prev) => {
          const lastMessage = prev[prev.length - 1];
          // Ensure we are only appending to the assistant's stream
          if (lastMessage.role === "assistant") {
            const updatedContent = lastMessage.content + chunk;
            return [
              ...prev.slice(0, prev.length - 1),
              { role: "assistant", content: updatedContent },
            ];
          }
          return prev;
        });
      }

    } catch (err) {
      console.error("Agent Error:", err);
      // Fallback: update the very last message with the error
      setMessages((prev) => {
        const lastMessage = prev[prev.length - 1];
        if (lastMessage.role === "assistant") {
           return [
             ...prev.slice(0, prev.length - 1),
             { role: "assistant", content: "Error contacting AI agent." },
           ];
        }
        return prev;
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-2000 animate-pulse-glow"
        size="icon"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </Button>

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-24 right-6 w-80 h-96 p-4 shadow-xl animate-slide-in flex flex-col">
          {/* Header */}
          <div className="border-b border-border pb-2 mb-2">
            <h3 className="font-semibold">Kae's AI Assistant</h3>
            <p className="text-sm text-muted-foreground text-black">
              Ask me anything about Kagiso's work!
            </p>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto space-y-2 text-black">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`p-2 rounded-lg max-w-[75%] ${
                  msg.role === "user"
                    ? "bg-blue-100 self-end ml-auto" // Added ml-auto for alignment
                    : "bg-gray-100 self-start mr-auto" // Added mr-auto for alignment
                }`}
              >
                <p className="text-sm text-black whitespace-pre-wrap">{msg.content}</p> {/* Added whitespace-pre-wrap */}
              </div>
            ))}
            {loading && (
              // Display loading indicator if the last message is still being streamed
              <div className="p-2 rounded-lg max-w-[75%] bg-gray-100 self-start mr-auto">
                <p className="text-sm text-black">AI is typing...</p>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="flex gap-2 pt-2 border-t border-border">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              className="flex-1"
            />
            <Button onClick={handleSend} size="icon" disabled={loading || !message.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      )}
    </>
  );
};

export default ChatbotButton;