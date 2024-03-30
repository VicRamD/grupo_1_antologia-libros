/* ,muestra las opciones del menú de la sesión de usuario o las oculta*/
function showUserOptions() {
  let sessionMenu = document.getElementById("session-div");
  let sessionMenu769 = document.getElementById("session-div-769");
  if(sessionMenu && window.innerWidth < 769){
    if(sessionMenu.style.display === "flex"){
      sessionMenu.style.display = "none";

      //oculta el menú para mayor viewport
      sessionMenu769.style.display = "none";
    } else {
      sessionMenu.style.display = "flex";
      sessionMenu769.style.display = "none";
    }
  }
    
  if(sessionMenu769 && window.innerWidth >= 769){
    if(sessionMenu769.style.display === "flex"){
      sessionMenu769.style.display = "none";

      //oculta el menu para viewports más pequeños
      sessionMenu.style.display = "none";
    } else {
      sessionMenu769.style.display = "flex";
      sessionMenu.style.display = "none";
    }
  }
}

function bodySizeChange(){
    let sessionMenu = document.getElementById("session-div");
    let sessionMenu769 = document.getElementById("session-div-769");

    if(sessionMenu && sessionMenu769){
      if(window.innerWidth >= 769 && sessionMenu.style.display === "flex"){
        sessionMenu.style.display = "none";
        sessionMenu769.style.display = "flex";
      } else if(window.innerWidth < 769 && sessionMenu769.style.display === "flex") {
        sessionMenu.style.display = "flex";
        sessionMenu769.style.display = "none";
      }
    }
}

//window.onresize = bodySizeChange;