import { get } from 'axios';
import List    from 'templates/list';

App.onLaunch = (options) => {
	const homestreamBaseURL = 'http://192.168.1.48:46005';
	var alert = createAlert("Hello World!", "Welcome to tvOS");
	navigationDocument.pushDocument(alert);

	// Fetching data
	get(`${homestreamBaseURL}/api/locations`)
		.then(res => {
			const items = res.data.map(x => {
				return { title: x };
			});
			const list = List(homestreamBaseURL, 'Locations', items);
			navigationDocument.pushDocument(list);
		})
		.catch(err => {
			var alert = createAlert('Error!', 'Fetching locations');
			navigationDocument.pushDocument(alert);
		});
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
