

function SideStart() { //Lister de unike turene for valg før søk
    const url = "home/ListRuteTyper";
    const RuteList = [];

    $.get(url, function (HentetRuter) {

        var dd = document.getElementById("rute");
        for (var i = 0; i < HentetRuter.length; i++) {
            var opt = HentetRuter[i];
            var el = document.createElement("option");
            el.textContent = HentetRuter[i];
            el.value = HentetRuter[i];
            dd.appendChild(el);
        }

    });
    var ele = document.getElementById("Usynligdiv");
    ele.style.display = "none";

    //Setter faktiske placeholders til inputfeltene.
    const idbest = window.location.search.substring(1);
    var idint = idbest.replace("id=", "").replace(",", "");
    var nyIDint = parseInt(idint);

    const url2 = "home/HentSpesifikkBestilling";
    

    $.post(url2, { id: nyIDint }, function (hentetbestilling) {

        document.getElementById("voksenInn").value = hentetbestilling.bestillingslinjer[0].antallBilletter;
        document.getElementById("barnInn").value = hentetbestilling.bestillingslinjer[1].antallBilletter;
        document.getElementById("honorInn").value = hentetbestilling.bestillingslinjer[2].antallBilletter;
        document.getElementById("studentInn").value = hentetbestilling.bestillingslinjer[3].antallBilletter;
        

    });



}

function SkalBytteRute() {


    var ele = document.getElementById("Usynligdiv");
    if (ele.style.display === "none") {
        ele.style.display = "block";
        Bytteknapp.textContent = "Ikke ta med ny rute";
        tekstinfo.textContent="Hvis du ikke vil ha med endring av rute, trykk igjen"
    } else {
        ele.style.display = "none";
        Bytteknapp.textContent = "Inkluder ny rute";
        tekstinfo.textContent = "Hvis du også vil redigere rute, trykk på knappen under."
    }
    

}

function hentSpesifikkeruter() {
    $("#RuterDropDown").empty();

    var inndato = dato.value;
    var Fromtil = rute.value;

    var url = "home/List_SpesifikkeRuter";

    $.post(url, { Dato: inndato, fratil: Fromtil }, function (Liste) {
        var dd = document.getElementById("RuterDropDown");
        if (Liste == null || Liste.length == 0) {
            var myDiv = document.getElementById("IngenTurer");
            myDiv.innerHTML = "Beklager, ingen båtreiser tilgjengelig denne datoen, prøv en annen.";
        }
        else {
            var myDiv = document.getElementById("Ingenturer");
            myDiv.innerHTML = "";
        }
        for (var i = 0; i < Liste.length; i++) { //Setter spesifikke verdier til scrolldown menu ved trykk på Søk-knapp


            var opt = Liste[i];
            var el = document.createElement("option");
            el.textContent = Liste[i].fra + " - " + Liste[i].til + ", Avreise " + Liste[i].avgang;
            el.value = Liste[i].id;
            dd.appendChild(el);
        }
    })
    .fail(function (feil) {
        if (feil.status == 401) {
            window.location.href = 'admin.html';
        }
        else {
            $("#feil").html("Feil på server - prøv igjen senere");
        }
    });
}


function EndreBillett() {

    const id = window.location.search.substring(1);
    var idint = id.replace("id=", "").replace(",", "");
    var nyIDint = parseInt(idint);
    //Får tak i bestillingen som skal endres

    var url = "home/EndreBillett";
    let voksenNy = $("#voksenInn").val();
    let barnNy = $("#barnInn").val();
    let honorNy = $("#honorInn").val();
    let studentNy = $("#studentInn").val();


    //Hvis admin ikke velger rute
    var ele = document.getElementById("Usynligdiv");
    if (ele.style.display === "none") {
        NyRuteID = 0;
    }
    //Hvis admin velger rute, bruker den ID slik som i index.

    else {
        var e = document.getElementById("RuterDropDown");
        var strUser = e.value;
        var NyRuteID = parseInt(strUser);
    }



    $.post(url, { ID: nyIDint, voksen: voksenNy, barn: barnNy, honor: honorNy, student: studentNy, nyRuteID: NyRuteID }, function (OK) {

        if (OK) {
            window.location.href = "endreBestilling.html";
            window.alert("Bestillingingen er endret.");
        }
        else {
            document.write("Fccccck")
        }

    });



}



function validerEndreBillett() {
    var vokseninnput = true;
    var barninnput = true;
    var honorinnput = true;
    var studentinnput = true;



    var voksenskrevetinn = document.getElementById("voksenInn").value;
    var barnskrevetinn = document.getElementById("barnInn").value;
    var honorskrevetinn = document.getElementById("honorInn").value;
    var studentskrevetinn = document.getElementById("studentInn").value;


    let voksensjekk = /^\d+$/.test(voksenskrevetinn);
    let barnsjekk = /^\d+$/.test(barnskrevetinn);
    let honorsjekk = /^\d+$/.test(honorskrevetinn);
    let studentsjekk = /^\d+$/.test(studentskrevetinn);


    if (voksensjekk && barnsjekk && honorsjekk && studentsjekk) {
        EndreBillett()
    }
    else {
        if (!voksensjekk) {
            document.getElementById("VoksenErr").innerHTML = "Skriv inn et tall for å endre antallet";
        }
        if (!barnsjekk) {
            document.getElementById("BarnErr").innerHTML = "Skriv inn et tall for å endre antallet";
        }
        if (!honorsjekk) {
            document.getElementById("HonorErr").innerHTML = "Skriv inn et tall for å endre antallet";
        }
        if (!studentsjekk) {
            document.getElementById("StudentErr").innerHTML = "Skriv inn et tall for å endre antallet";
        }
    }
}

function LoggUt() {
    window.location.href = "admin.html";
    $.get("home/LoggUt", function (ok) {
        document.write(ok)
    })
}