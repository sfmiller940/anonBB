// AnonBB
function anonBB(BB_divID, Title){

	// Primary divs: menu, content, new_content
	$(BB_divID).append('<div class="menu"></div>');
	$(BB_divID).append('<div class="content"></div>');
	$(BB_divID).append('<div class="new_content"></div>');

	// Show threads
	showThreads = function(){
		// Refresh title and clear divs
		$(BB_divID + ' .title').html( Title );
		$(BB_divID + ' .content, '+BB_divID + ' .new_content').empty();
		// Get threads, format and append
		$.get("AnonBB.php?get_threads", function(data) {
			var threads = jQuery.parseJSON(data);
			$.each(threads, function(i, thread) {
				$(BB_divID + ' .content ').append('<div class="thread thread_'+ thread.ID +'"></div>');
				$(BB_divID + ' .thread_' + thread.ID).append(
					'<div class="user"><p>' + thread.User + '</p></div>' +
					'<div class="subject"><p><a class="view_thread_'+ thread.ID +'" href="View Thread">'+ thread.Subject +'</a></p></div>' +
					'<div class="date"><p>' + thread.Posted + '</p></div>'
				);
				$(BB_divID + " .view_thread_" + thread.ID).click(function(e) {
				    e.preventDefault();
				    showPosts(thread.ID);
				    return false;  
				});
			});
		});
		// New thread form
		new_content_form("thread");
		// Submit new thread
		$(BB_divID + " .make_content").click( function () {
          	$.post( 'AnonBB.php?new_thread', $(BB_divID + " .new_content_form").serialize(), 
	            function(data){
	            	if (data == 2){ showThreads(); }
	            	else if (data == 1){ $("label.captcha").html("<font style='color:#ff00ff'>Retry Captcha:</font>"); }
	            	else { $(BB_divID + " .title").html(data);  }
	            }
          	);
        });   
	}

	// Show posts
	showPosts = function(ID){
		// Refresh title and clear divs
		$(BB_divID + ' .title').html( $(BB_divID + ' a.view_thread_'+ ID).html() );
		$(BB_divID + ' .content, '+BB_divID + ' .new_content').empty();
		// Get posts, format and append
		$.get("AnonBB.php?get_posts&ID=" + ID, function(data) {
			var posts = jQuery.parseJSON(data);
			$.each(posts, function(i, post) {
				$(BB_divID + ' .content').append('<div class="post post_'+ i +'"></div>');
				$(BB_divID + ' .post_' + i).append(
					'<div class="user_date"><div class="user"><p>' + post.User + '</p></div>' +
					'<div class="date"><p>'+ post.Posted +'</p></div></div>' +
					'<div class="message"><p>' + post.Post + '</p></div>' 
				);
			});
		});
		// New post form
		new_content_form( ID );
		// Submit new post
		$(BB_divID + " .make_content").click( function () {
          	$.post( 'AnonBB.php?new_post', $(BB_divID + " .new_content_form").serialize(), 
	            function(data){
	            	if (data == '2'){ showPosts( ID ); }
	            	else if (data == '1') { $("label.captcha").html("<font style='color:#ff00ff'>Retry Captcha:</font>"); }
	            	else { $(BB_divID + " .title").html(data);  }
	            }
          	);
        });   
	}

	// Create and append new content form
	function new_content_form (id){
		// Create div and append form.
		$(BB_divID + ' .new_content').append('<div class="new_content_form"></div>');
		var new_form = '<form class="new_content_form">' + 
			'<label class="user">Name:</label><input name="User" type="text" class="user">';
		if (id == 'thread')
			{ new_form +='<label class="user">Subject:</label><input name="Subject" type="text" class="subject">'; } 
		else
			{ new_form += '<input type="hidden" value="'+ id +'" name="ID">'; }
		new_form += '<label class="message">Message:</label><textarea name="Message" rows="4" cols="30" class="message"></textarea>' +
			'<img class="captcha" src="securimage/securimage_show.php" alt="CAPTCHA Image"/>' +
			'<a type="button" href="new image" class="new_captcha">click here for different image</a>' +
			'<label class="captcha">Captcha:</label><input type="text" class="captcha_code" name="captcha_code" size="10" maxlength="6" />' +
			'<input type="button" value="Post" class="make_content">' +
			'</form>';
		$(BB_divID + ' .new_content_form').append( new_form );

		// Activate link for new captcha image
		$(BB_divID + ' .new_captcha').click( function(e){
			e.preventDefault();
			$(BB_divID +' .captcha').attr('src', 'securimage/securimage_show.php?' + Math.random());
			return false;
		});
	}

	// Append title and button to menu
	$(BB_divID + ' .menu').append('<p class="title"></p>');
	$(BB_divID + ' .menu').append('<input type="button" value="All Threads" class="all_threads">');
	$(BB_divID + ' .all_threads').click(showThreads);

	// Show threads
	showThreads();
}