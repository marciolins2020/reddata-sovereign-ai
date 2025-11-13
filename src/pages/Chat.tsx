import React, { useEffect, useRef, useState } from "react";
import reddataLogo from "@/assets/reddata-logo.png";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: string;
};

const initialAssistantMessage: Message = {
  id: "welcome",
  role: "assistant",
  createdAt: new Date().toISOString(),
  content:
    "Olá, eu sou o Assistente RedData.\n\nIA 100% proprietária, executada dentro da sua infraestrutura.\nComo posso te ajudar hoje?"
};

export default function RedDataChatPage() {
  const [messages, setMessages] = useState<Message[]>([initialAssistantMessage]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (endRef.current) {
      endRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [messages.length, isLoading]);

  const handleSend = async (fromSuggestion?: string) => {
    const text = (fromSuggestion ?? input).trim();
    if (!text || isLoading) return;

    const userMessage: Message = {
      id: `u-${Date.now()}`,
      role: "user",
      content: text,
      createdAt: new Date().toISOString()
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);

    try {
      // TODO: Ajustar para endpoint real do RedData LLM
      const response = await fetch("/api/reddata/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages.map(({ role, content }) => ({ role, content }))
        })
      });

      if (!response.ok) {
        throw new Error("Erro da API");
      }

      const data = await response.json();
      const answerText: string = data.answer ?? "Resposta recebida do RedData.";

      const assistantMessage: Message = {
        id: `a-${Date.now()}`,
        role: "assistant",
        content: answerText,
        createdAt: new Date().toISOString()
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error(error);
      const errorMessage: Message = {
        id: `err-${Date.now()}`,
        role: "assistant",
        content:
          "Não consegui processar sua solicitação agora. Tente novamente em alguns instantes.",
        createdAt: new Date().toISOString()
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const suggestions = [
    "📊 Gerar análise de indicadores",
    "🧠 Explicar um insight do painel",
    "🏛️ Simular cenário de arrecadação",
    "⚙️ Perguntar sobre integrações de dados"
  ];

  const handleSuggestionClick = (s: string) => {
    handleSend(s);
  };

  return (
    <div className="min-h-screen bg-[#F8F8F9] pt-20">
      <div className="mx-auto max-w-6xl px-4 lg:px-6 py-6 lg:py-8 space-y-4">
        
        {/* Header interno */}
        <header className="bg-white border border-gray-200 rounded-2xl shadow-sm px-4 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <img 
              src={reddataLogo} 
              alt="RedData" 
              className="h-8 lg:h-10 w-auto object-contain"
            />
            <div>
              <h1 className="text-base lg:text-lg font-semibold text-gray-900">
                Assistente RedData – IA Soberana
              </h1>
              <p className="text-xs lg:text-sm text-gray-500">
                IA 100% proprietária, executada dentro da sua infraestrutura.
              </p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-50 text-[10px] lg:text-xs text-green-700 border border-green-100">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Online
          </span>
        </header>

        {/* Banner inicial */}
        <section className="bg-white border border-gray-200 rounded-2xl shadow-sm px-4 py-4 lg:px-5 lg:py-5">
          <h2 className="text-sm lg:text-base font-semibold text-gray-900">
            Converse com o RedData
          </h2>
          <p className="text-xs lg:text-sm text-gray-600 mt-1">
            Faça perguntas em linguagem natural sobre dados, indicadores e cenários 
            de gestão. O RedData responde usando seu LLM interno, com total 
            privacidade e soberania.
          </p>
          <span className="inline-flex items-center w-fit mt-3 px-3 py-1 rounded-full bg-gray-50 border border-gray-200 text-[10px] lg:text-xs text-gray-600">
            🔒 Processamento local, sem modelos externos
          </span>
        </section>

        {/* Chat principal */}
        <section className="bg-white border border-gray-200 rounded-2xl shadow-sm flex flex-col h-[65vh] min-h-[360px]">
          
          {/* Lista de mensagens */}
          <div className="flex-1 overflow-y-auto px-3 lg:px-5 pt-4 pb-2 space-y-3">
            {messages.map((msg) => {
              const isUser = msg.role === "user";
              return (
                <div
                  key={msg.id}
                  className={`flex w-full ${isUser ? "justify-end" : "justify-start"}`}
                >
                  {!isUser && (
                    <div className="flex mr-2">
                      <div className="w-9 h-9 rounded-full bg-[#D8232A] flex items-center justify-center text-xs font-semibold text-white shadow-sm">
                        RD
                      </div>
                    </div>
                  )}

                  <div
                    className={`max-w-[80%] text-sm whitespace-pre-wrap ${
                      isUser
                        ? "bg-red-50 text-gray-900 rounded-2xl rounded-br-sm shadow-sm px-3 py-2"
                        : "bg-white text-gray-900 border border-gray-200 rounded-2xl rounded-bl-sm shadow-sm px-3 py-2"
                    }`}
                  >
                    {!isUser && msg.id === "welcome" && (
                      <div className="mb-1 text-[10px] uppercase tracking-wide text-gray-400">
                        RedData • IA Soberana
                      </div>
                    )}
                    <p className="leading-relaxed">{msg.content}</p>
                  </div>
                </div>
              );
            })}

            {/* Digitando */}
            {isLoading && (
              <div className="flex w-full justify-start">
                <div className="flex mr-2">
                  <div className="w-9 h-9 rounded-full bg-[#D8232A] flex items-center justify-center text-xs font-semibold text-white shadow-sm">
                    RD
                  </div>
                </div>
                <div className="max-w-[80%] bg-white text-gray-500 border border-gray-200 rounded-2xl rounded-bl-sm shadow-sm px-3 py-2 text-xs flex items-center gap-2">
                  <span>RedData está analisando sua pergunta</span>
                  <span className="flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce [animation-delay:-0.2s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce [animation-delay:-0.1s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" />
                  </span>
                </div>
              </div>
            )}

            <div ref={endRef} />
          </div>

          {/* Sugestões */}
          <div className="px-3 lg:px-5 pb-2 space-y-2 border-t border-gray-100 bg-gray-50">
            <p className="text-[11px] lg:text-xs text-gray-500">
              Comece com uma destas perguntas:
            </p>
            <div className="flex flex-wrap gap-2">
              {suggestions.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => handleSuggestionClick(s)}
                  className="inline-flex items-center px-3 py-1.5 rounded-full bg-white border border-gray-200 text-[11px] lg:text-xs text-gray-700 hover:border-red-500 hover:text-red-600 transition"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <form
            className="border-t border-gray-200 bg-gray-50 px-3 lg:px-5 py-2 flex items-end gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
          >
            <textarea
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Pergunte qualquer coisa ao RedData…"
              className="flex-1 resize-none bg-white border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />

            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="bg-[#D8232A] text-white rounded-xl px-3 h-10 flex items-center justify-center text-sm font-medium hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ➤
            </button>
          </form>
        </section>

        {/* Selo */}
        <div className="flex justify-between items-center text-[10px] lg:text-xs text-gray-500 px-1">
          <span>🔒 IA soberana • processamento dentro do cliente</span>
          <span>RedData • Plataforma de Big Data & IA da RedMaxx</span>
        </div>
      </div>
    </div>
  );
}
