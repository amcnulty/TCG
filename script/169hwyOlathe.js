window.onload = function() {
    function highlightButton(id) {
        switch (id) {
            case "small":
                document.getElementById(id).className = "selected";
                document.getElementById("med").className = "innerButton";
                showUnit(id);
            break;
            case "med":
                document.getElementById(id).className = "selected";
                document.getElementById("small").className = "innerButton";
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
                size.innerHTML = "15'x45'";
                pic.src = "../res/images/169hwyOlathe/15x45.jpeg";
                price.innerHTML = "Rent: $525 Monthly (No Vacancy)";
                description.innerHTML = "There are twenty units of this size at the 169 hwy Olathe location. It is a single unit with " +
                "one drive-in door. Total interior size is 675 square feet.";
            break;
            case "med":
                size.innerHTML = "20'x45'";
                pic.src = "../res/images/169hwyOlathe/20x45.jpeg";
                price.innerHTML = "Rent: $675 Monthly (No Vacancy)"; 
                description.innerHTML ="There are fifteen units of this size at the Lenexa location. It is a single unit with " +
                "one drive-in door and one man door. Total interior size is 900 square feet."; 
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
    
    highlightButton("small");
}