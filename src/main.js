$(document).ready(function() {
	/*
	*	Hides the set of posts defined by hiddenPosts and updates local storage appropriately.
	*	@param hiddenPosts An associative array where the keys are the IDs of posts that should be hidden.
	*/
	function hidePosts(hiddenPosts) {
		var postIds = _.keys(hiddenPosts);
		
		_.each(postIds, function(postId) {
			$('#' + postId).hide();
		})
		
		saveHiddenPosts(hiddenPosts)
	}
	
	function saveHiddenPosts(hiddenPosts) {
		localStorage.setItem('piazza-hiddenPosts', hiddenPosts);
	}
	
	function getHiddenPosts() {
		return localStorage.getItem('piazza-hiddenPosts') || {};
	}
	
	function hidePost(postId) {
		var hiddenPosts = getHiddenPosts();
		hiddenPosts[postId] = 1;
		hidePosts(hiddenPosts);		
	}

	function getSelectedItemId() {
		//return window.P.feed.selectedItem.id;
		return window.P.note_view.content.id;
	}	
	
	function addMenuItem() {
		var selectedItemId = getSelectedItemId();

		if (getHiddenPosts()[selectedItemId]) {
			// "Un-snooze" instead if this post is already snoozed.
			$('#question_note_actions_dropdown').append('<li onclick="PEM.fire(\'snooze_question\');return false;">Un-snooze this post</li>');	
		} else {
			$('#question_note_actions_dropdown').append('<li onclick="PEM.fire(\'unsnooze_question\');return false;">Snooze this post</li>');	
		}
	};
	
	if (window.P.extensionLoaded) {
		console.log('Extension already loaded');
	} else {
		window.P.extensionLoaded = true;
		
		window.PEM.addListener('feed_created', function(e) {
			if (window.P.extensionLoaded) {
				return;
			} else {
				window.P.extensionLoaded = true;
			}

			//console.log('selected item: ' + window.P.feed.selectedItem.id);
			addMenuItem();
			
			//var hiddenPosts = getHiddenPosts();
			//hidePosts(hiddenPosts);	
		});
		
		window.PEM.addListener('content', function() {
			window.P.extensionLoaded = true;
			
			addMenuItem();
		});
		
		window.PEM.addListener('snooze_question', function() {
			console.log('snooze_question fired');
			
			var selectedItemId = getSelectedItemId();
			hidePost(selectedItemId);
			PEM.fire("content", P.note_view.content); // re-render
		});
		
		window.PEM.addListener('unsnooze_question', function() {
			console.log('unsnooze_question fired');

		});
	}
});

/*
// Debugging to log whenever events are fired
window.PEM.origFire = window.PEM.fire;
window.PEM.fire = function(e, p) {
	console.log('fired ' + e);
	window.PEM.origFire(e, p);
}*/