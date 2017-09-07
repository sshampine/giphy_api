

// Initial array of gifs

var gifs = ['Captain Kirk', 'Mr Spock', 'Captain Picard', 'Commander Riker'];

function displayGifInfo() {
	
	var b = $(this).attr("data-name")
	$("#gifs").empty();
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + b + "&api_key=2d968b725bf342d2a9b529c51a234a77&limit=10";
	console.log(queryURL);
	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function(response) {
		//console.log(response)
		//console.log(response.data[1].url)
		//$('#gifs').html(response.data[1].url);
		//var gifView = $("<div>");
		var result = response
		//console.log(result)
		for (var i = 0; i < 10; i ++) {
			var pRating = $("<p>").text("Rating " + result.data[i].rating);
			$("#gifs").append(pRating) 
			var gifImg = $("<img>").attr("src", result.data[i].images.original.url)
			$("#gifs").append(gifImg);
		}
	});
};


function renderButtons() {
	$('#gif-buttons').empty();
	//$("#gifs").empty();
	for (var i = 0; i < gifs.length; i++) {
		var a = $('<button>');
		a.addClass('gif');
		a.attr('data-name', gifs[i]);
		a.text(gifs[i]);
		$('#gif-buttons').append(a);
	}
};

$('#add-gif').on('click', function(event) {
	event.preventDefault();
	$("#gifs").empty();
	var gif = $("#gif-input").val().trim();
	gifs.push(gif);
	console.log(gif)
	renderButtons();
});

$(document).on("click", ".gif", displayGifInfo);
	//$("#gifs").empty()
	renderButtons();