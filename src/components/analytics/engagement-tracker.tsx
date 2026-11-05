"use client";

import { usePathname } from "@/i18n/navigation";
import { useEffect } from "react";

declare global {
	interface Window {
		goatcounter?: {
			count: (event: { path: string; title: string; event: true }) => void;
		};
	}
}

const SECTION_IDS = ["home", "experience", "education", "projects", "skills", "contact"];
const SECTION_THRESHOLD = 0.25;
const DWELL_SECONDS = 5;

const CV_CTA_SELECTOR = '[data-analytics-target="cv-cta"]';
const CV_CTA_THRESHOLD = 0.5;

const GOATCOUNTER_MAX_ATTEMPTS = 20;
const GOATCOUNTER_RETRY_MS = 250;

// Module scope: dedupe survives effect re-runs and remounts within a page load.
const sentEvents = new Set<string>();

function sendWhenReady(path: string, title: string, attempt = 0) {
	if (window.goatcounter?.count) {
		window.goatcounter.count({ path, title, event: true });
	} else if (attempt < GOATCOUNTER_MAX_ATTEMPTS) {
		window.setTimeout(() => sendWhenReady(path, title, attempt + 1), GOATCOUNTER_RETRY_MS);
	}
}

function trackOnce(path: string, title: string) {
	if (sentEvents.has(path)) {
		return;
	}

	sentEvents.add(path);
	sendWhenReady(path, title);
}

/** Observes targets; returns a cleanup function. No-op when unsupported or empty. */
function observe(
	targets: Element[],
	threshold: number,
	onChange: (entry: IntersectionObserverEntry) => void,
): () => void {
	if (!("IntersectionObserver" in window) || targets.length === 0) {
		return () => {};
	}

	const observer = new IntersectionObserver((entries) => entries.forEach(onChange), { threshold });
	for (const target of targets) {
		observer.observe(target);
	}

	return () => observer.disconnect();
}

export function EngagementTracker() {
	const pathname = usePathname();

	useEffect(() => {
		// A dwell timer runs only while its section stays visible.
		const dwellTimers = new Map<string, number>();

		const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(
			(el): el is HTMLElement => el !== null,
		);

		const stopSections = observe(sections, SECTION_THRESHOLD, ({ target, isIntersecting }) => {
			const id = target.id;

			window.clearTimeout(dwellTimers.get(id));
			dwellTimers.delete(id);

			if (!isIntersecting) {
				return;
			}

			dwellTimers.set(
				id,
				window.setTimeout(
					() =>
						trackOnce(
							`engagement-${id}-${DWELL_SECONDS}s`,
							`${id} section viewed for ${DWELL_SECONDS} seconds`,
						),
					DWELL_SECONDS * 1000,
				),
			);
		});

		const cvCta = document.querySelector(CV_CTA_SELECTOR);
		const stopCvCta = observe(cvCta ? [cvCta] : [], CV_CTA_THRESHOLD, ({ isIntersecting }) => {
			if (isIntersecting) {
				trackOnce("cta-cv-visible", "CV download button visible");
			}
		});

		return () => {
			stopSections();
			stopCvCta();

			for (const timer of dwellTimers.values()) {
				window.clearTimeout(timer);
			}
		};
	}, [pathname]);

	return null;
}
