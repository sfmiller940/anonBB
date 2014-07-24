// AnonBB

function anonBB(BB_divID){

	// Primary divs
	// Append error div
	$(BB_divID).append('<div id="error"></div>');
	// Append menu div
	$(BB_divID).append('<div id="menu"></div>');
	// Append threads div
	$(BB_divID).append('<div id="threads"></div>');
	// Append new_thread div
	$(BB_divID).append('<div id="new_thread"></div>');
	// Append posts div
	$(BB_divID).append('<div id="posts"></div>');

	// Clear divs
	function clear_most(){
		$('#error').empty();
		$('#threads').empty();
		$('#new_thread').empty();
		$('#posts').empty();
	}


	// Functions
	// Show threads
	showThreads = function(){
		clear_most();
		$.get("AnonBB.php?get_threads", function(data) {
			var threads = jQuery.parseJSON(data);
			$.each(threads, function(i, thread) {
				$(BB_divID + ' #threads').append('<div class="thread" id="thread_'+ thread.ID +'"></div>');
				$(BB_divID + ' #threads #thread_' + thread.ID).append(
					'<div class="user">' + thread.User + '</div>' +
					'<a class="subject" id="view_thread_'+ thread.ID +'" href="View Thread">'+ thread.Subject +'</a>' +
					'<div class="date">' + thread.Posted + '</div>'
				);
				$("#view_thread_" + thread.ID).click(function(e) {
				    e.preventDefault();
				    showPosts(thread.ID);
				    return false;  
				});
			});
		});
	}
	// Append show threads button to menu
	$(BB_divID + ' #menu').append('<input type="button" value="All Threads" id="all_threads">');
	$('#all_threads').click(showThreads);
	

	// Show posts
	showPosts = function(ID){
		clear_most();
		$.get("AnonBB.php?get_posts&ID=" + ID, function(data) {
			var posts = jQuery.parseJSON(data);
			$.each(posts, function(i, post) {
				$(BB_divID + ' #posts').append('<div class="post" id="post_'+ post.ID +'"></div>');
				$(BB_divID + ' #posts #post_' + post.ID).append(
					'<div class="user">' + post.User + '</div>' +
					'<div class="date">'+ post.Posted +'</div>' +
					'<div class="post">' + post.Post + '</div>'
				);
			});
		});
	}


	// Display form for new thread
	threadForm = function(){
		clear_most();
	}
	// Append new thread button to menu
	$(BB_divID + ' #menu').append('<input type="button" value="New Thread" id="new_thread">');
	$('#new_thread').click( threadForm );


	showThreads();
}