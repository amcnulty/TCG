window.onload = function() {
    function setScroll() {
        if (window.scrollY >= 300) {
            document.getElementById("grassPic").className = "change";
        }
        else if (window.scrollY < 300) {
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
        if (e.clientY + document.body.scrollTop <= 1707) {
            map.className = "scrollOff";
        }
        else if (e.clientY + document.body.scrollTop >= 2406) {
            map.className = "scrollOff";
        }
        else if (e.clientX <= window.innerWidth * .1) {
            map.className = "scrollOff";
        }
        else if (e.clientX >= window.innerWidth * .9 - 15) {
            map.className = "scrollOff";
        }
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
}