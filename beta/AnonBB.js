// AnonBB

function anonBB(BB_divID){

	// Primary divs
	// Append error div
	$(BB_divID).append('<div class="error"></div>');
	// Append menu div
	$(BB_divID).append('<div class="menu"></div>');
	// Append threads div
	$(BB_divID).append('<div class="content"></div>');
	// Append threads div
	$(BB_divID).append('<div class="new_content"></div>');

	// Clear divs
	function clear_most(){
		$(BB_divID + ' .error').empty();
		$(BB_divID + ' .content').empty();
		$(BB_divID + ' .new_content').empty();
	}


	// Functions
	// Show threads
	showThreads = function(){
		clear_most();
		$.get("AnonBB.php?get_threads", function(data) {
			var threads = jQuery.parseJSON(data);
			$(BB_divID + ' .content').append('<div class="threads"></div>');
			$.each(threads, function(i, thread) {
				$(BB_divID + ' .content .threads').append('<div class="thread" id="thread_'+ thread.ID +'"></div>');
				$(BB_divID + ' .content .threads #thread_' + thread.ID).append(
					'<div class="user"><p>' + thread.User + '</p></div>' +
					'<div class="subject"><p><a id="view_thread_'+ thread.ID +'" href="View Thread">'+ thread.Subject +'</a></p></div>' +
					'<div class="date"><p>' + thread.Posted + '</p></div>'
				);
				$("#view_thread_" + thread.ID).click(function(e) {
				    e.preventDefault();
				    showPosts(thread.ID);
				    return false;  
				});
			});
			$(BB_divID + ' .new_content').append('<div id="new_thread"></div>');
			$(BB_divID + ' .new_content #new_thread').append('<label>User</label><input type="text" id="user">');
			$(BB_divID + ' .new_content #new_thread').append('<label>Subject</label><input type="text" id="subject">');
			$(BB_divID + ' .new_content #new_thread').append('<label>Message</label><input type="text" id="message">');
			$(BB_divID + ' .new_content #new_thread').append('<input type="button" value="New Thread" id="make_thread">');
			$('#make_thread').click( newThread );
		});
	}
	// Append show threads button to menu
	$(BB_divID + ' .menu').append('<input type="button" value="All Threads" class="all_threads">');
	$(BB_divID + ' .all_threads').click(showThreads);
	

	// Show posts
	showPosts = function(ID){
		clear_most();
		$.get("AnonBB.php?get_posts&ID=" + ID, function(data) {
			var posts = jQuery.parseJSON(data);
			$(BB_divID + ' .content').append('<div id="posts"></div>');
			$.each(posts, function(i, post) {
				$(BB_divID + ' .content #posts').append('<div class="post" id="post_'+ post.ID +'"></div>');
				$(BB_divID + ' .content #posts #post_' + post.ID).append(
					'<div class="user">' + post.User + '</div>' +
					'<div class="date">'+ post.Posted +'</div>' +
					'<div class="post">' + post.Post + '</div>'
				);
			});
		});
	}


	// Display form for new thread
	newThread = function(){
		clear_most();
	}

	showThreads();
}