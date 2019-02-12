var animals = [];
const DEFAULT_ANIMALS = ["cat", "dog", "dragon"];

$(document).ready(function() {
    for (var a in DEFAULT_ANIMALS) {
        addAnimalButton(DEFAULT_ANIMALS[a]);
    }
});

function addAnimal() {
    addAnimalButton(document.forms["animal-form"]["animal-input"].value);
}

function addAnimalButton(animal) {
    if (animals.indexOf(animal) == -1) {
        animals.push(animal);
        var a = document.createElement("button");
        a.className = "animal-button";
        a.onclick = function() {
            fetchAnimal(animal);
        }
        a.appendChild(document.createTextNode(animal));
        document.getElementById("animal-buttons").append(a);
    }    
}

const GIPHY_API_SEARCH = "https://api.giphy.com/v1/gifs/search?";

function fetchAnimal(search, size) {
    console.log("fetching " + search);

    size = size || 10;
    var queryURL = GIPHY_API_SEARCH + $.param({
        "q" : search,
        "apiKey" : "dc6zaTOxFJmzC",
        "limit" : size
    });
    $.ajax({
        url: queryURL,
        method: "GET",
    }).done(function(response) {
        console.log(response);
        createAnimals(response.data);
    });
}

function createAnimals(data) {
    var animals = document.getElementById("animals");
    removedChildren(animals);

    for (var i = 0; i < data.length; i++) {
        var animalDiv = document.createElement("div");
        animalDiv.className = "animal-item";

        var pDiv = document.createElement("p");
        pDiv.appendChild(document.createTextNode("Rating: " + data[i].rating));
        animalDiv.appendChild(pDiv);

        var img = document.createElement("img");
        img.className = "animal-image";
        img.src = data[i].images.fixed_height_still.url;

        var imgDiv = document.createElement("div");
        imgDiv.className = "animal-image-item";
        imgDiv.onmouseover = function(img, url) {
            return function() {
                img.src = url;
            }
        }(img, data[i].images.fixed_height.url);    
        imgDiv.onmouseout = function(img, url) {
            return function() {
                img.src = url;
            }
        }(img, data[i].images.fixed_height_still.url);    
        imgDiv.appendChild(img);
        animalDiv.appendChild(imgDiv);

        animals.append(animalDiv);
    }
}

function removedChildren(node) {
    while (node.firstChild) {
        node.removeChild(node.firstChild);
    }
}
