import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { PERSONAL, STACK } from '../../data/portfolio.data';

/**
 * Hero section component — the landing viewport of the portfolio.
 * Displays a photo placeholder with initials, the owner's name, title,
 * a short bio tagline, and a CTA anchor to the contact section.
 */
@Component({
	selector: 'app-hero',
	templateUrl: './hero.html',
	styleUrl: './hero.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [TranslatePipe],
	host: {
		id: 'hero',
		class: 'section section--hero',
	},
})
export class HeroComponent {
	/** Immutable personal data pulled from the static data source. */
	readonly personal = PERSONAL;
	readonly stack = STACK
}
