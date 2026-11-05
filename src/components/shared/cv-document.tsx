import React from "react";
import path from "node:path";
import {
	Document,
	Font,
	Image,
	Link,
	Page,
	Path,
	StyleSheet,
	Svg,
	Text,
	View,
	type DocumentProps,
} from "@react-pdf/renderer";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import type { PortfolioContent } from "@/content/portfolio";
import { formatDate } from "@/lib/format";
import { getActivePrimaryColor } from "@/lib/theme";

type Translate = (key: "cv.experience" | "cv.education" | "cv.skills" | "cv.projects" | "label.present") => string;

const primaryColor = getActivePrimaryColor();

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
		alignItems: "center",
		paddingBottom: 14,
		marginBottom: 22,
		borderBottomWidth: 0.75,
		borderBottomColor: "#e5e7eb",
		borderBottomStyle: "solid",
	},
	headerAvatar: {
		width: 104,
		paddingRight: 16,
		alignItems: "flex-end",
	},
	avatar: {
		width: 72,
		height: 72,
		borderRadius: 36,
		objectFit: "cover",
		objectPosition: "50% 20%",
	},
	headerIdentity: {
		flexGrow: 1,
		flexShrink: 1,
		flexBasis: 0,
	},
	name: {
		fontSize: 28,
		fontFamily: "Helvetica-Bold",
		color: "#111827",
		lineHeight: 1.1,
	},
	accentBar: {
		width: 28,
		height: 2.5,
		backgroundColor: primaryColor,
		marginTop: 8,
		marginBottom: 8,
	},
	contactRow: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
	},
	contactLine: {
		fontSize: 8.8,
		color: "#6b7280",
		textDecoration: "none",
	},
	contactSeparator: {
		fontSize: 8.8,
		color: "#d1d5db",
		marginHorizontal: 6,
	},
	socials: {
		display: "flex",
		flexDirection: "row",
		marginTop: 7,
	},
	socialLink: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		textDecoration: "none",
	},
	socialLinkSpaced: {
		marginLeft: 14,
	},
	socialIcon: {
		width: 9,
		height: 9,
		marginRight: 4,
		transform: "translateY(-1px)",
	},
	socialLabel: {
		fontSize: 8.8,
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
		color: primaryColor,
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

function keepWordsTogether(word: string): string[] {
	return [word];
}

const avatarPath = path.resolve(process.cwd(), "public/images/avatar-face.png");

function CvSocialIcon({ icon }: { icon: IconDefinition }) {
	const [width, height, , , d] = icon.icon;
	const paths = Array.isArray(d) ? d : [d];

	return (
		<Svg viewBox={`0 0 ${width} ${height}`} style={styles.socialIcon}>
			{paths.map((item, index) => (
				<Path d={item} fill="#111827" key={index} />
			))}
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

export function createCvDocument(content: PortfolioContent, t: Translate): React.ReactElement<DocumentProps> {
	Font.registerHyphenationCallback(keepWordsTogether);

	return (
		<Document
			title={`${getCvName(content.profile.name)} CV`}
			author={content.profile.name}
			language={content.locale}>
			<Page size="A4" style={styles.page}>
				<View style={styles.header} wrap={false}>
					<View style={styles.headerAvatar}>
						<Image src={avatarPath} style={styles.avatar} />
					</View>
					<View style={styles.headerIdentity}>
						<Text style={styles.name}>{getCvName(content.profile.name)}</Text>
						<View style={styles.accentBar} />
						<View style={styles.contactRow}>
							<Text style={styles.contactLine}>{content.profile.location}</Text>
							<Text style={styles.contactSeparator}>•</Text>
							<Link src={`mailto:${content.profile.email}`} style={styles.contactLine}>
								{content.profile.email}
							</Link>
						</View>
						<View style={styles.socials}>
							{content.profile.links.map((link, index) => (
								<Link
									key={link.url}
									src={link.url}
									style={
										index > 0 ? [styles.socialLink, styles.socialLinkSpaced] : styles.socialLink
									}>
									<CvSocialIcon icon={link.icon} />
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
							<Text style={styles.body}>{project.summary}</Text>
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
