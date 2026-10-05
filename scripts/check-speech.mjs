import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import ts from 'typescript';

const code = ts.transpileModule(readFileSync(new URL('../src/app/core/services/speech.service.ts', import.meta.url), 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, experimentalDecorators: true },
}).outputText;
const voice = (name, lang, extra = {}) => ({ name, lang, voiceURI: name, default: false, ...extra });
const english = voice('English', 'en-US', { default: true });
const german = voice('German', 'de-DE');
const enhanced = voice('German Natural', 'de-DE');
const manifest = JSON.parse(readFileSync(new URL('../public/audio/de/manifest.json', import.meta.url), 'utf8'));
function setup(initial = [], { audioFails = false, noSynth = false } = {}) {
  let voices = initial;
  const spoken = [], recordings = [], timers = new Map(), listeners = new Map();
  let cleanup;
  const synth = {
    getVoices: () => voices,
    cancel: () => {},
    speak: utterance => spoken.push(utterance),
    addEventListener: (event, callback) => listeners.set(event, callback),
    removeEventListener: event => listeners.delete(event),
  };
  const window = { speechSynthesis: noSynth ? undefined : synth,
    Audio: class {
      constructor(url) { this.src = url; this.paused = false; recordings.push(this); }
      pause() { this.paused = true; }
      play() {
        if (audioFails) return Promise.reject(new Error('Audio unavailable'));
        this.onplaying?.();
        return Promise.resolve();
      }
    },
    SpeechSynthesisUtterance: class { constructor(text) { this.text = text; } },
    setTimeout: callback => { const id = timers.size + 1; timers.set(id, callback); return id; },
    clearTimeout: id => timers.delete(id),
  };
  const signal = initial => { let value = initial; const read = () => value; read.set = next => value = next; return read; };
  const core = { DOCUMENT: {}, DestroyRef: {}, Injectable: () => target => target,
    signal, computed: fn => fn, inject: token => token === core.DOCUMENT ? { defaultView: window, baseURI: 'https://example.com/Lernreise/' } : { onDestroy: fn => cleanup = fn } };
  const module = { exports: {} };
  new Function('require', 'module', 'exports', code)(specifier =>
    specifier === '@angular/core' ? core : { PRONUNCIATION_AUDIO: manifest }, module, module.exports);
  return { service: new module.exports.SpeechService(), spoken, recordings, timers, listeners,
    load: next => { voices = next; listeners.get('voiceschanged')(); },
    expire: () => [...timers.values()].forEach(fn => fn()), destroy: () => cleanup() };
}
const ready = setup([english, voice('Austrian', 'de-AT'), german, enhanced]);
assert.equal(ready.service.selectedVoice(), enhanced);
ready.service.preferredVoice.set(enhanced.voiceURI);
ready.service.speak(' das Ein|verständnis ');
assert.equal(ready.spoken[0].voice, enhanced);
assert.equal(ready.spoken[0].lang, 'de-DE');
assert.equal(ready.spoken[0].text, 'das Einverständnis');
assert.equal(ready.spoken[0].rate, 0.85);
ready.service.preferredVoice.set(german.voiceURI);
ready.service.rate.set(0.7);
ready.service.speak('Grüße');
assert.equal(ready.spoken[1].voice, german);
assert.equal(ready.spoken[1].rate, 0.7);
ready.spoken[0].onerror({ error: 'network' });
assert.equal(ready.service.message(), '', 'Old requests must not overwrite current feedback');
ready.spoken[1].onerror({ error: 'network' });
assert.match(ready.service.message(), /nicht abgespielt/);
const delayed = setup();
delayed.service.speak('Erstes Wort');
delayed.service.speak('Zweites Wort');
assert.equal(delayed.spoken.length, 0);
delayed.load([english, german]);
assert.equal(delayed.spoken.length, 1);
assert.equal(delayed.spoken[0].text, 'Zweites Wort');
assert.equal(delayed.timers.size, 0);
const missing = setup([english]);
missing.service.speak('Deutsch');
missing.expire();
assert.equal(missing.spoken.length, 0, 'Never pronounce German with an English voice');
assert.match(missing.service.message(), /Keine deutsche Stimme/);
missing.load([german]);
assert.equal(missing.spoken.length, 0, 'Do not unexpectedly play a timed-out request');
missing.service.speak('Deutsch');
assert.equal(missing.spoken.length, 1);
const destroyed = setup();
destroyed.service.speak('Hallo');
destroyed.destroy();
assert.equal(destroyed.timers.size, 0);
assert.equal(destroyed.listeners.size, 0);

const bundled = setup([english], { noSynth: true });
assert(bundled.service.supported, 'Recordings work without speech synthesis');
bundled.service.speak('die Kunst');
assert.equal(bundled.recordings[0].src, `https://example.com/Lernreise/${manifest['die Kunst']}`);
assert.equal(bundled.recordings[0].playbackRate, 0.85);
assert.match(bundled.service.message(), /wird abgespielt/);
bundled.service.rate.set(0.7);
bundled.service.speak('die Kunst');
assert(bundled.recordings[0].paused, 'Cancel the previous recording');
assert.equal(bundled.recordings[1].playbackRate, 0.7);
bundled.recordings[0].onended();
assert.match(bundled.service.message(), /wird abgespielt/, 'Old playback must not clear current status');
bundled.recordings[1].onended();
assert.equal(bundled.service.message(), '');
bundled.destroy();
assert(bundled.recordings[1].paused);
const fallback = setup([german], { audioFails: true });
fallback.service.speak('die Kunst');
await Promise.resolve();
assert.equal(fallback.spoken[0].voice, german, 'Use only German synthesis if a recording fails');
const failed = setup([english], { audioFails: true });
failed.service.speak('die Kunst');
await Promise.resolve();
assert.equal(failed.spoken.length, 0);
assert.match(failed.service.message(), /Aufnahme konnte nicht geladen/);
const stale = setup([german], { audioFails: true });
stale.service.speak('die Kunst');
stale.service.preferredVoice.set(german.voiceURI);
stale.service.speak('Grüße');
await Promise.resolve();
assert.equal(stale.spoken.length, 1, 'Failed old audio must not replay after another request');
console.log('Speech checks passed: bundled audio without installed voices, base paths, speed, cancellation, errors, German-only fallback, delayed voices and cleanup.');
