let menu1 = document.getElementById("item1");
let sousMenu1 = document.getElementById("navm");

sousMenu1.style.display = "none";
    
menu1.addEventListener("click", function(){
    sousMenu1.style.display === "none" ? sousMenu1.style.display = "block" : sousMenu1.style.display = "none";
});