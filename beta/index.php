<?php

// Display errors.
ini_set('display_errors',1);
ini_set('display_startup_errors',1);
error_reporting(-1);

// Config parameters
$bb_URL = 'http://localhost:8888/beta/AnonBB';
$db_host = 'localhost';
$db_un = 'root';
$db_pw = 'root';
$db_db = 'AnonBB';

// Connect to Database
$mysqli = new mysqli($db_host, $db_un, $db_pw, $db_db);
if ($mysqli->connect_errno) {
    echo "Failed to connect to MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
}

// Get all threads and return as JSON.
if (isset($_GET['get_threads'])){
	$sqlthreads = $mysqli->query("select * from `bdThreads` order by `Posted` desc");
	while ($r=$sqlthreads->fetch_assoc()){ $rows[] = $r; }
	print json_encode($rows);
	die();
}

// Get single thread
else if (isset($_GET['get_thread'])){}

// Create new thread
else if (isset($_GET['new_thread'])){}

// Create new post.
else if (isset($_GET['new_post'])){}
else{
?>
<html>
<head>
<title>AnonBB</title>
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
<script src="AnonBB.js"></script>
</head>
<body>

<div id="anonBB"><script>anonBB('#anonBB')</script></div>

</body>
</html>
<?php
}
?>