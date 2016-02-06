window.onload = function() {
    function setScroll() {
        if (window.scrollY >= 50) {
            document.getElementById("grassPic").className = "change";
        }
        else if (window.scrollY < 50) {
            document.getElementById("grassPic").className = "beforeChange";
        }
    }
    
    function mapClicked() {
        map.className = "";
    }
    
    function scrollToTop() {
        $('html, body').animate({scrollTop: 0}, 600);
    }

    function scrollToAbout() {
        $('html, body').animate({scrollTop: $("#info").offset().top - 160}, 600);
    }

    function scrollToLocations() {
        $('html, body').animate({scrollTop: $("#mapSection").offset().top - 160}, 600);
    }

    function mouseOut(e) {
        // alert(e.clientY + document.body.scrollTop);
        if (e.clientX <= window.innerWidth * .1) {
            map.className = "scrollOff";
        }
        else if (e.clientX >= window.innerWidth * .9 - 15) {
            map.className = "scrollOff";
        }
    }
    
    function goToLenexa() {
        window.location.href = "html/lenexa.html";
    }
    
    function goToDennis() {
        window.location.href = "html/dennisOlathe.html";
    }
    
    function goToHwy() {
        window.location.href = "html/169hwyOlathe.html";
    }
    
    function goToOP() {
        window.location.href = "html/overlandPark.html";
    }
    
    var mapCanvas = document.getElementById("mapCanvas"); 
    
    var map = document.getElementById("map");
    
    mapCanvas.addEventListener("click", mapClicked, false);
    map.addEventListener("mouseout", mouseOut, false);
    document.addEventListener("scroll", setScroll, false);
    document.getElementById("homeNavButton").addEventListener("click", scrollToTop, false);
    document.getElementById("aboutNavButton").addEventListener("click", scrollToAbout, false);
    document.getElementById("locationsNavButton").addEventListener("click", scrollToLocations, false);
    document.getElementById("headerLogoImg").addEventListener("click", scrollToTop, false);
    document.getElementById("lPic").addEventListener("click", goToLenexa, false);
    document.getElementById("dPic").addEventListener("click", goToDennis, false);
    document.getElementById("Pic1").addEventListener("click", goToHwy, false);
    document.getElementById("oPic").addEventListener("click", goToOP, false);
}