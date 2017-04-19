import VideoIcon from 'assets/img/video.png';
import FolderIcon from 'assets/img/folder.png';
import WarningIcon from 'assets/img/warning.png';

export default function List (url, title, items, selectHandler, unloadHandler) {

	console.log(url, VideoIcon);
	let itemsXML = '';

	items.forEach(x => {
		let icon = FolderIcon;

		if (/\.(mp4|m4v)$/.test(x.title)) {
			icon = VideoIcon;
		} else if (/\.(zip|avi|mkv|tar|mp3)$/.test(x.title)) {
			icon = WarningIcon;
		}

		const itemImg = `
			<lockup>
					<img src="${url}/${icon}" width="857" height="482" />
			</lockup>
		`;

		itemsXML += `
			<listItemLockup>
					<title>${x.title}</title>
					<relatedContent>${itemImg}</relatedContent>
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
	doc.addEventListener('select', (e) => { selectHandler(e.target.textContent); }, false);
	doc.addEventListener('unload', unloadHandler, false);

		return doc;
}
