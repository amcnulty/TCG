window.onload = function() {
    function highlightButton(id) {
        switch (id) {
            case "small":
                document.getElementById(id).className = "selected";
                showUnit(id);
            break;
        }
    }
    
    function showUnit(id) {
        var size = document.getElementById("size");
        var pic = document.getElementById("unitPic");
        var price = document.getElementById("price");
        var description = document.getElementById("unitDescription");
        switch (id) {
            case "small":
                size.innerHTML = "12'x45'";
                pic.src = "../res/images/dennisOlathe/12x45.jpeg";
                price.innerHTML = "Rent: $425 Monthly (No Vacancy)";
                description.innerHTML = "There are ten units of this size at the dennis Olathe location. It is a single unit with " +
                "one drive-in door. Total interior size is 540 square feet.";
            break;
        }
    }
    
    function goHome() {
        window.location.href = "../index.html";
    }
    
    function goToUnits() {
        $('html, body').animate({scrollTop: $("#buttonSection").offset().top - 160}, 600);
    }
    
    var homeButton = document.getElementById("homeNavButton");
    var logoImg = document.getElementById("headerLogoImg");
    var unitsButton = document.getElementById("unitsNavButton");
    var small = document.getElementById("small");
    
    homeButton.addEventListener("click", goHome, false);
    
    logoImg.addEventListener("click", goHome, false);
    
    unitsButton.addEventListener("click", goToUnits, false);
    
    small.addEventListener("click", function() {
        $('html, body').animate({scrollTop: $("#buttonSection").offset().top - 160}, 600);
        highlightButton("small");
    }, false);
    
    highlightButton("small");
}