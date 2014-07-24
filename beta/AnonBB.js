// AnonBB

function anonBB(BB_divID){

	function showThreads(){
		$.get("?get_threads", function(data) {
			var threads = jQuery.parseJSON(data);
			$(BB_divID).append(data);
		});
	}
	
	showThreads();
}