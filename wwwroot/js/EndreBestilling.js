function hentAlleBestillinger() {

    // søk etter personlige bestilling, telefonnummer brukes for å finne de

    const url = "home/HentPersonligeBestillinger";
    var telefon = document.getElementById('TlfInn').value;
    var tlfstring = toString(telefon);
    

    const telefonobjekt = {
        Telefonnummer: telefon

    };

   
    $.post(url, { tlf: telefonobjekt }, function (Bestillinger) {
        if (Bestillinger == null) {
            //Oppdaterer siden og gir varsel om at ingen bestillinger er funnet. Brukere denne type varsel flere steder.

            window.location.reload();
            window.alert("Fant ingen bestillinger tilknyttet denne kunden");
            document.getElementById("KundeInfo").innerHTML = "";
        }
        else {
            formaterbestilling(Bestillinger);
            document.getElementById("KundeInfo").innerHTML = "Treff! Følgende bestillinger er registrer på " + Bestillinger[0].kunde.fornavn + " " + Bestillinger[0].kunde.etternavn;
        }

    });
}

function LoggUt() {
    window.location.href = "admin.html";
    $.get("home/LoggUt", function (ok) {
        document.write(ok)
    })
}

//henter alle bestillinger uten kontekst for listing nederst.

function ListUtenSøk() {
    $.get("home/HentAlleBestillinger", function (Bestillinger) {
        formaterbestillingAlle(Bestillinger);
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


function formaterbestilling(Bestillinger) {
    let ut = "<table class='table table-striped'>" +
        "<tr>" +
        "<th>Id</th><th>Dato Bestilt</th><th>Pris</th><th>Voksen</th><th>Barne</th><th>Honor</th><th>Student</th><th>Linje</th><th></th><th></th>" +
        "</tr>";
    for (let best of Bestillinger) {
        ut += "<tr>" +
            "<td>" + best.id + "</td>" +
            
            "<td>" + best.tid + "</td>" +
            "<td>" + best.pris + "</td>" + 
            "<td>" + best.bestillingslinjer[0].antallBilletter + "</td>" +
            "<td>" + best.bestillingslinjer[1].antallBilletter + "</td>" +
            "<td>" + best.bestillingslinjer[2].antallBilletter + "</td>" +
            "<td>" + best.bestillingslinjer[3].antallBilletter + "</td>" +
            "<td>" + best.bestillingslinjer[3].rute.fra + " - " + best.bestillingslinjer[3].rute.til + "</td>" +

            "<td> <a class='btn btn-primary' href='RedigerBestilling.html?id=" + best.id + "'>Endre</a></td>" +
            "<td> <button class='btn btn-danger' onclick='slettBestilling(" + best.id + ")'>Slett</button></td>" +
            "</tr>";
    }
    ut += "</table>";
    $("#alleBestillinger").html(ut);
}


function slettBestilling(id) {
    const url = "home/SlettBestilling?id=" + id;
    $.get(url, function (OK) {
        if (OK) {
            location.reload();
        }
        else {
          
            window.location.reload();
            window.alert("Feil i database, kjent feil vi har snakket om på lab. Fungerte på din pc da vi testet, men ikke min");
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



function formaterbestillingAlle(Bestillinger) {
    let ut = "<table class='table table-striped'>" +
        "<tr>" +
        "<th>Id</th><th>Kundenavn</th><th>Dato Bestilt</th><th>Pris</th><th>Voksen</th><th>Barne</th><th>Honor</th><th>Student</th><th>Linje</th><th></th><th></th>" +
        "</tr>";
    for (let best of Bestillinger) {
        ut += "<tr>" +
            "<td>" + best.id + "</td>" +
            "<td>" + best.kunde.fornavn + " " + best.kunde.etternavn + "</td>" +
            "<td>" + best.tid + "</td>" +
            "<td>" + best.pris + "</td>" +
            "<td>" + best.bestillingslinjer[0].antallBilletter + "</td>" +
            "<td>" + best.bestillingslinjer[1].antallBilletter + "</td>" +
            "<td>" + best.bestillingslinjer[2].antallBilletter + "</td>" +
            "<td>" + best.bestillingslinjer[3].antallBilletter + "</td>" +
            "<td>" + best.bestillingslinjer[3].rute.fra + " - " + best.bestillingslinjer[3].rute.til + "</td>" +

            "<td> <a class='btn btn-primary' href='RedigerBestilling.html?id=" + best.id + "'>Endre</a></td>" +
            "<td> <button class='btn btn-danger' onclick='slettBestilling(" + best.id + ")'>Slett</button></td>" +
            "</tr>";
    }
    ut += "</table>";
    $("#utBestillingUtenSøk").html(ut);
}



