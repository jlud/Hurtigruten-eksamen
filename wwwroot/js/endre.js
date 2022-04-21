
function EndreRut() {
    // hent kunden med kunde-id fra url og vis denne i skjemaet

    const id = window.location.search.substring(1);
   
    var idint = id.replace("id=", "").replace(",", "");
    var nyIDint = parseInt(idint);
    var framellom = document.getElementById('frainn').value;
    var tilmellom = document.getElementById('tilinn').value;
    //oversetter id=x til x
    
 
    const ruteobjekt = {
        fra: framellom,
        til: tilmellom
    }

    var inndato = datoinnn.value;
    var inntitspunkt = titsinn.value;


    const url = "home/EndreRute";

    $.post(url, { innrute: ruteobjekt, id: nyIDint, dato: inndato, tid: inntitspunkt }, function (OK) {

        if (OK) {
            window.location.href = "AdminHome.html";
            window.alert("Rute er endret.");
        }
        else {
            document.write("feil i database");
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

function ListRuteValgt(){
    const id = window.location.search.substring(1);
    var idint = id.replace("id=", "").replace(",", "");
    var nyIDint = parseInt(idint);


    const url = "home/FinnRute?id=" + nyIDint;
    $.get(url, function (rute) {
        if (rute == null) {
            document.write("feil")
        }
        else {
            AvgangRute = rute.fra + " - " + rute.til;
            AvgangDato = rute.tid;
            document.getElementById("AvgangRute").innerHTML = rute.fra + " - " + rute.til;
            document.getElementById("AvgangDato").innerHTML = rute.avgang;
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


function validerEndreRute() {
    var tilbool = true;
    var frabool = true;
    var datebool = true;
    var tidbool = true;


    var valueDate = document.getElementById('datoinnn').value;
    var timeVal = document.querySelector('#titsinn').value;

    if (document.getElementById("frainn").value.length == 0) {
        frabool = false;
    }
    if (document.getElementById("tilinn").value.length == 0) {
        tilbool = false;
    }
    if (!Date.parse(valueDate)) {
        datebool = false;
    }


    if (!timeVal.match(/\d+:\d+/)) {
        tidbool = false;
    }

    if (tilbool && frabool && datebool && tidbool == true) {
        EndreRut()
    }
    else {
        if (!frabool) {
            document.getElementById("fraFeil").innerHTML = ("Manglende fra-sted")
        }
        if (!tilbool) {
            document.getElementById("tilFeil").innerHTML = ("Manglende til-sted")
        }
        if (!datebool) {
            document.getElementById("datoFeil").innerHTML = ("Manglende Dato")
        }
        if (!tidbool) {
            document.getElementById("titsFeil").innerHTML = ("Manglende tidspunkt")
        }
    }

}

function LoggUt() {
    window.location.href = "admin.html";
    $.get("home/LoggUt", function (ok) {
        document.write(ok)
    })
}

