

function HentKundeTlf() {
    var intlf = document.getElementById("TlfInn").value;
    var tlfString = intlf.toString();

    const url = "home/FinnKunde";

    $.post(url, { Telefonnummer: tlfString }, function (ReturKunde) {


        if (ReturKunde == null) {
            var ele = document.getElementById("KundeListet");
            ele.style.display = "block";
            document.getElementById("status").innerHTML = "Fant ingen kunde, prøv igjen";
        }

        else {
            var ele = document.getElementById("KundeListet");
            ele.style.display = "block";
            var elein = document.getElementById("inputz");
            elein.style.display = "block";

            document.getElementById("status").innerHTML = "Kunde funnet!";
            document.getElementById("idut").innerHTML = "KundeID: " + ReturKunde.id;
            document.getElementById("fornavnut").innerHTML = "Fornavn: " + ReturKunde.fornavn;
            document.getElementById("etternavnut").innerHTML = "Etternavn: " + ReturKunde.etternavn;
            document.getElementById("telefonut").innerHTML = "Telefonnummer: " + ReturKunde.telefonnummer;
            document.getElementById("emailut").innerHTML = "Email: " + ReturKunde.email;


            document.getElementById('fornavninn').placeholder = ReturKunde.fornavn;
            document.getElementById('etternavninn').placeholder = ReturKunde.etternavn;
            document.getElementById('telefonnummerinn').placeholder = ReturKunde.telefonnummer;
            document.getElementById('emailinn').placeholder = ReturKunde.email;
        }



    });

}

function SendinnNyKunde() {

    var forNavn = $("#fornavninn").val();
    var etterNavn = $("#etternavninn").val();
    var telefonNummer = $("#telefonnummerinn").val();
    var eMail = $("#emailinn").val();
    var iD = document.getElementById("idut").textContent;
    var iDtall = iD.replace("KundeID: ", "").replace(",", "");
    var iDint = parseInt(iDtall);

    const url = "home/EndreKunde";
   


    var Kundeobjekt =  
        {
            Fornavn: forNavn,
            Etternavn: etterNavn,
            Telefonnummer: telefonNummer,
            Email: eMail,
            Id: iDint
    }
    $.post(url, { innKunde: Kundeobjekt }, function (OK) {

        if (OK) {
            window.location.href = "endreKunder.html";
            window.alert("Kunde er endret!");
        }
        else {
            document.write("feil");
        }
    });
}



function SideStart() {

    var ele = document.getElementById("KundeListet");
    ele.style.display = "none";

    var eleinputs = document.getElementById("inputz");
    eleinputs.style.display = "none";

    //Gjør diverse tekst og inputs usynlige før admin har hentet ut en bruker å kødde med.


    hentAlleKunder();
}


function RegKunde() {

    var url = "home/RegistrerKunKunde";
    var forNavn = $("#fornavnreg").val();
    var etterNavn = $("#etternavnreg").val();
    var telefonNummer = $("#tlfreg").val();
    var eMail = $("#emailreg").val();



    var Kundeobjekt =  
    {
        Fornavn: forNavn,
        Etternavn: etterNavn,
        Telefonnummer: telefonNummer,
        Email: eMail
        
    }
    $.post(url, { innKunde: Kundeobjekt }, function (OK) {

        if (OK) {
            window.location.href = "endreKunder.html";
            window.alert("Kunde er lagt til.");
        }
        else {
            window.location.href = "endreKunder.html";
            window.alert("En kunde med dette nummeret finens allerede.");
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



function hentAlleKunder() {
    $.get("home/List_kunder", function (Kunder) {
        formaterKunder(Kunder);
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



function formaterKunder(Kunder) {
    let ut = "<table class='table table-striped'>" +
        "<tr>" +
        "<th>Fornavn</th><th>Etternavn</th><th>Telefonnummer</th><th>Email</th><th></th><th></th>" +
        "</tr>";
    for (let kunde of Kunder) {
        ut += "<tr>" +
            "<td>" + kunde.fornavn + "</td>" +
            "<td>" + kunde.etternavn + "</td>" +
            "<td>" + kunde.telefonnummer + "</td>" +
            "<td>" + kunde.email + "</td>" +
            
            "<td> <button class='btn btn-danger' onclick='slettKunde(" + kunde.id + ")'>Slett</button></td>" +
            "</tr>";
    }
    ut += "</table>";
    $("#listallekundene").html(ut);
}


function slettKunde(id) {
    const url = "home/SlettKunde?id=" + id;
    $.get(url, function (OK) {
        if (OK) {
            window.location.href = "endreKunder.html";
            window.alert("Kunde er slettet.");
        }
        else {
            window.location.href = "endreKunder.html";
            window.alert("Feil i database, prøv igjen senere // Denne feilen har vi diskutert. Det fungerte på din mac men ikke min, se SlettKunde i HomeRepository. Funksjonen skal være fin");
        }

    });
}

//validering

function validerFornavn(fornavn) {
    const regex = /^[a-zA-ZæøåÆØÅ. \\-]{2,30}$/;
    const ok = regex.test(fornavn);
    if (!ok) {
        $("#feilmeldingFornavn").html("Fornavnet må bestå av 2 til 30 bokstaver!");
        return false;
    } else {
        $("#feilmeldingFornavn").html("");
        return true;
    }
}

function validerEtternavn(etternavn) {
    const regex = /^[a-zA-ZæøåÆØÅ. \\-]{2,30}$/;
    const ok = regex.test(etternavn);
    if (!ok) {
        $("#feilmeldingEtternavn").html("Etternavnet må bestå av 2 til 30 bokstaver!");
        return false;
    } else {
        $("#feilmeldingEtternavn").html("");
        return true;
    }
}

function validerTlf(telefonnr) {
    const regex = /^[0-9]{8}$/;
    const ok = regex.test(telefonnr);
    if (!ok) {
        $("#feilmeldingTlf").html("Telefonnummeret må bestå av 8 sifre!");
        return false;
    } else {
        $("#feilmeldingTlf").html("");
        return true;
    }
}

function validerEmail(email) {
   
       
        return true;
    
}




//hvis validerOgLagreKunde er OK lagres kunden med RegKunde lenger opp

function validerOgLagreKunde() {

    const fornavnOK = validerFornavn($("#fornavnreg").val());
    const etternavnOK = validerEtternavn($("#etternavnreg").val());
    const telefonnummerOK = validerTlf($("#tlfreg").val());
    const emailOK = validerEmail($("#emailreg").val());


    if (fornavnOK && etternavnOK && telefonnummerOK && emailOK) {
        RegKunde();
    }
}


function validerOgEndreKunde() {

    var fornavnOK = true;
    var etternavnOK = true;
    var telefonnummerOK = true;
    var emailOK = true;


    if (document.getElementById("fornavninn").value.length == 0) {
        fornavnOK = false;
    }
    if (document.getElementById("etternavninn").value.length == 0) {
        etternavnOK = false;
    }
    if (document.getElementById("emailinn").value.length == 0) {
        telefonnummerOK = false;
    }
    if (document.getElementById("telefonnummerinn").value.length == 0) {
        emailOK = false;
    }
    



    if (fornavnOK && etternavnOK && telefonnummerOK && emailOK) {
        SendinnNyKunde();
    }
    else {
        if (!fornavnOK) {
            document.getElementById("fornavninnfeil").innerHTML = ("Manglende fornavn")
        }
        if (!etternavnOK) {
            document.getElementById("etternavninnfeil").innerHTML = ("Manglende etternavn")

        }
        if (!telefonnummerOK) {
            document.getElementById("telefonnummerinnfeil").innerHTML = ("Manglende telefonnummer")
        }
        if (!emailOK) {
            document.getElementById("emailinnfeil").innerHTML = ("Manglende email")
            
        }
    }
    
}

//hvis validerOgLagreKunde er OK lagres kunden med RegKunde lenger opp