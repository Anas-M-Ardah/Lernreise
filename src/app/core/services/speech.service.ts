import { DOCUMENT, DestroyRef, Injectable, computed, inject, signal } from '@angular/core';

/** Uses an explicitly selected German voice; never falls back to another language. */
@Injectable({ providedIn: 'root' })
export class SpeechService {
  private readonly window = inject(DOCUMENT).defaultView;
  private readonly synth = this.window?.speechSynthesis;
  private pendingText: string | undefined;
  private timer: number | undefined;
  private request = 0;
  readonly supported = !!this.synth;
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
    if (!this.synth || !this.window) {
      this.message.set('Dieser Browser unterstützt keine Sprachausgabe.');
      return;
    }
    this.synth.cancel();
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
    const utterance = new this.window.SpeechSynthesisUtterance(text.replace(/\|/g, '').trim());
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
