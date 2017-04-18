import VideoIcon from 'assets/img/video_large_hd.png';

export default function List (url, title, items) {

	let itemsXML = '';

	items.forEach(x => {
		itemsXML += `
			<listItemLockup>
					<title>${x.title}</title>
			</listItemLockup>
		`;
	});

	const templateString = `<?xml version="1.0" encoding="UTF-8" ?>
		<document>
			<listTemplate>
				<banner>
					<title>HomeStream</title>
				</banner>
				<list>
					<header>
							<title>${title}</title>
					</header>
					<section>
						${itemsXML}
					</section>
				</list>
			</listTemplate>
		</document>`;

	const parser = new DOMParser();
	const doc = parser.parseFromString(templateString, "application/xml");

	return doc;
}
