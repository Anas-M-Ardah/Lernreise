import { DOCUMENT, DestroyRef, Injectable, computed, inject, signal } from '@angular/core';
import { PRONUNCIATION_AUDIO } from '../../data/pronunciation-audio';

/** Bundled German recordings work without installed voices or a live TTS service. */
@Injectable({ providedIn: 'root' })
export class SpeechService {
  private readonly document = inject(DOCUMENT);
  private readonly window = this.document.defaultView;
  private readonly synth = this.window?.speechSynthesis;
  private audio: HTMLAudioElement | undefined;
  private pendingText: string | undefined;
  private timer: number | undefined;
  private request = 0;
  readonly supported = !!this.window?.Audio || !!this.synth;
  readonly voices = signal<SpeechSynthesisVoice[]>([]);
  readonly preferredVoice = signal('');
  readonly rate = signal(0.85);
  readonly message = signal('');
  readonly selectedVoice = computed<SpeechSynthesisVoice | undefined>(() =>
    this.voices().find((voice) => voice.voiceURI === this.preferredVoice()) ?? this.voices()[0],
  );

  constructor() {
    const refresh = () => {
      this.voices.set((this.synth?.getVoices() ?? [])
        .filter((voice) => /^de(?:[-_]|$)/i.test(voice.lang))
        .sort((a, b) => this.score(b) - this.score(a) || a.name.localeCompare(b.name)));
      if (this.selectedVoice()) {
        this.message.set('');
        if (this.pendingText) this.speak(this.pendingText);
      }
    };
    refresh();
    this.synth?.addEventListener('voiceschanged', refresh);
    inject(DestroyRef).onDestroy(() => {
      this.synth?.removeEventListener('voiceschanged', refresh);
      this.clearPending();
      this.request++;
      this.audio?.pause();
      this.synth?.cancel();
    });
  }

  private score(voice: SpeechSynthesisVoice): number {
    return (/^de[-_]DE$/i.test(voice.lang) ? 100 : 0)
      + (/natural|neural|enhanced|premium|google/i.test(voice.name) ? 20 : 0)
      + (voice.default ? 1 : 0);
  }

  private clearPending(): void {
    this.pendingText = undefined;
    if (this.timer !== undefined) this.window?.clearTimeout(this.timer);
    this.timer = undefined;
  }

  speak(text: string): void {
    this.clearPending();
    const request = ++this.request;
    this.audio?.pause();
    this.audio = undefined;
    this.synth?.cancel();
    const normalized = text.replace(/\|/g, '').trim();
    const recording = PRONUNCIATION_AUDIO[normalized];
    if (!this.preferredVoice() && recording && this.window?.Audio) {
      this.message.set('');
      const audio = new this.window.Audio(new URL(recording, this.document.baseURI).href);
      this.audio = audio;
      audio.playbackRate = this.rate();
      audio.onplaying = () => {
        if (request === this.request) this.message.set('Deutsche Aussprache wird abgespielt …');
      };
      audio.onended = () => {
        if (request === this.request) this.message.set('');
      };
      let failed = false;
      const onFailure = () => {
        if (request !== this.request || failed) return;
        failed = true;
        audio.pause();
        this.audio = undefined;
        if (this.selectedVoice()) this.speakNative(normalized, request);
        else this.message.set('Die deutsche Aufnahme konnte nicht geladen werden. Bitte lade die Seite neu und prüfe deine Verbindung.');
      };
      audio.onerror = onFailure;
      void audio.play().catch(onFailure);
      return;
    }
    this.speakNative(normalized, request);
  }

  private speakNative(text: string, request: number): void {
    if (!this.synth || !this.window) {
      this.message.set('Dieser Browser unterstützt keine Sprachausgabe.');
      return;
    }
    const voice = this.selectedVoice();
    if (!voice) {
      this.pendingText = text;
      this.message.set('Deutsche Stimmen werden geladen …');
      this.timer = this.window.setTimeout(() => {
        this.clearPending();
        this.message.set('Keine deutsche Stimme verfügbar. Aktiviere Deutsch in den Spracheinstellungen deines Geräts oder versuche einen anderen Browser.');
      }, 2500);
      return;
    }
    this.message.set('');
    const utterance = new this.window.SpeechSynthesisUtterance(text);
    utterance.voice = voice;
    utterance.lang = voice.lang.replace('_', '-');
    utterance.rate = this.rate();
    utterance.pitch = 1;
    utterance.onerror = (event) => {
      if (request !== this.request || event.error === 'interrupted' || event.error === 'canceled') return;
      this.message.set('Die Aussprache konnte nicht abgespielt werden. Wähle eine andere deutsche Stimme und versuche es erneut.');
    };
    this.synth.speak(utterance);
  }
}
