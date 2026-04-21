import { TestBed } from '@angular/core/testing';
import { provideTranslateService, TranslateFakeLoader, TranslateLoader } from '@ngx-translate/core';
import { NavDotsComponent } from './nav-dots';

(globalThis as any).IntersectionObserver = class {
  observe() {}
  disconnect() {}
  unobserve() {}
};

describe('NavDotsComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavDotsComponent],
      providers: [
        provideTranslateService({
          loader: { provide: TranslateLoader, useClass: TranslateFakeLoader },
        }),
      ],
    }).compileComponents();
  });

  it('should create the component without throwing', () => {
    const fixture = TestBed.createComponent(NavDotsComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render 7 anchor elements — one per nav section', () => {
    const fixture = TestBed.createComponent(NavDotsComponent);
    fixture.detectChanges();
    const anchors = fixture.nativeElement.querySelectorAll('a');
    expect(anchors.length).toBe(7);
  });

  it('should set is-active class on the anchor matching activeId', () => {
    const fixture = TestBed.createComponent(NavDotsComponent);
    fixture.detectChanges();
    const comp = fixture.componentInstance;
    comp.activeId.set('experience');
    fixture.detectChanges();
    const activeAnchors = fixture.nativeElement.querySelectorAll('a.is-active');
    expect(activeAnchors.length).toBe(1);
    expect(activeAnchors[0].getAttribute('aria-current')).toBe('true');
  });

  it('should render tooltip with NAV.HERO key for the first dot', () => {
    const fixture = TestBed.createComponent(NavDotsComponent);
    fixture.detectChanges();
    const firstTooltip = fixture.nativeElement.querySelector('.nav-dots__tooltip') as HTMLElement;
    expect(firstTooltip.textContent?.trim()).toBe('NAV.HERO');
  });
});
