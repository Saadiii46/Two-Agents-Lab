import { useState, useEffect, useRef } from "react";
import { 
  Bot, 
  Send, 
  X, 
  MessageSquare, 
  ChevronDown,
  Trash2,
  Smile,
  Zap,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { UserChat } from "../chat/chat";

interface Message {
  id: string;
  sender: "user" | "agent";
  text: string;
  timestamp: string;
  isCode?: boolean;
}

interface AgentChatbotProps {
  isDarkMode: boolean;
}

export default function AgentChatbot({ isDarkMode }: AgentChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Quick prompt suggestions
  const suggestions = [
    { text: "Build autonomous agent", type: "agent" },
    { text: "Process speed & pricing", type: "speed" },
    { text: "Meet Muhammad & Mehwish", type: "architects" },
    { text: "Show sample integration", type: "code" }
  ];

  // Initial messages
  useEffect(() => {
    const saved = localStorage.getItem("tw_agents_chat_history");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Filter out any old messages with empty text
        const valid = parsed.filter((m: Message) => m.text && m.text.trim() !== "");
        if (valid && valid.length > 0) {
          setMessages(valid);
          return;
        }
      } catch (e) {
        console.error("Error loading chat history", e);
        localStorage.removeItem("tw_agents_chat_history");
      }
    }

    // Default greeting if no history
    const initialText = "Hi there! I am your AI Sandbox Assistant, created by Muhammad Saad & Mehwish Fatima. Ask me anything about building autonomous workflow agents or responsive software dashboards! \n\n*P.S. My frontend is fully wired and ready for your backend linking!*";
    const defaultMessages: Message[] = [
      {
        id: "welcome-msg",
        sender: "agent",
        text: initialText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ];
    setMessages(defaultMessages);
  }, []);

  // Persists chat history
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem("tw_agents_chat_history", JSON.stringify(messages));
    }
  }, [messages]);

  // Keep scroll at bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Handle unread badges
  useEffect(() => {
    if (isOpen) {
      setUnreadCount(0);
    }
  }, [isOpen]);

  const triggerBotResponse = async(userText: string) => {
    setIsTyping(true);

    const botReply = await UserChat(userText)

      const newBotMsg: Message = {
        id: "bot-" + Date.now(),
        sender: "agent",
        text: botReply.messageData,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages(prev => [...prev, newBotMsg]);
      setIsTyping(false);
  };

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const newUserMsg: Message = {
      id: "user-" + Date.now(),
      sender: "user",
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newUserMsg]);
    if (!textToSend) {
      setInputText("");
    }

    triggerBotResponse(text);
  };

  const handleClearHistory = () => {
    if (window.confirm("Do you want to reset the conversation log?")) {
      localStorage.removeItem("tw_agents_chat_history");
      const initialText = "History reset! Ask me anything about Two Agents' custom capabilities or explain where you'd like to hook up the API server!";
      setMessages([
        {
          id: "welcome-" + Date.now(),
          sender: "agent",
          text: initialText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <div className="fixed bottom-6 right-6 z-50 font-sans select-none">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`relative group p-4 rounded-full border shadow-2xl transition-all duration-300 cursor-pointer flex items-center justify-center ${
            isOpen 
              ? "bg-[#14141d] border-violet-500 text-white rotate-90" 
              : isDarkMode 
                ? "bg-black hover:bg-[#14141d] border-[#1f1f2a] text-violet-400 hover:text-white" 
                : "bg-white hover:bg-gray-100 border-gray-300 text-violet-600 hover:text-violet-800"
          }`}
          id="chat-toggle-btn"
          aria-label="Toggle chat assistant"
        >
          {isOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <>
              <MessageSquare className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-mono text-[8px] font-bold px-1.5 py-0.5 rounded-full border border-black animate-pulse">
                  {unreadCount}
                </span>
              )}
              {/* Pulsing Outer Glow */}
              <span className={`absolute inset-0 rounded-full border border-violet-500/30 scale-125 opacity-0 group-hover:opacity-100 group-hover:scale-135 transition-all duration-500 pointer-events-none ${isOpen ? "hidden" : "block"}`} />
            </>
          )}
        </button>
      </div>

      {/* Floating Chatbox Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 35, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 25, scale: 0.92 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className={`fixed bottom-24 right-6 w-[360px] md:w-[400px] h-[550px] rounded-2xl border flex flex-col z-50 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] font-sans ${
              isDarkMode 
                ? "bg-[#050508] border-[#14141a]/95 text-white" 
                : "bg-[#fcfcfd] border-gray-300/90 text-gray-900 shadow-[0_15px_40px_rgba(109,40,217,0.08)]"
            }`}
            id="chatbot-container"
          >
            {/* Header Block */}
            <div className={`p-4 border-b flex items-center justify-between transition-colors ${
              isDarkMode ? "bg-black/80 border-[#14141a]" : "bg-white border-gray-200"
            }`}>
              <div className="flex items-center gap-3">
                <div className={`w-8.5 h-8.5 rounded-lg flex items-center justify-center shrink-0 border ${
                  isDarkMode 
                    ? "bg-violet-950/20 text-violet-400 border-violet-955/30" 
                    : "bg-violet-50 text-violet-700 border-violet-200"
                }`}>
                  <Bot className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-1.5">
                    <span className="font-display font-black text-sm tracking-tight">Agent Sandbox</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  </div>
                  <span className="block text-[8px] font-mono uppercase tracking-widest text-gray-500 font-extrabold">Two Agents Lab Assistant</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleClearHistory}
                  className={`p-1.5 rounded-md hover:bg-gray-500/10 transition-colors text-gray-550 hover:text-rose-500 cursor-pointer`}
                  title="Clear chat log"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className={`p-1.5 rounded-md hover:bg-gray-500/10 transition-colors text-gray-550 hover:text-violet-500 cursor-pointer`}
                  title="Minimize chat"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Middle: Chat Log Container */}
            <div className={`flex-1 p-4 overflow-y-auto space-y-4 ${
              isDarkMode ? "bg-black/35" : "bg-gray-50/50"
            }`} id="chat-messages-viewport">
              {messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"} max-w-full`}
                >
                  <div className="flex items-center gap-1.5 mb-1 max-w-full">
                    <span className={`text-[8.5px] font-mono uppercase font-bold tracking-wider ${
                      isDarkMode ? "text-gray-500" : "text-gray-450"
                    }`}>
                      {msg.sender === "user" ? "You" : "🤖 Lab Agent"}
                    </span>
                    <span className="text-[8px] font-mono text-gray-550">{msg.timestamp}</span>
                  </div>

                  {msg.isCode ? (
                    <div className="p-3.5 rounded-lg border w-full text-left font-mono text-[10px] bg-black/60 border-zinc-900 text-emerald-400 overflow-x-auto whitespace-pre">
                      <code>{msg.text}</code>
                    </div>
                  ) : (
                    <div className={`p-3 rounded-xl text-left text-xs leading-relaxed max-w-[85%] whitespace-pre-wrap transition-colors break-words ${
                      msg.sender === "user"
                        ? "bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-tr-none shadow-sm"
                        : isDarkMode
                          ? "bg-[#0b0b0f] border border-[#14141a]/80 text-gray-200 rounded-tl-none"
                          : "bg-white border border-gray-200 text-gray-800 rounded-tl-none shadow-sm"
                    }`}>
                      {msg.text}
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex flex-col items-start">
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className={`text-[8.5px] font-mono uppercase font-bold tracking-wider ${
                      isDarkMode ? "text-gray-500" : "text-gray-400"
                    }`}>
                      🤖 Lab Agent
                    </span>
                    <span className="text-[8px] font-mono text-gray-500">writing...</span>
                  </div>
                  <div className={`p-3.5 rounded-xl rounded-tl-none border flex items-center gap-1 ${
                    isDarkMode ? "bg-[#0b0b0f] border-[#14141a] text-white" : "bg-white border-gray-200"
                  }`}>
                    <span className="w-1.5 h-1.5 bg-violet-500 rounded-full animate-bounce" />
                    <span className="w-1.5 h-1.5 bg-violet-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 bg-fuchsia-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestions Shelf */}
            <div className={`px-4 py-2 flex gap-1.5 overflow-x-auto border-t shrink-0 select-none no-scrollbar ${
              isDarkMode ? "bg-black/90 border-[#141418]/60" : "bg-white/90 border-gray-200/80"
            }`}>
              {suggestions.map((sug, i) => (
                <button
                  key={i}
                  onClick={() => handleSendMessage(sug.text)}
                  className={`text-[10px] px-2.5 py-1.5 rounded-full border whitespace-nowrap cursor-pointer transition-all active:scale-95 shrink-0 ${
                    isDarkMode 
                      ? "bg-black/60 border-[#141418] hover:border-violet-500/40 text-gray-400 hover:text-violet-300" 
                      : "bg-gray-100/80 border-gray-250 hover:bg-gray-100 hover:border-violet-400 text-gray-650 hover:text-violet-750"
                  }`}
                >
                  {sug.text}
                </button>
              ))}
            </div>

            {/* Bottom Input Area */}
            <div className={`p-3 border-t shrink-0 ${
              isDarkMode ? "bg-black border-[#14141d]" : "bg-white border-gray-200"
            }`}>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2"
              >
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Ask a technical question..."
                    className={`w-full px-3 py-2 text-xs rounded-lg focus:outline-none focus:ring-1 pr-8 tracking-wide ${
                      isDarkMode 
                        ? "bg-black border-[#14141a]/95 text-white border focus:border-violet-500 focus:ring-violet-500/20 placeholder-gray-700" 
                        : "bg-gray-50 border border-gray-350 focus:border-violet-650 text-gray-950 focus:ring-violet-600/20 placeholder-gray-400"
                    }`}
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2.5 text-gray-650">
                    <Smile className="w-3.5 h-3.5 select-none" />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={!inputText.trim()}
                  className={`p-2 rounded-lg bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white cursor-pointer active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed transition-all`}
                  title="Send message"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
              <div className="mt-1.5 flex items-center justify-between text-[8px] font-mono text-gray-500 select-none px-1">
                <span>Frontend logic fully simulated</span>
                <span className="flex items-center gap-0.5"><Zap className="w-2 h-2 text-violet-500" /> Caches safe</span>
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
