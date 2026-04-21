import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { PERSONAL } from '../../data/portfolio.data';

/**
 * Contact section — displays contact links, social profiles,
 * and a copyright footer.
 *
 * Uses `signal()` for `currentYear` so change detection is efficient,
 * while remaining SSR-safe because `new Date()` is valid on both
 * browser and Node platforms.
 */
@Component({
	selector: 'app-contact',
	templateUrl: './contact.html',
	styleUrl: './contact.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [TranslatePipe],
	host: {
		id: 'contact',
		class: 'section section--hero',
	},
})
export class ContactComponent {
	/** Personal and contact information. */
	readonly personal = PERSONAL;

	/** Current four-digit year — safe on both SSR and browser. */
	readonly currentYear = signal(new Date().getFullYear());
}
