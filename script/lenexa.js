window.onload = function() {
    function highlightButton(id) {
        switch (id) {
            case "small":
                document.getElementById(id).className = "selected";
                document.getElementById("med").className = "innerButton";
                document.getElementById("large").className = "innerButton";
                showUnit(id);
            break;
            case "med":
                document.getElementById(id).className = "selected";
                document.getElementById("small").className = "innerButton";
                document.getElementById("large").className = "innerButton";
                showUnit(id);
            break;
            case "large":
                document.getElementById(id).className = "selected";
                document.getElementById("small").className = "innerButton";
                document.getElementById("med").className = "innerButton";
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
                size.innerHTML = "15'x40'";
                pic.src = "../res/images/lenexa/15x40.jpeg";
                price.innerHTML = "Rent: $525 Monthly (No Vacancy)";
                description.innerHTML = "There are four units of this size at the Lenexa location. It is a single unit with " +
                "one drive-in door. Total interior size is 600 square feet.";
            break;
            case "med":
                size.innerHTML = "20'x40'";
                pic.src = "../res/images/lenexa/20x40.jpeg";
                price.innerHTML = "Rent: $675 Monthly (No Vacancy)"; 
                description.innerHTML ="There are eight units of this size at the Lenexa location. It is a single unit with " +
                "one drive-in door and one man door. Total interior size is 800 square feet."; 
            break;
            case "large":
                size.innerHTML = "30'x40'";
                pic.src = "../res/images/lenexa/30x40.jpeg";
                price.innerHTML = "Rent: $1000 Monthly (No Vacancy)"; 
                description.innerHTML ="There are two units of this size at the Lenexa location. It is a double unit with " +
                "no partition wall and two drive-in doors. Total interior size is 1200 square feet.";
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
    var med = document.getElementById("med")
    var large = document.getElementById("large");
    
    homeButton.addEventListener("click", goHome, false);
    
    logoImg.addEventListener("click", goHome, false);
    
    unitsButton.addEventListener("click", goToUnits, false);
    
    small.addEventListener("click", function() {
        $('html, body').animate({scrollTop: $("#buttonSection").offset().top - 160}, 600);
        highlightButton("small");
    }, false);
    
    med.addEventListener("click", function() {
        $('html, body').animate({scrollTop: $("#buttonSection").offset().top - 160}, 600);
        highlightButton("med");
    }, false);
    
    large.addEventListener("click", function() {
        $('html, body').animate({scrollTop: $("#buttonSection").offset().top - 160}, 600);
        highlightButton("large");
    }, false);
    
    highlightButton("small");
}