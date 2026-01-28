"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    MessageSquare, X, Send, Bot, User, Sparkles,
    ChevronDown, Phone, Briefcase, Zap, Info,
    MoreHorizontal, CornerDownRight
} from "lucide-react";
import ReactMarkdown from "react-markdown";

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            role: "assistant",
            content: "Selam! Ben Luxivolt'un Teknik Asistanıyım. Kurumsal enerji çözümlerimiz ve mühendislik hizmetlerimiz hakkında size nasıl yardımcı olabilirim?",
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        },
    ]);
    const [inputValue, setInputValue] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);
    const [showScrollButton, setShowScrollButton] = useState(false);

    const quickActions = [
        { label: "Trafo Bakımı", icon: <Zap size={14} />, query: "Trafo bakım hizmetleriniz nelerdir?" },
        { label: "Proje Teklifi", icon: <Briefcase size={14} />, query: "Yeni bir proje için teklif almak istiyorum." },
        { label: "İletişim", icon: <Phone size={14} />, query: "Adres ve telefon bilgilerinize ihtiyacım var." },
    ];

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen, isLoading]);

    useEffect(() => {
        const handleOpenChat = () => setIsOpen(true);
        window.addEventListener("openChatbot", handleOpenChat);
        return () => window.removeEventListener("openChatbot", handleOpenChat);
    }, []);

    const handleSendMessage = async (text) => {
        const messageText = typeof text === "string" ? text : inputValue;
        if (!messageText.trim() || isLoading) return;

        const userMessage = {
            role: "user",
            content: messageText,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages((prev) => [...prev, userMessage]);
        setInputValue("");
        setIsLoading(true);

        try {
            const response = await fetch("http://localhost:8000/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    message: userMessage.content,
                    conversation_history: messages.map(m => ({ role: m.role, content: m.content })),
                    use_rag: true
                }),
            });

            if (!response.ok) throw new Error("API hatası");

            const data = await response.json();
            setMessages((prev) => [...prev, {
                role: "assistant",
                content: data.response,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }]);
        } catch (error) {
            console.error("Chat error:", error);
            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    content: "Şu anda teknik bir aksaklık yaşıyorum. Lütfen [İletişim](#iletisim) sayfamızdan bize ulaşın.",
                    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-9999 font-sans">
            {/* Floating Action Button - Modern Pulse Design */}
            <AnimatePresence>
                {!isOpen && (
                    <motion.button
                        initial={{ scale: 0, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0, y: 20 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsOpen(true)}
                        className="group relative w-16 h-16 rounded-2xl bg-slate-900 border border-blue-500/30 flex items-center justify-center shadow-[0_0_50px_-12px_rgba(59,130,246,0.5)] overflow-hidden"
                    >
                        {/* Ambient Background animation */}
                        <div className="absolute inset-0 bg-linear-to-tr from-blue-600/20 to-cyan-400/20 group-hover:opacity-100 opacity-50 transition-opacity" />
                        <motion.div
                            animate={{
                                rotate: 360,
                                opacity: [0.1, 0.3, 0.1]
                            }}
                            transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                            className="absolute w-24 h-24 bg-blue-500/20 blur-2xl rounded-full"
                        />
                        <MessageSquare size={28} className="text-blue-400 relative z-10 group-hover:text-white transition-colors" />

                        {/* Online Indicator */}
                        <span className="absolute top-4 right-4 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-900 z-20" />
                    </motion.button>
                )}
            </AnimatePresence>

            {/* Main Chat Interface */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 40, scale: 0.95, filter: "blur(10px)" }}
                        animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                        exit={{ opacity: 0, y: 40, scale: 0.95, filter: "blur(10px)" }}
                        className="w-[420px] max-w-[95vw] h-[650px] max-h-[85vh] flex flex-col rounded-4xl overflow-hidden border border-white/10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] backdrop-blur-3xl bg-slate-950/90"
                    >
                        {/* Premium Header */}
                        <div className="relative p-6 bg-linear-to-b from-white/5 to-transparent border-b border-white/5 space-y-1">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="relative">
                                        <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-blue-600 to-indigo-700 p-px">
                                            <div className="w-full h-full rounded-2xl bg-slate-950 flex items-center justify-center">
                                                <Bot size={24} className="text-blue-400" />
                                            </div>
                                        </div>
                                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-4 border-slate-950" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg text-white tracking-tight">Luxivolt AI</h3>
                                        <p className="text-xs text-blue-400 font-medium tracking-wide uppercase">Endüstriyel Çözüm Ortağı</p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-xl transition-all text-gray-400 hover:text-white">
                                        <X size={20} />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Chat History */}
                        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6 scroll-smooth scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                            {messages.map((msg, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                                >
                                    <div className={`flex flex-col gap-1.5 max-w-[85%] ${msg.role === "user" ? "items-end" : "items-start"}`}>
                                        <div className={`p-4 rounded-2xl shadow-xl ${msg.role === "user"
                                            ? "bg-linear-to-br from-blue-600 via-blue-700 to-indigo-800 text-white rounded-tr-none"
                                            : "bg-white/5 border border-white/10 text-slate-100 rounded-tl-none backdrop-blur-md"
                                            }`}>
                                            <div className="prose prose-invert prose-sm max-w-none prose-p:leading-relaxed prose-a:text-blue-400">
                                                <ReactMarkdown>{msg.content}</ReactMarkdown>
                                            </div>
                                        </div>
                                        <span className="text-[10px] text-slate-500 font-medium px-1 flex items-center gap-1">
                                            {msg.role === "assistant" && <CornerDownRight size={10} />}
                                            {msg.timestamp}
                                        </span>
                                    </div>
                                </motion.div>
                            ))}

                            {isLoading && (
                                <div className="flex justify-start items-end gap-3 translate-y-2">
                                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                                        <Bot size={18} className="text-blue-400 animate-pulse" />
                                    </div>
                                    <div className="flex gap-1.5 px-4 py-3 bg-white/5 rounded-2xl rounded-tl-none border border-white/10">
                                        <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1 }} className="w-2 h-2 bg-blue-500 rounded-full" />
                                        <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-2 h-2 bg-blue-500 rounded-full" />
                                        <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-2 h-2 bg-blue-500 rounded-full" />
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} className="h-2" />
                        </div>

                        {/* Quick Actions & Input Area */}
                        <div className="p-6 bg-linear-to-t from-black/20 to-transparent border-t border-white/5 space-y-4">
                            {/* Quick Action Pills */}
                            <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
                                {quickActions.map((action, i) => (
                                    <button
                                        key={i}
                                        onClick={() => handleSendMessage(action.query)}
                                        className="shrink-0 flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 rounded-full text-xs text-blue-300 transition-all hover:scale-105 active:scale-95 whitespace-nowrap"
                                    >
                                        {action.icon}
                                        {action.label}
                                    </button>
                                ))}
                            </div>

                            <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} className="relative group">
                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    placeholder="Bir mesaj yazın..."
                                    className="w-full bg-slate-900/50 border border-white/10 text-white text-sm rounded-2xl pl-5 pr-14 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all shadow-inner placeholder:text-slate-500"
                                />
                                <button
                                    type="submit"
                                    disabled={isLoading || !inputValue.trim()}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 w-11 h-11 bg-white flex items-center justify-center text-slate-950 rounded-xl hover:bg-blue-400 hover:text-white transition-all disabled:opacity-20 shadow-lg"
                                >
                                    <Send size={18} />
                                </button>
                            </form>

                            <div className="flex items-center justify-center gap-4 opacity-30">
                                <div className="h-px flex-1 bg-white/20" />
                                <span className="text-[10px] font-bold tracking-[0.2em] text-white uppercase italic">Luxivolt Engineering</span>
                                <div className="h-px flex-1 bg-white/20" />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.1); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255, 255, 255, 0.2); }

        .prose a { color: #60a5fa; text-decoration: underline; text-underline-offset: 4px; }
        .prose ul { padding-left: 1.25rem; margin-top: 0.5rem; margin-bottom: 0.5rem; }
        .prose li { margin-top: 0.25rem; margin-bottom: 0.25rem; }
        .prose strong { color: #fff; font-weight: 700; }
      `}</style>
        </div>
    );
}
