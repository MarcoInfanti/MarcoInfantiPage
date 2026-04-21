import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { LANGUAGES, PERSONAL } from '../../data/portfolio.data';
import type { LanguageItem } from '../../models/portfolio.model';

interface InfoRow {
  labelKey: string;
  value?: string;
  valueKey?: string;
  isKey: boolean;
}

@Component({
	selector: 'app-about',
	templateUrl: './about.html',
	styleUrl: './about.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [TranslatePipe],
	host: {
		id: 'about',
		class: 'section section--light',
	},
})
export class AboutComponent {
	readonly personal = PERSONAL;
	readonly languages: readonly LanguageItem[] = LANGUAGES;

	readonly infoRows: readonly InfoRow[] = [
		{ labelKey: 'ABOUT.INFO_NATIONALITY', valueKey: 'PERSONAL.NATIONALITY', isKey: true },
		{ labelKey: 'ABOUT.INFO_EMAIL', value: this.personal.email, isKey: false },
		{ labelKey: 'ABOUT.INFO_LOCATION', value: this.personal.location, isKey: false },
	] as const;

	levelDots(level: string): number {
		if (level === 'Native') return 3;
		if (level === 'Intermediate') return 2;
		return 1;
	}

	levelKeyFor(level: string): string {
		if (level === 'Native') return 'ABOUT.LEVEL_NATIVE';
		if (level === 'Intermediate') return 'ABOUT.LEVEL_INTERMEDIATE';
		return 'ABOUT.LEVEL_LEARNING';
	}
}
