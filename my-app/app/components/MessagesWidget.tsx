"use client";

import { useState } from "react";

interface Message {
  id: number;
  sender: string;
  text: string;
  time: string;
  unread: boolean;
}

const sampleMessages: Message[] = [
  { id: 1, sender: "Alice", text: "Hey, how's the project going?", time: "2m ago", unread: true },
  { id: 2, sender: "Bob", text: "Can you review my PR?", time: "15m ago", unread: true },
  { id: 3, sender: "Carol", text: "Meeting at 3pm today", time: "1h ago", unread: false },
  { id: 4, sender: "David", text: "Thanks for your help!", time: "2h ago", unread: false },
];

export default function MessagesWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(sampleMessages);

  const unreadCount = messages.filter((m) => m.unread).length;

  const markAsRead = (id: number) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, unread: false } : m))
    );
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Messages Panel */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="p-3 bg-blue-600 text-white font-semibold flex justify-between items-center">
            <span>Messages</span>
            <span className="text-sm opacity-80">{unreadCount} unread</span>
          </div>
          <div className="max-h-80 overflow-y-auto">
            {messages.map((message) => (
              <div
                key={message.id}
                onClick={() => markAsRead(message.id)}
                className={`p-3 border-b border-gray-100 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors relative ${
                  message.unread ? "bg-blue-50 dark:bg-blue-900/20" : ""
                }`}
              >
                <div className="flex justify-between items-start">
                  <span className="font-medium text-gray-900 dark:text-gray-100">
                    {message.sender}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {message.time}
                    </span>
                    {message.unread && (
                      <div className="w-2 h-2 bg-blue-600 rounded-full" />
                    )}
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 truncate">
                  {message.text}
                </p>
              </div>
            ))}
          </div>
          <div className="p-2 bg-gray-50 dark:bg-gray-900 text-center">
            <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
              View all messages
            </button>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-105"
        aria-label="Toggle messages"
      >
        {isOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>
        )}
        {unreadCount > 0 && !isOpen && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>
    </div>
  );
}
