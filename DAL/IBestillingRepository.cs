using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using EF_2.Models;
using ObligHurtigruten.Models;

namespace ObligHurtigruten.DAL
{
    public interface IBestillingRepository
    {
        Task<List<Kunde>> List_kunder();

        Task<List<Rute>> List_ruter();

        Task<List<string>> ListRuteTyper();

        Task<bool> SlettKunde(int id);

        Task<List<Rute>> List_SpesifikkeRuter(string Dato, string fratil);

        Task<Bestilling> HentKvittering(int BestillingsID);

        Task<Kunde> FinnKunde(string Telefonnummer);

        Task<int> RegistrerKunde(Kunde innKunde, int BestillingsID);

        Task<int> NyBestilling(Bestilling innBestilling, List<Bestillingslinje> innBestillingslinjer, int RuteID);

        Task<bool> LoggInn(Bruker bruker);

        Task<Priser> HentPriser();

        Task<bool> EndrePris(double nypris, int billettype);

        Task<bool> NyRute(Rute innRute, string dato, string tid);

        Task<bool> SlettRute(int id);

        Task<bool> EndreRute(Rute innrute, int id, string dato, string tid);

        Task<List<Bestilling>> HentPersonligeBestillinger(Kunde tlf);

        Task<bool> SlettBestilling(int id);

        Task<bool> EndreBillett(int ID, int voksen, int barn, int honor, int student, int nyRuteID);

        Task<bool> EndreKunde(Kunde innKunde);

        Task<bool> RegistrerKunKunde(Kunde innKunde);

        Task<Rute> FinnRute(int id);

        Task<List<Bestilling>> HentAlleBestillinger();

        Task<Bestilling> HentSpesifikkBestilling(int id);


    }
}