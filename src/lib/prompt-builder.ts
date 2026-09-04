import type { BuiltPrompts, PromptFormState } from "./types";

function clean(parts: Array<string | undefined | null | false>): string {
  return parts
    .map((p) => (typeof p === "string" ? p.trim() : ""))
    .filter(Boolean)
    .join(", ");
}

function sentence(parts: Array<string | undefined | null | false>): string {
  const text = parts
    .map((p) => (typeof p === "string" ? p.trim() : ""))
    .filter(Boolean)
    .join(". ");
  if (!text) return "";
  return /[.!?]$/.test(text) ? text : `${text}.`;
}

function resolveStyle(state: PromptFormState): string {
  if (state.style === "Custom" || state.style === "") {
    return state.customStyle.trim();
  }
  if (state.customStyle.trim()) {
    return `${state.style}, ${state.customStyle.trim()}`;
  }
  return state.style;
}

function qualityClause(state: PromptFormState): string {
  return state.qualityTags.length ? state.qualityTags.join(", ") : "";
}

function aspectClause(state: PromptFormState): string {
  return state.aspectRatio ? `aspect ratio ${state.aspectRatio}` : "";
}

function targetHint(state: PromptFormState): string {
  if (!state.target || state.target === "Generic") return "";
  if (state.mode === "image") {
    switch (state.target) {
      case "Midjourney":
        return `optimized for Midjourney (--ar ${state.aspectRatio.replace(":", ":")})`;
      case "Flux":
        return "Flux-friendly natural language phrasing";
      case "DALL·E":
        return "clear DALL·E-style descriptive phrasing";
      case "Stable Diffusion":
        return "Stable Diffusion tag-friendly wording";
      default:
        return "";
    }
  }
  switch (state.target) {
    case "Runway":
      return "Runway Gen video motion cues";
    case "Kling":
      return "Kling motion-aware phrasing";
    case "Luma":
      return "Luma Dream Machine cinematic motion";
    case "Sora-style":
      return "Sora-style continuous camera storytelling";
    default:
      return "";
  }
}

export function buildPrompts(state: PromptFormState): BuiltPrompts {
  const style = resolveStyle(state);
  const quality = qualityClause(state);
  const aspect = aspectClause(state);
  const target = targetHint(state);

  if (state.mode === "image") {
    const short = clean([
      state.subject,
      style,
      state.camera,
      state.lighting,
      aspect,
      quality,
    ]);

    const detailed = sentence([
      state.subject,
      style ? `Style: ${style}` : "",
      state.camera ? `Camera: ${state.camera}` : "",
      state.lighting ? `Lighting: ${state.lighting}` : "",
      state.composition ? `Composition: ${state.composition}` : "",
      aspect ? `Framing: ${aspect}` : "",
      quality ? `Quality: ${quality}` : "",
      target ? `Notes: ${target}` : "",
    ]);

    return {
      short,
      detailed,
      negative: state.negativePrompt.trim(),
    };
  }

  const short = clean([
    state.subject,
    style,
    state.motion,
    state.cameraMove,
    state.duration ? `${state.duration} clip` : "",
    aspect,
    quality,
  ]);

  const detailed = sentence([
    state.subject,
    style ? `Style: ${style}` : "",
    state.motion ? `Motion: ${state.motion}` : "",
    state.cameraMove ? `Camera move: ${state.cameraMove}` : "",
    state.duration ? `Duration: ${state.duration}` : "",
    aspect ? `Framing: ${aspect}` : "",
    quality ? `Quality: ${quality}` : "",
    target ? `Notes: ${target}` : "",
  ]);

  return {
    short,
    detailed,
    negative: state.negativePrompt.trim(),
  };
}

export const DEFAULT_FORM: PromptFormState = {
  mode: "image",
  subject: "",
  style: "Cinematic",
  customStyle: "",
  camera: "35mm lens",
  lighting: "Soft natural light",
  composition: "Rule of thirds",
  motion: "Slow cinematic push-in",
  cameraMove: "Dolly in",
  duration: "5 seconds",
  aspectRatio: "16:9",
  qualityTags: ["high detail", "cinematic"],
  negativePrompt: "",
  target: "Midjourney",
};
