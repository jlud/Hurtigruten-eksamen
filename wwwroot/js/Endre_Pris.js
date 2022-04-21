function HentPris() {


    $.get("home/HentPriser", function (Priser) {
        document.getElementById("Voksenpris").innerHTML = "Voksenbillett: " + Priser.voksenPris + "kr";
        document.getElementById("Barnepris").innerHTML = "Barnebillett: " + Priser.barnePris + "kr";
        document.getElementById("Honorpris").innerHTML = "Honorbillett: " + Priser.honorpris + "kr";
        document.getElementById("Studentpris").innerHTML = "Studentbillett: " + Priser.studentpris + "kr";
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

function EndrePris() {
    //Finner ut hvilken av alternativene admin har valgt. 1 = voksen, 2 = barn, 3 = honor, 4 = student.

    var select = document.getElementById('valgalternativ');
    var value = select.options[select.selectedIndex].value;


    if (value == "1") {
        var billettype = 1;
        
    }
    if (value == "2") {
        var billettype = 2;
       
    }
    if (value == "3") {
        var billettype = 3;
        
    }
    if (value == "4") {
        var billettype = 4;
       
       
    }
    //finner type billett

    var nyPris = document.getElementById("prisInn").value;

    let isnum = /^\d+$/.test(nyPris);

    //Passer på at input kun består av riktig verdier.

    if (!isnum) {
        document.getElementById("FeilInput").innerHTML = "Skriv inn et nytt beløp for billettypen";
      
  
        return;
    }


   

    const url = "home/EndrePris";

    //sender med ny pris samt billettype (1-4)

    $.post(url, { billettype: billettype, nypris: nyPris }, function (OK) {

        if (OK) {
            window.location.reload();
            window.alert("Pris endret.");
        }
        else {
            document.write("feil");
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

function LoggUt() {
    window.location.href = "admin.html";
    $.get("home/LoggUt", function (ok) {
        document.write(ok)
    })
}

