import React from "react";
import path from "node:path";
import { Document, Image, Link, Page, StyleSheet, Text, View, type DocumentProps } from "@react-pdf/renderer";
import type { PortfolioContent } from "@/content/portfolio-content";
import { formatDate } from "@/lib/format";

type Translate = (
	key:
		| "cv.experience"
		| "cv.education"
		| "cv.skills"
		| "cv.projects"
		| "label.present"
) => string;

const avatarSource = path.resolve(process.cwd(), "public/images/avatar-cutout.png");

const styles = StyleSheet.create({
	page: {
		padding: 42,
		backgroundColor: "#ffffff",
		color: "#000000",
		fontFamily: "Helvetica",
		fontSize: 9.5,
		lineHeight: 1.45,
	},
	header: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingBottom: 14,
		marginBottom: 14,
		borderBottomWidth: 1,
		borderBottomColor: "#d9d9d9",
	},
	headerContent: {
		flexGrow: 1,
		paddingRight: 18,
	},
	avatar: {
		width: 76,
		height: 76,
		flexShrink: 0,
		borderRadius: 38,
		borderWidth: 2,
		borderColor: "#d9d9d9",
		backgroundColor: "#f3f4f6",
	},
	name: {
		fontSize: 22,
		fontFamily: "Helvetica-Bold",
		marginBottom: 7,
	},
	role: {
		fontSize: 11,
		color: "#4b5563",
		marginBottom: 10,
	},
	contact: {
		marginBottom: 14,
	},
	contactLine: {
		fontSize: 8.5,
		lineHeight: 1.5,
	},
	heading: {
		fontFamily: "Helvetica-Bold",
		fontSize: 12,
		marginTop: 12,
		marginBottom: 6,
		letterSpacing: 0.8,
		textTransform: "uppercase",
	},
	item: {
		marginBottom: 9,
	},
	title: {
		fontSize: 10.5,
		color: "#111827",
	},
	dates: {
		fontSize: 8.8,
		color: "#4b5563",
		marginBottom: 2,
	},
	bullet: {
		fontSize: 9.5,
		marginTop: 2,
		paddingLeft: 9,
	},
	skillGroup: {
		marginBottom: 5,
	},
	skillGroupName: {
		fontSize: 9,
		color: "#111827",
		letterSpacing: 0.5,
		textTransform: "uppercase",
		marginBottom: 1,
	},
	skillList: {
		fontSize: 9.5,
	},
	link: {
		color: "#000000",
		textDecoration: "none",
	},
});

export function createCvDocument(content: PortfolioContent, t: Translate): React.ReactElement<DocumentProps> {
	return (
		<Document title={`${content.profile.name} CV`} author={content.profile.name} language={content.locale}>
			<Page size="A4" style={styles.page}>
				<View style={styles.header} wrap={false}>
					<View style={styles.headerContent}>
						<Text style={styles.name}>{content.profile.name}</Text>
						<Text style={styles.role}>{content.profile.role}</Text>
						<View style={styles.contact}>
							<Text style={styles.contactLine}>{content.profile.location}</Text>
							<Text style={styles.contactLine}>{content.profile.email}</Text>
							<Text style={styles.contactLine}>
								{content.profile.links.map((link, index) => (
									<React.Fragment key={link.url}>
										{index > 0 ? " · " : ""}
										<Link src={link.url} style={styles.link}>
											{link.label}
										</Link>
									</React.Fragment>
								))}
							</Text>
						</View>
					</View>
					<Image src={avatarSource} style={styles.avatar} />
				</View>
				<Text style={styles.heading}>{t("cv.experience")}</Text>
				{content.experience.map((entry) => (
					<View key={entry.translationKey} style={styles.item} wrap={false}>
						<Text style={styles.title}>
							{entry.role} · {entry.company}
						</Text>
						<Text style={styles.dates}>
							{formatDate(entry.start, content.locale)} · {entry.end ? formatDate(entry.end, content.locale) : t("label.present")} | {entry.location}
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
					<View key={entry.translationKey} style={styles.item} wrap={false}>
						<Text style={styles.title}>
							{entry.credential} · {entry.institution}
						</Text>
						<Text>
							{formatDate(entry.start, content.locale)} · {entry.end ? formatDate(entry.end, content.locale) : t("label.present")} | {entry.location}
						</Text>
						<Text>{entry.detail}</Text>
					</View>
				))}
				<Text style={styles.heading}>{t("cv.skills")}</Text>
				{content.skills.map((group) => (
					<View key={group.translationKey} style={styles.skillGroup} wrap={false}>
						<Text style={styles.skillGroupName}>{group.name}</Text>
						<Text style={styles.skillList}>{group.skills.map((skill) => skill.name).join(", ")}</Text>
					</View>
				))}
				<Text style={styles.heading}>{t("cv.projects")}</Text>
				{content.projects.map((project) => (
					<View key={project.translationKey} style={styles.item} wrap={false}>
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
