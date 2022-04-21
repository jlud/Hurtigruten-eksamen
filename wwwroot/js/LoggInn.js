function Logginnadmin() {
    var brukerNavn = document.getElementById("inputBrukernavn").value;
    var PassOrd = document.getElementById("inputPassord").value;
    const forsokbruker = {
        brukernavn: brukerNavn,
        passord: PassOrd
    }

    $.post("home/LoggInn", { bruker: forsokbruker }, function (OK) {
        if (OK) {
            window.location.href = "AdminHome.html";
        }
        else {
           
            document.getElementById("status").innerHTML = "Feil brukernavn eller passord, prøv igjen!";
        }
    });
}

function home() {
    window.location.href = "index.html";
}