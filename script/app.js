if (window.attachEvent) {window.attachEvent('onload', load);}
else if (window.addEventListener) {window.addEventListener('load', load, false);}
else {document.addEventListener('load', load, false);}
function load() {
    function setScroll() {
        if (window.pageYOffset >= 50) {
            document.getElementById("grassPic").className = "change";
        }
        else if (window.pageYOffset < 50) {
            document.getElementById("grassPic").className = "beforeChange";
        }
        if (window.pageYOffset > $mapSection.scrollTop - 300) {
            for (var i = 0; i < stamps.length; i++) {
                stamps[i].className = "stamp-grow";
            }
        }
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

    var $mapSection = {scrollTop: $('#mapSection').offset().top};

    var stamps = document.getElementsByClassName("stamp");
    
    document.addEventListener("scroll", setScroll, false);
    document.getElementById("homeNavButton").addEventListener("click", scrollToTop, false);
    document.getElementById("aboutNavButton").addEventListener("click", scrollToAbout, false);
    document.getElementById("locationsNavButton").addEventListener("click", scrollToLocations, false);
    document.getElementById("headerLogoImg").addEventListener("click", scrollToTop, false);
}