import { DOCUMENT, Injectable, inject } from '@angular/core';

/** Reads German text aloud using the browser's built-in speech synthesis. */
@Injectable({ providedIn: 'root' })
export class SpeechService {
  private readonly synth = inject(DOCUMENT).defaultView?.speechSynthesis;

  readonly supported = !!this.synth;

  speak(text: string): void {
    if (!this.synth) return;
    this.synth.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'de-DE';
    utterance.rate = 0.9;
    this.synth.speak(utterance);
  }
}
