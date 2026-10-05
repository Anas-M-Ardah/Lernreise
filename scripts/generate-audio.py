"""Generate bundled German MP3s. Requires edge-tts==7.2.8; run export-audio.mjs first."""
import asyncio
import json
from pathlib import Path
import edge_tts

ROOT = Path(__file__).resolve().parents[1]

async def main():
    manifest = json.loads((ROOT / 'public/audio/de/manifest.json').read_text(encoding='utf-8'))
    semaphore = asyncio.Semaphore(4)
    done = 0

    async def generate(text, relative):
        nonlocal done
        target = ROOT / 'public' / relative
        if not target.exists() or target.stat().st_size < 1000:
            async with semaphore:
                for attempt in range(3):
                    try:
                        await edge_tts.Communicate(text, 'de-DE-KatjaNeural').save(str(target))
                        break
                    except Exception:
                        if attempt == 2:
                            raise
                        await asyncio.sleep(2 * (attempt + 1))
        done += 1
        if done % 25 == 0 or done == len(manifest):
            print(f'{done}/{len(manifest)} German recordings ready', flush=True)

    await asyncio.gather(*(generate(text, relative) for text, relative in manifest.items()))

asyncio.run(main())
