export default function loading () {
	const templateString = `
		<document>
			<loadingTemplate>
					<activityIndicator>
						<title>HomeStream</title>
					</activityIndicator>
			</loadingTemplate>
		</document>
	`;

	const parser = new DOMParser();
	const doc = parser.parseFromString(templateString, 'application/xml');

	return doc;
}
