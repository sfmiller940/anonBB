// AnonBB

function anonBB(BB_divID){

	// Append menu div
	$(BB_divID).append('<div id="menu"></div>');

	// Append all threads button
	$(BB_divID + ' #menu').append('<a class="button" id="all_threads">All Threads</a>');
	$("#all_threads").click(function(e) {
	    e.preventDefault();
	    showThreads();
	    return false;  
	});

	// Append new thread button
	$(BB_divID + ' #menu').append('<a class="button" id="new_threads">New Threads</a>');

	// Append threads
	$(BB_divID).append('<div id="threads"></div>');

	// Show threads
	showThreads = function(){
		$.get("?get_threads", function(data) {
			//var threads = jQuery.parseJSON(data);
			$(BB_divID + ' #threads').append(data);
		});
	}
	
	// Append posts
	$(BB_divID).append('<div id="posts"></div>');

	// Show posts
	showPosts = function(){
		$.get("?get_posts", function(data) {
			//var threads = jQuery.parseJSON(data);
			$(BB_divID + ' #posts').append(data);
		});
	}


	showThreads();
}