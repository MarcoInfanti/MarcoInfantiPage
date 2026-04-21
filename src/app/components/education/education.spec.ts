import { TestBed } from '@angular/core/testing';
import { provideTranslateService, TranslateFakeLoader, TranslateLoader } from '@ngx-translate/core';
import { EducationComponent } from './education';

describe('EducationComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EducationComponent],
      providers: [
        provideTranslateService({
          loader: { provide: TranslateLoader, useClass: TranslateFakeLoader },
        }),
      ],
    }).compileComponents();
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(EducationComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render exactly 2 education cards', () => {
    const fixture = TestBed.createComponent(EducationComponent);
    fixture.detectChanges();
    const cards = fixture.nativeElement.querySelectorAll('.edu-card');
    expect(cards.length).toBe(2);
  });

  it('should display note key EDUCATION.0.NOTE on the first card', () => {
    const fixture = TestBed.createComponent(EducationComponent);
    fixture.detectChanges();
    const firstCard = fixture.nativeElement.querySelector('[data-testid="education-card-0"]') as HTMLElement;
    expect(firstCard.textContent).toContain('EDUCATION.0.NOTE');
  });

  it('should not render a note element on the second card', () => {
    const fixture = TestBed.createComponent(EducationComponent);
    fixture.detectChanges();
    const secondNote = fixture.nativeElement.querySelector('[data-testid="education-note-1"]');
    expect(secondNote).toBeNull();
  });
});
