// Subtle synthesized mechanical / haptic Web Audio tactile feedback

let sharedAudioCtx: AudioContext | null = null;
let noiseBuffer: AudioBuffer | null = null;
let lastHoverTime = 0;
let lastClickTime = 0;
let unlockBound = false;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;

  if (!sharedAudioCtx) {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return null;
    try {
      sharedAudioCtx = new AudioCtx();
    } catch {
      return null;
    }
  }

  if (!unlockBound) {
    unlockBound = true;
    const unlock = () => {
      if (sharedAudioCtx && sharedAudioCtx.state === 'suspended') {
        void sharedAudioCtx.resume().catch(() => {});
      }
    };
    window.addEventListener('pointerdown', unlock, { passive: true, capture: true });
    window.addEventListener('keydown', unlock, { passive: true, capture: true });
    window.addEventListener('touchstart', unlock, { passive: true, capture: true });
  }

  return sharedAudioCtx;
}

function getNoiseBuffer(ctx: AudioContext): AudioBuffer {
  if (noiseBuffer && noiseBuffer.sampleRate === ctx.sampleRate) {
    return noiseBuffer;
  }
  const length = Math.floor(ctx.sampleRate * 0.03);
  const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < length; i++) {
    data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (length * 0.25));
  }
  noiseBuffer = buffer;
  return buffer;
}

function isCoarsePointer(): boolean {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return false;
  return window.matchMedia('(pointer: coarse)').matches;
}

/**
 * Soft, damped micro-detent tick for hover interactions on cards & navigation items.
 */
export function playHoverTick(): void {
  if (isCoarsePointer()) return;

  const nowMs = performance.now();
  if (nowMs - lastHoverTime < 45) return;
  lastHoverTime = nowMs;

  const ctx = getAudioContext();
  if (!ctx || ctx.state !== 'running') return;

  try {
    const now = ctx.currentTime;

    // Gentle high-Q detent ping
    const osc = ctx.createOscillator();
    const oscGain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(1420, now);
    osc.frequency.exponentialRampToValueAtTime(640, now + 0.015);

    oscGain.gain.setValueAtTime(0.0001, now);
    oscGain.gain.linearRampToValueAtTime(0.022, now + 0.002);
    oscGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.016);

    osc.connect(oscGain);
    oscGain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.018);

    // Subtle brushed tactile transient
    const src = ctx.createBufferSource();
    src.buffer = getNoiseBuffer(ctx);
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(2600, now);
    filter.Q.setValueAtTime(2.6, now);

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.014, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.008);

    src.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(ctx.destination);
    src.start(now);
    src.stop(now + 0.01);
  } catch {
    // Ignore transient Web Audio errors
  }
}

/**
 * Warm, refined mechanical / haptic 'thock' for clicks on project cards & navigation controls.
 */
export function playClickThock(): void {
  const nowMs = performance.now();
  if (nowMs - lastClickTime < 25) return;
  lastClickTime = nowMs;

  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    if (ctx.state === 'suspended') {
      void ctx.resume().catch(() => {});
    }
    const now = ctx.currentTime;

    // 1. Tactile low-mid haptic body
    const bodyOsc = ctx.createOscillator();
    const bodyGain = ctx.createGain();
    bodyOsc.type = 'triangle';
    bodyOsc.frequency.setValueAtTime(250, now);
    bodyOsc.frequency.exponentialRampToValueAtTime(76, now + 0.028);

    bodyGain.gain.setValueAtTime(0.0001, now);
    bodyGain.gain.linearRampToValueAtTime(0.075, now + 0.002);
    bodyGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.032);

    bodyOsc.connect(bodyGain);
    bodyGain.connect(ctx.destination);
    bodyOsc.start(now);
    bodyOsc.stop(now + 0.034);

    // 2. Crisp damped mechanical switch transient
    const transientSrc = ctx.createBufferSource();
    transientSrc.buffer = getNoiseBuffer(ctx);
    const bp = ctx.createBiquadFilter();
    bp.type = 'bandpass';
    bp.frequency.setValueAtTime(2150, now);
    bp.Q.setValueAtTime(1.8, now);

    const transientGain = ctx.createGain();
    transientGain.gain.setValueAtTime(0.042, now);
    transientGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.011);

    transientSrc.connect(bp);
    bp.connect(transientGain);
    transientGain.connect(ctx.destination);
    transientSrc.start(now);
    transientSrc.stop(now + 0.014);
  } catch {
    // Ignore transient Web Audio errors
  }
}
