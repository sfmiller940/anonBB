<?

// Config
$bb_URL = 'http://localhost:8888/AnonBB';
$db_host = 'localhost';
$db_un = 'root';
$db_pw = 'root';
$db_db = 'AnonBB';

// Get rid of this.
session_start();


$dbh=mysql_connect ($db_host, $db_un, $db_pw) or die ('I cannot connect to the database because: ' . mysql_error());
mysql_select_db ($db_db) or die ('I cannot connect to the database because: ' . mysql_error());

function randcolor()
	{
	$color[0]='00';
	$color[1]='11';
	$color[2]='22';
	$color[3]='33';
	$color[4]='44';
	$color[5]='55';
	$color[6]='66';
	$color[7]='77';
	$color[8]='88';
	$color[9]='99';
	$color[10]='aa';
	$color[11]='bb';
	$color[12]='cc';
	$color[13]='dd';
	$color[14]='ee';
	$color[15]='ff';
	$col1 = rand(0,15);
	$col2 = rand(0,15);
	$col3 = rand(0,15);
	$rando=$color[$col1].$color[$col2].$color[$col3];
	return $rando;
	}

function quote_smart($value)
{

$value=mysql_real_escape_string($value);
   return $value;
}


#check if securimage is kewl.
if (isset($_POST['code'])){
  include("securimage/securimage.php");
  $img = new Securimage();
  $valid = $img->check($_POST['code']);
  }



#do we have a new thread or a new post to an old thread coming in? is the username logged in? we'll handle these and then redirect....
if(isset($_POST['post']) && ($_SESSION['User'] == $_POST['user'] || $valid==true ))
	{

		
		#is this a new thread?	
		if (isset($_POST['subject']))
			{
			mysql_query("insert into `bdThreads` (`User`, `Subject`) values ('".quote_smart($_POST['user'])."', '".quote_smart($_POST['subject'])."')") or die("can't create thread, d00d.");
			mysql_query("insert into `bdPosts` (`ID`, `User`, `Post`) values (LAST_INSERT_ID(),'".quote_smart($_POST['user'])."', '".quote_smart($_POST['post'])."')") or die("can't insert your  new thread post, d00d.");
			}
		#or a post to an old thread?
		else
			{
			mysql_query("insert into `bdPosts` (`ID`, `User`, `Post`) values ('".quote_smart($_GET['id'])."','".quote_smart($_POST['user'])."', '".quote_smart($_POST['post'])."')") or die("can't insert your post, d00d.");
			mysql_query("update `bdThreads` set `Posted` = NOW(), `User`='".quote_smart($_POST['user'])."' where `ID`='".quote_smart($_GET['id'])."'") or die("can't update time on thread...");
			}
	
		#send them back to the thread list...
		session_unregister('subject');
		session_unregister('post');
		session_unregister('id');
		session_unregister('sessionuser');
		header("Location: http://www.poibella.org/pi");
		die();	
	}


#are we deleting threads?
if(isset($_GET['trasho']))
	{
	mysql_query("delete from `bdPosts` where `ID`='".quote_smart($_GET['trasho'])."'") or die("cant delete posts");
	mysql_query("delete from `bdThreads` where `ID`='".quote_smart($_GET['trasho'])."'") or die("cant delete thread");
	header("Location: http://www.poibella.org/pi");
	die();	
	}


#if we're not redirecting, then lets make some html....


?>



<html>
<head>
<?
if (isset($_GET['id']))
	{
	#get the thread subject
	$dbsubject=mysql_query("select `Subject` from `bdThreads` where `ID`='".quote_smart($_GET['id'])."'") or die("cant find thread in db");
	$threadsubject = mysql_fetch_array($dbsubject);
	echo "<title>".$threadsubject['Subject']."</title>";
	}
else { echo "<title>poibella</title>"; }

echo "<style>a:link { color: #000000; } a:visited { color: #".randcolor()." } </style>";
?>

</head>
<body topmargin="0" leftmargin="0" bottommargin="0" rightmargin="0" bgcolor="#ffffff" text="#000000">

<table height="100%" width="100%" cellpadding="0" cellspacing="0">
<tr>
<td align="center" valign="top">


<? 

#echo threadcrap and logon crap for all actions...
echo "<br><br>";
echo "<a href='/pi'>threads</a> / ";
echo "<a href='?newthread=yes'>new thread</a> / ";
echo "<a href='../'>poibella</a> / ";
$logon='logon';
if (isset($_SESSION['User'])) { $logon='logoff '.$_SESSION['User']; }
echo "<a href='../tech/index.php?from=board'>".$logon."</a>";
echo "<br><br>";


#if dude is makin a new thread then give him the input for that shit...
if(isset($_GET['newthread']))
	{
		
	echo "<form method='post'>";
	echo "<table>";
	if (!isset($_SESSION['User'])) {
		echo "<tr><td><img src='securimage/securimage_show.php?sid='". md5(uniqid(time())) ."'></td><td><input type='text' name='code' /></td></tr>";
	}
	echo "<tr><td align='right' valign='top'>user:</td><td>";
	echo "<input type='text' name='user' value='".$_SESSION['User']."'>";
	echo "</td></tr>";
	echo "<tr><td align='right' valign='top'>subject:</td><td>";
	echo "<input type='text' name='subject'><br>";
	echo "</td></tr>";
	echo "<tr><td align='right' valign='top'>post:</td><td>";
	echo "<textarea name='post' rows='10' cols='40'></textarea><br>";
	echo "</td></tr>";
	echo "<tr><td></td><td>";
	echo "<input type='submit' value='fire it up'>";
	echo "</td></tr>";
	echo "</table>";
	echo "</form";
	
	}

#if there's a thread but no post then just show the thread.
elseif(isset($_GET['id']))
	{
		

	#display the thread
		
	$thread = mysql_query("select * from `bdPosts` where `ID` = '".quote_smart($_GET['id'])."' order by `Posted`");
	
	echo "<table cellspacing='2' cellpadding='3' width='400'>";
		
	while($_POST['post']=mysql_fetch_array($thread))
		{
		
		echo "\n<tr><td bgcolor='#".randcolor()."'>\n";
		echo "<table width='100%' cellpadding='0' cellspacing='0'><tr>\n";
		echo "<td valign='top' align='left'><font color='#".randcolor()."'>".$_POST['post']['User']."</font></td>\n";
		echo "<td valign='top' align='right'><font color='#".randcolor()."'>".$_POST['post']['Posted']."</font></td>\n";
		echo "</tr></table>\n";
		echo "</td></tr><tr>\n";
		echo "<td valign='top' align='left' width='350'>".$_POST['post']['Post']."</td>\n";
		echo"</tr>\n";
		
		}

	echo "</table>";
	
	
	
	#make form for posting	
	echo "<br><br>";
	echo "<form action='?id=".$_GET['id']."' method='post'>";
	echo "<table>";
	if (!isset($_SESSION['User'])) {
	echo "<tr><td><img src='securimage/securimage_show.php?sid='". md5(uniqid(time())) ."'></td><td><input type='text' name='code' /></td></tr>";
	}
	echo "<tr><td align='right' valign='top'>user:</td><td>";
	echo "<input type='text' name='user' value='".$_SESSION['User']."'>"; 
	echo "</td></tr>"; 
	echo "<tr><td align='right' valign='top'>post:</td><td>";
	echo "<textarea name='post' rows='10' cols='40'></textarea><br>";
	echo "</td></tr>";
	echo "<tr><td></td><td>";
	echo "<input type='submit' value='fire it up'>";
	echo "</td></tr>";
	echo "</table>";
	echo "</form>";
	
			
	
}
	
#otherwise spit out the thread list.
else
	{
		

	$sqlthreads = mysql_query("select * from `bdThreads` order by `Posted` desc");
	
	
	echo "<br><br>";
	echo "<table  cellspacing='2' cellpadding='3' width='450'>";
	
	while ($thread=mysql_fetch_array($sqlthreads))
		{
	
		echo "<tr>";
		echo "<td nowrap><font color='".randcolor()."'>".$thread['User']."</font></td>";
		echo "<td width='275' nowrap align='right'><a href='?id=".$thread['ID']."'>".$thread['Subject']."</a></td>";
		echo "<td  bgcolor='#".randcolor()."' nowrap><font color='#".randcolor()."'>".$thread['Posted']."</font></td>";
		echo "</tr>";
	
		}

	echo "</table>";

	}


?>




</td>
</tr>
</table>
</body>
</html>
