window.onload=function() {

    document.getElementById("inp-pret").onchange=function(){
        document.getElementById("infoRange").innerHTML=`(${this.value})`
    }


document.getElementById("filtrare").onclick= function(){
    let val_nume=document.getElementById("inp-nume").value.toLowerCase();

    let radiobuttons=document.getElementsByName("gr_rad");
    let val_calorii;
    for(let r of radiobuttons){
        if(r.checked){
            val_calorii=r.value;
            break;
        }
    }

    var cal_a, cal_b;
    if(val_calorii!="toate"){
        [cal_a, cal_b] = val_calorii.split(":");
        cal_a = parseInt(cal_a);
        cal_b = parseInt(cal_b);
    }

    var produse=document.getElementsByClassName("produs");

    for (let prod of produse){
        prod.style.display="none";
        let nume = prod.getElementsByClassName("val-nume")[0].innerHTML.toLowerCase();

        let cond1= (nume.startsWith(val_nume));

        let calorii = parseInt(prod.getElementsByClassName("val-calorii")[0].innerHTML);

        let cond2= (val_calorii=="toate"||cal_a<=calorii&& calorii<cal_b);
        
        if(cond1&&cond2){
            prod.style.display="block";
        }
    }
}



}