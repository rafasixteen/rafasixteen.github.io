(function () {
	var locale = "pt";

	try {
		var saved = window.localStorage.getItem("portfolio-locale");

		if (saved === "en" || saved === "pt") {
			locale = saved;
		} else if ((window.navigator.language || "").toLowerCase().split("-")[0] === "en") {
			locale = "en";
		}
	} catch (_) {
		if ((window.navigator.language || "").toLowerCase().split("-")[0] === "en") {
			locale = "en";
		}
	}

	var script = document.currentScript;
	var assetPath = script ? new URL(script.src).pathname : "";
	var basePath = assetPath.replace(/\/root-redirect\.js$/, "");
	window.location.replace(basePath + "/" + locale + "/");
})();
