import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PLATFORM_ID } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CvDownloadComponent } from './cv-download';

describe('CvDownloadComponent', () => {
  let fixture: ComponentFixture<CvDownloadComponent>;
  let component: CvDownloadComponent;

  async function setup(platformId: object | string = 'browser'): Promise<void> {
    await TestBed.configureTestingModule({
      imports: [CvDownloadComponent, TranslateModule.forRoot()],
      providers: [{ provide: PLATFORM_ID, useValue: platformId }],
    }).compileComponents();

    fixture = TestBed.createComponent(CvDownloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }

  it('creates the component', async () => {
    await setup();
    expect(component).toBeTruthy();
  });

  it('renders a button with CV.DOWNLOAD_ARIA aria-label', async () => {
    await setup();
    const btn: HTMLButtonElement = fixture.nativeElement.querySelector('button.cv-download');
    expect(btn).toBeTruthy();
    expect(btn.getAttribute('aria-label')).toBe('CV.DOWNLOAD_ARIA');
  });

  it('calls window.print() on click in browser platform', async () => {
    await setup('browser');
    const printSpy = vi.spyOn(window, 'print').mockImplementation(() => {});
    const btn: HTMLButtonElement = fixture.nativeElement.querySelector('button.cv-download');
    btn.click();
    expect(printSpy).toHaveBeenCalledTimes(1);
    printSpy.mockRestore();
  });

  it('does NOT call window.print() on the server platform', async () => {
    await setup('server');
    const printSpy = vi.spyOn(window, 'print').mockImplementation(() => {});
    component.onDownload();
    expect(printSpy).not.toHaveBeenCalled();
    printSpy.mockRestore();
  });

  it('SVG icon has aria-hidden and focusable=false', async () => {
    await setup();
    const svg = fixture.nativeElement.querySelector('svg');
    expect(svg.getAttribute('aria-hidden')).toBe('true');
    expect(svg.getAttribute('focusable')).toBe('false');
  });
});
