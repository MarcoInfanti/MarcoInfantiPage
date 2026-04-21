import { inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import type { SupportedLang } from '../models/portfolio.model';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly translate = inject(TranslateService);

  private readonly storageKey = 'lang';
  private readonly _current = signal<SupportedLang>('es');

  readonly current = this._current.asReadonly();
  readonly available: readonly SupportedLang[] = ['es', 'en'];

  initialize(): void {
    this.translate.setDefaultLang('es');

    if (!isPlatformBrowser(this.platformId)) {
      this.translate.use('es');
      return;
    }

    const stored = localStorage.getItem(this.storageKey) as SupportedLang | null;
    const lang: SupportedLang =
      stored && this.available.includes(stored)
        ? stored
        : this.detectBrowserLang();

    this._current.set(lang);
    this.translate.use(lang);
    document.documentElement.lang = lang;
  }

  setLanguage(lang: SupportedLang): void {
    this._current.set(lang);
    this.translate.use(lang);

    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.storageKey, lang);
      document.documentElement.lang = lang;
    }
  }

  toggle(): void {
    this.setLanguage(this._current() === 'es' ? 'en' : 'es');
  }

  private detectBrowserLang(): SupportedLang {
    return navigator.language.toLowerCase().startsWith('en') ? 'en' : 'es';
  }
}
