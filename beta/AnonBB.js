// AnonBB

function anonBB(BB_divID){

	// Primary divs
	// Append menu div
	$(BB_divID).append('<div class="menu"></div>');
	// Append threads div
	$(BB_divID).append('<div class="content"></div>');
	// Append threads div
	$(BB_divID).append('<div class="new_content"></div>');

	// Clear content/new_content divs
	function clear_most(){
		$(BB_divID + ' .content').empty();
		$(BB_divID + ' .new_content').empty();
	}

	// Show threads
	showThreads = function(){
		$(BB_divID + ' .title').html( 'AnonBB' );
		clear_most();
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
		// New thread div
		$(BB_divID + ' .new_content').append( new_content_form("thread") );
		// Submit new thread
		$(BB_divID + " .make_thread").click( function () {
          	$.post( 'AnonBB.php?new_thread', $("#new_content_form").serialize(), 
	            function(data){
	            	if (data == 2){ showThreads(); }
	            	else if (data == 0){ $("label.captcha").html("<font style='color:#ff00ff'>Retry Captcha:</font>"); }
	            }
          	);
        });   
	}

	// Show posts
	showPosts = function(ID){
		$(BB_divID + ' .title').html( $(BB_divID + ' a.view_thread_'+ ID).html() );
		clear_most();
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
		$(BB_divID + ' .new_content').append( new_content_form( ID ) );
		// Submit new post
		$(BB_divID + " .make_thread").click( function () {
          	$.post( 'AnonBB.php?new_post', $("#new_content_form").serialize(), 
	            function(data){
	            	if (data == '2'){ showPosts( ID ); }
	            	else if (data == '0') { $("label.captcha").html("<font style='color:#ff00ff'>Retry Captcha:</font>"); }
	            }
          	);
        });   

	}

	// New content form(s)
	function new_content_form (id){
		var new_form = '<form id="new_content_form">' + 
			'<label class="user">Name:</label><input name="User" type="text" id="user">';
		if (id == 'thread'){ new_form +='<label class="user">Subject:</label><input name="Subject" type="text" id="subject">'; } 
		new_form += '<label class="message">Message:</label><textarea name="Message" rows="4" cols="30" id="message"></textarea>' +
			'<img id="captcha" src="securimage/securimage_show.php" alt="CAPTCHA Image" />' +
			'<label class="captcha">Captcha:</label><input type="text" id="captcha_code" name="captcha_code" size="10" maxlength="6" />' +
			'<input type="button" value="Post" class="make_thread">';
		if (id != 'thread'){ new_form += '<input type="hidden" value="'+ id +'" name="ID">'; }
		new_form += '</form>';
		return new_form;
	}

	// Append show threads button to menu
	$(BB_divID + ' .menu').append('<p class="title"></p>');
	$(BB_divID + ' .menu').append('<input type="button" value="All Threads" class="all_threads">');
	$(BB_divID + ' .all_threads').click(showThreads);

	// Show threads
	showThreads();
}