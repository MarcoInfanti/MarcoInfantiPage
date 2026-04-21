import { Injectable } from '@angular/core';
import { TranslateLoader } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import es from '../../assets/i18n/es.json';
import en from '../../assets/i18n/en.json';

type Translations = Record<string, unknown>;

const BUNDLES: Readonly<Record<string, Translations>> = { es, en } as const;

@Injectable({ providedIn: 'root' })
export class InlineTranslateLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<Translations> {
    const bundle = BUNDLES[lang] ?? BUNDLES['es'];
    return of(bundle);
  }
}
