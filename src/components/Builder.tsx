"use client";

import { useCallback, useEffect, useState } from "react";
import { loadChats, newChat, saveChats, type Chat } from "@/lib/chat-store";
import { ChatLab } from "./ChatLab";
import { HistoryRail } from "./HistoryRail";
import { PromptCard } from "./PromptCard";
import { PromptLab } from "./PromptLab";

export function Builder() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [panel, setPanel] = useState(false);
  const [history, setHistory] = useState(false);

  useEffect(() => {
    const loaded = loadChats();
    if (loaded.length) {
      setChats(loaded);
      setActiveId(loaded[0]!.id);
    } else {
      const fresh = newChat();
      setChats([fresh]);
      setActiveId(fresh.id);
    }
  }, []);

  useEffect(() => {
    if (chats.length) saveChats(chats);
  }, [chats]);

  const patchChat = useCallback((id: string, fn: (chat: Chat) => Chat) => {
    setChats((list) => list.map((c) => (c.id === id ? fn(c) : c)));
  }, []);

  function startNew() {
    const fresh = newChat();
    setChats((list) => [fresh, ...list]);
    setActiveId(fresh.id);
    setHistory(false);
  }

  function remove(ids: string[]) {
    setChats((list) => {
      const left = list.filter((c) => !ids.includes(c.id));
      if (!left.length) {
        const fresh = newChat();
        setActiveId(fresh.id);
        return [fresh];
      }
      if (activeId && ids.includes(activeId)) setActiveId(left[0]!.id);
      return left;
    });
  }

  function clearAll() {
    const fresh = newChat();
    setChats([fresh]);
    setActiveId(fresh.id);
  }

  const active = chats.find((c) => c.id === activeId) ?? null;

  return (
    <div className="flex h-screen overflow-hidden bg-prompty-inkPanel text-prompty-inkText">
      <aside className="hidden w-[252px] shrink-0 border-r border-prompty-line bg-white text-prompty-ink lg:block">
        <HistoryRail
          chats={chats}
          activeId={activeId}
          onSelect={setActiveId}
          onNew={startNew}
          onDelete={remove}
          onClear={clearAll}
        />
      </aside>

      {history ? (
        <div className="fixed inset-0 z-40 flex lg:hidden">
          <div className="w-[280px] border-r border-prompty-line bg-white text-prompty-ink">
            <HistoryRail
              chats={chats}
              activeId={activeId}
              onSelect={(id) => {
                setActiveId(id);
                setHistory(false);
              }}
              onNew={startNew}
              onDelete={remove}
              onClear={clearAll}
              onClose={() => setHistory(false)}
            />
          </div>
          <div className="flex-1 bg-prompty-ink/50" onClick={() => setHistory(false)} />
        </div>
      ) : null}

      <div className="flex min-w-0 flex-1 flex-col">
        {active ? (
          <ChatLab
            key={active.id}
            chat={active}
            onPatch={patchChat}
            onOpenPanel={() => setPanel(true)}
            onOpenHistory={() => setHistory(true)}
          />
        ) : null}
      </div>

      <aside className="hidden w-[300px] shrink-0 flex-col border-l border-prompty-line bg-prompty-page text-prompty-ink lg:flex">
        <PromptCard />
      </aside>

      {panel ? (
        <div className="fixed inset-0 z-40 flex justify-end">
          <div className="flex-1 bg-prompty-ink/50" onClick={() => setPanel(false)} />
          <aside className="flex w-full flex-col border-l border-prompty-inkLine bg-prompty-page text-prompty-ink sm:w-[430px]">
            <div className="flex shrink-0 items-center gap-2 border-b border-prompty-line bg-white px-3 py-2">
              <p className="mr-auto text-[12px] font-semibold">Fine control</p>
              <button
                type="button"
                onClick={() => setPanel(false)}
                className="grid h-7 w-7 place-items-center rounded-full border border-prompty-line text-[12px] text-prompty-muted"
              >
                ✕
              </button>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto">
              <PromptLab embedded />
            </div>
          </aside>
        </div>
      ) : null}
    </div>
  );
}