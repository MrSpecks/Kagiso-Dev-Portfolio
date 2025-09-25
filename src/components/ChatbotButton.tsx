import { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const ChatbotButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim()) {
      // Placeholder for chat functionality
      console.log("Message sent:", message);
      setMessage("");
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse-glow"
        size="icon"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </Button>

      {/* Chat Overlay */}
      {isOpen && (
        <Card className="fixed bottom-24 right-6 w-80 h-96 p-4 shadow-xl animate-slide-in">
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="border-b border-border pb-3 mb-3">
              <h3 className="font-semibold">Portfolio Assistant</h3>
              <p className="text-sm text-muted-foreground">Ask me anything about my work!</p>
            </div>

            {/* Messages Area */}
            <div className="flex-1 space-y-4 overflow-y-auto">
              <div className="bg-primary/10 rounded-lg p-3">
                <p className="text-sm">
                  Hi! I'm a placeholder chatbot. Feel free to explore the portfolio and check out my projects and certifications!
                </p>
              </div>
            </div>

            {/* Input Area */}
            <div className="flex gap-2 pt-3 border-t border-border">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                className="flex-1"
              />
              <Button onClick={handleSend} size="icon">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      )}
    </>
  );
};

export default ChatbotButton;