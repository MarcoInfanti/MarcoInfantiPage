import { TestBed } from '@angular/core/testing';
import { provideTranslateService, TranslateFakeLoader, TranslateLoader } from '@ngx-translate/core';
import { AboutComponent } from './about';

describe('AboutComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutComponent],
      providers: [
        provideTranslateService({
          loader: { provide: TranslateLoader, useClass: TranslateFakeLoader },
        }),
      ],
    }).compileComponents();
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(AboutComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render a bio paragraph with translation key PERSONAL.BIO', () => {
    const fixture = TestBed.createComponent(AboutComponent);
    fixture.detectChanges();
    const bio = fixture.nativeElement.querySelector('[data-testid="about-bio"]') as HTMLElement;
    expect(bio.textContent).toContain('PERSONAL.BIO');
  });

  it('should render exactly 3 language list items', () => {
    const fixture = TestBed.createComponent(AboutComponent);
    fixture.detectChanges();
    const langList = fixture.nativeElement.querySelector('[data-testid="about-lang-list"]') as HTMLElement;
    const items = langList.querySelectorAll('li');
    expect(items.length).toBe(3);
  });

  it('levelDots returns 3 for Native, 2 for Intermediate, 1 for Learning', () => {
    const fixture = TestBed.createComponent(AboutComponent);
    const comp = fixture.componentInstance;
    expect(comp.levelDots('Native')).toBe(3);
    expect(comp.levelDots('Intermediate')).toBe(2);
    expect(comp.levelDots('Learning')).toBe(1);
  });

  it('levelKeyFor returns correct translation keys', () => {
    const fixture = TestBed.createComponent(AboutComponent);
    const comp = fixture.componentInstance;
    expect(comp.levelKeyFor('Native')).toBe('ABOUT.LEVEL_NATIVE');
    expect(comp.levelKeyFor('Intermediate')).toBe('ABOUT.LEVEL_INTERMEDIATE');
    expect(comp.levelKeyFor('Learning')).toBe('ABOUT.LEVEL_LEARNING');
  });
});
