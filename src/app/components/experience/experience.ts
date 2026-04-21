import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { EXPERIENCES } from '../../data/portfolio.data';
import type { ExperienceItem } from '../../models/portfolio.model';

/**
 * Experience section — renders a vertical timeline of work experience
 * entries ordered newest-first.
 */
@Component({
	selector: 'app-experience',
	templateUrl: './experience.html',
	styleUrl: './experience.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [TranslatePipe],
	host: {
		id: 'experience',
		class: 'section section--dark',
	},
})
export class ExperienceComponent {
	/** Immutable list of experience entries (newest first). */
	readonly experiences: readonly ExperienceItem[] = EXPERIENCES;
}
