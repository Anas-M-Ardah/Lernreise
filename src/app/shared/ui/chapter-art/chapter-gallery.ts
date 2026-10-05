import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ChapterArt } from './chapter-art';
import { Icon } from '../icon/icon';

@Component({
  selector: 'app-chapter-gallery',
  imports: [ChapterArt, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'aria-hidden': 'true' },
  template: `
    <div class="print print--back" data-unit="7"><app-chapter-art [unit]="7" /></div>
    <div class="print print--middle" data-unit="8"><app-chapter-art [unit]="8" /></div>
    <div class="print print--front" data-unit="9"><app-chapter-art [unit]="9" /><span>Raum für neue Ideen.</span></div>
    <span class="seal"><app-icon name="sparkles" [size]="18" /> Lernen mit Neugier</span>
  `,
  styles: `
    :host { display: block; position: relative; height: 320px; margin: 15px 10px 0; }
    .print { position: absolute; width: 68%; border: 7px solid var(--color-surface); border-radius: 6px; background: var(--unit-stage); box-shadow: 0 15px 35px -20px rgb(40 35 55 / .3); }
    .print--back { top: 0; left: 0; transform: rotate(-14deg); }
    .print--middle { top: 40px; right: 0; transform: rotate(13deg); }
    .print--front { top: 92px; left: 16%; transform: rotate(-4deg); }
    .print--front span { display: block; background: var(--color-surface); text-align: center; padding: 8px 0 2px; font-size: .75rem; font-weight: 600; color: var(--color-fg-muted); }
    .seal { position: absolute; bottom: -6px; right: 0; display: flex; align-items: center; gap: 8px; padding: 12px 16px; background: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--radius-pill); font-size: .75rem; font-weight: 700; transform: rotate(4deg); }
  `,
})
export class ChapterGallery {}
