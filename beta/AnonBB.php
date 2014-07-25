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
    die( "Please check your settings in AnonBB.php. MySQL Connect Error: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error );
}

// Convert sequel query results to JSON.
function query_to_json($mysqli, $querystring){
	if ( $sql_result = $mysqli->query( $querystring ) ){	
		while ($r=$sql_result->fetch_assoc()){ $rows[] = $r; }
		return json_encode($rows);
	}
	else { die("SQL bad times!"); }
}

// Check captcha
function check_cap(){
	session_start();
	include_once 'securimage/securimage.php';
	$securimage = new Securimage();
	if ($securimage->check($_POST['captcha_code']) == false){ return false; }
	else { return true; }
}


// If get_threads, return all threads as JSON.
if ( isset($_GET['get_threads']) ){
	$threads = query_to_json($mysqli, "select * from `bdThreads` order by `Posted` desc");
	print $threads;
	die();
}

// Get single thread
else if (isset($_GET['get_posts'])){
	$posts = query_to_json($mysqli, "select * from `bdPosts` where `ID` = '".$mysqli->real_escape_string($_GET['ID'])."' order by `Posted`");
	print $posts;
	die();
}

// Create new thread
else if (isset($_GET['new_thread'])){
	if ( ! check_cap() ) { print "1"; }
	else {
		$querystrings = "insert into `bdThreads` (User, Subject) values ('".$mysqli->real_escape_string($_POST['User'])."', '".$mysqli->real_escape_string($_POST['Subject'])."'); ";
		$querystrings .= "insert into `bdPosts` (ID, User, Post) values (LAST_INSERT_ID(),'".$mysqli->real_escape_string($_POST['User'])."', '".$mysqli->real_escape_string($_POST['Message'])."')";
		if( $sql_result = $mysqli->multi_query( $querystrings ) ){ print "2"; }
		else{ print $mysqli->error ." ". $querystrings; }
	}
	die();
}

// Create new post.
else if (isset($_GET['new_post'])){
	if ( ! check_cap() ) { print "1"; }
	else {
		$querystrings = "insert into `bdPosts` (`ID`, `User`, `Post`) values ('".$mysqli->real_escape_string($_POST['ID'])."','".$mysqli->real_escape_string($_POST['User'])."', '".$mysqli->real_escape_string($_POST['Message'])."'); ";
		$querystrings .= "update `bdThreads` set `Posted` = NOW(), `User`='".$mysqli->real_escape_string($_POST['User'])."' where `ID`='".$mysqli->real_escape_string($_POST['ID'])."';";
		if( $sql_result = $mysqli->multi_query( $querystrings ) ){ print "2"; }
		else{ print $mysqli->error ." ". $querystrings; }
	}
	die();

}

// Install if not installed... Redirect.
else{
	$res = $mysqli->query("SHOW TABLES LIKE 'bdPosts'");
	if ($res->num_rows > 0){
		print '<a href="index.html">AnonBB is installed.</a>';
		die();
	}
	else{
		$querystrings = <<<MYSQLINSTALLSTRING

-- Posts

CREATE TABLE IF NOT EXISTS `bdPosts` (
  `ID` int(11) NOT NULL DEFAULT '0',
  `User` varchar(20) NOT NULL DEFAULT '',
  `Posted` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Post` text NOT NULL,
  KEY `Posted` (`Posted`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- Threads

CREATE TABLE IF NOT EXISTS `bdThreads` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `User` varchar(20) NOT NULL DEFAULT '',
  `Subject` varchar(50) NOT NULL DEFAULT '',
  `Posted` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  KEY `ID` (`ID`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=132 ;

MYSQLINSTALLSTRING;
	
		if ( $mysqli->multi_query( $querystrings ) ){
			print '<a href="index.html">AnonBB is installed.</a>';
			die();
		}
		else {die( "Failed to intall AnonBB. MySQL Error: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error ); }

	}
}


?>
