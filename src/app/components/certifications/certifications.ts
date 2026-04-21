import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { CERTIFICATIONS } from '../../data/portfolio.data';
import type { CertificationItem } from '../../models/portfolio.model';

/**
 * Certifications section — displays professional certifications as
 * a scrollable card grid ordered newest-first.
 */
@Component({
	selector: 'app-certifications',
	templateUrl: './certifications.html',
	styleUrl: './certifications.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [TranslatePipe],
	host: {
		id: 'certifications',
		class: 'section section--light',
	},
})
export class CertificationsComponent {
	/** Immutable list of certifications (newest first). */
	readonly certifications: readonly CertificationItem[] = CERTIFICATIONS;
}
