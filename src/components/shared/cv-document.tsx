import React from "react";
import {
	Circle,
	Document,
	Link,
	Page,
	Path,
	Rect,
	StyleSheet,
	Svg,
	Text,
	View,
	type DocumentProps,
} from "@react-pdf/renderer";
import type { PortfolioContent } from "@/content/portfolio-content";
import { formatDate } from "@/lib/format";

type Translate = (key: "cv.experience" | "cv.education" | "cv.skills" | "cv.projects" | "label.present") => string;
type ProjectTranslate = (key: string) => string;

const styles = StyleSheet.create({
	page: {
		padding: 42,
		backgroundColor: "#ffffff",
		color: "#111827",
		fontFamily: "Helvetica",
		fontSize: 9.5,
		lineHeight: 1.4,
	},
	header: {
		display: "flex",
		flexDirection: "row",
		alignItems: "flex-start",
		justifyContent: "space-between",
		marginBottom: 28,
	},
	headerIdentity: {
		flexGrow: 1,
		paddingRight: 20,
	},
	headerContact: {
		width: 190,
		alignItems: "flex-end",
	},
	name: {
		fontSize: 28,
		fontFamily: "Helvetica",
		color: "#111827",
		lineHeight: 1.1,
	},
	contactLine: {
		fontSize: 8.5,
		lineHeight: 1.55,
		color: "#6b7280",
		textAlign: "right",
	},
	socials: {
		display: "flex",
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "flex-end",
		marginTop: 2,
	},
	socialLink: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		textDecoration: "none",
	},
	socialLinkSpaced: {
		marginLeft: 10,
	},
	socialIcon: {
		width: 9,
		height: 9,
		marginRight: 3,
		transform: "translateY(-1px)",
	},
	socialLabel: {
		fontSize: 8.5,
		color: "#111827",
	},
	section: {
		marginTop: 16,
	},
	sectionHeading: {
		paddingLeft: 104,
		marginBottom: 10,
	},
	heading: {
		fontSize: 13,
		fontFamily: "Helvetica",
		color: "#f0524f",
	},
	entry: {
		display: "flex",
		flexDirection: "row",
		marginBottom: 10,
	},
	entryDate: {
		width: 104,
		paddingRight: 16,
	},
	entryDateText: {
		fontSize: 8.8,
		lineHeight: 1.45,
		textAlign: "right",
		color: "#111827",
	},
	entryContent: {
		flexGrow: 1,
		flexShrink: 1,
		flexBasis: 0,
	},
	title: {
		fontSize: 10.5,
		fontFamily: "Helvetica-Bold",
		color: "#111827",
	},
	meta: {
		fontSize: 9,
		color: "#4b5563",
		marginTop: 1,
	},
	body: {
		fontSize: 9.5,
		marginTop: 3,
	},
	link: {
		color: "#111827",
		textDecoration: "none",
	},
	skillList: {
		fontSize: 9.5,
	},
});

interface CvEntryProps {
	date?: string;
	children: React.ReactNode;
}

interface CvSectionProps {
	title: React.ReactNode;
	children: React.ReactNode;
}

function getCvName(name: string): string {
	const words = name.trim().split(/\s+/).filter(Boolean);
	return words.length > 1 ? `${words[0]} ${words[words.length - 1]}` : (words[0] ?? name);
}

function CvSocialIcon({ label }: { label: string }) {
	if (label === "GitHub") {
		return (
			<Svg viewBox="0 0 24 24" style={styles.socialIcon}>
				<Path
					fill="#111827"
					d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.73.083-.73 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.304.762-1.604-2.665-.303-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.292-1.552 3.297-1.23 3.297-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.624-5.475 5.92.43.372.81 1.102.81 2.222 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.572C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
				/>
			</Svg>
		);
	}

	if (label === "LinkedIn") {
		return (
			<Svg viewBox="0 0 24 24" style={styles.socialIcon}>
				<Path
					fill="#111827"
					d="M4.98 3.5A2.5 2.5 0 1 1 0 3.5a2.5 2.5 0 0 1 4.98 0ZM.5 8h4V21h-4V8Zm6.5 0h3.83v1.78h.05c.53-1 1.84-2.06 3.79-2.06 4.05 0 4.8 2.66 4.8 6.12V21h-4v-6.36c0-1.52-.03-3.47-2.12-3.47-2.12 0-2.45 1.66-2.45 3.36V21H7V8Z"
				/>
			</Svg>
		);
	}

	if (label === "Instagram") {
		return (
			<Svg viewBox="0 0 24 24" style={styles.socialIcon}>
				<Rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="#111827" strokeWidth="2" />
				<Circle cx="12" cy="12" r="4" fill="none" stroke="#111827" strokeWidth="2" />
				<Circle cx="17.5" cy="6.5" r="0.75" fill="#111827" />
			</Svg>
		);
	}

	if (label === "Portfolio") {
		return (
			<Svg viewBox="0 0 24 24" style={styles.socialIcon}>
				<Circle cx="12" cy="12" r="9" fill="none" stroke="#111827" strokeWidth="2" />
				<Path
					d="M3 12h18M12 3c2.2 2.1 3.4 5.1 3.4 9s-1.2 6.9-3.4 9M12 3c-2.2 2.1-3.4 5.1-3.4 9s1.2 6.9 3.4 9"
					fill="none"
					stroke="#111827"
					strokeWidth="1.5"
				/>
			</Svg>
		);
	}

	return (
		<Svg viewBox="0 0 24 24" style={styles.socialIcon}>
			<Circle cx="12" cy="12" r="9" fill="none" stroke="#111827" strokeWidth="2" />
		</Svg>
	);
}

function CvEntry({ date, children }: CvEntryProps) {
	return (
		<View style={styles.entry} wrap={false}>
			<View style={styles.entryDate}>{date ? <Text style={styles.entryDateText}>{date}</Text> : null}</View>
			<View style={styles.entryContent}>{children}</View>
		</View>
	);
}

function CvSectionHeading({ children }: { children: React.ReactNode }) {
	return <Text style={styles.heading}>{children}</Text>;
}

function CvSection({ title, children }: CvSectionProps) {
	return (
		<View style={styles.section} wrap={false}>
			<View style={styles.sectionHeading} wrap={false}>
				<CvSectionHeading>{title}</CvSectionHeading>
			</View>
			{children}
		</View>
	);
}

export function createCvDocument(
	content: PortfolioContent,
	t: Translate,
	projectT: ProjectTranslate,
): React.ReactElement<DocumentProps> {
	return (
		<Document
			title={`${getCvName(content.profile.name)} CV`}
			author={content.profile.name}
			language={content.locale}>
			<Page size="A4" style={styles.page}>
				<View style={styles.header} wrap={false}>
					<View style={styles.headerIdentity}>
						<Text style={styles.name}>{getCvName(content.profile.name)}</Text>
					</View>
					<View style={styles.headerContact}>
						<Text style={styles.contactLine}>{content.profile.location}</Text>
						<Text style={styles.contactLine}>{content.profile.email}</Text>
						<View style={styles.socials}>
							{content.profile.links.map((link, index) => (
								<Link
									key={link.url}
									src={link.url}
									style={
										index > 0 ? [styles.socialLink, styles.socialLinkSpaced] : styles.socialLink
									}>
									<CvSocialIcon label={link.label} />
									<Text style={styles.socialLabel}>{link.label}</Text>
								</Link>
							))}
						</View>
					</View>
				</View>

				<CvSection title={t("cv.experience")}>
					{content.experience.map((entry) => (
						<CvEntry
							key={entry.translationKey}
							date={`${formatDate(entry.start, content.locale)} - ${entry.end ? formatDate(entry.end, content.locale) : t("label.present")}`}>
							<Text style={styles.title}>{entry.company}</Text>
							<Text style={styles.meta}>{entry.location}</Text>
							<Text style={styles.body}>{entry.summary}</Text>
						</CvEntry>
					))}
				</CvSection>

				<CvSection title={t("cv.education")}>
					{content.education.map((entry) => (
						<CvEntry
							key={entry.translationKey}
							date={`${formatDate(entry.start, content.locale)} - ${entry.end ? formatDate(entry.end, content.locale) : t("label.present")}`}>
							<Text style={styles.title}>{entry.credential}</Text>
							<Text style={styles.meta}>{entry.institution}</Text>
							<Text style={styles.meta}>{entry.location}</Text>
							<Text style={styles.body}>{entry.detail}</Text>
						</CvEntry>
					))}
				</CvSection>

				<CvSection title={t("cv.projects")}>
					{content.projects.map((project) => (
						<CvEntry
							key={project.translationKey}
							date={project.technologies
								.slice(0, 2)
								.map((technology) => technology.name)
								.join(", ")}>
							<Text style={styles.title}>{project.name}</Text>
							<Text style={styles.body}>{projectT(`${project.translationKey}.summary`)}</Text>
							{project.url ? (
								<Link src={project.url} style={styles.link}>
									{project.url}
								</Link>
							) : null}
						</CvEntry>
					))}
				</CvSection>

				<CvSection title={t("cv.skills")}>
					{content.skills.map((group) => (
						<CvEntry key={group.translationKey} date={group.name}>
							<Text style={styles.skillList}>{group.skills.map((skill) => skill.name).join(", ")}</Text>
						</CvEntry>
					))}
				</CvSection>
			</Page>
		</Document>
	);
}
