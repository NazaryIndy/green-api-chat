import { useState } from 'react';

import { ConnectForm } from '../../features/connect/ConnectForm.tsx';
import { ChatPanel } from '../../widgets/chat-panel/ChatPanel.tsx';
import { ChatSidebar } from '../../widgets/chat-sidebar/ChatSidebar';
import { useChatConnection } from './model/useChatConnection';
import { useChatSession } from './model/useChatSession';

export const ChatPage = () => {
  const connection = useChatConnection();

  const chat = useChatSession({
    credentials: connection.credentials,
    enabled: connection.isConnected,
  });

  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleCreateChat = (phone: string) => {
    const created = chat.createChat(phone);

    if (!created) {
      return false;
    }

    setIsChatOpen(true);

    return true;
  };

  const handleSelectChat = () => {
    setIsChatOpen(true);
  };

  const handleBack = () => {
    setIsChatOpen(false);
  };

  if (!connection.isConnected) {
    return (
      <div className="h-full w-full">
        <ConnectForm
          error={connection.error}
          isConnecting={connection.isConnecting}
          onConnect={connection.connect}
        />
      </div>
    );
  }

  return (
    <div className="h-full w-full">
      <div
        className="
          grid
          h-full
          w-full
          grid-cols-[320px_minmax(0,1fr)]
          overflow-hidden
          bg-white
          max-[700px]:block
        "
      >
        <ChatSidebar
          chat={chat.activeChat}
          messages={chat.messages}
          onCreateChat={handleCreateChat}
          onSelectChat={handleSelectChat}
          isChatOpen={isChatOpen}
        />

        <ChatPanel
          chat={chat.activeChat}
          messages={chat.messages}
          messageText={chat.messageText}
          isSending={chat.isSending}
          error={chat.error}
          messagesEndRef={chat.messagesEndRef}
          onBack={handleBack}
          onMessageChange={chat.setMessageText}
          isChatOpen={isChatOpen}
          onSend={() => void chat.handleSendMessage()}
        />
      </div>
    </div>
  );
};
