import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { EDUCATION } from '../../data/portfolio.data';
import type { EducationItem } from '../../models/portfolio.model';

/**
 * Education section — displays academic qualifications as cards
 * in a responsive two-column grid.
 */
@Component({
	selector: 'app-education',
	templateUrl: './education.html',
	styleUrl: './education.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [TranslatePipe],
	host: {
		id: 'education',
		class: 'section section--dark',
	},
})
export class EducationComponent {
	/** Immutable list of education records (newest first). */
	readonly education: readonly EducationItem[] = EDUCATION;
}
