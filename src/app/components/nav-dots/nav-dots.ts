import {
	afterNextRender,
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	computed,
	inject,
	OnDestroy,
	PLATFORM_ID,
	signal,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { NAV_SECTIONS } from '../../data/portfolio.data';
import type { NavSection } from '../../models/portfolio.model';

@Component({
	selector: 'app-nav-dots',
	templateUrl: './nav-dots.html',
	styleUrl: './nav-dots.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [TranslatePipe],
	host: {
		class: 'nav-dots-host',
		role: 'navigation',
		'[attr.aria-label]': 'navAriaLabel()',
	},
})
export class NavDotsComponent implements OnDestroy {
	readonly sections: readonly NavSection[] = NAV_SECTIONS;
	readonly activeId = signal<string>(NAV_SECTIONS[0].id);

	private readonly platformId = inject(PLATFORM_ID);
	private readonly cdr = inject(ChangeDetectorRef);
	private readonly translate = inject(TranslateService);

	private readonly langSignal = toSignal(this.translate.onLangChange, { initialValue: null });

	readonly navAriaLabel = computed(() => {
		this.langSignal();
		return this.translate.instant('NAV.ARIA');
	});

	private observer?: IntersectionObserver;

	constructor() {
		afterNextRender(() => {
			this.initObserver();
		});
	}

	ngOnDestroy(): void {
		this.observer?.disconnect();
	}

	private initObserver(): void {
		if (!isPlatformBrowser(this.platformId)) {
			return;
		}

		this.observer = new IntersectionObserver(
			(entries) => {
				this.handleIntersection(entries);
			},
			{ root: null, rootMargin: '0px', threshold: 0.55 },
		);

		for (const section of this.sections) {
			const el = document.getElementById(section.id);
			if (el) {
				this.observer.observe(el);
			}
		}
	}

	private handleIntersection(entries: IntersectionObserverEntry[]): void {
		for (const entry of entries) {
			if (entry.isIntersecting) {
				this.activeId.set(entry.target.id);
				this.cdr.markForCheck();
			}
		}
	}
}
