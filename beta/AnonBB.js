// AnonBB

function anonBB(BB_divID){

	function showThreads(){
		$.get("?get_threads", function(data) {
			$(BB_divID).append(data);
		});
	}
	
	showThreads();
}