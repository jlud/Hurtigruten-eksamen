using EF_2.Models;
using KundeOrdre.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using ObligHurtigruten.DAL;
using ObligHurtigruten.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KundeOrdre.Controllers
{
    [Route("[controller]/[action]")]

    public class HomeController:ControllerBase
    {
        private readonly IBestillingRepository _db;
        private ILogger<HomeController> _log;

        private const string _loggetInn = "loggetInn";

        public HomeController(IBestillingRepository db, ILogger<HomeController> log)
        {
            _db = db;
            _log = log;
        }

        public async Task<ActionResult> List_kunder()
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString(_loggetInn)))
            {
                return Unauthorized();
            }

            List<Kunde> kundeliste = await _db.List_kunder();
            return Ok(kundeliste);
        }

        public async Task<ActionResult> List_ruter()
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString(_loggetInn)))
            {
                return Unauthorized();
            }
            List<Rute> ruteListe = await _db.List_ruter();
            return Ok(ruteListe);
        }

        public async Task<ActionResult> HentSpesifikkBestilling(int id)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString(_loggetInn)))
            {
                return Unauthorized();
            }
            Bestilling bestilling = await _db.HentSpesifikkBestilling(id);

            return Ok(bestilling);
        }

        public async Task<List<string>> ListRuteTyper()
        {
            
            List<string> ReturListe = await _db.ListRuteTyper();
            return (ReturListe);
        }

        public async Task<ActionResult> FinnRute(int id)
        {

            if (string.IsNullOrEmpty(HttpContext.Session.GetString(_loggetInn)))
            {
                return Unauthorized();
            }
            Rute sendRute = await _db.FinnRute(id);
            return Ok(sendRute);
        }

        public async Task<ActionResult> EndreBillett(int ID, int voksen, int barn, int honor, int student, int nyRuteID)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString(_loggetInn)))
            {
                return Unauthorized();
            }
            bool resultat = await _db.EndreBillett(ID, voksen, barn, honor, student, nyRuteID);
            return Ok(resultat);
        }
        public async Task<ActionResult> RegistrerKunKunde(Kunde innKunde)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString(_loggetInn)))
            {
                return Unauthorized();
            }
            bool resultat = await _db.RegistrerKunKunde(innKunde);
            return Ok(resultat);
        }

        public async Task<ActionResult> SlettKunde(int id)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString(_loggetInn)))
            {
                return Unauthorized();
            }
            bool resultat = await _db.SlettKunde(id);

            return Ok(resultat);
        }

        public async Task<List<Rute>> List_SpesifikkeRuter(string Dato, string fratil)
        {
           
            List<Rute> returListe = await _db.List_SpesifikkeRuter(Dato, fratil);

            return (returListe);
        }

        public async Task<Bestilling> HentKvittering(int BestillingsID)
        {
            
            Bestilling ListBestilling = await _db.HentKvittering(BestillingsID);
            return ListBestilling;
        }

        public async Task<ActionResult> FinnKunde(string Telefonnummer)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString(_loggetInn)))
            {
                return Unauthorized();
            }
            if (await _db.FinnKunde(Telefonnummer) == null){
                return Ok(null);

            }
            Kunde EnKunde = await _db.FinnKunde(Telefonnummer);
            return Ok(EnKunde);
        }
        //Denne er en av flere som brukes fra klient-side, og er dermed ikke kryptert
        public async Task<int> RegistrerKunde(Kunde innKunde, int BestillingsID)
        {
            
            int resultat = await _db.RegistrerKunde(innKunde, BestillingsID);
            return resultat;

        }
        public async Task<ActionResult> SlettRute(int id)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString(_loggetInn)))
            {
                return Unauthorized();
            }
            bool resultat = await _db.SlettRute(id);
            return Ok(resultat);
        }
        public async Task<int> NyBestilling(Bestilling innBestilling, List<Bestillingslinje> innBestillingslinjer, int RuteID)
        {
           
            int resultat = await _db.NyBestilling(innBestilling, innBestillingslinjer, RuteID);
            return resultat;
        }
        public async Task<ActionResult> EndreRute(Rute innrute, int id, string dato, string tid)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString(_loggetInn)))
            {
                return Unauthorized();
            }
            bool resultat = await _db.EndreRute(innrute, id, dato, tid);
            return Ok(resultat);
        }

        public async Task<ActionResult> HentPriser()
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString(_loggetInn)))
            {
                return Unauthorized();
            }
            Priser prisene = await _db.HentPriser();
            return Ok(prisene);
        }
        public async Task<ActionResult> HentAlleBestillinger()
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString(_loggetInn)))
            {
                return Unauthorized();
            }
            List<Bestilling> ListeMedbestilling = await _db.HentAlleBestillinger();
            return Ok(ListeMedbestilling);
        }

        public async Task<ActionResult> EndrePris(double nypris, int billettype)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString(_loggetInn)))
            {
                return Unauthorized();
            }
            bool resultat = await _db.EndrePris(nypris, billettype);
            return Ok(resultat);
        }
        public async Task<ActionResult> NyRute(Rute innRute, string dato, string tid)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString(_loggetInn)))
            {
                return Unauthorized();
            }
            bool resultat = await _db.NyRute(innRute, dato, tid);
            return Ok(resultat);
        }
        public async Task<ActionResult> EndreKunde(Kunde innKunde)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString(_loggetInn)))
            {
                return Unauthorized();
            }
            bool resultat = await _db.EndreKunde(innKunde);
            return Ok(resultat);
        }
        public async Task<ActionResult> HentPersonligeBestillinger(Kunde tlf)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString(_loggetInn)))
            {
                return Unauthorized();
            }
            List<Bestilling> list_bestillinger = await _db.HentPersonligeBestillinger(tlf);
            if (list_bestillinger == null)
            {
                return Ok(null);
            }
            return Ok(list_bestillinger);
        }
        public async Task<ActionResult> SlettBestilling(int id)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString(_loggetInn)))
            {
                return Unauthorized();
            }
            bool resultat = await _db.SlettBestilling(id);
            return Ok(resultat);
        }

        public async Task<ActionResult> LoggInn(Bruker bruker)
        {
            if (ModelState.IsValid)
            {
                bool returnOK = await _db.LoggInn(bruker);
                if (!returnOK)
                {
                    HttpContext.Session.SetString(_loggetInn, "");
                    return Ok(false);
                }
                HttpContext.Session.SetString(_loggetInn, "LoggetInn");
                return Ok(true);

            }
            return BadRequest("feil");
        }

        public void LoggUt()
        {
            HttpContext.Session.SetString(_loggetInn, "");
        }
    }
}
