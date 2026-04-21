import { afterNextRender, ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { HeroComponent } from './components/hero/hero';
import { AboutComponent } from './components/about/about';
import { ExperienceComponent } from './components/experience/experience';
import { SkillsComponent } from './components/skills/skills';
import { EducationComponent } from './components/education/education';
import { CertificationsComponent } from './components/certifications/certifications';
import { ContactComponent } from './components/contact/contact';
import { NavDotsComponent } from './components/nav-dots/nav-dots';
import { LangToggleComponent } from './components/lang-toggle/lang-toggle';
import { CvDownloadComponent } from './components/cv-download/cv-download';
import { ScrollService } from './services/scroll.service';

@Component({
	selector: 'app-root',
	imports: [
		TranslatePipe,
		HeroComponent,
		AboutComponent,
		ExperienceComponent,
		SkillsComponent,
		EducationComponent,
		CertificationsComponent,
		ContactComponent,
		NavDotsComponent,
		LangToggleComponent,
		CvDownloadComponent,
	],
	templateUrl: './app.html',
	styleUrl: './app.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
	private readonly scrollService = inject(ScrollService);

	constructor() {
		afterNextRender(() => this.scrollService.initialize());
	}
}
