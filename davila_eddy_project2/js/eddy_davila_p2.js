


var textInput = document.getElementById("client");
    var focusBorder = function (){
        textInput.setAttribute("class", "addFocus");
    }
    
var textInput = document.getElementById("client");
    var blurBorder = function (){
        textInput.removeAttribute("class", "addFocus");
    }
    
textInput.addEventListener("focus" , focusBorder );
textInput.addEventListener("blur" , blurBorder ); 

console.log(textInput);