const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function RootRedirect() {
	return (
		<>
			<script src={`${basePath}/root-redirect.js`} />
			<noscript>
				<meta httpEquiv="refresh" content={`0;url=${basePath}/pt/`} />
			</noscript>
		</>
	);
}
