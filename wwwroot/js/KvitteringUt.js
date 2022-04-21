
function hentKvittering() {

    var LagretBestillingsID = localStorage.getItem("LagretBestillingsID") //BestillingsID Lagret fra Index lokalt.
    var LagretBestillingsINT = parseInt(LagretBestillingsID)

    $.get("home/HentKvittering?BestillingsID="+LagretBestillingsINT, function (kvittering) {
        document.getElementById("Infotekst").innerHTML = "Takk for ditt kjøp, " + kvittering.kunde.fornavn;
        
        document.getElementById("Fra").innerHTML = "Startdestinasjon: " + kvittering.bestillingslinjer[0].rute.fra;
        document.getElementById("Til").innerHTML = "Sluttdestinasjon: " + kvittering.bestillingslinjer[0].rute.til;
        document.getElementById("Dato").innerHTML = "Dato: " + kvittering.bestillingslinjer[0].rute.avgang;

        if (kvittering.bestillingslinjer[0].antallBilletter > 0) {
            document.getElementById("voksen").innerHTML = "Antall voksenbilletter: " + kvittering.bestillingslinjer[0].antallBilletter;
        }
        if (kvittering.bestillingslinjer[1].antallBilletter > 0) {
            document.getElementById("barn").innerHTML = "Antall barnebilletter: " + kvittering.bestillingslinjer[1].antallBilletter;
        }
        if (kvittering.bestillingslinjer[2].antallBilletter > 0) {
            document.getElementById("honør").innerHTML = "Antall honørbilletter: " + kvittering.bestillingslinjer[2].antallBilletter;
        }
        if (kvittering.bestillingslinjer[3].antallBilletter > 0) {
            document.getElementById("student").innerHTML = "Antall studentbilletter: " + kvittering.bestillingslinjer[3].antallBilletter;
        }

        document.getElementById("Fornavn").innerHTML = "Fornavn: " + kvittering.kunde.fornavn;
        document.getElementById("Etternavn").innerHTML = "Etternavn: " + kvittering.kunde.etternavn;
        document.getElementById("Telefonut").innerHTML = "Telefon: " + kvittering.kunde.telefonnummer;

        if (kvittering.kunde.email !== null) {
            document.getElementById("Mailut").innerHTML = "Email: " + kvittering.kunde.email;
        }
        document.getElementById("price").innerHTML = "Pris: " + kvittering.pris;
    });
    
}

function hjem() {
    window.location.href = "index.html";
}


