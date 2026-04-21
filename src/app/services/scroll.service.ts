import {
	computed,
	inject,
	Injectable,
	OnDestroy,
	PLATFORM_ID,
	signal,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { NAV_SECTIONS } from '../data/portfolio.data';

/** Section IDs derived from portfolio navigation data. */
const SECTION_IDS: readonly string[] = NAV_SECTIONS.map((s) => s.id);

/** Milliseconds to lock scroll after a section change. */
const COOLDOWN_MS = 800;

/** Minimum wheel deltaY to trigger section navigation (ignores touchpad noise). */
const WHEEL_THRESHOLD = 10;

/** Editable HTML tags where keyboard navigation should not be intercepted. */
const EDITABLE_TAGS = new Set(['INPUT', 'TEXTAREA', 'SELECT']);

/**
 * SSR-safe scroll controller that advances the viewport exactly one section
 * per wheel or keyboard event. A cooldown lock prevents rapid repeat
 * navigation during the smooth-scroll animation.
 */
@Injectable({ providedIn: 'root' })
export class ScrollService implements OnDestroy {
	/** Ordered section IDs matching the DOM. */
	readonly sections: readonly string[] = SECTION_IDS as readonly string[];

	private readonly platformId = inject(PLATFORM_ID);

	private readonly _currentIndex = signal<number>(0);
	private readonly _isLocked = signal<boolean>(false);

	/** Read-only signal of the current section index. */
	readonly currentIndex = this._currentIndex.asReadonly();

	/** Read-only signal indicating whether scroll is locked during animation. */
	readonly isLocked = this._isLocked.asReadonly();

	/** Computed id of the currently visible section. */
	readonly currentSectionId = computed(() => this.sections[this._currentIndex()]);

	private readonly cooldownMs = COOLDOWN_MS;
	private readonly wheelDeltaThreshold = WHEEL_THRESHOLD;
	private cooldownTimer?: ReturnType<typeof setTimeout>;
	private initialized = false;

	private readonly onWheelBound = (e: WheelEvent): void => this.onWheel(e);
	private readonly onKeydownBound = (e: KeyboardEvent): void => this.onKeydown(e);
	private readonly onHashChangeBound = (): void => this.onHashChange();

	/**
	 * Initialises browser listeners. Must be called from `afterNextRender` to
	 * remain SSR-safe. Subsequent calls are no-ops (idempotent).
	 */
	initialize(): void {
		if (!isPlatformBrowser(this.platformId) || this.initialized) return;
		this.initialized = true;

		this.syncIndexFromHash();

		const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		if (!reducedMotion) {
			window.addEventListener('wheel', this.onWheelBound, { passive: false });
			window.addEventListener('keydown', this.onKeydownBound);
		}
		window.addEventListener('hashchange', this.onHashChangeBound);
	}

	/**
	 * Navigates to the next section, clamping at the last.
	 */
	goToNext(): void {
		this.goToIndex(this._currentIndex() + 1);
	}

	/**
	 * Navigates to the previous section, clamping at the first.
	 */
	goToPrev(): void {
		this.goToIndex(this._currentIndex() - 1);
	}

	/**
	 * Navigates to an arbitrary section index, clamping to valid bounds.
	 * @param index - Target section index (will be clamped).
	 */
	goToIndex(index: number): void {
		const clamped = Math.max(0, Math.min(index, this.sections.length - 1));
		this._currentIndex.set(clamped);
		this.startCooldown();
		const el = document.getElementById(this.sections[clamped]);
		if (!el) return;
		el.scrollIntoView({ behavior: 'smooth', block: 'start' });
	}

	/** Removes global listeners and cancels the pending cooldown timer. */
	ngOnDestroy(): void {
		if (!isPlatformBrowser(this.platformId)) return;
		window.removeEventListener('wheel', this.onWheelBound);
		window.removeEventListener('keydown', this.onKeydownBound);
		window.removeEventListener('hashchange', this.onHashChangeBound);
		clearTimeout(this.cooldownTimer);
	}

	private onWheel(event: WheelEvent): void {
		if (this._isLocked()) {
			event.preventDefault();
			return;
		}
		if (Math.abs(event.deltaY) < this.wheelDeltaThreshold) return;
		if (this.isInsideScrollableContainer(event)) return;
		event.preventDefault();
		if (event.deltaY > 0) {
			this.goToNext();
		} else {
			this.goToPrev();
		}
	}

	/**
	 * Returns true if the wheel event originates inside an overflow-scrollable
	 * container that still has room to scroll in the intended direction.
	 * In that case the native scroll should proceed and section nav is skipped.
	 */
	private isInsideScrollableContainer(event: WheelEvent): boolean {
		const goingDown = event.deltaY > 0;
		let el = event.target as HTMLElement | null;

		while (el && el !== document.documentElement) {
			const { overflowY } = window.getComputedStyle(el);
			const scrollable = overflowY === 'auto' || overflowY === 'scroll' || overflowY === 'overlay';

			if (scrollable) {
				const { scrollTop, scrollHeight, clientHeight } = el;
				const atBottom = scrollTop + clientHeight >= scrollHeight - 1;
				const atTop = scrollTop === 0;

				if (goingDown && !atBottom) return true;
				if (!goingDown && !atTop) return true;
			}

			el = el.parentElement;
		}

		return false;
	}

	private onKeydown(event: KeyboardEvent): void {
		const target = event.target as HTMLElement;
		if (target && (target.isContentEditable || EDITABLE_TAGS.has(target.tagName))) return;

		if (this._isLocked()) {
			const intercepted = this.isInterceptedKey(event.key);
			if (intercepted) event.preventDefault();
			return;
		}

		switch (event.key) {
			case 'ArrowDown':
			case 'PageDown':
			case ' ':
				event.preventDefault();
				this.goToNext();
				break;
			case 'ArrowUp':
			case 'PageUp':
				event.preventDefault();
				this.goToPrev();
				break;
			case 'Home':
				event.preventDefault();
				this.goToIndex(0);
				break;
			case 'End':
				event.preventDefault();
				this.goToIndex(this.sections.length - 1);
				break;
			default:
				break;
		}
	}

	private onHashChange(): void {
		this.syncIndexFromHash();
		this.startCooldown();
	}

	private syncIndexFromHash(): void {
		const hash = window.location.hash.slice(1);
		const idx = (this.sections as string[]).indexOf(hash);
		if (idx !== -1) this._currentIndex.set(idx);
	}

	private startCooldown(): void {
		this._isLocked.set(true);
		clearTimeout(this.cooldownTimer);
		this.cooldownTimer = setTimeout(() => {
			this._isLocked.set(false);
		}, this.cooldownMs);
	}

	/**
	 * Returns true if the given key is one that the service normally intercepts.
	 * @param key - The `KeyboardEvent.key` value to check.
	 * @returns Whether this key would be handled by the navigation logic.
	 */
	private isInterceptedKey(key: string): boolean {
		return ['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'Home', 'End', ' '].includes(key);
	}
}
