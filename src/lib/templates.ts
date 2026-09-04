import type { Template } from "./types";

export const STYLE_PRESETS = [
  "Photorealistic",
  "Cinematic",
  "Anime",
  "Oil painting",
  "Watercolor",
  "Cyberpunk",
  "Minimal product",
  "Editorial fashion",
  "3D render",
  "Film noir",
  "Surreal",
  "Documentary",
] as const;

export const CAMERA_PRESETS = [
  "35mm lens",
  "50mm lens",
  "85mm portrait lens",
  "Wide-angle 24mm",
  "Macro close-up",
  "Aerial drone",
  "Anamorphic",
  "Tilt-shift",
] as const;

export const LIGHTING_PRESETS = [
  "Soft natural light",
  "Golden hour",
  "Dramatic rim light",
  "Studio softbox",
  "Neon glow",
  "Volumetric god rays",
  "Low-key noir",
  "Overcast diffuse",
] as const;

export const COMPOSITION_PRESETS = [
  "Rule of thirds",
  "Centered subject",
  "Leading lines",
  "Shallow depth of field",
  "Symmetrical",
  "Negative space",
  "Dutch angle",
  "Over-the-shoulder",
] as const;

export const MOTION_PRESETS = [
  "Slow cinematic push-in",
  "Gentle orbit",
  "Handheld subtle shake",
  "Smooth tracking shot",
  "Timelapse clouds",
  "Product spin reveal",
  "Parallax depth move",
  "Whip pan transition",
] as const;

export const CAMERA_MOVE_PRESETS = [
  "Dolly in",
  "Crane up",
  "Orbit clockwise",
  "Static locked-off",
  "Tracking left to right",
  "Zoom out reveal",
  "FPV fly-through",
  "Steadicam follow",
] as const;

export const DURATION_PRESETS = [
  "3 seconds",
  "5 seconds",
  "8 seconds",
  "10 seconds",
  "15 seconds",
] as const;

export const ASPECT_RATIOS = [
  "1:1",
  "16:9",
  "9:16",
  "4:3",
  "3:4",
  "21:9",
  "3:2",
  "2:3",
] as const;

export const QUALITY_TAGS = [
  "high detail",
  "8k",
  "raw",
  "cinematic",
  "photorealistic",
  "sharp focus",
  "masterpiece",
  "trending",
] as const;

export const IMAGE_TARGETS = [
  "Midjourney",
  "Flux",
  "DALL·E",
  "Stable Diffusion",
  "Generic",
] as const;

export const VIDEO_TARGETS = [
  "Runway",
  "Kling",
  "Luma",
  "Sora-style",
  "Generic",
] as const;

export const TEMPLATES: Template[] = [
  {
    id: "product-shot",
    name: "Product Shot",
    description: "Clean ecommerce hero on a studio backdrop",
    mode: "image",
    icon: "◇",
    state: {
      mode: "image",
      subject:
        "A matte black wireless headphone resting on a brushed aluminum pedestal, subtle brand mark visible",
      style: "Minimal product",
      camera: "50mm lens",
      lighting: "Studio softbox",
      composition: "Centered subject",
      aspectRatio: "1:1",
      qualityTags: ["high detail", "photorealistic", "sharp focus"],
      negativePrompt: "blurry, low quality, watermark, text, cluttered background",
      target: "Flux",
    },
  },
  {
    id: "cinematic-portrait",
    name: "Cinematic Portrait",
    description: "Moody character close-up with film lighting",
    mode: "image",
    icon: "◎",
    state: {
      mode: "image",
      subject:
        "A thoughtful young woman looking off-camera, wind-tossed coat collar, city lights bokeh behind her",
      style: "Cinematic",
      camera: "85mm portrait lens",
      lighting: "Dramatic rim light",
      composition: "Shallow depth of field",
      aspectRatio: "3:4",
      qualityTags: ["cinematic", "high detail", "8k"],
      negativePrompt: "overexposed, plastic skin, deformed hands, watermark",
      target: "Midjourney",
    },
  },
  {
    id: "product-demo-video",
    name: "Product Demo Video",
    description: "Sleek reveal spin for a short ad clip",
    mode: "video",
    icon: "▶",
    state: {
      mode: "video",
      subject:
        "A sleek smartwatch rotating slowly on a reflective black surface, UI face glowing cyan",
      style: "Minimal product",
      motion: "Product spin reveal",
      cameraMove: "Orbit clockwise",
      duration: "5 seconds",
      aspectRatio: "9:16",
      qualityTags: ["cinematic", "high detail", "photorealistic"],
      negativePrompt: "jitter, warp, text overlay, logo distortion",
      target: "Runway",
    },
  },
  {
    id: "nature-timelapse",
    name: "Nature Timelapse",
    description: "Epic landscape with moving sky and light",
    mode: "video",
    icon: "☁",
    state: {
      mode: "video",
      subject:
        "Vast alpine valley at sunrise, mist rolling through pines, golden light cresting peaks",
      style: "Documentary",
      motion: "Timelapse clouds",
      cameraMove: "Crane up",
      duration: "8 seconds",
      aspectRatio: "16:9",
      qualityTags: ["cinematic", "8k", "high detail"],
      negativePrompt: "people, buildings, text, shaky cam",
      target: "Luma",
    },
  },
  {
    id: "cyberpunk-alley",
    name: "Cyberpunk Alley",
    description: "Neon-soaked night street scene",
    mode: "image",
    icon: "⚡",
    state: {
      mode: "image",
      subject:
        "Rain-slick alley in a dense megacity, neon kanji signs reflecting in puddles, lone figure under an umbrella",
      style: "Cyberpunk",
      camera: "Wide-angle 24mm",
      lighting: "Neon glow",
      composition: "Leading lines",
      aspectRatio: "16:9",
      qualityTags: ["cinematic", "high detail", "trending"],
      negativePrompt: "daytime, sunny, low detail, watermark",
      target: "Stable Diffusion",
    },
  },
  {
    id: "fashion-walk",
    name: "Fashion Walk",
    description: "Editorial runway tracking shot",
    mode: "video",
    icon: "✦",
    state: {
      mode: "video",
      subject:
        "Model in avant-garde silver coat walking a minimal white runway, confident stride, soft spotlight",
      style: "Editorial fashion",
      motion: "Smooth tracking shot",
      cameraMove: "Tracking left to right",
      duration: "10 seconds",
      aspectRatio: "9:16",
      qualityTags: ["cinematic", "sharp focus", "high detail"],
      negativePrompt: "crowd noise visual clutter, deformed limbs, flicker",
      target: "Kling",
    },
  },
];
