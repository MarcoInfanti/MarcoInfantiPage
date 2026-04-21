import { TestBed } from '@angular/core/testing';
import { provideTranslateService, TranslateFakeLoader, TranslateLoader } from '@ngx-translate/core';
import { HeroComponent } from './hero';

describe('HeroComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroComponent],
      providers: [
        provideTranslateService({
          loader: { provide: TranslateLoader, useClass: TranslateFakeLoader },
        }),
      ],
    }).compileComponents();
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(HeroComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the full name in the h1', () => {
    const fixture = TestBed.createComponent(HeroComponent);
    fixture.detectChanges();
    const h1 = fixture.nativeElement.querySelector('h1') as HTMLElement;
    expect(h1.textContent).toContain('Marco A. Infanti');
  });

  it('should have a scroll-down anchor pointing to #about', () => {
    const fixture = TestBed.createComponent(HeroComponent);
    fixture.detectChanges();
    const anchor = fixture.nativeElement.querySelector('[data-testid="hero-scroll"]') as HTMLAnchorElement;
    expect(anchor.getAttribute('href')).toContain('#about');
  });

  it('should have a CTA anchor pointing to #contact', () => {
    const fixture = TestBed.createComponent(HeroComponent);
    fixture.detectChanges();
    const anchor = fixture.nativeElement.querySelector('[data-testid="hero-cta"]') as HTMLAnchorElement;
    expect(anchor.getAttribute('href')).toContain('#contact');
  });

  it('should render bio with translation key HERO.BIO', () => {
    const fixture = TestBed.createComponent(HeroComponent);
    fixture.detectChanges();
    const bio = fixture.nativeElement.querySelector('[data-testid="hero-bio"]') as HTMLElement;
    expect(bio.textContent?.trim()).toContain('HERO.BIO');
  });
});
