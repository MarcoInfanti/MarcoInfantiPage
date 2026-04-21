import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { SKILL_GROUPS } from '../../data/portfolio.data';
import type { SkillGroup } from '../../models/portfolio.model';

/**
 * Skills section — displays skill groups as cards with
 * chip lists and optional proficiency level badges.
 */
@Component({
	selector: 'app-skills',
	templateUrl: './skills.html',
	styleUrl: './skills.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [TranslatePipe],
	host: {
		id: 'skills',
		class: 'section section--light',
	},
})
export class SkillsComponent {
	/** Immutable grouped skill data. */
	readonly skillGroups: readonly SkillGroup[] = SKILL_GROUPS;
}
