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
		// Threads div
		$(BB_divID + ' .content').append('<div class="threads"></div>');
		$.get("AnonBB.php?get_threads", function(data) {
			var threads = jQuery.parseJSON(data);
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
		});
		// New thread div
		$(BB_divID + ' .new_content').append('<div class="new_thread"></div>');
		$(BB_divID + ' .new_thread').append(
			'<form id="new_thread_form">' + 
			'<label class="user">Name:</label><input name="User" type="text" id="user">' +
			'<label class="user">Subject:</label><input name="Subject" type="text" id="subject">' +
			'<label class="message">Message:</label><textarea name="Message" rows="4" cols="30" id="message"></textarea>' +
			'<img id="captcha" src="securimage/securimage_show.php" alt="CAPTCHA Image" />' +
			'<label class="captcha">Captcha:</label><input type="text" id="captcha_code" name="captcha_code" size="10" maxlength="6" />' +
			'<input type="button" value="New Thread" id="make_thread" class="make_thread">' +
			'</form>'
		);
		// Submit new thread.
        $("#make_thread").click( function () {
          	$.post( 'AnonBB.php?new_thread', $("#new_thread_form").serialize(), 
	            function(data){
	            	$(BB_divID + ' .new_thread').html(data);
	            }
          	);
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
			$(BB_divID + ' .content').append('<div class="posts"></div>');
			$.each(posts, function(i, post) {
				$(BB_divID + ' .posts').append('<div class="post" id="post_'+ post.ID +'"></div>');
				$(BB_divID + ' .posts #post_' + post.ID).append(
					'<div class="user"><p>' + post.User + '</p></div>' +
					'<div class="date"><p>'+ post.Posted +'</p></div>' +
					'<div class="post"><p>' + post.Post + '</p></div>'
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