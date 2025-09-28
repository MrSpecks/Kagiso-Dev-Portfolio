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

    try {
      // Change the API endpoint to your Express server route
      const res = await fetch("http://localhost:5000/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: userMessage }),
      });

      const data = await res.json();

      const agentReply = data.answer || "Sorry, I couldn't find an answer.";

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: agentReply },
      ]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Error contacting AI agent." },
      ]);
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
                    ? "bg-blue-100 self-end"
                    : "bg-gray-100 self-start"
                }`}
              >
                <p className="text-sm text-black">{msg.content}</p>
              </div>
            ))}
            {loading && (
              <div className="p-2 rounded-lg max-w-[75%] bg-gray-100 self-start">
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
            <Button onClick={handleSend} size="icon" disabled={loading}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      )}
    </>
  );
};

export default ChatbotButton;