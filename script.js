document.getElementById("popup").showpopup = function() {
  document.getElementById("popup").style.display = "block";
  document.getElementById('iframe').src = "http://www.google.com";
  document.getElementById('page').className = "darken";
  document.getElementById("page").style.display = "block";
}

document.getElementById("a").onclick = function(e) {
  e.preventDefault();
  document.getElementById("popup").showpopup();
}

document.getElementById('page').onclick = function() {
  if(document.getElementById("popup").style.display == "block") {
    document.getElementById("popup").style.display = "none";
    document.getElementById("page").style.display = "none";
    document.getElementById('page').className = "";
  }
};


document.addEventListener("DOMContentLoaded", function () {
    // Load XML data using XMLHttpRequest
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "dragons.xml", true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var xmlDoc = xhr.responseXML;
            var dragons = xmlDoc.getElementsByTagName("dragon");

            // Handle search input
            var searchInput = document.getElementById("searchInput");
            searchInput.addEventListener("keyup", function () {
                var searchTerm = searchInput.value.toLowerCase();
                displayResults(dragons, searchTerm);
            });

            // Get the clear search button element
            var clearSearchButton = document.getElementById("clearSearch");

            // Add a click event listener to clear the search input
            clearSearchButton.addEventListener("click", function () {
                searchInput.value = ""; // Clear the search input
                displayResults(dragons, ""); // Display all results
            });

            // Initial display of all dragons
            displayResults(dragons, "");
        }
    };
    xhr.send();
});

function displayResults(dragons, searchTerm) {
    var tableBody = document.getElementById("tableBody");
    tableBody.innerHTML = "";

    for (var i = 0; i < dragons.length; i++) {
        var dragon = dragons[i];
        var dragonName = dragon.getElementsByTagName("dragonName")[0].textContent;
        var eggDescription = dragon.getElementsByTagName("eggDescription")[0].textContent;
        var location = dragon.getElementsByTagName("location")[0].textContent;

        // Check if the dragon entry has the "Egg Sprite" element
        var eggSpriteElement = dragon.getElementsByTagName("eggSprite")[0];
        var eggSprite = eggSpriteElement ? eggSpriteElement.textContent : "";

        // Create a new row for the dragon
        var row = document.createElement("tr");

        // Create and append cells for dragon information
        var dragonNameCell = document.createElement("td");
		var dragonNameA = document.createElement("a");
		row.appendChild(dragonNameCell);
        dragonNameCell.appendChild(dragonNameA);
		dragonNameA.setAttribute = ("id", "a");
        dragonName.textContent = dragonName;

        var eggDescriptionCell = document.createElement("td");
        eggDescriptionCell.textContent = eggDescription;
        row.appendChild(eggDescriptionCell);

        var locationCell = document.createElement("td");
        locationCell.textContent = location;
        row.appendChild(locationCell);

        // Create a cell for Egg Sprite
        var eggSpriteCell = document.createElement("td");
        var eggSpriteImg = document.createElement("img");
        eggSpriteImg.src = eggSprite;
        eggSpriteCell.appendChild(eggSpriteImg);
        row.appendChild(eggSpriteCell);

        // Create a cell for the sprite
        var spriteCell = document.createElement("td");

        // Check if sprite data is a table-like structure
        var spriteTable = dragon.getElementsByTagName("sprite")[0].getElementsByTagName("table")[0];
        if (spriteTable) {
            spriteCell.appendChild(parseNestedTable(spriteTable));
        } else {
            spriteCell.textContent = dragon.getElementsByTagName("sprite")[0].textContent;
        }

        row.appendChild(spriteCell);

        // Create a cell for the artwork
        var artworkCell = document.createElement("td");

        // Check if artwork data is a table-like structure
        var artworkTable = dragon.getElementsByTagName("artwork")[0].getElementsByTagName("table")[0];
        if (artworkTable) {
            artworkCell.appendChild(parseNestedTable(artworkTable));
        } else {
            artworkCell.textContent = dragon.getElementsByTagName("artwork")[0].textContent;
        }

        row.appendChild(artworkCell);

        // Append the row to the table body
        tableBody.appendChild(row);
    }
}

function parseNestedTable(nestedTable) {
    var table = document.createElement("table");
    var rows = nestedTable.getElementsByTagName("tr");
    for (var j = 0; j < rows.length; j++) {
        var nestedRow = document.createElement("tr");
        var cells = rows[j].getElementsByTagName("td");
        for (var k = 0; k < cells.length; k++) {
            var nestedCell = document.createElement("td");
            var img = document.createElement("img");
            img.src = cells[k].textContent; // Set the image source
            nestedCell.appendChild(img); // Append the image to the cell
            nestedRow.appendChild(nestedCell);
        }
        table.appendChild(nestedRow);
    }
    return table;
}