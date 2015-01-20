// Using the following technique to allow window variables to be read:
// http://stackoverflow.com/questions/20499994/access-window-variable-from-content-script
window.onload = function(e) {
	function injectScript(file, node) {
		var th = document.getElementsByTagName(node)[0];
		var s = document.createElement('script');
		s.setAttribute('type', 'text/javascript');
		s.setAttribute('src', file);
		th.appendChild(s);
	}
	injectScript( chrome.extension.getURL('/libs/underscore-min.js'), 'body');
	injectScript( chrome.extension.getURL('/main.js'), 'body');
};