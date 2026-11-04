/** A complete localized education entry. */
export interface Education {
	translationKey: string;
	institution: string;
	location: string;
	start: `${number}-${number}`;
	end?: `${number}-${number}`;
	credential: string;
	detail: string;
}

/** Education fields authored in TypeScript before credential and detail are translated. */
export interface EducationDefinition {
	translationKey: string;
	institution: string;
	location: string;
	start: `${number}-${number}`;
	end?: `${number}-${number}`;
}

export const education = [
	{
		translationKey: "ulo-tesp",
		institution: "Universidade de Leiria e Oeste (ULO)",
		location: "Campus 2, Morro do Lena, Alto do Vieiro, Leiria, Portugal",
		start: "2025-09",
	},
	{
		translationKey: "raul-proenca",
		institution: "Escola Secundária Raúl Proença",
		location: "Caldas da Rainha, Portugal",
		start: "2022-09",
		end: "2025-06",
	},
] satisfies EducationDefinition[];
