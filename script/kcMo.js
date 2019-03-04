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
    var pic1 = document.getElementById("unitPic1");
    var pic2 = document.getElementById("unitPic2");
    var pic3 = document.getElementById("unitPic3");
    var price = document.getElementById("price");
    var description = document.getElementById("unitDescription");
    switch (id) {
      case "small":
        size.innerHTML = "15'x 45'";
        pic1.src = "../res/images/mahaffieOlathe/comingSoon.jpg";
        pic1.parentElement.href = pic1.src;
        price.innerHTML = "$575 - Monthly Rent";
        description.innerHTML = `
          There will be 14 units this size at the KCMO / Liberty location.
        `;
      break;
      case "med":
        size.innerHTML = "20'x 45'";
        pic1.src = "../res/images/mahaffieOlathe/comingSoon.jpg";
        pic1.parentElement.href = pic1.src;
        price.innerHTML = "$775 - Monthly Rent"; 
        description.innerHTML = `
          There will be 36 units this size at the KCMO / Liberty location.
        `;
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
