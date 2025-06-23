import { Chat } from "@/types/chats";

export const getChatsFromStorage = (): Chat[] | null => {
  if (typeof window === "undefined") return null;
  const data = localStorage.getItem("chats");
  return data ? JSON.parse(data) : [];
};

export const saveChatsToStorage = (chats: Chat[]) => {
  if (typeof window === "undefined") return;
  localStorage.setItem("chats", JSON.stringify(chats));
};
