import { TestBed } from '@angular/core/testing';
import { provideTranslateService, TranslateFakeLoader, TranslateLoader } from '@ngx-translate/core';
import { ExperienceComponent } from './experience';

describe('ExperienceComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExperienceComponent],
      providers: [
        provideTranslateService({
          loader: { provide: TranslateLoader, useClass: TranslateFakeLoader },
        }),
      ],
    }).compileComponents();
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(ExperienceComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render 5 timeline items', () => {
    const fixture = TestBed.createComponent(ExperienceComponent);
    fixture.detectChanges();
    const items = fixture.nativeElement.querySelectorAll('.timeline__item');
    expect(items.length).toBe(5);
  });

  it('should display EXPERIENCE.0.COMPANY key in the first timeline item', () => {
    const fixture = TestBed.createComponent(ExperienceComponent);
    fixture.detectChanges();
    const firstItem = fixture.nativeElement.querySelector('[data-testid="experience-item-0"]') as HTMLElement;
    expect(firstItem.textContent).toContain('EXPERIENCE.0.COMPANY');
  });
});
