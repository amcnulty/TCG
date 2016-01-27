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
    
    function mouseOut(e) {
        if (e.clientY + document.body.scrollTop <= 1728) {
            map.className = "scrollOff";
        }
    }
    
    var mapCanvas = document.getElementById("mapCanvas"); 
    
    var map = document.getElementById("map");
    
    mapCanvas.addEventListener("click", mapClicked, false);
    map.addEventListener("mouseout", mouseOut, false);
    document.addEventListener("scroll", setScroll, false);
}