function setCookie(nume, val, timpExpirare){
    d=new Date();
    d.setTime(d.getTime()+timpExpirare)
    document.cookie=`${nume}=${val}; expires=${d.toUTCString()}; path=/`;
}

function getCookie(nume){
    vectorParametri=document.cookie.split(";")
    for(let param of vectorParametri){
        if (param.trim().startsWith((nume+"=").trim()))
            return param.split("=")[1]
    }
    return null;
}

function deleteCookie(nume){
    console.log(`${nume}; expires=${(new Date()).toUTCString()}`)
    document.cookie=`${nume}=0; expires=${(new Date()).toUTCString()}; path=/`;
}

window.onload=function()
{
    var button_accordion=document.getElementsByClassName("accordion-button")[0]

    if(getCookie(document.getElementById("id").innerHTML))
    {
        button_accordion.setAttribute("aria-expanded", "true")
        button_accordion.classList.remove("collapsed")
        document.getElementById("collapseOne").classList.add("show")
    }
    
    button_accordion.onclick=function()
    {
            if(getCookie(document.getElementById("id").innerHTML)){
            deleteCookie(document.getElementById("id").innerHTML);
        }
        else{
            setCookie(document.getElementById("id").innerHTML,true,600000);
        }
    }

}