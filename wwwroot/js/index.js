const Bestilling = { //Midlertidig Dato som blir satt til .now i controller.
    Tid: "2021-12-24 14:10:22.225378"
};

function tilbake() {
    window.location.href = "index.html";
}

function Leggtilbestillingfunk() {

    

    

    var voksenb = $("#voksenantall").val();

    var barnb = $("#barnantall").val();
    var honnorb = $("#honnorantall").val();
    var studentb = $("#studentantall").val();

    var e = document.getElementById("RuterDropDown");
    var strUser = e.value;
    var talluser = 1;
    var talluser = parseInt(strUser);

    
    var Bestillingslinje = [ // "Mal" som blir endret på når den sendes inn.
        {
            AntallBilletter: voksenb,
            BillettKategori: 1,
            Rute: 1

        },
        {
            AntallBilletter: barnb,
            BillettKategori: 2,
            Rute: 1
        },
        {
            AntallBilletter: honnorb,
            BillettKategori: 3,
            Rute: 1
        },
        {
            AntallBilletter: studentb,
            BillettKategori: 4,
            Rute: 1
        }
    ];


    const billettOK = validerAntall();
    if (billettOK) {
        const url = "home/NyBestilling";
        $.post(url, { innBestilling: Bestilling, innBestillingslinjer: Bestillingslinje, RuteID: talluser }, function (BestillingsID) {
            if (BestillingsID != -1) {
               

                localStorage.setItem("LagretBestillingsID", BestillingsID);
                window.location.href = "kundeinfo.html";
                
            } else {
                document.write("Failed");
            }
        });
    }
}



function SideStart() { //Lister de unike turene for valg før søk. Går igjennom databasen og legger til hver gang den finner en unik tur typ ( oslo - trondhiem)

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
}

function validerAntall() {
    let barnAntall = $("#barnantall").val();
    let honørAntall = $("#honnorantall").val();
    let voksenAntall = $("#voksenantall").val();
    let studentAntall = $("#studentantall").val();
    let totalBillett = barnAntall + honørAntall + voksenAntall + studentAntall;

    if (totalBillett == 0) {
        $("#feilAntallReisende").html("Velg antall reisende");
    } else {
        return true;
    }
}  

// Søker og lister turer etter dato valgt samt tur valgt. Listingen skjer datoen valgt + 5 dager hvis det ikke er mangler på turer. Maks er 5 turer listet.

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
            var myDiv = document.getElementById("IngenTurer");
            myDiv.innerHTML = "";
        }
        for (var i = 0; i < Liste.length; i++) { //Setter spesifikke verdier til scrolldown menu ved trykk på Søk-knapp


            var opt = Liste[i];
            var el = document.createElement("option");
            el.textContent = Liste[i].fra + " - " + Liste[i].til + ", Avreise " + Liste[i].avgang;
            el.value = Liste[i].id;
            dd.appendChild(el);
        }
    });
}

function tiladmin() {
    window.location.href = "admin.html";
}









    