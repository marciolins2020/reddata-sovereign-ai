import { useEffect, useState } from "react";
import { Plus, MessageSquare, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface Conversation {
  id: string;
  title: string;
  created_at: string;
  updated_at: string;
}

interface ConversationSidebarProps {
  currentConversationId: string | null;
  onSelectConversation: (conversationId: string) => void;
  onNewConversation: () => void;
  onConversationsChange?: () => void;
}

export function ConversationSidebar({
  currentConversationId,
  onSelectConversation,
  onNewConversation,
  onConversationsChange
}: ConversationSidebarProps) {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadConversations = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("conversations")
        .select("*")
        .eq("user_id", user.id)
        .order("updated_at", { ascending: false });

      if (error) throw error;
      setConversations(data || []);
    } catch (error) {
      console.error("Erro ao carregar conversas:", error);
      toast.error("Erro ao carregar histórico");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadConversations();
  }, []);

  useEffect(() => {
    if (onConversationsChange) {
      loadConversations();
    }
  }, [onConversationsChange]);

  const handleDelete = async (conversationId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    
    try {
      const { error } = await supabase
        .from("conversations")
        .delete()
        .eq("id", conversationId);

      if (error) throw error;

      toast.success("Conversa excluída");
      loadConversations();
      
      if (currentConversationId === conversationId) {
        onNewConversation();
      }
    } catch (error) {
      console.error("Erro ao excluir conversa:", error);
      toast.error("Erro ao excluir conversa");
    }
  };

  return (
    <div className="w-full lg:w-64 bg-white border-r border-gray-200 flex flex-col h-full">
      <div className="p-4 border-b border-gray-200">
        <Button
          onClick={onNewConversation}
          className="w-full bg-[#D8232A] hover:bg-[#B01D23] text-white"
          size="sm"
        >
          <Plus className="h-4 w-4 mr-2" />
          Nova Conversa
        </Button>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-2 space-y-1">
          {isLoading ? (
            <div className="text-center py-8 text-sm text-gray-500">
              Carregando...
            </div>
          ) : conversations.length === 0 ? (
            <div className="text-center py-8 px-4">
              <MessageSquare className="h-8 w-8 mx-auto text-gray-400 mb-2" />
              <p className="text-sm text-gray-500">
                Nenhuma conversa ainda
              </p>
            </div>
          ) : (
            conversations.map((conversation) => (
              <div
                key={conversation.id}
                className={`
                  group relative flex items-start gap-2 p-3 rounded-lg cursor-pointer
                  transition-colors duration-150
                  ${currentConversationId === conversation.id
                    ? "bg-red-50 border border-[#D8232A]"
                    : "hover:bg-gray-50 border border-transparent"
                  }
                `}
                onClick={() => onSelectConversation(conversation.id)}
              >
                <MessageSquare className={`h-4 w-4 mt-0.5 flex-shrink-0 ${
                  currentConversationId === conversation.id
                    ? "text-[#D8232A]"
                    : "text-gray-400"
                }`} />
                
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium truncate ${
                    currentConversationId === conversation.id
                      ? "text-[#D8232A]"
                      : "text-gray-900"
                  }`}>
                    {conversation.title}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {format(new Date(conversation.updated_at), "dd MMM", { locale: ptBR })}
                  </p>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  className="opacity-0 group-hover:opacity-100 h-6 w-6 flex-shrink-0"
                  onClick={(e) => handleDelete(conversation.id, e)}
                >
                  <Trash2 className="h-3.5 w-3.5 text-gray-500 hover:text-red-600" />
                </Button>
              </div>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
