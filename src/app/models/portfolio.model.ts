/** Supported UI languages. */
export type SupportedLang = 'es' | 'en';

/** Represents a single work experience entry. */
export interface ExperienceItem {
	/** Job title or role. */
	role: string;
	/** Company name. */
	company: string;
	/** Human-readable period string, e.g. "Mayo 2023 - Presente". */
	period: string;
	/** Short description of responsibilities / technologies used. */
	description: string;
}

/** A skill with an optional proficiency level. */
export interface SkillItem {
	/** Display name of the skill. */
	name: string;
	/** Proficiency level; use 'N/A' when not applicable. Internal English sentinel used for CSS class binding. */
	level: 'Senior' | 'Semi-senior' | 'Junior' | 'N/A';
	/** Translation key for the level badge (e.g. 'SKILLS.LEVEL_SENIOR'). Omit when level is 'N/A'. */
	levelKey?: string;
	image?: string;
}

/** A named group of skill items (e.g. "Lenguajes", "Bases de Datos"). */
export interface SkillGroup {
	/** Category title shown as a card heading. */
	title: string;
	/** Skills belonging to this group. */
	items: SkillItem[];
}

/** A single education record. */
export interface EducationItem {
	/** Name of the educational institution. */
	institution: string;
	/** Degree or qualification obtained. */
	degree: string;
	/** Human-readable period string. */
	period: string;
	/** Optional supplementary note (e.g. equivalence obtained). */
	note?: string;
}

/** A professional certification or online course. */
export interface CertificationItem {
	/** Full title of the certification. */
	title: string;
	/** Issuing organisation or platform. */
	issuer: string;
	/** Date string (month and year), e.g. "Abr. 2025". */
	date: string;
}

/** A spoken language with its proficiency descriptor. */
export interface LanguageItem {
	/** Language name. */
	name: string;
	/** Proficiency descriptor, e.g. "Natal", "Medio", "Estudiando". */
	level: string;
}

/** Navigation section descriptor used by NavDotsComponent. */
export interface NavSection {
	/** Matches the DOM id of the corresponding section element. */
	id: string;
	/** Translation key resolved to the tooltip label. */
	label: string;
}

/** Personal / contact information for the portfolio owner. */
export interface PersonalInfo {
	/** Full display name (literal, not translated). */
	fullName: string;
	/** Translation key for professional title (e.g. 'PERSONAL.TITLE'). */
	title: string;
	/** Translation key for biographical text (e.g. 'PERSONAL.BIO'). */
	bio: string;
	/** City and region (literal, not translated). */
	location: string;
	/** Contact email address (literal). */
	email: string;
	/** LinkedIn profile (literal). */
	linkedin: { label: string; url: string };
	/** GitHub profile (literal). */
	github: { label: string; url: string };
	/** Translation key for nationality (e.g. 'PERSONAL.NATIONALITY'). */
	nationality: string;
	initials: string;
	/** Translation key for hero description (e.g. 'HERO.BIO'). */
	description: string;
}


export interface HeroStack {
	name: string;
	image: string;
	code: string;
}