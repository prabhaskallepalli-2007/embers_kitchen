// Procedural Web Audio API soundscape for Ember Kitchens hearth ambiance

class HearthAudio {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private masterGain: GainNode | null = null;
  private crackleIntervalId: number | null = null;
  private noiseNode: AudioBufferSourceNode | null = null;
  private volume: number = 0.35; // Audible default volume

  public init(): AudioContext | null {
    if (this.ctx && this.ctx.state !== 'closed') {
      return this.ctx;
    }
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioCtx) {
      try {
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);
      } catch (err) {
        console.warn('Could not initialize AudioContext:', err);
      }
    }
    return this.ctx;
  }

  public setVolume(val: number) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.ctx && this.masterGain) {
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    }
  }

  public getVolume(): number {
    return this.volume;
  }

  public async toggle(): Promise<boolean> {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      await this.play();
      return this.isPlaying;
    }
  }

  public async play(): Promise<void> {
    this.init();
    if (!this.ctx || !this.masterGain) return;

    // Browsers require user interaction to resume AudioContext
    if (this.ctx.state === 'suspended') {
      try {
        await this.ctx.resume();
      } catch (err) {
        console.warn('AudioContext resume failed:', err);
      }
    }

    if (this.isPlaying) {
      this.stop();
    }

    this.isPlaying = true;

    // 1. Warm crackling wood base: Pink/Brown noise generator
    const bufferSize = Math.floor(this.ctx.sampleRate * 3);
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = noiseBuffer.getChannelData(0);

    let lastOut = 0.0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      // Brown noise integration for warm, soothing fireplace rumble
      lastOut = (lastOut + (0.025 * white)) / 1.025;
      data[i] = lastOut * 3.5;
    }

    this.noiseNode = this.ctx.createBufferSource();
    this.noiseNode.buffer = noiseBuffer;
    this.noiseNode.loop = true;

    // Filter to emulate warm fireplace resonance (rich low-mid body)
    const lowpass = this.ctx.createBiquadFilter();
    lowpass.type = 'lowpass';
    lowpass.frequency.setValueAtTime(480, this.ctx.currentTime);
    lowpass.Q.setValueAtTime(1.2, this.ctx.currentTime);

    const rumbleGain = this.ctx.createGain();
    rumbleGain.gain.setValueAtTime(0.5, this.ctx.currentTime);

    this.noiseNode.connect(lowpass);
    lowpass.connect(rumbleGain);
    rumbleGain.connect(this.masterGain);

    try {
      this.noiseNode.start();
    } catch (e) {
      console.warn('Could not start noise node:', e);
    }

    // 2. Scheduled crisp snapping embers & wood crackles
    const scheduleNextCrackle = () => {
      if (!this.isPlaying || !this.ctx || !this.masterGain) return;
      this.triggerCrackle();
      // Burst pattern for authentic wood popping
      const delay = Math.random() < 0.35 ? 40 + Math.random() * 80 : 120 + Math.random() * 380;
      this.crackleIntervalId = window.setTimeout(scheduleNextCrackle, delay);
    };

    scheduleNextCrackle();

    // Play a gentle warm startup confirmation chime so the user immediately hears audio started
    this.playChime();
  }

  private triggerCrackle() {
    if (!this.ctx || !this.masterGain || this.ctx.state !== 'running') return;

    try {
      const now = this.ctx.currentTime;
      // Snapping wood spark
      const bufferSize = Math.floor(this.ctx.sampleRate * 0.04);
      const crackleBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = crackleBuffer.getChannelData(0);

      for (let i = 0; i < bufferSize; i++) {
        // High frequency sharp impulse pop
        const decay = Math.exp(-i / (this.ctx.sampleRate * 0.005));
        data[i] = (Math.random() * 2 - 1) * decay;
      }

      const snapSource = this.ctx.createBufferSource();
      snapSource.buffer = crackleBuffer;

      // Bandpass around 1200Hz-3500Hz for sharp ember snap
      const bandpass = this.ctx.createBiquadFilter();
      bandpass.type = 'bandpass';
      bandpass.frequency.setValueAtTime(1400 + Math.random() * 1800, now);
      bandpass.Q.setValueAtTime(2.5, now);

      const snapGain = this.ctx.createGain();
      const gainVal = 0.18 + Math.random() * 0.32;
      snapGain.gain.setValueAtTime(gainVal, now);
      snapGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.038);

      snapSource.connect(bandpass);
      bandpass.connect(snapGain);
      snapGain.connect(this.masterGain);

      snapSource.start(now);
      snapSource.stop(now + 0.04);
    } catch {
      // ignore transient audio scheduling issues
    }
  }

  public playChime() {
    this.init();
    if (!this.ctx) return;
    if (this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }

    try {
      const now = this.ctx.currentTime;
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gainNode = this.ctx.createGain();

      osc1.type = 'sine';
      osc2.type = 'triangle';

      // Warm culinary hearth chord (E5 + B5)
      osc1.frequency.setValueAtTime(659.25, now); // E5
      osc2.frequency.setValueAtTime(987.77, now); // B5

      gainNode.gain.setValueAtTime(0.12, now);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.75);

      osc1.connect(gainNode);
      osc2.connect(gainNode);
      gainNode.connect(this.ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 0.8);
      osc2.stop(now + 0.8);
    } catch {
      // ignore
    }
  }

  public stop() {
    this.isPlaying = false;
    if (this.crackleIntervalId !== null) {
      clearTimeout(this.crackleIntervalId);
      this.crackleIntervalId = null;
    }
    if (this.noiseNode) {
      try {
        this.noiseNode.stop();
        this.noiseNode.disconnect();
      } catch {
        // already stopped
      }
      this.noiseNode = null;
    }
  }

  public getActive(): boolean {
    return this.isPlaying;
  }
}

export const hearthAudio = new HearthAudio();
