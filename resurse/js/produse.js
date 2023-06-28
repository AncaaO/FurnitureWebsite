window.addEventListener("load", function () {
    let k = 4;
    let pg = 1;
    let indexprod;

    filtrare();

    // if(this.localStorage.getItem("ok")){
    //     salvare_filtre();
    // }

    // function salvare_filtre() {

    //         document.getElementById("mesaj-invalid").style.display = "none";

    //         document.getElementById("inp-nume").value = localStorage.getItem("nume-salvat");
    //         document.getElementById("i_textare").value = localStorage.getItem("textare-salvat");
            
    //         for (let opt of localStorage.getItem("material-salvat")) {
    //             for (let material of document.getElementById("inp-materiale").options) {
    //                 if (material == opt) {
    //                     document.getElementById("inp-materiale").value = opt;
    //                 }
    //             }
    //         }

    //         let radiobuttons = document.getElementsByName("gr_rad");
    //         let val_categorie;
    //         for (let r of radiobuttons) {
    //             if (r == localStorage.getItem("categotie-salvat")) {
    //                 val_categorie.checked = true;
    //                 break;
    //             }
    //         }

    //         document.getElementById("inp-pret").value = localStorage.getItem("pret-salvat");
    //         document.getElementById("i_check").checked = localStorage.getItem("noutati-salvat");

    //         filtrare();
    // }

    // document.getElementById("inp-salvare").onchange = function () {
    //     filtrare();
    // }
    document.getElementById("inp-nume").onchange = function () {
        filtrare();
    }
    document.getElementById("i_textare").onchange = function () {
        filtrare();
    }
    document.getElementById("radio-buttons").onchange = function () {
        filtrare();
    }
    document.getElementById("inp-pret").onchange = function () {
        document.getElementById("infoRange").innerHTML = `(${this.value})`
        filtrare();
    }
    document.getElementById("i_check").onchange = function () {
        filtrare();
    }
    document.getElementById("inp-materiale").onchange = function () {
        filtrare();
    }
    document.getElementById("inp-disponibilitate").onchange = function () {
        filtrare();
    }

    function filtrare(){

        document.getElementById("mesaj-invalid").style.display = "none";

        let radiobuttons = document.getElementsByName("gr_rad");
        let val_categorie;
        for (let r of radiobuttons) {
            if (r.checked) {
                val_categorie = r.value;
                break;
            }
        }

        let val_pret = document.getElementById("inp-pret").value;

        var produse = document.getElementsByClassName("produs");

        let textare = document.getElementById("i_textare").value.toLowerCase();

        let val_disponibilitate = document.getElementById("inp-disponibilitate").value;

        let val_nume = document.getElementById("inp-nume").value.toLowerCase();

        let val_materiale = [];
        for (let opt of document.getElementById("inp-materiale").options) {
            if (opt.selected) {
                val_materiale.push((opt.value));
            }
        }

        let data_verificare = 0;
        if(document.getElementById("i_check").checked){
            data_verificare = Date.parse(document.getElementById("i_check").value);
        }


        let ok = 1;
        indexprod = 0;
        for (let prod of produse) {
            prod.style.display = "none";

            let nume = prod.getElementsByClassName("val-nume")[0].innerHTML.toLowerCase();
            
            var numeNou = nume.replace(/[ăîâșț]/g, function (match) {
                switch (match) {
                    case 'ă':
                        return 'a';
                    case 'î':
                        return 'i';
                    case 'â':
                        return 'a';
                    case 'ș':
                        return 's';
                    case 'ț':
                        return 't';
                }
            });
            nume=numeNou;
            
            let cond1 = (nume.startsWith(val_nume));

            let categorii = (prod.getElementsByClassName("val-categorie")[0].innerHTML);
            let cond2 = (val_categorie == "toate" || val_categorie == categorii);

            let pret = parseFloat(prod.getElementsByClassName("val-pret")[0].innerHTML);
            let cond3 = (pret >= val_pret);

            let dataAdaugare = Date.parse(prod.getElementsByClassName("val-data")[0].innerHTML);
            let cond4 = (dataAdaugare >= data_verificare);

            let descriere = (prod.getElementsByClassName("val-descriere")[0].innerHTML);
            if(!descriere.includes(textare)){
                
            }
            let cond5 = (descriere.includes(textare));


            let materiale = (prod.getElementsByClassName("materiale")[0].innerHTML);
            //console.log(materiale);
            let cond6 = false;
            if(val_materiale.length == 0){
                cond6 = true;
            }
            
            for(let material of val_materiale){
                if(materiale.includes(material)){
                    cond6 = true;
                }
            }

            let disponibilitate = (prod.getElementsByClassName("val-disponibilitate")[0].innerHTML);
            let cond7 = (val_disponibilitate == "toate" || val_disponibilitate == disponibilitate);
            
            if (cond1 && cond2 && cond3 && cond4 && cond5 && cond6 && cond7) {
                ok = 0;
                indexprod++;

                if(1 + k*(pg - 1) <= indexprod && indexprod <= k*pg){
                    prod.style.display = "grid";
                }
            }

            // if (document.getElementById("inp-salvare").checked) {
            //     localStorage.setItem("nume-salvat", val_nume);
            //     localStorage.setItem("pret-salvat", val_pret);
            //     localStorage.setItem("textare-salvat", textare);
            //     localStorage.setItem("material-salvat", val_materiale);
            //     localStorage.setItem("disponibilitate-salvat", val_disponibilitate);
            //     localStorage.setItem("categorie-salvat", val_categorie);
            //     localStorage.setItem("noutati-salvat", data_verificare);
            //     localStorage.setItem("ok", 1);
            // }
        }

        let butoane_pagina = "";
        for (let i = 1; i <= Math.ceil(indexprod / k); i++)
            butoane_pagina += "<button id=\""+i+"\" class=\"btn btn-sm link-pagina\" style=\"margin-right: 15px\">" + i + "</button>";
        
            document.getElementById("butoane-pagina").innerHTML = butoane_pagina;

        for (var but_pagina of document.getElementsByClassName("link-pagina")) {
            but_pagina.onclick = function () {
                pg = this.id;
                filtrare();
            };
        }

        if (ok) {
            document.getElementById("mesaj-invalid").style.display = "inline";
        }
    }



    document.getElementById("resetare").onclick = function () {

        document.getElementById("mesaj-resetare").style.display = "block";

        document.getElementById("buton-resetare-da").onclick=function(){
            pg=1;
            document.getElementById("mesaj-resetare").style.display = "none";
        

            document.getElementById("inp-nume").value = "";
            document.getElementById("i_textare").value = "";

            document.getElementById("inp-pret").value = document.getElementById("inp-pret").min;
            document.getElementById("sel-toate").selected = "toate";

            document.getElementById("i_rad10").checked = true;
            var produse = document.getElementsByClassName("produs");
            document.getElementById("infoRange").innerHTML = "(0)";
            document.getElementById("i_check").checked = false;


            //resetare ordine produse
            var produse = document.getElementsByClassName("produs");
            var v_produse = Array.from(produse);
            v_produse.sort(function (a, b) {
                let id_a = parseFloat(a.getElementsByClassName("id")[0].innerHTML);
                let id_b = parseFloat(b.getElementsByClassName("id")[0].innerHTML);
                return id_a - id_b;
            });

            for (let opt of document.getElementById("inp-materiale").options) {
                opt.selected = false;
            }

            for (let prod of v_produse) {
                prod.parentElement.appendChild(prod);
            }
            filtrare();
        }

        document.getElementById("mesaj-invalid").style.display = "none";

        document.getElementById("buton-resetare-nu").onclick = function () {
            document.getElementById("mesaj-resetare").style.display = "none";
        }
    }

    nr_check = 0;
    for (let checks of document.getElementsByClassName("check-sortare-chei")) {
        checks.onchange = function () {
            if (this.checked)
                nr_check++;
            else
                nr_check--;

            if (nr_check > 2) {
                this.checked = false;
                nr_check--;
            }
        }
    }

    function sortare(semn) {


        var produse = document.getElementsByClassName("produs");
        var v_produse = Array.from(produse);
    
        v_produse.sort(function (a, b) {
            let pret_a = parseFloat(a.getElementsByClassName("val-pret")[0].innerHTML);
            let pret_b = parseFloat(b.getElementsByClassName("val-pret")[0].innerHTML);
            if (pret_a == pret_b) {
                let nume_a = a.getElementsByClassName("val-nume")[0].innerHTML;
                let nume_b = b.getElementsByClassName("val-nume")[0].innerHTML;
                return semn * nume_a.localeCompare(nume_b);
            }
            return semn * (pret_a - pret_b);
        });
        for (let prod of v_produse) {
            prod.parentElement.appendChild(prod);
        }
    }
    document.getElementById("sortCrescNume").onclick = function () {
        sortare(1);
    }
    document.getElementById("sortDescrescNume").onclick = function () {
        sortare(-1);
    }

    window.onkeydown = function(e){
        if(e.key == "c" && e.altKey){
            if (document.getElementById("info-suma"))
                return;
            var produse = document.getElementsByClassName("produs");
            let suma = 0;

            for (let prod of produse) {
                if(prod.style.display != "none"){
                    let pret = parseFloat(prod.getElementsByClassName("val-pret")[0].innerHTML);
                    //console.log(pret);
                    suma += pret;
                }
            }

            let p = document.createElement("p");
            p.innerHTML = suma;
            p.id = "info-suma";
            ps = document.getElementById("p-suma");
            container = ps.parentNode;
            frate = ps.nextElementSibling;
            container.insertBefore(p, frate);

            setTimeout(function(){
                let info = document.getElementById("info-suma");
                if(info)
                    info.remove();
            }, 2000)
        }
    }

    if (document.cookie.includes("ultimul-produs")) {
        document.getElementById("ultimul-produs").innerHTML = "<a href=" + document.cookie.split("ultimul-produs=")[1].split(" ")[0] + ">Ultimul Produs Accesat</a>";
    }

});

