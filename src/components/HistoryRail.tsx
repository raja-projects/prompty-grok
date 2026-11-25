"use client";

import { useState } from "react";
import type { Chat } from "@/lib/chat-store";

export function HistoryRail({
  chats,
  activeId,
  onSelect,
  onNew,
  onDelete,
  onClear,
  onClose,
}: {
  chats: Chat[];
  activeId: string | null;
  onSelect: (id: string) => void;
  onNew: () => void;
  onDelete: (ids: string[]) => void;
  onClear: () => void;
  onClose?: () => void;
}) {
  const [picking, setPicking] = useState(false);
  const [picked, setPicked] = useState<string[]>([]);

  function toggle(id: string) {
    setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));
  }

  function exit() {
    setPicking(false);
    setPicked([]);
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-1.5 px-2.5 py-2.5">
        <span className="grid h-7 w-7 place-items-center rounded-md bg-prompty-accent text-[13px] text-white">
          ◍
        </span>
        <p className="mr-auto text-[13px] font-bold">Prompty</p>
        {onClose ? (
          <button
            type="button"
            onClick={onClose}
            className="grid h-7 w-7 place-items-center rounded-full border border-prompty-line text-[12px] text-prompty-muted lg:hidden"
          >
            ✕
          </button>
        ) : null}
      </div>

      <div className="px-2.5">
        <button
          type="button"
          onClick={() => {
            onNew();
            exit();
          }}
          className="w-full rounded-lg bg-prompty-ink px-3 py-2 text-[12px] font-semibold text-white"
        >
          New scene
        </button>
      </div>

      <div className="mt-3 flex items-center gap-1 px-2.5">
        <p className="mr-auto text-[9.5px] font-semibold uppercase tracking-[0.14em] text-prompty-muted">
          History
        </p>
        {chats.length ? (
          <button
            type="button"
            onClick={() => (picking ? exit() : setPicking(true))}
            className="text-[10.5px] text-prompty-accent"
          >
            {picking ? "done" : "select"}
          </button>
        ) : null}
      </div>

      {picking ? (
        <div className="mt-1 flex flex-wrap gap-1 px-2.5">
          <button
            type="button"
            onClick={() => setPicked(picked.length === chats.length ? [] : chats.map((c) => c.id))}
            className="rounded-pill border border-prompty-line px-2 py-1 text-[10.5px]"
          >
            {picked.length === chats.length ? "none" : "all"}
          </button>
          <button
            type="button"
            disabled={!picked.length}
            onClick={() => {
              onDelete(picked);
              exit();
            }}
            className="rounded-pill bg-prompty-ink px-2 py-1 text-[10.5px] font-semibold text-white disabled:opacity-40"
          >
            delete {picked.length || ""}
          </button>
          <button
            type="button"
            onClick={() => {
              onClear();
              exit();
            }}
            className="rounded-pill border border-prompty-line px-2 py-1 text-[10.5px]"
          >
            clear all
          </button>
        </div>
      ) : null}

      <div className="mt-1 min-h-0 flex-1 space-y-0.5 overflow-y-auto px-1.5 pb-3">
        {chats.length ? (
          chats.map((chat) => {
            const on = picked.includes(chat.id);
            return (
              <button
                key={chat.id}
                type="button"
                onClick={() => (picking ? toggle(chat.id) : onSelect(chat.id))}
                className={`flex w-full items-center gap-1.5 rounded-lg px-2 py-1.5 text-left text-[12px] ${
                  chat.id === activeId && !picking ? "bg-prompty-accentSoft font-medium" : "hover:bg-prompty-page"
                }`}
              >
                {picking ? (
                  <span
                    className={`grid h-3.5 w-3.5 shrink-0 place-items-center rounded-[3px] border text-[9px] ${
                      on ? "border-prompty-accent bg-prompty-accent text-white" : "border-prompty-line"
                    }`}
                  >
                    {on ? "✓" : ""}
                  </span>
                ) : null}
                <span className="truncate">{chat.title || "New scene"}</span>
              </button>
            );
          })
        ) : (
          <p className="px-2 text-[11px] text-prompty-muted">Nothing yet</p>
        )}
      </div>
    </div>
  );
}