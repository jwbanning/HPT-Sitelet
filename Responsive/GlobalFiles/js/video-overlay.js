var schwabVideo;

$(document).ready(function() {
	
	schwabVideo = videojs("video-screen");

	// $("#video-overlay").click(closeVideoPlayer);
	$(".video-link").click(openVideoPlayer);
	$("#video-close").click(closeVideoPlayer);
	$("#video-overlay").click(closeVideoPlayer);
	$("#video-screen").click(function(e) {
		e.stopPropagation()
		e.preventDefault();
		return;
	});
	$("#video-header").click(function(e) {
		e.stopPropagation()
		e.preventDefault();
		return;
	});
});

function openVideoPlayer() {
	$("#video-overlay").css("left", "0px").fadeTo("1000", 1);
	schwabVideo.currentTime(0);
	schwabVideo.play();
}

function closeVideoPlayer() {
	schwabVideo.pause();
	//$("#video-overlay").fadeTo("1000", 0, function() { $(this).hide(); });
	$("#video-overlay").fadeTo("1000", 0, function() { $(this).css("left", "-10000px"); });
}