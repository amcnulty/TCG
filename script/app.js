if (window.attachEvent) {window.attachEvent('onload', load);}
else if (window.addEventListener) {window.addEventListener('load', load, false);}
else {document.addEventListener('load', load, false);}
function load() {
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

    function scrollOff(e) {
        map.className = "scrollOff";
    }
    
    var mapCanvas = document.getElementById("mapCanvas"); 
    
    var map = document.getElementById("map");
    
    mapCanvas.addEventListener("click", mapClicked, false);
    map.addEventListener("mouseleave", scrollOff, false);
    document.addEventListener("scroll", setScroll, false);
    document.getElementById("homeNavButton").addEventListener("click", scrollToTop, false);
    document.getElementById("aboutNavButton").addEventListener("click", scrollToAbout, false);
    document.getElementById("locationsNavButton").addEventListener("click", scrollToLocations, false);
    document.getElementById("headerLogoImg").addEventListener("click", scrollToTop, false);
}