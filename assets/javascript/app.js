$(document).ready(function(){

var topics = ["dog", "cat", "walrus", "elephant", "fish", "wolf", "giraffe",
			  "ladybug", "crab", "whale", "snake", "owl", "deer", "ram",
			  "lion", "buffalo", "rhino", "lizard", "antelope"];

function renderButtons() {

					$(".buttons").empty();

					
					for (var i = 0; i < topics.length; i++) {

						// Then dynamicaly generating buttons for each movie in the array
						// This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
						var a = $("<button type='button' class='btn btn-info'>");
						// Adding a class
						a.addClass("animal");
						// Added a data-attribute
						a.attr("data-name", topics[i]);
						// Provided the initial button text
						a.text(topics[i]);
						// Added the button to the HTML
						$(".buttons").append(a);
					}
				}

$("#animalSubmit").on("click", function(event) {

       	  event.preventDefault();

          
          var animal = $("#animal-input").val().trim();
          console.log(animal);

          topics.push(animal);

          renderButtons();

          // Here we construct our URL
          var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=dc6zaTOxFJmzC";
          

      });

function showGIFS() {

				$(".gifsDisplay").empty();

				var choice = $(this).data("name");

         		var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + choice + "&api_key=dc6zaTOxFJmzC";
          
				$.ajax({ url: queryURL, method: "GET"}).done(function(response) {

				var animalGIF = response.data;
				//console.log("animal" + animalGIF);
            	for (var i = 0; i <= 10; i++) {
            
            	var gifDiv = $("<div class='gifDiv'>");

            	var rating = animalGIF[i].rating;
            	//console.log(rating);
            	var p = $("<p>").text("Rating: " + rating);
            	console.log(p);
            	var animalImage = $("<img class='moveAndStop'>");
            	animalImage.attr("src", animalGIF[i].images.fixed_height_still.url);
            	animalImage.attr("data-still", animalGIF[i].images.fixed_height_still.url);
            	animalImage.attr("data-animate", animalGIF[i].images.fixed_height.url);
            	animalImage.attr("data-state", "still")
            	gifDiv.append(p);
            	gifDiv.append(animalImage);

            	$(".gifsDisplay").append(gifDiv);
          }
          });

		}


function animate() {
     console.log("test");
      var state = $(this).attr("data-state");
      console.log(state);
      if(state === "still"){
        
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
        
      }

      else{
        
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
        
      }

    };


$(document).on("click", ".moveAndStop", animate);



$(document).on("click", ".animal", showGIFS);


renderButtons();

});