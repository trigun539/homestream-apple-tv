import { get } from 'axios';
import List    from 'templates/list';
import Loading from 'templates/loading';

const SERVER_URL = 'http://192.168.1.4:9001';
const BASE_URL   = 'http://192.168.1.184:46005';
let url          = '/api/files';
let items        = [];

function unloadHandler () {
	items.pop();
}

function playVideo () {
	const singleVideo = new MediaItem('video', buildVideoURL());
	const videoList   = new Playlist();
	const myPlayer    = new Player();

	videoList.push(singleVideo)
	myPlayer.playlist = videoList;

	myPlayer.addEventListener('mediaItemDidChange', (e) => {
		console.log('mediaitem changed: ', e);
		items.pop();
	});

	myPlayer.play();
}

function buildVideoURL () {
	let newURL = `${BASE_URL}`;

	items.forEach((x, i) => {
		if (i != 0) {
			newURL += `/${encodeURIComponent(x)}`;
		}
	});

	console.log(newURL);
	return newURL;
}

function buildURL () {
	let newURL = `${BASE_URL}${url}?path=`;

	items.forEach((x, i) => {
		if (i === 0) {
			newURL += `${encodeURIComponent(x)}`;
		} else {
			newURL += `/${encodeURIComponent(x)}`;
		}
	});

	return newURL;
}

function selectHandler (item) {

	if (item) {
		items.push(item);
	}

	if (/\.(mp4|m4v)$/.test(item)) {
		playVideo();
  } else {
		get(buildURL())
			.then(res => {
				const items = res.data.map(x => {
					return { title: x };
				});

				showList(items);
			})
			.catch(err => {
				var alert = createAlert('Error!', 'Fetching locations');
				navigationDocument.pushDocument(alert);
			});
	}
}

function showList (files) {
	const list = List(SERVER_URL, 'Files', files, selectHandler, unloadHandler);
	navigationDocument.pushDocument(list);
}

App.onLaunch = (options) => {
	const loading = Loading();
	navigationDocument.pushDocument(loading);

	selectHandler();
}


App.onWillResignActive = () => {

}

App.onDidEnterBackground = () => {

}

App.onWillEnterForeground = () => {
}

App.onDidBecomeActive = () => {
}

App.onWillTerminate = () => {
}

/**
 * This convenience funnction returns an alert template, which can be used to present errors to the user.
 */
var createAlert = (title, description) => {

	var alertString = `<?xml version="1.0" encoding="UTF-8" ?>
				<document>
					<alertTemplate>
						<title>${title}</title>
						<description>${description}</description>
					</alertTemplate>
				</document>`

	var parser = new DOMParser();

	var alertDoc = parser.parseFromString(alertString, "application/xml");

	return alertDoc
}
