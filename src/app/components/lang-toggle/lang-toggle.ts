import { afterNextRender, ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-lang-toggle',
  templateUrl: './lang-toggle.html',
  styleUrl: './lang-toggle.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TranslatePipe],
  host: { class: 'lang-toggle-host' },
})
export class LangToggleComponent {
  private readonly languageService = inject(LanguageService);

  readonly current = this.languageService.current;

  constructor() {
    afterNextRender(() => this.languageService.initialize());
  }

  onToggle(): void {
    this.languageService.toggle();
  }
}
