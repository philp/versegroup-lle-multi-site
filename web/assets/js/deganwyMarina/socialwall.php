<?php
$returnlimit = 12;

// Twitter screen name
//$tscreenname = 'LongAshesPark';

// Pinterest user id
//If using our pinterest program can only get pins from 1 board (if we have their account details we can setup a all pins feed) comment out board id if using their own token*/

//$ptoken = 'Aq-GtUDAnIB5svjmcwXDPXJ89BO8FWtMFKyTT1BEcJllLGA2AQugADAAAOVfRWzhuAWgdDcAAAAA';
//$puserid = 'longashespark';
//$pboardid = 'long-ashes-pure-spa';

// Allowed origins for the feed request
$allowed = array("https://www.verse.co.uk", "https://www.sck-webworks.co.uk", "http://deganwy-marina.test:8888/", "http://deganwy.lle.dev.verseapps.co.uk/", "http://www.deganwymarina.co.uk/", "https://www.deganwymarina.co.uk/");

//Needs to be user specific 
$iuserid = '8252552126';
//$itoken = '8252552126.a121548.6991fbf043804abdb410cbfc63b1254c'; 
$iuser = 'lakelandleisuremarinas';

//Facebook user id, can only access their own posts without creating a system for it
//$fbpageid = 'longashespark';

function add_quotes($str) { return '"'.$str.'"'; }

function unencodeCharaters($string) {
	$string = preg_replace('/\\\u00a/', '&pound;', $string);
	$string = preg_replace('/\\\u([0-9a-fA-F]+)/', '&#x$1;', $string);
	return $string;
}

function compareCreatedAt($a, $b) {
    if ($a["created_at"] == $b["created_at"]) {
    	return 0;
    }
	return ($a["created_at"] > $b["created_at"]) ? -1 : 1;
}

$filename = 'socialwall.json';

$last = 0;
if(file_exists($filename)) {
	$last = filemtime($filename);
}

if($last>=time()-900){
	// load from cache

	$content = file_get_contents($filename);

} else {

	$mh = curl_multi_init();

	// Twitter auth setup
	if(isset($tscreenname)) {
		$ttoken = "56805577-YTeUAcDHONxZUWwUpBFPMoF68Roun5zIOBXu1xdhs";
		$ttoken_secret = "KfiMugHUXrlAZvJLGPSfuVslwAfN3ZnA1QPtMDRQrA";
		$tconsumer_key = 'w1pv08xMJTl0JH4l4MRTBA';
		$tconsumer_secret = 'YyLNBATJANxMHy4pKFxtysI0gKzck8atappMbEgUNs';
		$turl = 'https://api.twitter.com/1.1/statuses/user_timeline.json';

		$tquery = array(
			'screen_name' => $tscreenname,
			'tweet_mode' => 'extended'
		);
		$toauth = array(
			'oauth_consumer_key' => $tconsumer_key,
		    'oauth_token' => $ttoken,
		    'oauth_nonce' => (string)mt_rand(), // a stronger nonce is recommended
		    'oauth_timestamp' => time(),
		    'oauth_signature_method' => 'HMAC-SHA1',
		    'oauth_version' => '1.0'
		);

		$toauth = array_map("rawurlencode", $toauth); 
		$tquery = array_map("rawurlencode", $tquery);
		$tarr = array_merge($toauth, $tquery);
		asort($tarr); 
		ksort($tarr);

		$tquerystring = urldecode(http_build_query($tarr, '', '&'));
		$tbase_string = "GET&".rawurlencode($turl)."&".rawurlencode($tquerystring);
		$tkey = rawurlencode($tconsumer_secret)."&".rawurlencode($ttoken_secret);
		$tsignature = rawurlencode(base64_encode(hash_hmac('sha1', $tbase_string, $tkey, true)));
		$turl .= "?".http_build_query($tquery);
		$turl=str_replace("&amp;","&",$turl); 
		$toauth['oauth_signature'] = $tsignature; 
		ksort($toauth); 
		$toauth = array_map("add_quotes", $toauth);
		$tauth = "OAuth " . urldecode(http_build_query($toauth, '', ', '));

		$toptions = array( CURLOPT_HTTPHEADER => array("Authorization: $tauth"),
		                  CURLOPT_HEADER => false,
		                  CURLOPT_URL => $turl,
		                  CURLOPT_RETURNTRANSFER => true,
		                  CURLOPT_SSL_VERIFYPEER => false);

		$tfeed = curl_init();
		curl_setopt_array($tfeed, $toptions);
		curl_multi_add_handle($mh,$tfeed);
	}

	if(isset($fbpageid)) {
		//Facebook oauth setup
		$fbtoken = 'EAAENlogrmjABAPeJH2CtjmPSEdbZBQgutEafKiVE5M3jYlryF85tN0ZAZC4jozkYCPQ2zbPJGXd06blzxHHx6UHuY4U4TSj3IPv1nO6YflNNAZAxAOosjAzZA7ROZChFvXB0EGARgUcLOhqRCwrUzyU8E6aE8Hwhc5MHb9RfFDsAZDZD';
		$fburl = "https://graph.facebook.com/v2.10/".$fbpageid."/posts/";
		$fbfields = '&fields=full_picture,caption,created_time,name,link&count=10';

		$fbfeed = curl_init();
		curl_setopt($fbfeed, CURLOPT_URL, $fburl . '?access_token='.$fbtoken.$fbfields);
		curl_setopt($fbfeed, CURLOPT_RETURNTRANSFER,1);
		curl_setopt($fbfeed, CURLOPT_HEADER, 0);
		curl_multi_add_handle($mh,$fbfeed);
	}

	//Pintrest oauth setup
	if(isset($puserid)) {
		$purl = "https://api.pinterest.com/v1/me/pins/";
		if(isset($pboardid)) {
			$purl = "https://api.pinterest.com/v1/boards/".$puserid."/".$pboardid."/pins/";
		}
		$pfields = '&fields=id%2Clink%2Cnote%2Curl%2Cimage%2Ccreated_at&count=10';

		$pfeed = curl_init();
		curl_setopt($pfeed, CURLOPT_URL, $purl . '?access_token='.$ptoken.$pfields);
		curl_setopt($pfeed, CURLOPT_RETURNTRANSFER,1);
		curl_setopt($pfeed, CURLOPT_HEADER, 0);
		curl_multi_add_handle($mh,$pfeed);
	}

	// Instagram auth setup
	if(isset($itoken)) {
		$iurl = 'https://api.instagram.com/v1/users/'.$iuserid.'/media/recent';
		$ifields = '&count=12';

		$ifeed = curl_init();
		curl_setopt($ifeed, CURLOPT_URL, $iurl . '?access_token='.$itoken.$ifields);
		curl_setopt($ifeed, CURLOPT_RETURNTRANSFER,1);
		curl_setopt($ifeed, CURLOPT_HEADER, 0);
		curl_multi_add_handle($mh,$ifeed);
	} elseif(isset($iuserid)) {
		$iurl = 'https://www.instagram.com/graphql/query/?query_hash=e769aa130647d2354c40ea6a439bfc08&variables=%7B%22id%22:%22'.$iuserid.'%22,%22first%22:12%7D';
		$ifeed = curl_init();
		curl_setopt($ifeed, CURLOPT_URL, $iurl);
		curl_setopt($ifeed, CURLOPT_RETURNTRANSFER,1);
		curl_setopt($ifeed, CURLOPT_HEADER, 0);
		curl_multi_add_handle($mh,$ifeed);
	}


	$active = null;
	do {
	    $mrc = curl_multi_exec($mh, $active);
	} while ($mrc == CURLM_CALL_MULTI_PERFORM);

	while ($active && $mrc == CURLM_OK) {
	    if (curl_multi_select($mh) == -1) {
	        usleep(100);
	    }
      do {
          $mrc = curl_multi_exec($mh, $active);
      } while ($mrc == CURLM_CALL_MULTI_PERFORM);
	}

	$results = array();

	// add Twitter feed
	if(isset($tscreenname)) {
		$twitterfeed = curl_multi_getcontent($tfeed);

		$tweets = json_decode($twitterfeed, true);
		foreach($tweets as $tweet) {
			if(isset($tweet['extended_entities']) && isset($tweet['extended_entities']['media']) && count($tweet['extended_entities']['media']) > 0) {
				$date = strtotime($tweet['created_at']);
				$results[] = array(
					'text' => $tweet["full_text"],
					'url' => $tweet['extended_entities']['media'][0]['media_url_https'],
					'type' => 'twitter',
					'created_at' => $date * 1000,
					'link' => 'https://twitter.com/' . $tscreenname . '/status/' . $tweet['id'],
					'user_id' => $tscreenname
				);
			}
		}
	}

	//add instagram
	if(isset($iusertoken)) {
		$instagramfeed = curl_multi_getcontent($ifeed);

		$posts = json_decode($instagramfeed,true);

		if(isset($posts["data"])) {
			foreach($posts['data'] as $post) {
				$text = '';
				if(!is_null($post['caption'])) {
					$text = $post['caption']['text'];
				}
				$results[] = array(
					'text' => $text,
					'url' => $post['images']['standard_resolution']['url'],
					'type' => 'instagram',
					'created_at' => intval($post['created_time']) * 1000,
					'link' => 'https://www.instagram.com/' . $post['user']['username'],
					'user_id' => $post['user']['username']
				);
			}
		}
	} elseif(isset($iuserid)) {
		$instagramfeed = curl_multi_getcontent($ifeed);

		$data = json_decode($instagramfeed,true);
		$posts = $data['data']['user']['edge_owner_to_timeline_media']['edges'];
		
		foreach($posts as $edge) {
				$post = $edge['node'];
				$text = '';
				if(!is_null($post['edge_media_to_caption']['edges'][0])) {
					$text = $post['edge_media_to_caption']['edges'][0]['node']['text'];
				}
				$results[] = array(
					'text' => $text,
					'url' => $post['display_url'],
					'type' => 'instagram',
					'created_at' => intval($post['taken_at_timestamp']) * 1000,
					'link' => 'https://www.instagram.com/' . $iuser,
					'user_id' => $iuser
				);
			}
	}

	//add Pinterest
	if(isset($puserid)) {
		$pinterestfeed = curl_multi_getcontent($pfeed);

		$pins = json_decode(unencodeCharaters($pinterestfeed),true);

		if(isset($pins['data'])) {
			foreach($pins['data'] as $pin) {
				$date = strtotime($pin['created_at']);
			    $results[] = array(
					'text' => $pin['note'],
					'url' => $pin['image']['original']['url'],
					'type' => 'pinterest',
					'created_at' => $date * 1000,
					'link' => $pin['url'],
					'user_id' => $puserid
				);
			}
		}
	}

	//add Facebook
	if(isset($fbpageid)) {
		$facebookfeed = curl_multi_getcontent($fbfeed);
		$fbposts = json_decode(unencodeCharaters($facebookfeed),true);
		foreach($fbposts['data'] as $post) {
			$date = strtotime($post['created_time']);
		    $results[] = array(
				'text' => $post['name'],
				'url' => $post['full_picture'],
				'type' => 'facebook',
				'created_at' => $date * 1000,
				'link' => $post['link'],
				'user_id' => fbpageid
			);
		}
	}

	// Sort into date order and save in cache file
	usort($results, "compareCreatedAt");

	$content = json_encode(array_slice($results, 0, $returnlimit));
	//$content = json_encode($results);

	$tempfile = fopen('socialwall-new.json', 'w');
	if (!$tempfile) {
		exit('<p>Unable to open temporary file for writing!</p>');
	}
	fwrite($tempfile, $content);
	fclose($tempfile);

	$ok = copy('socialwall-new.json', $filename);
	unlink('socialwall-new.json');

	//close the handles
	if($tfeed) {
		curl_multi_remove_handle($mh, $tfeed);
	}
	if($pfeed) {
		curl_multi_remove_handle($mh, $pfeed);
	}
	if($ifeed) {
		curl_multi_remove_handle($mh, $ifeed);
	}
	curl_multi_close($mh);
}

header('Content-Type: application/javascript');
$http_origin = array_key_exists('HTTP_ORIGIN', $_SERVER) ? $_SERVER['HTTP_ORIGIN'] : NULL;
$alloworigin = "https://www.sck-webworks.co.uk";
if(in_array($http_origin,$allowed)) {
    $alloworigin = $http_origin;
}
header("Access-Control-Allow-Origin: $alloworigin");

echo $content;
