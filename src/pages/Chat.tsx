import React, { useEffect, useRef, useState } from "react";
import { Menu } from "lucide-react";
import reddataLogo from "@/assets/reddata-logo.png";
import { ConversationSidebar } from "@/components/chat/ConversationSidebar";
import { useChatConversation } from "@/hooks/useChatConversation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

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
    "Olá, eu sou o Assistente RedData.\n\nIA 100% proprietária da RedMaxx, e posso ser executada dentro da sua infraestrutura, com segurança total de seus dados.\n\nPor hoje, como posso te ajudar?"
};

export default function RedDataChatPage() {
  const {
    conversationId,
    messages: savedMessages,
    setMessages: setSavedMessages,
    isLoggedIn,
    userId,
    createNewConversation,
    saveMessage,
    loadConversation,
    startNewConversation
  } = useChatConversation();

  const [messages, setMessages] = useState<Message[]>([initialAssistantMessage]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (endRef.current) {
      endRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [messages.length, isLoading]);

  useEffect(() => {
    if (savedMessages.length > 0) {
      setMessages(savedMessages);
    } else {
      setMessages([initialAssistantMessage]);
    }
  }, [savedMessages]);

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

    // Criar ou usar conversa existente (apenas para usuários logados)
    let currentConvId = conversationId;
    if (isLoggedIn && userId && !conversationId) {
      currentConvId = await createNewConversation(text);
      if (!currentConvId) {
        setIsLoading(false);
        return;
      }
    }

    // Salvar mensagem do usuário
    if (isLoggedIn && currentConvId) {
      await saveMessage(currentConvId, "user", text);
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/reddata-chat`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`
        },
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

      // Salvar resposta do assistente
      if (isLoggedIn && currentConvId) {
        await saveMessage(currentConvId, "assistant", answerText);
      }
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

  const handleSelectConversation = async (convId: string) => {
    await loadConversation(convId);
    setIsSidebarOpen(false);
  };

  const handleNewConversation = () => {
    startNewConversation();
    setMessages([initialAssistantMessage]);
    setIsSidebarOpen(false);
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };


  return (
    <div className="min-h-screen bg-[#F8F8F9] flex">
      {/* Sidebar Desktop */}
      {isLoggedIn && (
        <aside className="hidden lg:block w-64 border-r border-gray-200 bg-white">
          <ConversationSidebar
            currentConversationId={conversationId}
            onSelectConversation={handleSelectConversation}
            onNewConversation={handleNewConversation}
          />
        </aside>
      )}

      {/* Conteúdo Principal */}
      <div className="flex-1 flex flex-col pt-16 sm:pt-20">
        <div className="mx-auto w-full max-w-6xl px-3 sm:px-4 lg:px-6 py-2 sm:py-3 space-y-2 sm:space-y-2.5 flex-1 flex flex-col">
          
          {/* Header interno */}
          <header className="bg-white border border-gray-200 rounded-xl sm:rounded-2xl shadow-sm px-3 sm:px-4 py-2 sm:py-3 flex items-center justify-between gap-2 sm:gap-3">
            {/* Menu Mobile */}
            {isLoggedIn && (
              <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="lg:hidden">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="p-0 w-80">
                  <ConversationSidebar
                    currentConversationId={conversationId}
                    onSelectConversation={handleSelectConversation}
                    onNewConversation={handleNewConversation}
                  />
                </SheetContent>
              </Sheet>
            )}
          <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
            <img 
              src={reddataLogo} 
              alt="RedData" 
              className="h-7 sm:h-8 lg:h-10 w-auto object-contain flex-shrink-0"
            />
            <div className="min-w-0 flex-1">
              <h1 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-900 truncate">
                Assistente RedData – IA Soberana
              </h1>
              <p className="text-[10px] sm:text-xs lg:text-sm text-gray-500 truncate">
                IA 100% proprietária, executada dentro da sua infraestrutura.
              </p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-50 text-[9px] sm:text-[10px] lg:text-xs text-green-700 border border-green-100 flex-shrink-0">
            <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="hidden sm:inline">Online</span>
          </span>
        </header>

        {/* Banner inicial */}
        <section className="bg-white border border-gray-200 rounded-xl sm:rounded-2xl shadow-sm px-3 sm:px-4 py-3 sm:py-4 lg:px-5 lg:py-5">
          <h2 className="text-sm sm:text-sm lg:text-base font-semibold text-gray-900">
            Converse com o RedData
          </h2>
          <p className="text-[11px] sm:text-xs lg:text-sm text-gray-600 mt-1 leading-relaxed">
            Faça perguntas em linguagem natural sobre dados, indicadores e cenários 
            de gestão. O RedData responde usando seu LLM interno, com total 
            privacidade e soberania.
          </p>
          <span className="inline-flex items-center w-fit mt-2 sm:mt-3 px-2.5 sm:px-3 py-1 rounded-full bg-gray-50 border border-gray-200 text-[9px] sm:text-[10px] lg:text-xs text-gray-600">
            🔒 Processamento local, sem modelos externos
          </span>
        </section>

        {/* Chat principal */}
        <section className="bg-white border border-gray-200 rounded-xl sm:rounded-2xl shadow-sm flex flex-col h-[calc(100vh-280px)] sm:h-[65vh] min-h-[360px]">
          
          {/* Lista de mensagens */}
          <div className="flex-1 overflow-y-auto px-3 sm:px-3 lg:px-5 pt-3 sm:pt-4 pb-2 space-y-2.5 sm:space-y-3">
            {messages.map((msg) => {
              const isUser = msg.role === "user";
              return (
                <div
                  key={msg.id}
                  className={`flex w-full ${isUser ? "justify-end" : "justify-start"}`}
                >
                  {!isUser && (
                    <div className="flex mr-1.5 sm:mr-2">
                      <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#D8232A] flex items-center justify-center text-[10px] sm:text-xs font-semibold text-white shadow-sm flex-shrink-0">
                        RD
                      </div>
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] sm:max-w-[80%] text-xs sm:text-sm whitespace-pre-wrap ${
                      isUser
                        ? "bg-red-50 text-gray-900 rounded-2xl rounded-br-sm shadow-sm px-2.5 sm:px-3 py-2"
                        : "bg-white text-gray-900 border border-gray-200 rounded-2xl rounded-bl-sm shadow-sm px-2.5 sm:px-3 py-2"
                    }`}
                  >
                    {!isUser && msg.id === "welcome" && (
                      <div className="mb-1 text-[9px] sm:text-[10px] uppercase tracking-wide text-gray-400">
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
                <div className="flex mr-1.5 sm:mr-2">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#D8232A] flex items-center justify-center text-[10px] sm:text-xs font-semibold text-white shadow-sm flex-shrink-0">
                    RD
                  </div>
                </div>
                <div className="max-w-[85%] sm:max-w-[80%] bg-white text-gray-500 border border-gray-200 rounded-2xl rounded-bl-sm shadow-sm px-2.5 sm:px-3 py-2 text-[11px] sm:text-xs flex items-center gap-2">
                  <span className="hidden sm:inline">RedData está analisando sua pergunta</span>
                  <span className="sm:hidden">Analisando...</span>
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

          {/* Input */}
          <form
            className="border-t border-gray-200 bg-gray-50 px-2.5 sm:px-3 lg:px-5 py-2 flex items-end gap-1.5 sm:gap-2"
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
              className="flex-1 resize-none bg-white border border-gray-200 rounded-lg sm:rounded-xl px-2.5 sm:px-3 py-2 text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />

            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="bg-[#D8232A] text-white rounded-lg sm:rounded-xl px-2.5 sm:px-3 h-9 sm:h-10 flex items-center justify-center text-sm font-medium hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
            >
              ➤
            </button>
          </form>
        </section>

        {/* Selo */}
        <div className="flex flex-col sm:flex-row justify-between items-center text-[9px] sm:text-[10px] lg:text-xs text-gray-500 px-1 gap-1 sm:gap-0">
          <span className="text-center sm:text-left">🔒 IA soberana • processamento dentro do cliente</span>
          <span className="text-center sm:text-right">RedData • Plataforma de Big Data & IA da RedMaxx</span>
        </div>
      </div>
    </div>
  );
}
