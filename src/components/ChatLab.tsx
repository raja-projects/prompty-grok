"use client";

import { useEffect, useRef, useState } from "react";
import { getActionById } from "@/lib/actions";
import { parseTurn } from "@/lib/chat-engine";
import { buildVariations } from "@/lib/variations";
import { getScene } from "@/lib/scene-store";
import { nextMsgId, type Chat } from "@/lib/chat-store";
import { relationshipBlocksIntimate, sceneHasUnder21 } from "@/lib/people";
import { PLACES } from "@/lib/places";
import { updateScene, useScene } from "@/lib/scene-store";
import { CopyButton } from "./CopyButton";
import { PromptCard } from "./PromptCard";

export function ChatLab({
  chat,
  onPatch,
  onOpenPanel,
  onOpenHistory,
}: {
  chat: Chat;
  onPatch: (id: string, fn: (chat: Chat) => Chat) => void;
  onOpenPanel: () => void;
  onOpenHistory: () => void;
}) {
  const scene = useScene();
  const [draft, setDraft] = useState("");
  const [thinking, setThinking] = useState(false);
  const undo = useRef<Chat["scene"][]>([]);
  const placeLock = useRef<string | null>(null);
  const endRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    updateScene(chat.scene);
  }, [chat.id]);

  useEffect(() => {
    onPatch(chat.id, (c) => ({ ...c, scene }));
  }, [scene]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [chat.messages.length, thinking]);

  const under21 = sceneHasUnder21(scene.people, scene.peopleCount);
  const blocked = relationshipBlocksIntimate(scene.relationship);
  const action = getActionById(scene.actionId);
  const place = PLACES.find((p) => p.id === scene.placeId);

  function send(text: string) {
    const value = text.trim();
    if (!value || thinking) return;

    undo.current = [...undo.current.slice(-19), scene];
    setDraft("");
    setThinking(true);

    const result = parseTurn(value, scene, chat.known);
    if (result.placeId) placeLock.current = result.placeId;
    if (placeLock.current && !result.filled.place) result.filled.place = true;

    onPatch(chat.id, (c) => ({
      ...c,
      title: c.title || value.slice(0, 46),
      known: result.filled,
      messages: [...c.messages, { id: nextMsgId(), role: "user", text: value }],
    }));

    window.setTimeout(() => {
      for (const step of result.steps) {
        updateScene((prev) => ({ ...prev, ...step }));
      }
      const locked = placeLock.current;
      if (locked) updateScene((prev) => ({ ...prev, placeId: locked }));

      const lines: string[] = [];
      if (result.applied.length) lines.push(`Set: ${result.applied.join(" · ")}.`);
      else lines.push("Didn't catch that one.");
      if (result.question) lines.push(result.question.text);
      else lines.push("Ten ready — copy any.");

      const cards =
        !result.question && result.filled.action && result.filled.place
          ? buildVariations(getScene())
          : undefined;

      onPatch(chat.id, (c) => ({
        ...c,
        messages: [
          ...c.messages,
          { id: nextMsgId(), role: "bot", text: lines.join(" "), question: result.question ?? undefined, cards },
        ],
      }));
      setThinking(false);
      inputRef.current?.focus();
    }, 320);
  }

  function regenerate(id: number) {
    onPatch(chat.id, (c) => ({
      ...c,
      messages: c.messages.map((m) => (m.id === id ? { ...m, cards: buildVariations(getScene()) } : m)),
    }));
  }

  function undoLast() {
    const prev = undo.current.pop();
    if (prev) updateScene(prev);
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <header className="flex items-center gap-2 border-b border-prompty-inkLine bg-prompty-inkPanel px-4 py-2.5">
        <button
          type="button"
          onClick={onOpenHistory}
          className="grid h-7 w-7 place-items-center rounded-lg border border-prompty-inkLine text-[12px] text-prompty-inkMuted lg:hidden"
        >
          ☰
        </button>
        <div className="mr-auto min-w-0">
          <p className="truncate text-[13px] font-semibold">{chat.title || "New scene"}</p>
          <p className="truncate text-[10.5px] text-prompty-inkMuted">
            {place?.label} · {action?.label ?? "nothing yet"}
          </p>
        </div>
        <button
          type="button"
          onClick={undoLast}
          className="rounded-lg border border-prompty-inkLine px-2.5 py-1 text-[11px] text-prompty-inkMuted hover:text-white"
        >
          undo
        </button>
        <button
          type="button"
          onClick={onOpenPanel}
          className="rounded-lg bg-white px-2.5 py-1 text-[11px] font-semibold text-prompty-ink"
        >
          controls
        </button>
      </header>

      <div className="min-h-0 flex-1 overflow-y-auto">
        <div className="mx-auto w-full max-w-[700px] space-y-3 px-4 py-4">
          {under21 ? (
            <p className="rounded-lg border border-prompty-warn/40 bg-prompty-warnSoft px-3 py-2 text-[11.5px] text-prompty-warn">
              Someone is under 19 — limited to Everyday, Social and Play.
            </p>
          ) : null}

          {blocked ? (
            <p className="rounded-lg border border-prompty-inkLine px-3 py-2 text-[11.5px] text-prompty-inkMuted">
              Relationship is {scene.relationship} — intimate and hardcore are hidden.
            </p>
          ) : null}

          {chat.messages.map((m) =>
            m.role === "user" ? (
              <div key={m.id} className="flex justify-end">
                <div className="max-w-[80%] rounded-2xl rounded-tr-md bg-prompty-accentSoft px-3.5 py-2 text-[13px] text-prompty-ink">
                  {m.text}
                </div>
              </div>
            ) : (
              <div key={m.id} className="flex gap-2">
                <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-prompty-accent text-[12px] text-white">
                  ◍
                </span>
                <div className="max-w-[92%] space-y-2">
                  <div className="rounded-2xl rounded-tl-md border border-prompty-inkLine bg-prompty-inkCard px-3.5 py-2.5 text-[13px] leading-relaxed">
                    {m.text}
                  </div>
                  {m.cards ? (
                    <div className="space-y-1.5">
                      <div className="grid gap-1.5 sm:grid-cols-2">
                        {m.cards.map((card) => (
                          <div
                            key={card.id}
                            className="rounded-lg border border-prompty-inkLine bg-prompty-inkCard p-2"
                          >
                            <p className="mb-1 truncate text-[10px] text-prompty-inkMuted">
                              {card.id + 1} · {card.cast} · {card.angle}
                            </p>
                            <CopyButton text={card.short} label={`Copy ${card.id + 1}`} compact />
                          </div>
                        ))}
                      </div>
                      <div className="flex gap-1.5">
                        <CopyButton
                          text={m.cards.map((c) => c.short).join("\n\n———\n\n")}
                          label="Copy all 10"
                        />
                        <button
                          type="button"
                          onClick={() => regenerate(m.id)}
                          className="rounded-lg border border-prompty-inkLine px-3 py-1.5 text-[11px] text-prompty-inkMuted hover:text-white"
                        >
                          new 10
                        </button>
                      </div>
                    </div>
                  ) : null}

                  {m.question ? (
                    <div className="flex flex-wrap gap-1.5">
                      {m.question.options.map((o) => (
                        <button
                          key={o.label}
                          type="button"
                          onClick={() => send(o.send)}
                          className="rounded-pill border border-prompty-inkLine px-3 py-1.5 text-[11.5px] text-prompty-inkText hover:border-prompty-accent hover:text-white"
                        >
                          {o.label}
                        </button>
                      ))}
                    </div>
                  ) : null}
                </div>
              </div>
            )
          )}

          {thinking ? (
            <div className="flex gap-2">
              <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-prompty-accent text-[12px] text-white">
                ◍
              </span>
              <div className="flex items-center gap-1 rounded-2xl rounded-tl-md border border-prompty-inkLine bg-prompty-inkCard px-3.5 py-3">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-prompty-inkMuted" />
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-prompty-inkMuted [animation-delay:120ms]" />
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-prompty-inkMuted [animation-delay:240ms]" />
              </div>
            </div>
          ) : null}

          <div ref={endRef} />
        </div>
      </div>

      <div className="border-t border-prompty-inkLine bg-prompty-inkPanel">
        <div className="mx-auto w-full max-w-[700px] px-4 py-3">
          <div className="mb-2 rounded-xl border border-prompty-inkLine bg-prompty-page text-prompty-ink lg:hidden">
            <PromptCard compact />
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(draft);
            }}
            className="flex items-center gap-2"
          >
            <input
              ref={inputRef}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="22 year old woman, silk slip, bedroom, from above…"
              className="flex-1 rounded-pill border border-prompty-inkLine bg-prompty-inkCard px-3.5 py-2.5 text-[12.5px] text-prompty-inkText outline-none placeholder:text-prompty-inkMuted focus:border-prompty-accent"
            />
            <button
              type="submit"
              className="grid h-9 w-9 place-items-center rounded-full bg-prompty-accent text-[14px] text-white"
            >
              →
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}