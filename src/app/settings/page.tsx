"use client";

import { useEffect, useState } from "react";
import {
  type Settings, type GenderMix, type Ethnicity, type Room, type Surface,
  type Light, type Covering, type Garment, type Ratio, type Mode,
  DEFAULTS, LOCKS, FEMALE_AGE_MIN, FEMALE_AGE_MAX, clampAge,
  loadSettings, saveSettings, resetSettings,
  loadPresets, savePreset, deletePreset,
} from "@/lib/settings";
import { POSE_CAMERA, type PoseTag } from "@/lib/camera";
import { assemblePrompt } from "@/lib/assemble";
import { CONTACT, type ContactAction } from "@/lib/contacts";
import { MODIFIER, availableModifiers, type ModifierKey } from "@/lib/modifiers";

const box: React.CSSProperties = {
  border: "1px solid #2a2a33", borderRadius: 10, padding: 14, marginBottom: 14,
  background: "#141419",
};
const row: React.CSSProperties = {
  display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 10,
};
const label: React.CSSProperties = { fontSize: 12, color: "#8d8da0", display: "block", marginBottom: 4 };
const input: React.CSSProperties = {
  width: "100%", background: "#0d0d11", color: "#e8e8ef", border: "1px solid #33333f",
  borderRadius: 8, padding: "8px 10px", fontSize: 14,
};
const h: React.CSSProperties = { fontSize: 13, fontWeight: 700, margin: "0 0 10px", color: "#cfcfe0" };
const btn: React.CSSProperties = {
  background: "#1c1c24", color: "#e8e8ef", border: "1px solid #3a3a48",
  borderRadius: 8, padding: "8px 14px", fontSize: 13, cursor: "pointer",
};

export default function SettingsPage() {
  const [s, setS] = useState<Settings>(DEFAULTS);
  const [loaded, setLoaded] = useState(false);
  const [presetName, setPresetName] = useState("");
  const [pose, setPose] = useState<PoseTag>("lying-back");
  const [contact, setContact] = useState<ContactAction | "">("");
  const [mods, setMods] = useState<ModifierKey[]>([]);
  const [presets, setPresets] = useState<Record<string, Settings>>({});

  useEffect(() => {
    setS(loadSettings());
    setPresets(loadPresets());
    setLoaded(true);
  }, []);

  const set = <K extends keyof Settings>(k: K, v: Settings[K]) =>
    setS((p) => ({ ...p, [k]: v }));

  if (!loaded) return <main style={{ padding: 24, color: "#e8e8ef" }}>Loading…</main>;

  const built = assemblePrompt(s, pose, contact || undefined, mods);
  const poseList: PoseTag[] = contact
    ? CONTACT[contact].poses
    : (Object.keys(POSE_CAMERA) as PoseTag[]);
  const modList = availableModifiers(pose, contact || undefined);

  return (
    <main style={{ padding: 24, maxWidth: 720, margin: "0 auto", color: "#e8e8ef", fontFamily: "system-ui, sans-serif" }}>
      <h1 style={{ fontSize: 20, marginBottom: 4 }}>Defaults</h1>
      <p style={{ fontSize: 13, color: "#8d8da0", marginBottom: 20 }}>
        Locked fields are hidden from the bot. Everything here is stored on this device.
      </p>

      <div style={box}>
        <h2 style={h}>People</h2>
        <div style={row}>
          <div>
            <label style={label}>Cast</label>
            <select style={input} value={s.genderMix} onChange={(e) => set("genderMix", e.target.value as GenderMix)}>
              <option value="solo-f">one woman</option>
              <option value="mf">couple</option>
              <option value="ff">two women</option>
              <option value="mmf">two men, one woman</option>
              <option value="ffm">two women, one man</option>
              <option value="mmmf">three men, one woman</option>
              <option value="crowd">crowd</option>
            </select>
          </div>
          <div>
            <label style={label}>Ethnicity {LOCKS.includes("ethnicity") && "🔒"}</label>
            <select style={input} value={s.ethnicity} onChange={(e) => set("ethnicity", e.target.value as Ethnicity)}>
              <option value="tamil">Tamil</option>
              <option value="kerala">Kerala</option>
            </select>
          </div>
        </div>
        <div style={row}>
          <div>
            <label style={label}>Woman age ({FEMALE_AGE_MIN}–{FEMALE_AGE_MAX})</label>
            <input
              style={input} type="number" min={FEMALE_AGE_MIN} max={FEMALE_AGE_MAX}
              value={s.femaleAge}
              onChange={(e) => set("femaleAge", clampAge(Number(e.target.value)))}
            />
          </div>
          <div>
            <label style={label}>Man age</label>
            <input
              style={input} type="number" min={18} max={60}
              value={s.maleAge}
              onChange={(e) => set("maleAge", Math.max(18, Math.round(Number(e.target.value) || 25)))}
            />
          </div>
        </div>
        <label style={{ ...label, display: "flex", gap: 8, alignItems: "center" }}>
          <input type="checkbox" checked={s.femaleHairLong} disabled={LOCKS.includes("femaleHairLong")} onChange={(e) => set("femaleHairLong", e.target.checked)} />
          Woman long hair (locked)
        </label>
        <label style={{ ...label, display: "flex", gap: 8, alignItems: "center" }}>
          <input type="checkbox" checked={s.maleHairShort} disabled={LOCKS.includes("maleHairShort")} onChange={(e) => set("maleHairShort", e.target.checked)} />
          Man short hair (locked)
        </label>
        <label style={{ ...label, marginTop: 8 }}>Body note</label>
        <input style={input} value={s.bodyNote} placeholder="slim, average build…" onChange={(e) => set("bodyNote", e.target.value)} />
      </div>

      <div style={box}>
        <h2 style={h}>Place & light</h2>
        <div style={row}>
          <div>
            <label style={label}>Room</label>
            <select style={input} value={s.room} onChange={(e) => set("room", e.target.value as Room)}>
              <option value="bedroom">bedroom</option>
              <option value="kitchen">kitchen</option>
              <option value="bathroom">bathroom</option>
              <option value="balcony">balcony</option>
            </select>
          </div>
          <div>
            <label style={label}>Surface</label>
            <select style={input} value={s.surface} onChange={(e) => set("surface", e.target.value as Surface)}>
              <option value="bed">bed</option>
              <option value="counter">counter</option>
              <option value="wall">wall</option>
              <option value="floor">floor</option>
            </select>
          </div>
        </div>
        <label style={label}>Light (no dim, locked)</label>
        <select style={input} value={s.light} onChange={(e) => set("light", e.target.value as Light)}>
          <option value="window">bright window daylight</option>
          <option value="softbox">softbox</option>
          <option value="overcast">bright overcast</option>
        </select>
      </div>

      <div style={box}>
        <h2 style={h}>Dress</h2>
        <div style={row}>
          <div>
            <label style={label}>Her garment</label>
            <select style={input} value={s.femaleGarment} onChange={(e) => set("femaleGarment", e.target.value as Garment)}>
              <option value="saree">saree</option>
              <option value="half-saree">half saree</option>
              <option value="churidar">churidar</option>
              <option value="kurta-skirt">kurta and skirt</option>
            </select>
          </div>
          <div>
            <label style={label}>Covering</label>
            <select style={input} value={s.covering} onChange={(e) => set("covering", e.target.value as Covering)}>
              <option value="pallu-hip">pallu across her hip</option>
              <option value="saree-waist">saree open at the waist</option>
              <option value="bedsheet">bedsheet only</option>
              <option value="none">none</option>
            </select>
          </div>
        </div>
      </div>

      <div style={box}>
        <h2 style={h}>Camera & output</h2>
        <div style={row}>
          <div>
            <label style={label}>Camera</label>
            <select style={input} value={s.camera} onChange={(e) => set("camera", e.target.value as "auto" | "manual")}>
              <option value="auto">auto — from pose</option>
              <option value="manual">manual</option>
            </select>
          </div>
          <div>
            <label style={label}>Ratio</label>
            <select style={input} value={s.ratio} onChange={(e) => set("ratio", e.target.value as Ratio)}>
              <option value="1:1">1:1</option>
              <option value="4:5">4:5</option>
              <option value="9:16">9:16</option>
            </select>
          </div>
        </div>
        {s.camera === "manual" && (
          <>
            <label style={label}>Camera override</label>
            <input style={input} value={s.cameraOverride} placeholder="side profile, hip height" onChange={(e) => set("cameraOverride", e.target.value)} />
          </>
        )}
        <div style={{ ...row, marginTop: 10 }}>
          <div>
            <label style={label}>Mode</label>
            <select style={input} value={s.mode} onChange={(e) => set("mode", e.target.value as Mode)}>
              <option value="A">A — text only</option>
              <option value="B">B — two photos (2 people only)</option>
            </select>
          </div>
          <div>
            <label style={label}>Length</label>
            <select style={input} value={s.length} onChange={(e) => set("length", e.target.value as "short" | "normal")}>
              <option value="normal">normal (70–90)</option>
              <option value="short">short (40–55)</option>
            </select>
          </div>
        </div>
      </div>

      <div style={box}>
        <h2 style={h}>Action</h2>
        <select
          style={input}
          value={contact}
          onChange={(e) => {
            const next = e.target.value as ContactAction | "";
            setContact(next);
            setMods([]);
            if (next) setPose(CONTACT[next].poses[0]);
          }}
        >
          <option value="">— none, pose only —</option>
          {(Object.keys(CONTACT) as ContactAction[]).map((c) => (
            <option key={c} value={c}>{CONTACT[c].label}</option>
          ))}
        </select>

        <label style={{ ...label, marginTop: 10 }}>Pose</label>
        <select style={input} value={pose} onChange={(e) => setPose(e.target.value as PoseTag)}>
          {poseList.map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>

        {modList.length > 0 && (
          <>
            <label style={{ ...label, marginTop: 10 }}>Modifiers (max 2)</label>
            {modList.map((m) => (
              <label
                key={m}
                style={{ ...label, display: "flex", gap: 8, alignItems: "center" }}
              >
                <input
                  type="checkbox"
                  checked={mods.includes(m)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setMods((p) => (p.length >= 2 ? p : [...p, m]));
                    } else {
                      setMods((p) => p.filter((x) => x !== m));
                    }
                  }}
                />
                {MODIFIER[m].label}
              </label>
            ))}
          </>
        )}
      </div>

      <div style={box}>
        <h2 style={h}>Output</h2>
        <p style={{ fontSize: 13, color: "#d8d8e6", margin: "0 0 10px", lineHeight: 1.5 }}>
          {built.prompt}
        </p>
        <p style={{ fontSize: 12, color: "#6f6f85", margin: "0 0 10px" }}>{built.negative}</p>
        <button
          style={btn}
          onClick={() => navigator.clipboard.writeText(`${built.prompt} ${built.negative}`)}
        >
          Copy
        </button>
      </div>

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 14 }}>
        <button style={btn} onClick={() => saveSettings(s)}>Save</button>
        <button style={btn} onClick={() => setS(resetSettings())}>Reset</button>
      </div>

      <div style={box}>
        <h2 style={h}>Presets</h2>
        <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
          <input style={input} value={presetName} placeholder="name" onChange={(e) => setPresetName(e.target.value)} />
          <button
            style={btn}
            onClick={() => {
              if (!presetName.trim()) return;
              savePreset(presetName, s);
              setPresets(loadPresets());
              setPresetName("");
            }}
          >
            Save
          </button>
        </div>
        {Object.keys(presets).length === 0 && <p style={{ fontSize: 12, color: "#6f6f85", margin: 0 }}>none yet</p>}
        {Object.entries(presets).map(([name, p]) => (
          <div key={name} style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 6 }}>
            <span style={{ flex: 1, fontSize: 13 }}>{name}</span>
            <button style={btn} onClick={() => setS(p)}>Load</button>
            <button style={btn} onClick={() => { deletePreset(name); setPresets(loadPresets()); }}>Delete</button>
          </div>
        ))}
      </div>
    </main>
  );
}