import {
  ChangeDetectionStrategy,
  Component,
  PLATFORM_ID,
  inject,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-cv-download',
  templateUrl: './cv-download.html',
  styleUrl: './cv-download.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TranslatePipe],
  host: { class: 'cv-download-host' },
})
export class CvDownloadComponent {
  private readonly platformId = inject(PLATFORM_ID);

  onDownload(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    window.print();
  }
}
