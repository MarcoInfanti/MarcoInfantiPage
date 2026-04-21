import { TestBed } from '@angular/core/testing';
import { provideTranslateService, TranslateFakeLoader, TranslateLoader } from '@ngx-translate/core';
import { ContactComponent } from './contact';

describe('ContactComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactComponent],
      providers: [
        provideTranslateService({
          loader: { provide: TranslateLoader, useClass: TranslateFakeLoader },
        }),
      ],
    }).compileComponents();
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(ContactComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the email anchor with mailto:marcoaic1994@gmail.com', () => {
    const fixture = TestBed.createComponent(ContactComponent);
    fixture.detectChanges();
    const emailAnchor = fixture.nativeElement.querySelector('[data-testid="contact-email"]') as HTMLAnchorElement;
    expect(emailAnchor.getAttribute('href')).toBe('mailto:marcoaic1994@gmail.com');
  });

  it('should render the footer with the current four-digit year', () => {
    const fixture = TestBed.createComponent(ContactComponent);
    fixture.detectChanges();
    const footer = fixture.nativeElement.querySelector('[data-testid="contact-footer"]') as HTMLElement;
    const currentYear = new Date().getFullYear().toString();
    expect(footer.textContent).toContain(currentYear);
  });

  it('should render email aria-label containing CONTACT.EMAIL_ARIA_PREFIX key', () => {
    const fixture = TestBed.createComponent(ContactComponent);
    fixture.detectChanges();
    const emailAnchor = fixture.nativeElement.querySelector('[data-testid="contact-email"]') as HTMLAnchorElement;
    expect(emailAnchor.getAttribute('aria-label')).toContain('CONTACT.EMAIL_ARIA_PREFIX');
  });
});
