<?php
require_once('twitteroauth/twitteroauth/twitteroauth.php');

// check cached version exists

$filename = 'tweets.json';

$last = filemtime($filename);

if($last>=time()-900){
	// load from cache

	$content = file_get_contents($filename);

} else {

	$connection = new TwitterOAuth('w1pv08xMJTl0JH4l4MRTBA', 'YyLNBATJANxMHy4pKFxtysI0gKzck8atappMbEgUNs',"56805577-YTeUAcDHONxZUWwUpBFPMoF68Roun5zIOBXu1xdhs", "KfiMugHUXrlAZvJLGPSfuVslwAfN3ZnA1QPtMDRQrA");
	$content = $connection->get("statuses/user_timeline.json?screen_name=" . $_GET["screen_name"] . "&include_rts=0&tweet_mode=extended&count=" . $_GET["count"]);

	$content = json_encode($content);

	// save to cache

	$tempfile = fopen('new_tweets.json', 'w');
	if (!$tempfile) {
		exit('<p>Unable to open temporary file for writing!</p>');
	}
	fwrite($tempfile, $content);
	fclose($tempfile);

	// copy temporary file to correct location
	$ok = copy('new_tweets.json', $filename);

	// delete temporary file
	unlink('new_tweets.json');

}

echo $content;
?>