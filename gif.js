// FUNCTIONAL PROGRAMMING
$(document).ready(function() {
var list = ["muse", "queen", "sting", "mozart", "bach", "coldplay", "adele", "ladygaga"]

var buttons = document.getElementById("buttons");
var images = document.getElementById("images");

var item = "cat";
var butt = document.createElement("button");
butt.innerHTML = item;
buttons.append(butt);


var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + item + "&api_key=dc6zaTOxFJmzC&limit=10";


//creating buttons

for (i = 0; i < list.length; i++) {
    var butt = document.createElement("button");
    butt.innerHTML = list[i];
    buttons.append(butt);
}

// creating ajax querry
$.ajax({
    url: queryURL,
    method: "get"
}).then(function(responce) {
    console.log(responce);
    
    var itemRating = $("<p>").text(responce.data.rating);
    var itemImage = $("<img>");
    personImage.attr("src", responce.data.itemImage.fixed_height.url);
    images.append(itemRating);
    images.append(itemImage);
});



});