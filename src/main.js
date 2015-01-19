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
	 
	// Something in Piazza's code is causing stuff to get shown again if there is no delay. Need to figure out a more robust solution.
	setTimeout(function() { 
		var hiddenPosts = getHiddenPosts();
		hidePosts(hiddenPosts);				
	}, 50);
	
	$('.dropdown.post_region_arrow_dropdown').hover(function() {
		// Need to figure out a better place to insert this list item. 
		// Need to add click handler for this list item.
		// Need to add "Un-snooze" instead if this post is already snoozed.
		$('ul.dropdown-menu', this).append('<li>Snooze this post</li>');
	});
});