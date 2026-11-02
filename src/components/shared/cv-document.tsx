import React from "react";
import { Document, Link, Page, StyleSheet, Text, View, type DocumentProps } from "@react-pdf/renderer";
import type { PortfolioContent } from "@/content/portfolio-content";
import { formatDate } from "@/lib/format";

type Translate = (key: "cv.experience" | "cv.education" | "cv.skills" | "cv.projects" | "label.present") => string;

const styles = StyleSheet.create({
	page: {
		padding: 42,
		backgroundColor: "#ffffff",
		color: "#000000",
		fontFamily: "Helvetica",
		fontSize: 10,
		lineHeight: 1.4,
	},
	name: {
		fontSize: 22,
		fontFamily: "Helvetica-Bold",
		marginBottom: 4,
	},
	role: {
		fontSize: 12,
		marginBottom: 9,
	},
	contact: {
		marginBottom: 14,
	},
	heading: {
		fontFamily: "Helvetica-Bold",
		fontSize: 13,
		marginTop: 12,
		marginBottom: 6,
		textTransform: "uppercase",
	},
	item: {
		marginBottom: 9,
	},
	title: {
		fontFamily: "Helvetica-Bold",
	},
	dates: {
		marginBottom: 2,
	},
	bullet: {
		marginTop: 2,
		paddingLeft: 9,
	},
	link: {
		color: "#000000",
		textDecoration: "none",
	},
});

export function createCvDocument(content: PortfolioContent, t: Translate): React.ReactElement<DocumentProps> {
	const contact = [content.profile.location, content.profile.email, ...content.profile.links.map((link) => link.url)]
		.filter(Boolean)
		.join(" | ");

	return (
		<Document title={`${content.profile.name} CV`} author={content.profile.name} language={content.locale}>
			<Page size="A4" style={styles.page}>
				<Text style={styles.name}>{content.profile.name}</Text>
				<Text style={styles.role}>{content.profile.role}</Text>
				<Text style={styles.contact}>{contact}</Text>
				<Text>{content.profile.summary}</Text>
				<Text style={styles.heading}>{t("cv.experience")}</Text>
				{content.experience.map((entry) => (
					<View key={entry.translationKey} style={styles.item}>
						<Text style={styles.title}>
							{entry.role} — {entry.company}
						</Text>
						<Text style={styles.dates}>
							{formatDate(entry.start, content.locale)} —{" "}
							{entry.end ? formatDate(entry.end, content.locale) : t("label.present")} | {entry.location}
						</Text>
						<Text>{entry.summary}</Text>
						{entry.highlights.map((highlight) => (
							<Text key={highlight} style={styles.bullet}>
								• {highlight}
							</Text>
						))}
					</View>
				))}
				<Text style={styles.heading}>{t("cv.education")}</Text>
				{content.education.map((entry) => (
					<View key={entry.translationKey} style={styles.item}>
						<Text style={styles.title}>
							{entry.credential} — {entry.institution}
						</Text>
						<Text>
							{formatDate(entry.start, content.locale)} —{" "}
							{entry.end ? formatDate(entry.end, content.locale) : t("label.present")} | {entry.location}
						</Text>
						<Text>{entry.detail}</Text>
					</View>
				))}
				<Text style={styles.heading}>{t("cv.skills")}</Text>
				{content.skills.map((group) => (
					<Text key={group.translationKey}>
						<Text style={styles.title}>{group.name}: </Text>
						{group.skills.map((skill) => skill.name).join(", ")}
					</Text>
				))}
				<Text style={styles.heading}>{t("cv.projects")}</Text>
				{content.projects.map((project) => (
					<View key={project.translationKey} style={styles.item}>
						<Text style={styles.title}>{project.name}</Text>
						<Text>{project.summary}</Text>
						<Link src={project.url} style={styles.link}>
							{project.url}
						</Link>
					</View>
				))}
			</Page>
		</Document>
	);
}
