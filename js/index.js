let nextPageToken = "";
let prevPageToken = "";
let API_KEY = "";

function watchForm() {
	$("#myForm").on("submit", function(event) {
		event.preventDefault();
		console.log($("#keyTerm").val());
		//CALL TO THE API USING JQUERY
		queryVideos();
	});

	$("#prev").on("click", function(event) {
		event.preventDefault();
		queryVideosPrevNext(prevPageToken);
		window.scrollTo(0,0);
	})

	$("#next").on("click", function(event) {
		event.preventDefault();
		queryVideosPrevNext(nextPageToken);
		window.scrollTo(0,0);
	})
}

function queryVideos() {
	$.ajax({
		url: "https://www.googleapis.com/youtube/v3/search",
		data: {
			part: "snippet",
		    maxResults: 10,
		    q: $("#keyTerm").val(),
		    type: "video",
			key: API_KEY
		},
		method: 'GET',
		dataType: 'json',
		//ContentType: TYPE OF DATA TO BE SENT TO THE API
		success: function(responseJSON) {
				$("#results").empty();
				console.log(responseJSON);

				nextPageToken = responseJSON.nextPageToken;
				prevPageToken = responseJSON.prevPageToken;

				if (typeof prevPageToken === 'undefined' || prevPageToken === "") {
					$("#prev").css("visibility", "hidden");
				} else {
					$("#prev").css("visibility", "visible");
				}

				if (typeof nextPageToken === 'undefined' || nextPageToken === "") {
					$("#next").css("visibility", "hidden");
				} else {
					$("#next").css("visibility", "visible");
				}

				for (let video of responseJSON.items) {
					$("#results").append("<div class='item'><a href='https://www.youtube.com/watch?v=" + video.id.videoId + "' target='blank'><h3 class='link'>" + video.snippet.title + "</h3><img class='link' src='" + video.snippet.thumbnails.medium.url + "'/></a></div>");
				}
			},
		error: function(err){
					$("#results").html('<p>Videos not found, please try again.</p>');
				}
		})
}

function queryVideosPrevNext(pageT) {
	$.ajax({
		url: "https://www.googleapis.com/youtube/v3/search",
		data: {
			part: "snippet",
		    maxResults: 10,
		    q: $("#keyTerm").val(),
		    pageToken: pageT,
		    type: "video",
			key: "AIzaSyCcfs_t2S_ncKzp3Cvflu05eKbGAksBhPs"
		},
		method: 'GET',
		dataType: 'json',
		//ContentType: TYPE OF DATA TO BE SENT TO THE API
		success: function(responseJSON) {
				$("#results").empty();
				console.log(responseJSON);

				nextPageToken = responseJSON.nextPageToken;
				prevPageToken = responseJSON.prevPageToken;

				if (typeof prevPageToken === 'undefined' || prevPageToken === "") {
					$("#prev").css("visibility", "hidden");
				} else {
					$("#prev").css("visibility", "visible");
				}

				if (typeof nextPageToken === 'undefined' || nextPageToken === "") {
					$("#next").css("visibility", "hidden");
				} else {
					$("#next").css("visibility", "visible");
				}

				for (let video of responseJSON.items) {
					$("#results").append("<div class='item'><a href='https://www.youtube.com/watch?v=" + video.id.videoId + "' target='blank'><h3 class='link'>" + video.snippet.title + "</h3><img class='link' src='" + video.snippet.thumbnails.medium.url + "'/></a></div>");
				}
		},
		error: function(err){
					$("#results").html('<p>Videos not found, please try again.</p>');
				}
		})
}

watchForm();


