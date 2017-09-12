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
                size.innerHTML = "20'x 50'";
                pic.src = "../res/images/mahaffieOlathe/comingSoon.jpg";
                price.innerHTML = "Rent: $1300/mo-Front building; $1100/mo-Back building";
                description.innerHTML = "There are six units of this size at the Mahaffie Olathe location with three units per building. " +
                "The front building has visibility to 159th street. This unit has a smaller retail area than the larger unit.";
            break;
            case "med":
                size.innerHTML = "20'x 55'";
                pic.src = "../res/images/mahaffieOlathe/comingSoon.jpg";
                price.innerHTML = "Rent: $1400/mo-Front Building; $1200/mo-Back building"; 
                description.innerHTML ="There are sixteen units of this size at the Mahaffie Olathe location with 8 units per building. " +
                "The front building has visibility to 159th street. This unit has a larger retail area than the smaller unit."; 
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