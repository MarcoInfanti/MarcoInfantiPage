import { TestBed } from '@angular/core/testing';
import { provideTranslateService, TranslateFakeLoader, TranslateLoader } from '@ngx-translate/core';
import { SkillsComponent } from './skills';

describe('SkillsComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkillsComponent],
      providers: [
        provideTranslateService({
          loader: { provide: TranslateLoader, useClass: TranslateFakeLoader },
        }),
      ],
    }).compileComponents();
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(SkillsComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render exactly 3 skill group cards', () => {
    const fixture = TestBed.createComponent(SkillsComponent);
    fixture.detectChanges();
    const cards = fixture.nativeElement.querySelectorAll('.skills-card');
    expect(cards.length).toBe(3);
  });

  it('should render a chip with text "TypeScript"', () => {
    const fixture = TestBed.createComponent(SkillsComponent);
    fixture.detectChanges();
    const chips = fixture.nativeElement.querySelectorAll('.skill-chip__name') as NodeListOf<HTMLElement>;
    const names = Array.from(chips).map(el => el.textContent?.trim());
    expect(names).toContain('TypeScript');
  });

  it('should render level badge SKILLS.LEVEL_SENIOR for TypeScript chip', () => {
    const fixture = TestBed.createComponent(SkillsComponent);
    fixture.detectChanges();
    const tsChip = fixture.nativeElement.querySelector('[data-testid="skills-chip-typescript"]') as HTMLElement;
    const badge = tsChip?.querySelector('.chip__level') as HTMLElement;
    expect(badge).toBeTruthy();
    expect(badge.textContent?.trim()).toBe('SKILLS.LEVEL_SENIOR');
  });

  it('should not render level badge for N/A chips', () => {
    const fixture = TestBed.createComponent(SkillsComponent);
    fixture.detectChanges();
    const angularChip = fixture.nativeElement.querySelector('[data-testid="skills-chip-angular"]') as HTMLElement;
    expect(angularChip.querySelector('.chip__level')).toBeNull();
  });
});
