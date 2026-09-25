import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

const RADIUS = 20;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

@Component({
  selector: 'app-progress-ring',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    role: 'img',
    '[attr.aria-label]': 'label() + ": " + percent() + "%"',
  },
  template: `
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <circle class="track" cx="24" cy="24" [attr.r]="radius" />
      <circle
        class="value"
        cx="24"
        cy="24"
        [attr.r]="radius"
        [attr.stroke-dasharray]="circumference"
        [attr.stroke-dashoffset]="offset()"
      />
    </svg>
    <span class="percent">{{ percent() }}%</span>
  `,
  styleUrl: './progress-ring.scss',
})
export class ProgressRing {
  /** Progress between 0 and 1. */
  readonly value = input.required<number>();
  readonly label = input('Fortschritt');

  protected readonly radius = RADIUS;
  protected readonly circumference = CIRCUMFERENCE;
  protected readonly percent = computed(() => Math.round(this.value() * 100));
  protected readonly offset = computed(() => CIRCUMFERENCE * (1 - this.value()));
}
