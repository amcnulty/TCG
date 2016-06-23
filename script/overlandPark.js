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
                size.innerHTML = "20'x45'";
                pic.src = "../res/images/overlandPark/comingSoon.jpeg";
                price.innerHTML = "Rent: $700 Monthly - Property is now about 50 percent pre-leased.  Reserve your unit now before they are gone";
                description.innerHTML = "There are twenty-four units of this size at the Overland Park location. It is a single unit with " +
                "one drive-in door with an adjacent man door for easy access.";
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
    
    homeButton.addEventListener("click", goHome, false);
    
    logoImg.addEventListener("click", goHome, false);
    
    unitsButton.addEventListener("click", goToUnits, false);
    
    small.addEventListener("click", function() {
        $('html, body').animate({scrollTop: $("#buttonSection").offset().top - 160}, 600);
        highlightButton("small");
    }, false);
    
    init();
}