<?php

// Display errors.
ini_set('display_errors',1);
ini_set('display_startup_errors',1);
error_reporting(-1);

// Config parameters
$db_host = 'localhost';
$db_un = 'root';
$db_pw = 'root';
$db_db = 'AnonBB';


// Connect to Database
$mysqli = new mysqli($db_host, $db_un, $db_pw, $db_db);
if ($mysqli->connect_errno) {
    echo "Failed to connect to MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
}

function query_to_json($mysqli, $querystring){
	if ( $sql_result = $mysqli->query( $querystring ) ){	
		while ($r=$sql_result->fetch_assoc()){ $rows[] = $r; }
		print json_encode($rows);
		die();
	}
	else { die("SQL bad times!"); }
}

// If get_threads, return all threads as JSON.
if ( isset($_GET['get_threads']) )
	{ query_to_json($mysqli, "select * from `bdThreads` order by `Posted` desc"); }

// Get single thread
else if (isset($_GET['get_posts']))
	{ query_to_json($mysqli, "select * from `bdPosts` where `ID` = '".$mysqli->real_escape_string($_GET['ID'])."' order by `Posted`"); }

// Create new thread
else if (isset($_GET['new_thread'])){}

// Create new post.
else if (isset($_GET['new_post'])){}

?>
