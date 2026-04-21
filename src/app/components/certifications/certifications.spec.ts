import { TestBed } from '@angular/core/testing';
import { provideTranslateService, TranslateFakeLoader, TranslateLoader } from '@ngx-translate/core';
import { CertificationsComponent } from './certifications';

describe('CertificationsComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CertificationsComponent],
      providers: [
        provideTranslateService({
          loader: { provide: TranslateLoader, useClass: TranslateFakeLoader },
        }),
      ],
    }).compileComponents();
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(CertificationsComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render exactly 6 certification cards', () => {
    const fixture = TestBed.createComponent(CertificationsComponent);
    fixture.detectChanges();
    const cards = fixture.nativeElement.querySelectorAll('.cert-card');
    expect(cards.length).toBe(6);
  });

  it('should display CERTIFICATIONS.0.TITLE key in the first card', () => {
    const fixture = TestBed.createComponent(CertificationsComponent);
    fixture.detectChanges();
    const firstCard = fixture.nativeElement.querySelector('[data-testid="certifications-card-0"]') as HTMLElement;
    expect(firstCard.textContent).toContain('CERTIFICATIONS.0.TITLE');
  });
});
