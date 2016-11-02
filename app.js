var topics = ["Snowboarding", "Slam Dunk", "Skateboarding", "Fishing", "Squat", "Tackle", "Dance", "Dog", "Parking", "Coffee", "Sitting", "Birthday", "Kiss", "Music" ];

//function to display gifs

function displayGiphy(){
	console.log("working");
	var giph = $(this).attr('data-name');
	var giphURL = "http://api.giphy.com/v1/gifs/search?q=" + giph + "&api_key=dc6zaTOxFJmzC&limit=10&rating=pg";
	console.log(giphURL);
	$.ajax({url: giphURL, method: 'GET'})
	.done(function(response) {
			console.log(response);
			JSON.stringify(response);
		var results =response.data;
		for (var i = 0; i < results.length; i++) {
				var failDiv = $('<div class="fail-Image">');
			   var rating = results[i].rating;
			   var p = $('<p>').text("Rating: " + rating);

                    var failImage = $('<img>');
                    failImage.attr('src', results[i].images.fixed_height.url);
                    failImage.addClass('images');
                    failImage.attr('data-state', 'data-still')
                    failDiv.append(p)
                    // failDiv.attr("data-state", 'animate');
                    failDiv.append(failImage)

                    $('#failView').prepend(failDiv);
                }
            });
			}

function addButtons(){ 

		// Deletes the gifs prior to adding new gifs (this is necessary otherwise you will have repeat buttons)
		$('#buttonsView').empty();

		// Loops through the array of gifs
		for (var i = 0; i < topics.length; i++){

			// Then dynamicaly generates buttons for each gif in the array

			// Note the jQUery syntax here... 
		    var a = $('<button>') // This code $('<button>') is all jQuery needs to create the beginning and end tag. (<button></button>)
		    a.addClass('fail'); // Added a class 
		    a.attr('data-name', topics[i] + '+' + 'fail'); // Added a data-attribute
		    a.text(topics[i] + " fail"); // Provided the initial button text
		    $('#buttonsView').append(a); // Added the button to the HTML
		}
	}
$('#addFail').on('click', function(){

		// This line of code will grab the input from the textbox
		var fail = $('#fail-input').val().trim();

		// The movie from the textbox is then added to our array
		topics.push(fail);
		
		// Our array then runs which handles the processing of our movie array
		addButtons();

		// We have this line so that users can hit "enter" instead of clicking on ht button and it won't move to the next page
		return false;
	});

	// ========================================================

	// Generic function for displaying the gif
	$(document).on('click', '.fail', displayGiphy);


	
	// This calls the renderButtons() function
	addButtons();


	//sets the state to either still or animated
$(document).on('click', '.images', function(){
            var state = $(this).attr('data-state');
            console.log(state);
           if( state === 'still'){
                   $(this).attr('src', '.data-animate');
                   $(this).attr('data-state', 'data-animate');
                }
                else if (state === 'animate'){
                $(this).attr('src', $(this).attr('data-still'));
                $(this).attr('data-state', 'data-still');
             }
            });