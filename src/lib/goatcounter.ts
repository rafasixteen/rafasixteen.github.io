const DEVELOPMENT_ENDPOINT = "https://rafasixteen-portfolio-dev.goatcounter.com/count";
const PRODUCTION_ENDPOINT = "https://rafasixteen.goatcounter.com/count";
const SCRIPT_URL = "https://gc.zgo.at/count.js";

function isDevelopment(): boolean {
	return process.env.NODE_ENV === "development";
}

function getEndpoint(): string {
	return isDevelopment() ? DEVELOPMENT_ENDPOINT : PRODUCTION_ENDPOINT;
}

function getSettings(): string | undefined {
	if (!isDevelopment()) {
		return undefined;
	}

	const settings = {
		allow_local: true,
	};

	return JSON.stringify(settings);
}

export const goatCounter = {
	endpoint: getEndpoint(),
	scriptUrl: SCRIPT_URL,
	settings: getSettings(),
} as const;
