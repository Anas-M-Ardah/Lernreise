import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/** Decorative vector artwork; its chapter context is conveyed in the adjacent text. */
@Component({
  selector: 'app-chapter-art',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'aria-hidden': 'true' },
  template: `
    <svg viewBox="0 0 320 210" fill="none" aria-hidden="true" focusable="false">
      @switch (unit()) {
        @case (7) {
          <circle cx="246" cy="57" r="31" class="pop" />
          <path d="M53 179C15 107 48 31 132 31H158V179H53Z" class="soft" />
          <g transform="rotate(-9 124 91)">
            <rect x="56" y="43" width="145" height="91" rx="23" class="paper" />
            <path d="M80 130L78 153L111 132" class="paper" />
            <path d="M83 75H159M83 94H135" class="line" />
          </g>
          <g transform="rotate(8 212 137)">
            <rect x="139" y="95" width="131" height="84" rx="22" class="accent" />
            <path d="M239 171L253 192L218 177" class="accent" />
            <path d="M204 148L185 131C171 116 189 105 204 119C219 105 237 116 223 131L204 148Z" class="white" />
          </g>
          <circle cx="52" cy="158" r="8" class="accent" />
          <path d="M288 97V115M279 106H297" class="line" />
        }
        @case (8) {
          <circle cx="162" cy="108" r="83" class="soft" />
          <circle cx="162" cy="108" r="60" class="ring" />
          <rect x="43" y="78" width="229" height="66" rx="33" class="paper" transform="rotate(-8 157 111)" />
          <path d="M68 111H85L96 94L109 134L124 78L140 145L153 108H169L181 92L194 126L207 108H242" class="wave" />
          <path d="M219 71C220 35 240 19 278 24C276 59 256 78 219 71Z" class="accent" />
          <path d="M218 75L263 36" class="leaf-line" />
          <circle cx="64" cy="52" r="17" class="pop" />
          <path d="M218 161V185C218 196 201 196 201 186C201 178 211 176 218 180M218 161L242 155V177C242 188 225 188 225 179C225 171 236 168 242 172" class="line" />
        }
        @default {
          <rect x="63" y="25" width="185" height="163" rx="7" class="paper" transform="rotate(-8 155 107)" />
          <path d="M75 78C75 53 95 33 119 33H150V156H75V78Z" class="accent" />
          <circle cx="190" cy="80" r="39" class="pop" />
          <path d="M119 162L170 97L219 162H119Z" class="soft" />
          <path d="M167 37H213M84 176H139" class="line" />
          <g transform="rotate(28 261 137)">
            <rect x="254" y="89" width="12" height="85" rx="6" class="accent" />
            <path d="M253 178H267L269 198H251L253 178Z" class="pop" />
          </g>
          <path d="M42 50V68M33 59H51" class="line" />
          <circle cx="281" cy="56" r="7" class="accent" />
        }
      }
    </svg>
  `,
  styles: `
    :host { display: block; width: 100%; }
    svg { display: block; width: 100%; height: auto; overflow: visible; }
    .accent { fill: var(--unit-accent, var(--color-primary)); }
    .soft { fill: var(--unit-soft, var(--color-primary-soft)); }
    .pop { fill: var(--unit-pop, #e7b16b); }
    .paper { fill: var(--color-surface); }
    .white { fill: var(--color-on-primary); }
    .line, .wave { stroke: var(--unit-ink, var(--color-primary-strong)); stroke-width: 5; stroke-linecap: round; stroke-linejoin: round; }
    .wave { stroke: var(--unit-accent, var(--color-primary)); stroke-width: 4; }
    .ring { stroke: var(--unit-accent, var(--color-primary)); stroke-width: 2; opacity: .3; }
    .leaf-line { stroke: var(--color-surface); stroke-width: 2; stroke-linecap: round; }
  `,
})
export class ChapterArt {
  readonly unit = input.required<number>();
}
