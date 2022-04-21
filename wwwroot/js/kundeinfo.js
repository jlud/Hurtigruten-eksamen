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

function validerTelefonnr(telefonnr) {
    const regex = /^[0-9]{8}$/;
    const ok = regex.test(telefonnr);
    if (!ok) {
        $("#feilmeldingTelefon").html("Telefonnr må bestå av 8 siffre!");
        return false;
    } else {
        $("#feilmeldingTelefon").html("");
        return true;
    }
}

function tilbake() {

    window.location.href = "index.html";
}


function TestLeggTilKunde() {

    const fornavnOK = validerFornavn($("#fornavn").val());
    const etternavnOK = validerEtternavn($("#etternavn").val());
    const telefonnummerOK = validerTelefonnr($("#telefonnr").val());
    
    if (fornavnOK && etternavnOK && telefonnummerOK) {

        const Kunde = {
            Fornavn: $("#fornavn").val(),
            Etternavn: $("#etternavn").val(),
            Telefonnummer: $("#telefonnr").val(),
            Email: $("#innmail").val()
        };


        const url = "home/RegistrerKunde";
        var LagretBestillingsID = localStorage.getItem("LagretBestillingsID")


        $.post(url, { innKunde: Kunde, BestillingsID: LagretBestillingsID }, function (OK) {
            if (OK) {
                window.location.href = "kvittering.html";
            }
            else {
                document.write("Failed");
            }
        })
        
    }
}


