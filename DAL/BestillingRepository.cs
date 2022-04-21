using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;
using EF_2.Models;
using KundeOrdre.Controllers;
using KundeOrdre.Models;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using ObligHurtigruten.Models;

namespace ObligHurtigruten.DAL
{
    public class BestillingRepository : IBestillingRepository
    {
        private readonly DB _db;
        private ILogger<HomeController> _log;
        public BestillingRepository(DB db, ILogger<HomeController> log)
        {
            _db = db;
            _log = log;
        }

        
        public async Task<List<Kunde>> List_kunder()
        {
            List<Kunde> kundeliste = await _db.Kunde.ToListAsync();
            return kundeliste;
        }


        public async Task<List<Rute>> List_ruter()
        {

            List<Rute> ruteListe = await _db.Rute.ToListAsync();
            return ruteListe;

        }

        public async Task<bool> NyRute(Rute innRute, string dato, string tid)
        {

            try{

                 //Oversetter innDato til et nytt DateTime object med tidspunkt

                int aar = Convert.ToInt16(dato.Substring(0, 4));
                int maaned = Convert.ToInt16(dato.Substring(5, 2));
                int dag = Convert.ToInt16(dato.Substring(8, 2));
                int time = Convert.ToInt16(tid.Substring(0, 2));
                int minutt = Convert.ToInt16(tid.Substring(3, 2));
                int sekund = 00;

                DateTime rutetidspunkt = new DateTime(aar,maaned,dag,time,minutt,sekund);
                Rute nyrute = new Rute();

                nyrute.Til = innRute.Til;
                nyrute.Fra = innRute.Fra;
                
                nyrute.Avgang = rutetidspunkt;

                _db.Rute.Add(nyrute);
                await _db.SaveChangesAsync();
                return true;
            }
            catch
            {
                return false;
            }
        }

        public async Task<List<string>> ListRuteTyper()
        {//Går igjennom databasen og finner unike turer for å liste de forskjellige turene på index. Dette gjør det lett å legge til nye ruter uten å endre kode.
            List<Rute> ruteListe = await _db.Rute.ToListAsync();
            List<DisplayRute> rutetypeListeAlle = new List<DisplayRute>();
            foreach (Rute r in ruteListe)
            {
                DisplayRute ds = new DisplayRute();
                ds.DisplayNavn = r.Fra + " - " + r.Til;
                ds.Fra = r.Fra;
                ds.Til = r.Til;
                ds.RuteID = r.Id;
                rutetypeListeAlle.Add(ds);
            }
            var rutetypeListe = rutetypeListeAlle.Select(s => s.DisplayNavn).Distinct();
            List<string> ReturListe = new List<string>(rutetypeListe);

            return ReturListe;
        }

        public async Task<bool> SlettKunde(int id) //Fungerer ikke på min mac, vi har diskutert på lab, men det fungerte hos deg...
        {
            try
            {
                Kunde EnKunde = await _db.Kunde.FindAsync(id);
                _db.Kunde.Remove(EnKunde);
                await _db.SaveChangesAsync();
                return true;
            }
            catch
            {
                return false;
            }
        }

        public async Task<bool> SlettRute(int id) { //Fungerer ikke på min mac, vi har diskutert på lab, men det fungerte hos deg...

            try
            {
                Rute tmprute = await _db.Rute.FindAsync(id);
                _db.Rute.Remove(tmprute);
                await _db.SaveChangesAsync();
                return true;
            }
            catch
            {
                return false;
            }
            
        }

        public async Task<Rute> FinnRute(int id)
        {
            Rute sendRute = await _db.Rute.FindAsync(id);
            return sendRute;
        }

        public async Task<bool> SlettBestilling(int id) //Fungerer ikke på min mac, vi har diskutert på lab, men det fungerte hos deg...
        {

            try
            {
                Bestilling tmpbest = await _db.Bestilling.FindAsync(id);
                _db.Bestilling.Remove(tmpbest);
                await _db.SaveChangesAsync();
                
                return true;
            }
            catch(Exception e)
            {
                
                return false;
            }
        }


        public async Task<List<Rute>> List_SpesifikkeRuter(string Dato, string fratil)  //finner de aktuelle turene etter dato og rute
        {

            DateTime soekedato = new DateTime( //Oversetter innDato til et nytt DateTime object
                Convert.ToInt16(Dato.Substring(0, 4)),
                Convert.ToInt16(Dato.Substring(5, 2)),
                Convert.ToInt16(Dato.Substring(8, 2)));

            string[] tmp = fratil.Split("-"); // Splitter opp f.eks (trondheim - oslo) til "trondheim" og "oslo"

            string fra = tmp[0].Replace(" ", ""); //Fjerner mellomrom
            string til = tmp[1].Replace(" ", "");

            List<Rute> ruteListe = await _db.Rute.ToListAsync();
            ruteListe.OrderBy(x => x.Avgang);
            List<Rute> returListe = new List<Rute>();

            int FunnetKandidat = 0;


            TimeSpan ts = new TimeSpan(7, 0, 0, 0); // Lister ut båter en uke frem i tid 

            foreach (Rute r in ruteListe)
            {
                if (FunnetKandidat < 5) // Returnerer top 5 turer etter angitt dato
                {
                    if (r.Avgang >= soekedato && r.Avgang <= soekedato + ts)
                    {
                        if (r.Fra.CompareTo(fra) == 0)
                        {
                            if (r.Til.CompareTo(til) == 0)
                            {
                                returListe.Add(r);
                                FunnetKandidat++;
                            }
                        }
                    }
                }
            }
            return returListe; //sender tilbake en liste med turer på datoen, eller opptil 2 dager etter
        }


        public async Task<Bestilling> HentKvittering(int BestillingsID) //Henter en bestilling til kvitteringsside
        {
            Bestilling ListBestilling = await _db.Bestilling.FindAsync(BestillingsID);
            return ListBestilling;
        }

        public async Task<List<Bestilling>> HentAlleBestillinger()
        {
            List<Bestilling> ListeMedbestilling = await _db.Bestilling.ToListAsync();
            return ListeMedbestilling;
        }


        public async Task<Kunde> FinnKunde(string Telefonnummer) //Telefonnummer brukes som noe unikt for registrering og legge til, slik at den også brukes til å hente kunde
        {
            try
            { 
                Kunde EnKunde = await _db.Kunde.FirstOrDefaultAsync(k => k.Telefonnummer == Telefonnummer);
                return EnKunde;
            }
            catch
            {
                return null;
            }

        }

        public async Task<int> RegistrerKunde(Kunde innKunde, int BestillingsID)
        {//Startfunksjon ved ny bestilling. Avgjør om en kunde eksisterer eller ikke, og legger inn bestillinger.
         //Bruker telefonnummer fra kunden, slik at hvis kunden oppgir samme telefonnummer annses det som om det er samme kunde.

            try
            {
                Bestilling TmpBestilling = await _db.Bestilling.FindAsync(BestillingsID);
                Kunde SjekkKunde = await _db.Kunde.FirstOrDefaultAsync(k => k.Telefonnummer == innKunde.Telefonnummer);
                if (SjekkKunde == null)
                {
                    _db.Kunde.Add(innKunde); // Registrerer ny kunde
                }
                else
                {
                    innKunde = SjekkKunde; // Kunde finnes fra før
                }

                await _db.SaveChangesAsync();
                TmpBestilling.Kunde = innKunde;
                await _db.SaveChangesAsync();
                int KundeID = innKunde.Id;
                _log.LogInformation("Ny Bestilling registrert. KundeID = " + KundeID + ". BestillingsId: " + BestillingsID);
                return KundeID;
            }
            catch
            {
                return -1;
            }
        }



        public async Task<bool> RegistrerKunKunde(Kunde innKunde) //RegistrerKunde på adminside. Her avhenger man ikke av at en bestilling kommer inn
        {
           
                Kunde nyKunde = new Kunde();
                Kunde SjekkKunde = await _db.Kunde.FirstOrDefaultAsync(k => k.Telefonnummer == innKunde.Telefonnummer);

                if (SjekkKunde != null) //kunde finnes
                {
                    return false;
                }
                nyKunde.Fornavn = innKunde.Fornavn;
                nyKunde.Etternavn = innKunde.Etternavn;
                nyKunde.Telefonnummer = innKunde.Telefonnummer;
                nyKunde.Email = innKunde.Email;
                _db.Kunde.Add(nyKunde); // Registrerer ny kunde
                await _db.SaveChangesAsync();
                
                return true;
            
           
        }

        public async Task<int> NyBestilling(Bestilling innBestilling, List<Bestillingslinje> innBestillingslinjer, int RuteID)
        {
            try
            {
                Rute tmp = await _db.Rute.FindAsync(RuteID); // finner ruten (fra input) som skal kobles med linje
                innBestilling.Tid = DateTime.Now;
                var nyeBestillingslinjer = new List<Bestillingslinje>();
                foreach (Bestillingslinje BL in innBestillingslinjer)
                {
                    BL.Rute = await _db.Rute.FindAsync(RuteID);
                    nyeBestillingslinjer.Add(BL);
                }

                innBestilling.Bestillingslinjer = nyeBestillingslinjer;

                var tmpPrislagring = KalkulerPris(innBestilling); //Finner ut totalpris ved hjelp av KalkulerPris under
                innBestilling.Pris = tmpPrislagring;

                _db.Add(innBestilling);

                await _db.SaveChangesAsync();

                var Bestillingsid = innBestilling.Id;

                return Bestillingsid;
            }

            catch
            {
                return -1;
            }
        }

        public double KalkulerPris(Bestilling innbestilling) //Går igjennom bestillingslinjene og finner totaltpris
        {
            Priser prisene = _db.Priser.Find(1);
            var voksenbilletter = (innbestilling.Bestillingslinjer[0].AntallBilletter * prisene.VoksenPris);
            var barnebilletter = (innbestilling.Bestillingslinjer[1].AntallBilletter * prisene.BarnePris);
            var honorbilletter = (innbestilling.Bestillingslinjer[2].AntallBilletter * prisene.Honorpris);
            var studentbilletter = (innbestilling.Bestillingslinjer[3].AntallBilletter * prisene.BarnePris);
            double TotalPris = voksenbilletter + barnebilletter + honorbilletter + studentbilletter;

            return TotalPris;
        }



        public static byte[] LagHash(string passord, byte[] salt)
        {
            return KeyDerivation.Pbkdf2(
                password: passord,
                salt: salt,
                prf: KeyDerivationPrf.HMACSHA512,
                iterationCount: 1000,
                numBytesRequested: 32);
        }

        public static byte[] LagSalt()
        {
            var csp = new RNGCryptoServiceProvider();
            var salt = new byte[24];
            csp.GetBytes(salt);
            return salt;

        }

        public async Task<bool>LoggInn(Bruker bruker)
        {
            try
            {
                Brukere tmpBruker = await _db.Brukere.FirstOrDefaultAsync(b => b.Brukernavn == bruker.Brukernavn);
                byte[] hash = LagHash(bruker.Passord, tmpBruker.Salt);
                bool ok = hash.SequenceEqual(tmpBruker.Passord);

                if (ok)
                {
                    return true;
                }
                return false;
            }

            catch(Exception e)
            {
                _log.LogInformation(e.Message);
                _log.LogInformation("AdminLogin feilet. Brukernavn: " + bruker.Brukernavn + " passord: " + bruker.Passord);
                return false;
            }
        }

        public async Task<Priser> HentPriser()
        {
            Priser prisene = await _db.Priser.FindAsync(1);
            return prisene;
        }

        public async Task<bool> EndrePris(double nypris, int billettype)
        {

            try
            {
                Priser prisene = await _db.Priser.FindAsync(1);

                //Verdiene 1-4 representerer hver sin form for bilett.

                if (billettype == 1) // Voksen er valgt
                {
                    prisene.VoksenPris = nypris;
                }
                if (billettype == 2) // Barn er valgt
                {
                    prisene.BarnePris = nypris;
                }
                if (billettype == 3) // Honnor er valgt
                {
                    prisene.Honorpris = nypris;
                }
                if (billettype == 4) // Student er valgt
                {
                    prisene.Studentpris = nypris;
                }
                

                await _db.SaveChangesAsync();
                return true;
            }
            catch
            {
                return false;
            }  
        }

        public async Task<bool> EndreRute(Rute innrute, int id, string dato, string tid)
        {

            try
            {
                //Oversetter innDato til et nytt DateTime object med tidspunkt

                int aar = Convert.ToInt16(dato.Substring(0, 4));
                int maaned = Convert.ToInt16(dato.Substring(5, 2));
                int dag = Convert.ToInt16(dato.Substring(8, 2));
                int time = Convert.ToInt16(tid.Substring(0, 2));
                int minutt = Convert.ToInt16(tid.Substring(3, 2));
                int sekund = 00;

                DateTime rutetidspunkt = new DateTime(aar, maaned, dag, time, minutt, sekund);



                Rute tmprute = await _db.Rute.FindAsync(id);
                
                tmprute.Fra = innrute.Fra;
                tmprute.Til = innrute.Til;
                tmprute.Avgang = rutetidspunkt;
                await _db.SaveChangesAsync();
                _log.LogInformation("Rute endret. ruteID = " + tmprute.Id + ". fra-til = " +tmprute.Fra + "-"+ tmprute.Til);
                return true;
            }
            catch
            {
                return false;
            }
        }

        public async Task<List<Bestilling>> HentPersonligeBestillinger(Kunde tlf) //Igjen brukes telefon som den unike linken.
        {
            
            Kunde SjekkKunde = await _db.Kunde.FirstOrDefaultAsync(k => k.Telefonnummer == tlf.Telefonnummer);
            if (SjekkKunde == null)
            {
                return null;
            }
            List<Bestilling> list_bestillinger = SjekkKunde.Bestilling.ToList();
            if (list_bestillinger == null)
            {
                return null;
            }
            
            return list_bestillinger;
        }

        public async Task<bool> EndreBillett (int ID, int voksen, int barn, int honor, int student, int nyRuteID ){
            try
            {
                Bestilling Endrebestilling = await _db.Bestilling.FindAsync(ID);

                if (nyRuteID != 0) // Hvis admin har valgt ny rute, endre rute
                {
                    Rute nyRute = await _db.Rute.FindAsync(nyRuteID);
                    Endrebestilling.Bestillingslinjer[0].Rute = nyRute;
                    Endrebestilling.Bestillingslinjer[1].Rute = nyRute;
                    Endrebestilling.Bestillingslinjer[2].Rute = nyRute;
                    Endrebestilling.Bestillingslinjer[3].Rute = nyRute;
                }

                Endrebestilling.Bestillingslinjer[0].AntallBilletter = voksen;
                Endrebestilling.Bestillingslinjer[1].AntallBilletter = barn;
                Endrebestilling.Bestillingslinjer[2].AntallBilletter = honor;
                Endrebestilling.Bestillingslinjer[3].AntallBilletter = student;

                await _db.SaveChangesAsync();
                _log.LogInformation("Bestilling endret. Bestillingsid = " + Endrebestilling.Id);
                return true;
            }
            catch
            {
                return false;
            }
            
        }

        public async Task<Bestilling> HentSpesifikkBestilling(int id) //Henter bestilling etter ID
        {
            Bestilling bestilling = await _db.Bestilling.FindAsync(id);
            return bestilling;
        }

        public async Task<bool> EndreKunde(Kunde innKunde)
        {

            try
            {
                Kunde Orginalkunde = await _db.Kunde.FindAsync(innKunde.Id);
                Orginalkunde.Fornavn = innKunde.Fornavn;
                Orginalkunde.Etternavn = innKunde.Etternavn;
                Orginalkunde.Telefonnummer = innKunde.Telefonnummer;
                Orginalkunde.Email = innKunde.Email;

                await _db.SaveChangesAsync();


                return true;
            }
            catch
            {
                return false;
            }
        }

        
    }
}
