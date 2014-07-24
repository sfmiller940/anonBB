/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table bdPosts
# ------------------------------------------------------------

DROP TABLE IF EXISTS `bdPosts`;

CREATE TABLE `bdPosts` (
  `ID` int(11) NOT NULL DEFAULT '0',
  `User` varchar(20) NOT NULL DEFAULT '',
  `Posted` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Post` text NOT NULL,
  KEY `Posted` (`Posted`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

LOCK TABLES `bdPosts` WRITE;
/*!40000 ALTER TABLE `bdPosts` DISABLE KEYS */;

INSERT INTO `bdPosts` (`ID`, `User`, `Posted`, `Post`)
VALUES
	(13,'dot','2007-06-07 09:07:32','what if i turn my song in a bit past deadline?  '),
	(13,'herbert mcgoo','2007-06-28 11:36:11','\r\nthe deadline is pretty flexible... so don\'t sweat it.. but dotty it\'s gettin late...  the shades are on there though.'),
	(13,'herb','2007-09-12 14:26:42','\r\nif you out there, dot... it\'s probably too late now...'),
	(13,'herb','2008-05-22 08:34:41','test for pw working...'),
	(13,'herb','2008-05-22 08:43:22','another test'),
	(13,'herb','2008-05-22 08:44:36','alright.. testing done for now... crazy how much spam this thing would collect under anonymous posting...'),
	(13,'herb','2008-05-22 08:46:58','sooner or later i\'ll install <a href=\"http://en.wikipedia.org/wiki/Captcha\">captcha</a>'),
	(120,'ballzy','2014-07-23 16:59:17','just testing some stuff out...'),
	(13,'trsh','2008-05-22 08:25:43','spam is outta control.. pwing this...'),
	(97,'herb','2008-11-03 15:23:37','hey all. i finally got around to recoding poibella.... this board is still kinda wacked though....'),
	(97,'btw','2008-11-04 07:56:37','new stuff is john curtis parliament discography and progetc. the official release dates for those are christmas for jcp and ??? for progetc.... the MAC is back too.'),
	(97,'upcomin','2008-11-05 15:12:50','classic summer fox pending legal issues.... '),
	(97,'pep','2008-11-19 11:21:34','word'),
	(97,'yo dog!','2008-11-20 15:28:56','\r\nyou got anything you wanna put out? winter break collabo?!?'),
	(98,'johro','2008-12-20 20:20:34','manifesto posted.'),
	(97,'Pancho Sanzo','2009-01-06 15:57:53','<a href=\"http://www.poibella.org/compoi0/amores.php\">Viva la Juan!</a>'),
	(100,'BB','2009-01-15 14:28:38','welcome!'),
	(100,'frank','2009-02-23 07:08:16','flipped back.'),
	(101,'sam malone','2009-09-06 11:20:12','summer fox coming back hard with <a href=\"http://www.poibella.org/flings\">flings - things</a> ! ! !'),
	(102,'yeahaFSUUUU','2010-03-09 09:48:31','yoooo... <a href=\"http://www.poibella.org/flings\">new flings 7\"</a>... yess! fssujdasl'),
	(104,'herb tracy','2010-08-23 12:40:42','wordup... new <a href=\"http://poibella.org/fraq\">fractals</a> and blog on <a href=\"http://poibella.org/thesystem\">the system</a>.. 1luv xo'),
	(106,'wobbly','2010-10-30 17:55:09','<a href=\"http://www.poibella.org/mixtape\">mixtape coming out soooonish!</a> get ready... maybe 2k12ish...'),
	(106,'capn','2010-11-07 13:16:28','check <a href=\"http://crunchee.tumblr.com/\">chrunchee productions</a> for upcoming jamzzzz'),
	(107,'benoit','2010-12-23 01:33:11','kickin off another blog at <a href=\"http://poibella.org/emptyset\">poibella.org/emptyset</a>.. this one\'s focusing on math and science and nerdery... check <a href=\"http://www.poibella.org/thesystem\">thesystem</a> for mixtapes and rants and anarky.'),
	(108,'mcgoo','2011-01-03 14:49:21','<a href=\"http://poibella.org/trsh\">trsh productions</a> has launched the <a href=\"http://poibella.org/frankenstein\">Frankenstein EP</a> for 2011... one more year left!'),
	(120,'oh wait','2011-06-24 17:08:54','nevermind. looks like i escaped stuff after all....'),
	(121,'emelio hernandez','2012-09-29 16:04:33','\\\'e\\\' used to connect to a google reader feed but google ruined the share feature so \\\'e\\\' has been temporarily redirected to the emptyset blog... ftwroflxoxox'),
	(118,'mario','2011-05-26 10:30:41','Please send tips to:\r\n14gFPynCLAGmhhmZcPaaXPf6vBt7NKaY56\r\n<br>\r\nthxox'),
	(120,'mercy please','2011-06-23 18:43:16','i wrote this board a long time ago when i was dumber. you can sql inject this database if you wanna but there\\\\\\\'s nothing worthwhile inside... ima fix it soon. please don\\\\\\\'t hack. thanxxxx....'),
	(120,'','2013-07-03 07:58:26','');

/*!40000 ALTER TABLE `bdPosts` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table bdThreads
# ------------------------------------------------------------

DROP TABLE IF EXISTS `bdThreads`;

CREATE TABLE `bdThreads` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `User` varchar(20) NOT NULL DEFAULT '',
  `Subject` varchar(50) NOT NULL DEFAULT '',
  `Posted` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  KEY `ID` (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

LOCK TABLES `bdThreads` WRITE;
/*!40000 ALTER TABLE `bdThreads` DISABLE KEYS */;

INSERT INTO `bdThreads` (`ID`, `User`, `Subject`, `Posted`)
VALUES
	(13,'herb','deadline','2008-05-22 08:46:58'),
	(97,'Pancho Sanzo','poibella v2','2009-01-06 15:57:53'),
	(98,'johro','akrifa','2008-12-20 20:20:34'),
	(100,'frank','poibella v3','2009-02-23 07:08:16'),
	(101,'sam malone','F L I N G S   T H I N G S     R E L E A S E D','2009-09-06 11:20:12'),
	(102,'yeahaFSUUUU','little tree sloth digital seven inch','2010-03-09 09:48:31'),
	(104,'herb tracy','new fraqs and systems','2010-08-23 12:40:42'),
	(106,'capn','mixtape hype buildinnnn','2010-11-07 13:16:28'),
	(107,'benoit','empty set','2010-12-23 01:33:11'),
	(108,'mcgoo','trsh productions present frankenstein','2011-01-03 14:49:21'),
	(118,'mario','poibella now accepts bitcoins!','2011-05-26 10:30:54'),
	(120,'ballzy','sqli confession','2014-07-23 16:59:17'),
	(121,'emelio hernandez','retirement of euler\\\'s number version 1','2012-09-29 16:04:33');

/*!40000 ALTER TABLE `bdThreads` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table Users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Users`;

CREATE TABLE `Users` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Username` varchar(20) NOT NULL DEFAULT '',
  `Email` varchar(40) NOT NULL DEFAULT '',
  `Password` varchar(12) NOT NULL DEFAULT '',
  `Fname` varchar(20) NOT NULL DEFAULT '',
  `Lname` varchar(20) NOT NULL DEFAULT '',
  `Confirmed` binary(1) NOT NULL DEFAULT '0',
  UNIQUE KEY `ID` (`ID`),
  UNIQUE KEY `Username` (`Username`),
  KEY `Email` (`Email`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;

INSERT INTO `Users` (`ID`, `Username`, `Email`, `Password`, `Fname`, `Lname`, `Confirmed`)
VALUES
	(4,'chetrasho','sfm15@columbia.edu','herb','steve','miller',X'31'),
	(9,'killkill','sfm15@columbia.edu2','killkill','steve','miller',X'31'),
	(8,'','','','','',X'31'),
	(10,'butt20','sfm15@columbia.edu3','butt','steve','nutz',X'31'),
	(11,'dot diggles','dorothysum@yahoo.com','summer99','dot','summers',X'31'),
	(12,'elmo','elmo.oxygen@gmail.com','nose!army','elmo','argonaut',X'31'),
	(13,'chuckbuck','sfm16@columbia.edu','chuckbuck','chuck','buck',X'31'),
	(14,'herb','nineforty@gmail.com','herb','steve','miller',X'31'),
	(15,'jhncpba','ioscir@nzhjnl.com','','jhncpba','jhncpba',X'31'),
	(16,'sgcyirz','hxumsp@cjpull.com','','sgcyirz','sgcyirz',X'31');

/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
