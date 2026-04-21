import { TestBed } from '@angular/core/testing';
import { PLATFORM_ID } from '@angular/core';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { ScrollService } from './scroll.service';

describe('ScrollService', () => {
	let service: ScrollService;
	let addSpy: ReturnType<typeof vi.spyOn>;
	let removeSpy: ReturnType<typeof vi.spyOn>;
	let fakeEl: { scrollIntoView: ReturnType<typeof vi.fn> };

	beforeEach(() => {
		// jsdom does not define matchMedia — define it before the service reads it
		Object.defineProperty(window, 'matchMedia', {
			writable: true,
			configurable: true,
			value: vi.fn().mockReturnValue({ matches: false } as MediaQueryList),
		});

		TestBed.configureTestingModule({
			providers: [{ provide: PLATFORM_ID, useValue: 'browser' }],
		});

		// Stub document.getElementById before service is resolved
		fakeEl = { scrollIntoView: vi.fn() };
		vi.spyOn(document, 'getElementById').mockReturnValue(fakeEl as unknown as HTMLElement);

		addSpy = vi.spyOn(window, 'addEventListener');
		removeSpy = vi.spyOn(window, 'removeEventListener');

		service = TestBed.inject(ScrollService);
	});

	afterEach(() => {
		vi.restoreAllMocks();
		TestBed.resetTestingModule();
	});

	it('initialize() registers 3 event listeners on window', () => {
		service.initialize();
		const calls = addSpy.mock.calls.map((c: Parameters<typeof window.addEventListener>) => c[0]);
		expect(calls.filter((n: string) => n === 'wheel').length).toBe(1);
		expect(calls.filter((n: string) => n === 'keydown').length).toBe(1);
		expect(calls.filter((n: string) => n === 'hashchange').length).toBe(1);
	});

	it('scrollTo(2) sets currentIndex to 2 and calls scrollIntoView', () => {
		service.initialize();
		service.goToIndex(2);
		expect(service.currentIndex()).toBe(2);
		expect(fakeEl.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth', block: 'start' });
	});

	it('goToIndex(-1) clamps to 0', () => {
		service.initialize();
		service.goToIndex(-1);
		expect(service.currentIndex()).toBe(0);
	});

	it('goToIndex(99) clamps to last section index (6)', () => {
		service.initialize();
		service.goToIndex(99);
		expect(service.currentIndex()).toBe(6);
	});

	it('ngOnDestroy removes 3 listeners', () => {
		service.initialize();
		service.ngOnDestroy();
		const calls = removeSpy.mock.calls.map((c: Parameters<typeof window.removeEventListener>) => c[0]);
		expect(calls).toContain('wheel');
		expect(calls).toContain('keydown');
		expect(calls).toContain('hashchange');
	});
});
