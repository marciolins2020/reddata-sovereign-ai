import { useEffect, useRef, useState } from "react";
import { Menu, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ConversationSidebar } from "@/components/chat/ConversationSidebar";
import { useChatConversation } from "@/hooks/useChatConversation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Header } from "@/components/sections/Header";
import { UserProfileDropdown } from "@/components/chat/UserProfileDropdown";
import redmaxxLogo from "@/assets/redmaxx-logo-header.jpg";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: string;
};

const getWelcomeMessage = (tokens: number, isLoggedIn: boolean): Message => ({
  id: "welcome",
  role: "assistant",
  createdAt: new Date().toISOString(),
  content: isLoggedIn 
    ? `👋 Bem-vindo ao RedData AI! Você tem ${tokens.toLocaleString()} tokens disponíveis.`
    : `👋 Bem-vindo ao RedData AI! Você tem ${tokens.toLocaleString()} tokens disponíveis.\n\nQuer ter mais tokens? Cadastre-se!`
});

export default function RedDataChatPage() {
  const navigate = useNavigate();
  const {
    conversationId,
    messages: savedMessages,
    isLoggedIn,
    userId,
    createNewConversation,
    saveMessage,
    loadConversation,
    startNewConversation
  } = useChatConversation();

  const [messages, setMessages] = useState<Message[]>([getWelcomeMessage(1000, false)]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    setTimeout(() => {
      chatRef.current?.scrollTo({
        top: chatRef.current.scrollHeight,
        behavior: "smooth"
      });
    }, 70);
  };

  useEffect(scrollToBottom, [messages, isLoading]);

  useEffect(() => {
    if (savedMessages.length > 0) {
      setMessages(savedMessages);
    } else {
      const tokens = isLoggedIn ? 10000 : 1000;
      setMessages([getWelcomeMessage(tokens, isLoggedIn)]);
    }
  }, [savedMessages, isLoggedIn]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: `u-${Date.now()}`,
      role: "user",
      content: input,
      createdAt: new Date().toISOString()
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);

    let currentConvId = conversationId;
    
    if (isLoggedIn && userId && !conversationId) {
      currentConvId = await createNewConversation(input);
      if (!currentConvId) {
        setIsLoading(false);
        return;
      }
    }

    if (isLoggedIn && currentConvId) {
      await saveMessage(currentConvId, "user", input);
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

      const aiMessage: Message = {
        id: `a-${Date.now()}`,
        role: "assistant",
        content: data.answer || data.message || "Desculpe, não consegui processar sua mensagem.",
        createdAt: new Date().toISOString()
      };

      const finalMessages = [...updatedMessages, aiMessage];
      setMessages(finalMessages);

      if (isLoggedIn && currentConvId) {
        await saveMessage(currentConvId, "assistant", aiMessage.content);
      }
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
      const errorMsg: Message = {
        id: `e-${Date.now()}`,
        role: "assistant",
        content: "Desculpe, houve um erro. Tente novamente.",
        createdAt: new Date().toISOString()
      };
      setMessages([...updatedMessages, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectConversation = (convId: string) => {
    loadConversation(convId);
  };

  const handleNewConversation = () => {
    startNewConversation();
    setMessages([getWelcomeMessage(isLoggedIn ? 10000 : 1000, isLoggedIn)]);
  };

  return (
    <>
      {/* Mobile Layout */}
      <div className="md:hidden chat-wrapper">
        <div className="chat-header">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="absolute left-2 top-2.5 z-10">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-[280px]">
              <ConversationSidebar 
                onSelectConversation={handleSelectConversation}
                onNewConversation={handleNewConversation}
                currentConversationId={conversationId}
              />
            </SheetContent>
          </Sheet>
          
          <div className="flex flex-col items-center justify-center gap-1">
            <h1 className="text-sm font-semibold">Assistente RedData</h1>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] text-muted-foreground">IA Soberana by RedMaxx®</span>
              <img src={redmaxxLogo} alt="RedMaxx" className="h-5 w-auto rounded-md" />
            </div>
          </div>
          
          {!isLoggedIn && (
            <Button 
              variant="default" 
              size="sm" 
              onClick={() => navigate('/auth')}
              className="absolute right-2 top-2 z-10 text-xs h-7 px-3"
            >
              Login
            </Button>
          )}
        </div>

        <div className="chat-messages" ref={chatRef}>
          {messages.map((msg, index) => (
            <div
              key={msg.id || index}
              className={`chat-bubble ${msg.role === "user" ? "chat-user" : "chat-ai"} animate-fade-in`}
            >
              {msg.content}
            </div>
          ))}

          {isLoading && (
            <div className="chat-ai animate-fade-in">
              <div className="typing-indicator">
                <span></span><span></span><span></span>
              </div>
            </div>
          )}
        </div>

        <div className="chat-input-bar">
          <input
            className="chat-input"
            placeholder="Pergunte ao RedData..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button className="chat-send-btn" onClick={sendMessage}>➤</button>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:flex chat-wrapper">
        <div className="chat-sidebar-desktop">
          <div className="p-4 border-b space-y-2">
            {!isLoggedIn && (
              <Button 
                onClick={() => navigate('/auth')}
                className="w-full bg-primary hover:bg-primary/90"
                size="sm"
              >
                Login / Cadastro
              </Button>
            )}
            <Button 
              onClick={handleNewConversation}
              className="w-full bg-primary hover:bg-primary/90"
              size="sm"
            >
              <Plus className="h-4 w-4 mr-2" />
              Nova Conversa
            </Button>
          </div>
          <ConversationSidebar 
            onSelectConversation={handleSelectConversation}
            onNewConversation={handleNewConversation}
            currentConversationId={conversationId}
          />
        </div>

        <div className="chat-main-area">
          <div className="chat-header-desktop">
            <div className="chat-header-left">
              <h1 className="font-semibold text-base">Assistente RedData</h1>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">IA Soberana by RedMaxx®</span>
                <img src={redmaxxLogo} alt="RedMaxx" className="h-8 w-auto rounded-lg" />
              </div>
            </div>
            <div className="chat-header-right flex items-center gap-3">
              {isLoggedIn && (
                <>
                  <span className="text-sm text-muted-foreground">10k tokens</span>
                  <UserProfileDropdown />
                </>
              )}
            </div>
          </div>

          <div className="chat-messages" ref={chatRef}>
            {messages.map((msg, index) => (
              <div
                key={msg.id || index}
                className={`chat-bubble ${msg.role === "user" ? "chat-user" : "chat-ai"} animate-fade-in`}
              >
                {msg.content}
              </div>
            ))}

            {isLoading && (
              <div className="chat-ai animate-fade-in">
                <div className="typing-indicator">
                  <span></span><span></span><span></span>
                </div>
              </div>
            )}
          </div>

          <div className="chat-input-bar">
            <input
              className="chat-input"
              placeholder="Pergunte ao RedData..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button className="chat-send-btn" onClick={sendMessage}>➤</button>
          </div>
        </div>
      </div>
    </>
  );
}
