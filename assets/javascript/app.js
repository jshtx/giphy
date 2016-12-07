$(document).ready(function(){

//array of topics for buttons to be displayed at top of the screen
var topics = ["dog", "cat", "walrus", "elephant", "fish", "wolf", "giraffe",
			  "ladybug", "crab", "whale", "snake", "owl", "deer", "ram",
			  "lion", "buffalo", "rhino", "lizard", "antelope"];

//function that renders the buttons
function renderButtons() {
					//clears the buttons div every time it's ran
					$(".buttons").empty();

					//loop that adds the buttons
					for (var i = 0; i < topics.length; i++) {

						var a = $("<button type='button' class='btn btn-info'>");
						// adds the animal class
						a.addClass("animal");
						// adds a data attribute
						a.attr("data-name", topics[i]);
						// puts the text inside the button
						a.text(topics[i]);
						// appends the buttons to the buttons div
						$(".buttons").append(a);
					}
				}

//function that adds a button when submitted by the user
$("#animalSubmit").on("click", function(event) {

       	  event.preventDefault();

          //stores the user answer into variable animal
          var animal = $("#animal-input").val().trim();
          
          //pushes the user inputed animal into the array
          topics.push(animal);
          //calls the renderButtons function to display the new button
          renderButtons();

      });


//function that displays the gifs
function showGIFS() {
				//empties the gif div to start fresh every time
				$(".gifsDisplay").empty();
				//gets the data-name from button selected and assigns it to var choice
				var choice = $(this).data("name");
				//puts the var choice into the url for giphy
         		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + choice + "&api_key=dc6zaTOxFJmzC";
          		//calls the giphy api to get the gifs
				$.ajax({ url: queryURL, method: "GET"}).done(function(response) {

				var animalGIF = response.data;
				//for loop that builds the gif div and displays them		
            	for ( i = 0; i <= 10; i++) {
            		//creates a variable for gif div
            		var gifDiv = $("<div class='gifDiv'>");
            		//grabs the rating and assigns it to a var
            		var rating = animalGIF[i].rating;
           			//creates an element for the gif rating
            		var p = $("<p>").text("Rating: " + rating);
            		//creates element for the gif
            		var animalImage = $("<img class='moveAndStop'>");
            		//makes the initial source the still gif url
            		animalImage.attr("src", animalGIF[i].images.fixed_height_still.url);
            		//adds the still gif as an attribute
            		animalImage.attr("data-still", animalGIF[i].images.fixed_height_still.url);
            		//adds the animated gif as an attribute
            		animalImage.attr("data-animate", animalGIF[i].images.fixed_height.url);
            		//sets initial state as still
            		animalImage.attr("data-state", "still")
            		//appends the rating of the gif to the gifDiv
            		gifDiv.append(p);
            		//appends actual gif to the gifDiv
            		gifDiv.append(animalImage);
            		//appends the entire gifDiv to the gifsDisplay div in original html
            		$(".gifsDisplay").append(gifDiv);
          }

          });

		}

//function animates gifs and stops gifs if they are already animated
function animate() {
      //sets the var state to the state that the gif is currently in	
      var state = $(this).attr("data-state");
     //checks to see if the state is still, if it is runs this
      if(state === "still"){
        //changes the src url to the animated gif url
        $(this).attr("src", $(this).attr("data-animate"));
        //changes the state to animated
        $(this).attr("data-state", "animate");
        
      }
      //if already animated it runs this
      else{
        //changes src url to the still url
        $(this).attr("src", $(this).attr("data-still"));
        //changes the state to still
        $(this).attr("data-state", "still");
        
      }

    };

//listens for a click on the gifs, calls animate function and does what it is told
$(document).on("click", ".moveAndStop", animate);

//looks for click on the buttons and calls showGIFS function if clicked
$(document).on("click", ".animal", showGIFS);

//initial call of renderButtons to get things going
renderButtons();

});