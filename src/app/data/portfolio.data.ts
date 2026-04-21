import type {
	CertificationItem,
	EducationItem,
	ExperienceItem,
	HeroStack,
	LanguageItem,
	NavSection,
	PersonalInfo,
	SkillGroup,
} from '../models/portfolio.model';

const MEAN_ASSETS_ROUTE: string = "/assets/mean-stack"
const DATABASES_ASSETS_ROUTE: string = "/assets/other-databases"
const CODES_ASSETS_ROUTE: string = "/assets/other-codes"

/** Personal and contact information for Marco A. Infanti. */
export const PERSONAL: PersonalInfo = {
	fullName: 'Marco A. Infanti C.',
	title: 'PERSONAL.TITLE',
	bio: 'PERSONAL.BIO',
	location: 'Vigo, Pontevedra',
	email: 'marcoaic1994@gmail.com',
	linkedin: {
		label: 'MarcoInfanti94',
		url: 'https://www.linkedin.com/in/marcoinfanti94/',
	},
	github: {
		label: 'marcoinfanti.github.io',
		url: 'https://github.com/marcoinfanti',
	},
	nationality: 'PERSONAL.NATIONALITY',
	initials: 'MI',
	description: 'HERO.BIO',
};

/** Spoken languages with proficiency descriptors. Level uses English sentinels for levelDots() logic. */
export const LANGUAGES: readonly LanguageItem[] = [
	{ name: 'ABOUT.LANG_SPANISH', level: 'Native' },
	{ name: 'ABOUT.LANG_ENGLISH', level: 'Intermediate' },
	{ name: 'ABOUT.LANG_GERMAN', level: 'Learning' },
] as const;

/** Work experience entries ordered newest first. All strings are translation keys. */
export const EXPERIENCES: readonly ExperienceItem[] = [
	{
		role: 'EXPERIENCE.0.ROLE',
		company: 'EXPERIENCE.0.COMPANY',
		period: 'EXPERIENCE.0.PERIOD',
		description: 'EXPERIENCE.0.DESCRIPTION',
	},
	{
		role: 'EXPERIENCE.1.ROLE',
		company: 'EXPERIENCE.1.COMPANY',
		period: 'EXPERIENCE.1.PERIOD',
		description: 'EXPERIENCE.1.DESCRIPTION',
	},
	{
		role: 'EXPERIENCE.2.ROLE',
		company: 'EXPERIENCE.2.COMPANY',
		period: 'EXPERIENCE.2.PERIOD',
		description: 'EXPERIENCE.2.DESCRIPTION',
	},
	{
		role: 'EXPERIENCE.3.ROLE',
		company: 'EXPERIENCE.3.COMPANY',
		period: 'EXPERIENCE.3.PERIOD',
		description: 'EXPERIENCE.3.DESCRIPTION',
	},
	{
		role: 'EXPERIENCE.4.ROLE',
		company: 'EXPERIENCE.4.COMPANY',
		period: 'EXPERIENCE.4.PERIOD',
		description: 'EXPERIENCE.4.DESCRIPTION',
	},
] as const;

/** Skill groups: languages, frameworks/IDEs, and databases. Titles are translation keys. */
export const SKILL_GROUPS: readonly SkillGroup[] = [
	{
		title: 'SKILLS.GROUP_LANGUAGES',
		items: [
			{ name: 'TypeScript', level: 'Senior', levelKey: 'SKILLS.LEVEL_SENIOR', image: `${MEAN_ASSETS_ROUTE}/Ts.webp` },
			{ name: 'JavaScript', level: 'Senior', levelKey: 'SKILLS.LEVEL_SENIOR', image: `${CODES_ASSETS_ROUTE}/Js.webp` },
			{ name: 'PL/SQL', level: 'Semi-senior', levelKey: 'SKILLS.LEVEL_SEMI_SENIOR', image: `${CODES_ASSETS_ROUTE}/pl-sql.webp` },
			{ name: 'Python', level: 'Junior', levelKey: 'SKILLS.LEVEL_JUNIOR', image: `${CODES_ASSETS_ROUTE}/Python.webp` },
			{ name: 'C/C++', level: 'Junior', levelKey: 'SKILLS.LEVEL_JUNIOR', image: `${CODES_ASSETS_ROUTE}/Cplus.webp` },
			{ name: 'C#', level: 'Junior', levelKey: 'SKILLS.LEVEL_JUNIOR', image: `${CODES_ASSETS_ROUTE}/Csharp.webp` },
		],
	},
	{
		title: 'SKILLS.GROUP_FRAMEWORKS',
		items: [
			{ name: 'Angular', level: 'N/A', image: `${MEAN_ASSETS_ROUTE}/angular.webp` },
			{ name: 'Visual Studio', level: 'N/A', image: `${CODES_ASSETS_ROUTE}/vs.webp` },
			{ name: 'VSCode', level: 'N/A', image: `${MEAN_ASSETS_ROUTE}/vsCode.webp` },
			{ name: 'PyCharm', level: 'N/A', image: `${CODES_ASSETS_ROUTE}/PyCharm.webp` },
		],
	},
	{
		title: 'SKILLS.GROUP_DATABASES',
		items: [
			{ name: 'MongoDB', level: 'N/A', image: `${MEAN_ASSETS_ROUTE}/mongoDb.webp` },
			{ name: 'Oracle', level: 'N/A', image: `${DATABASES_ASSETS_ROUTE}/oracleDatabaseLogo.webp` },
			{ name: 'PostgreSQL', level: 'N/A', image: `${DATABASES_ASSETS_ROUTE}/Psql.webp` },
			{ name: 'MySQL', level: 'N/A', image: `${DATABASES_ASSETS_ROUTE}/MySQL.webp` },
			{ name: 'Microsoft SQL Server', level: 'N/A', image: `${DATABASES_ASSETS_ROUTE}/Msql.webp` },
		],
	},
] as const;

/** Education history ordered newest first. All strings are translation keys. */
export const EDUCATION: readonly EducationItem[] = [
	{
		institution: 'EDUCATION.0.INSTITUTION',
		degree: 'EDUCATION.0.DEGREE',
		period: 'EDUCATION.0.PERIOD',
		note: 'EDUCATION.0.NOTE',
	},
	{
		institution: 'EDUCATION.1.INSTITUTION',
		degree: 'EDUCATION.1.DEGREE',
		period: 'EDUCATION.1.PERIOD',
	},
] as const;

/** Professional certifications ordered newest first. All strings are translation keys. */
export const CERTIFICATIONS: readonly CertificationItem[] = [
	{ title: 'CERTIFICATIONS.0.TITLE', issuer: 'CERTIFICATIONS.0.ISSUER', date: 'CERTIFICATIONS.0.DATE' },
	{ title: 'CERTIFICATIONS.1.TITLE', issuer: 'CERTIFICATIONS.1.ISSUER', date: 'CERTIFICATIONS.1.DATE' },
	{ title: 'CERTIFICATIONS.2.TITLE', issuer: 'CERTIFICATIONS.2.ISSUER', date: 'CERTIFICATIONS.2.DATE' },
	{ title: 'CERTIFICATIONS.3.TITLE', issuer: 'CERTIFICATIONS.3.ISSUER', date: 'CERTIFICATIONS.3.DATE' },
	{ title: 'CERTIFICATIONS.4.TITLE', issuer: 'CERTIFICATIONS.4.ISSUER', date: 'CERTIFICATIONS.4.DATE' },
	{ title: 'CERTIFICATIONS.5.TITLE', issuer: 'CERTIFICATIONS.5.ISSUER', date: 'CERTIFICATIONS.5.DATE' },
] as const;

/** Section descriptors used by NavDotsComponent. Labels are translation keys. */
export const NAV_SECTIONS: readonly NavSection[] = [
	{ id: 'hero', label: 'NAV.HERO' },
	{ id: 'about', label: 'NAV.ABOUT' },
	{ id: 'experience', label: 'NAV.EXPERIENCE' },
	{ id: 'skills', label: 'NAV.SKILLS' },
	{ id: 'education', label: 'NAV.EDUCATION' },
	{ id: 'certifications', label: 'NAV.CERTIFICATIONS' },
	{ id: 'contact', label: 'NAV.CONTACT' },
] as const;


export const STACK: readonly HeroStack[] = [
	{
		name: "Mongo Db",
		image: `${MEAN_ASSETS_ROUTE}/mongoDb.webp`,
		code: "mongo"
	},
	{
		name: "Express Js",
		image: `${MEAN_ASSETS_ROUTE}/express.webp`,
		code: "express"
	},
	{
		name: "Angular",
		image: `${MEAN_ASSETS_ROUTE}/angular.webp`,
		code: "angular"
	},
	{
		name: "Node JS",
		image: `${MEAN_ASSETS_ROUTE}/node.webp`,
		code: "node"
	}
]
