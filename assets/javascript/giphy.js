

// Initial array of TV show gifs
var gifs = ['Game of Thrones', 'Star Trek', 'American Horror Story', 'The Simpsons', "AMC Preacher"];

//AJAX function that assigns JSON data and appends to gifs ID
function displayGifInfo() {	
	var b = $(this).attr("data-name")
	$("#gifs").empty();
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + b + "&rating=g&api_key=2d968b725bf342d2a9b529c51a234a77&limit=10";
	//console.log(queryURL);
	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function(response) {
		//console.log(response)
		var gifDiv = $("<div>");
		var result = response
		for (var i = 0; i < 10; i ++) {
			var pRating = $("<p>").text("Rating: " + result.data[i].rating);
			var gifImg = $("<img>")
			gifImg.attr("src", result.data[i].images.original_still.url)
			gifImg.attr("data-state", "still")
			gifImg.attr("class", "gifff")
			gifImg.attr("data-still", result.data[i].images.original_still.url)
			gifImg.attr("data-animate", result.data[i].images.original.url)
			var gifTest = $("<button>").append(pRating, gifImg);
			$("#gifs").append(gifTest)
		}
	});
};

//Function that renders gif buttons from an array
function renderButtons() {
	$('#gif-buttons').empty();
	for (var i = 0; i < gifs.length; i++) {
		var a = $('<button>');
		a.addClass('gif');
		a.attr('data-name', gifs[i]);
		a.text(gifs[i]);
		$('#gif-buttons').append(a);
	}
};

//Click handler that calls takes value of input field and calls renderButtons to create additional button
$('#add-gif').on('click', function(event) {
	event.preventDefault();
	$("#gifs").empty();
	var gif = $("#gif-input").val().trim();
	gifs.push(gif);
	renderButtons();
});

//Function that changes data-state and img source to animate from still and vice versa
function gifSwitch() {
	var state = $(this).attr("data-state");
	if (state === "still") {
		$(this).attr("src", $(this).attr("data-animate"));
		$(this).attr("data-state", "animate");
		console.log("gif is moving");
	} else if (state === "animate") {
		$(this).attr("src", $(this).attr("data-still"));
		$(this).attr("data-state", "still");
		console.log("gif is still");
	}
}

//Click handler that calls displayGifInfo function and calls renderButtons function if
//.gif element is clicked
$(document).on("click", ".gif", displayGifInfo);
	renderButtons();

//Click handler that calls gifSwitch function if .gifff element is clicked
$(document).on("click", ".gifff", gifSwitch); 
	

