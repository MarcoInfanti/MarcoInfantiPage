import { TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { provideTranslateService, TranslateFakeLoader, TranslateLoader } from '@ngx-translate/core';
import { LangToggleComponent } from './lang-toggle';
import { LanguageService } from '../../services/language.service';
import type { SupportedLang } from '../../models/portfolio.model';

describe('LangToggleComponent', () => {
  const toggleSpy = vi.fn();
  const currentSignal = signal<SupportedLang>('es');

  const stubLanguageService = {
    current: currentSignal.asReadonly(),
    initialize: vi.fn(),
    toggle: toggleSpy,
  };

  beforeEach(async () => {
    vi.clearAllMocks();
    await TestBed.configureTestingModule({
      imports: [LangToggleComponent],
      providers: [
        provideTranslateService({
          loader: { provide: TranslateLoader, useClass: TranslateFakeLoader },
        }),
        { provide: LanguageService, useValue: stubLanguageService },
      ],
    }).compileComponents();
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(LangToggleComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the toggle button', () => {
    const fixture = TestBed.createComponent(LangToggleComponent);
    fixture.detectChanges();
    const btn = fixture.nativeElement.querySelector('[data-testid="lang-toggle-btn"]');
    expect(btn).toBeTruthy();
  });

  it('should call toggle() when button is clicked', () => {
    const fixture = TestBed.createComponent(LangToggleComponent);
    fixture.detectChanges();
    const btn = fixture.nativeElement.querySelector('[data-testid="lang-toggle-btn"]') as HTMLButtonElement;
    btn.click();
    expect(toggleSpy).toHaveBeenCalledTimes(1);
  });

  it('should apply is-active to ES span when current lang is es', () => {
    currentSignal.set('es');
    const fixture = TestBed.createComponent(LangToggleComponent);
    fixture.detectChanges();
    const spans = fixture.nativeElement.querySelectorAll('.lang-toggle__code') as NodeListOf<HTMLElement>;
    expect(spans[0].classList.contains('is-active')).toBe(true);
    expect(spans[1].classList.contains('is-active')).toBe(false);
  });

  it('should apply is-active to EN span when current lang is en', () => {
    currentSignal.set('en');
    const fixture = TestBed.createComponent(LangToggleComponent);
    fixture.detectChanges();
    const spans = fixture.nativeElement.querySelectorAll('.lang-toggle__code') as NodeListOf<HTMLElement>;
    expect(spans[0].classList.contains('is-active')).toBe(false);
    expect(spans[1].classList.contains('is-active')).toBe(true);
  });
});
