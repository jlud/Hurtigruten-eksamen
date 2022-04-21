
function tilEndrePris() {
    window.location.href = "Endre_Pris.html"; 
}
function tilNyRute() {
    window.location.href = "NyRute.html";
}

function Ny_rute() {
    var inndato = datoinnn.value;
    var inntitspunkt = titsinn.value;
 
    const RuteNy = {
        Fra: $("#frain").val(),
        Til: $("#tilin").val(),
    };
    
    const url = "home/NyRute";

    $.post(url, { innRute: RuteNy, dato: inndato, tid: inntitspunkt }, function (OK) {

        if (OK) {
            window.location.href = "AdminHome.html";
            window.alert("Ny rute er opprettet.");
        }
        else {
            document.write("feil i database");
        }
    });
}

function LoggUt() {
    window.location.href = "admin.html";
    $.get("home/LoggUt", function (ok) {
        document.write(ok)
    })
}



function hentAlleRuter() {
    $.get("home/List_ruter", function (ruter) {
        formaterRuter(ruter);
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

function formaterRuter(ruter) {
    let ut = "<table class='table table-striped'>" +
        "<tr>" +
        "<th>Fra</th><th>Til</th><th>Avgang</th><th>RuteID</th><th></th><th></th>" +
        "</tr>";
    for (let rute of ruter) {
        ut += "<tr>" +
            "<td>" + rute.fra + "</td>" +
            "<td>" + rute.til + "</td>" +
            "<td>" + rute.avgang + "</td>" +
            "<td>" + rute.id + "</td>" +
            "<td> <a class='btn btn-primary' href='endre.html?id=" + rute.id + "'>Endre</a></td>" +
            "<td> <button class='btn btn-danger' onclick='slettRute(" + rute.id + ")'>Slett</button></td>" +
            "</tr>";
    }
    ut += "</table>";
    $("#alleRuter").html(ut);
}


function slettRute(id) {
    const url = "home/SlettRute?id="+id;
    $.get(url, function (OK) {
        if (OK) {
            window.location.href = "AdminHome.html";
            window.alert("Rute er slettet.");
        }
        else {
            window.location.href = "AdminHome.html";
            window.alert("Feil i database, prøv igjen senere");
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

//validering

function validerFra(fra) {
    const regex = /^[a-zA-ZæøåÆØÅ. \\-]{2,5}$/;
    const ok = regex.test(fra);
    if (!ok) {
        $("#feilmeldingFra").html("Startdestinasjonen må bestå av 2 til 30 bokstaver!");
        return false;
    } else {
        $("#feilmeldingFra").html("");
        return true;
    }
}

function validerTil(til) {
    const regex = /^[a-zA-ZæøåÆØÅ. \\-]{2,5}$/;
    const ok = regex.test(til);
    if (!ok) {
        $("#feilmeldingTil").html("Sluttdestinasjonen må bestå av 2 til 30 bokstaver!");
        return false;
    } else {
        $("#feilmeldingTil").html("");
        return true;
    }
}

//før man kjører lagring, så forsikres det om at alt er i orden

function validerOgLagreRute() {
    const fraOK = validerFra($("#frain").val());
    const tilOK = validerTil($("#tilin").val());



    if (fraOK && tilOK) {
        Ny_rute();
    }
}


 //hvis validerOgLagreRute er OK lagres kunden med ruteNy lenger opp

function validerNyRute() {
    var tilbool = true;
    var frabool = true;
    var datebool = true;
    var tidbool = true;


    var valueDate = document.getElementById('datoinnn').value;
    var timeVal = document.querySelector('#titsinn').value;

    if (document.getElementById("frain").value.length == 0) {
        tilbool = false;
    }
    if (document.getElementById("tilin").value.length == 0) {
        frabool = false;
    }
    if (!Date.parse(valueDate)) {
        datebool = false;
    }

    if (!timeVal.match(/\d+:\d+/)) {
        tidbool = false;
    }

    if (tilbool && frabool && datebool && tidbool == true) {
        Ny_rute();
    }
    else {
        if (!frabool) {
            document.getElementById("feilmeldingFra").innerHTML = ("Manglende fra-sted")
        }
        if (!tilbool) {
            document.getElementById("feilmeldingTil").innerHTML = ("Manglende til-sted")
        }
        if (!datebool) {
            document.getElementById("feilmeldingDato").innerHTML = ("Manglende Dato")
        }
        if (!tidbool) {
            document.getElementById("feilmeldingTid").innerHTML = ("Manglende tidspunkt")
        }
    }
}