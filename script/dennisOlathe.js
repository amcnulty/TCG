if (window.attachEvent) {window.attachEvent('onload', load);}
else if (window.addEventListener) {window.addEventListener('load', load, false);}
else {document.addEventListener('load', load, false);}
function load() {
    function init() {
        highlightButton("small");
        document.getElementsByClassName("textHidden")[0].className = "textVisible";
        document.getElementsByClassName("imgHidden")[0].className = "imgVisible";
    }

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
                size.innerHTML = "12'x45'";
                pic.src = "../res/images/dennisOlathe/12x45.jpeg";
                price.innerHTML = "Rent: $450 Monthly (No Vacancy)";
                description.innerHTML = "There are eight units of this size at the dennis Olathe location. It is a single unit with " +
                "one drive-in door. Total interior size is 540 square feet.";
            break;
            case "med":
                size.innerHTML = "22'x45'";
                pic.src = "../res/images/dennisOlathe/22x45.jpg";
                price.innerHTML = "Rent: $700 Monthly - (No Vacancy)"; 
                description.innerHTML ="There is one units of this size at the dennis Olathe location. It is a double unit with " +
                "two drive-in doors."; 
            break;
        }
    }
    
    function goHome() {
        window.location.href = "http://www.contractorsgarage.net";
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
    
    init();
}