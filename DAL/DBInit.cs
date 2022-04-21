using KundeOrdre.Models;

using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using ObligHurtigruten.DAL;
using ObligHurtigruten.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EF_2.Models
{
    public class DBInit
    {
        public static void SkapRuterForKommendeAar(DB db)
        {
            DateTime today = DateTime.Now;
            DateTime tid = new DateTime(today.Year, today.Month, today.Day, 15, 0, 0);

            TimeSpan ts = new TimeSpan(5,0,0,0); // Hver ferge går med 5 dagers mellomrom

            TimeSpan ts1 = new TimeSpan(2, 0, 0, 0);
            TimeSpan ts2 = new TimeSpan(3, 0, 0, 0);
            TimeSpan ts3 = new TimeSpan(4, 0, 0, 0);

            for (int i = 0; i < 100; i++)
            {
                tid += ts;
                var nyRute1 = new Rute
                {    
                    Fra = "Bergen",
                    Til = "Trondheim",
                    Avgang = tid
                };
                db.Rute.Add(nyRute1);

                var nyRute2 = new Rute
                {
                    Fra = "Bergen",
                    Til = "Kirkenes",
                    Avgang = tid + ts1
                };
                db.Rute.Add(nyRute2);

                var nyRute3 = new Rute
                {
                    Fra = "Bergen",
                    Til = "Trondheim",
                    Avgang = tid + ts2
                };
                db.Rute.Add(nyRute3);

                var nyRute4 = new Rute
                {
                    Fra = "Trondheim",
                    Til = "Bergen",
                    Avgang = tid + ts3
                };
                db.Rute.Add(nyRute4);
            }
            db.SaveChanges();
        }
        public static void LeggInnPriser(DB db)
        {

            var nypris = new Priser
            {
                VoksenPris = 200,
                BarnePris = 100,
                Honorpris = 50,
                Studentpris = 80
                
            };
            db.Priser.Add(nypris);
            db.SaveChanges();
        }

        public static void LeggInnBrukere(DB db)
        {
            var NyBruker = new Brukere();
            NyBruker.Brukernavn = "Admin";
            string passord = "Admin123456";
            byte[] salt = BestillingRepository.LagSalt();
            byte[] hash = BestillingRepository.LagHash(passord, salt);
            NyBruker.Passord = hash;
            NyBruker.Salt = salt;
            db.Brukere.Add(NyBruker);
            db.SaveChanges();


            Kunde nykunde = new Kunde();
            nykunde.Fornavn = "Da";
            nykunde.Etternavn = "Baby";
            nykunde.Telefonnummer = "88888888";
            nykunde.Email = "TinyWiener-BigDreams@yahoo.com";

           

            Kunde nykunde3 = new Kunde();
            nykunde3.Fornavn = "Marius";
            nykunde3.Etternavn = "Mythe";
            nykunde3.Telefonnummer = "99999999";
            nykunde3.Email = "Marius.faleby@gmail.com";

            DateTime tid = new DateTime(2022, 12, 12, 12, 12, 12);
            DateTime tid2 = new DateTime(2022, 11, 11, 11, 11, 11);

            Bestilling nybestilling = new Bestilling();
            nybestilling.Pris = 20000;
            nybestilling.Tid = tid;


           

            Rute nyrute = new Rute();
            nyrute.Avgang = tid2;
            nyrute.Fra = "Oslo";
            nyrute.Til = "København";
            
            Bestillingslinje linje1 = new Bestillingslinje();
            linje1.AntallBilletter = 5;
            linje1.BillettKategori = BillettType.Voksen;

            Bestillingslinje linje2 = new Bestillingslinje();
            linje2.AntallBilletter = 5;
            linje2.BillettKategori = BillettType.Barn;

            Bestillingslinje linje3 = new Bestillingslinje();
            linje3.AntallBilletter = 5;
            linje3.BillettKategori = BillettType.Honnor;


            Bestillingslinje linje4 = new Bestillingslinje();
            linje3.AntallBilletter = 5;
            linje3.BillettKategori = BillettType.Student;


            db.Kunde.Add(nykunde);
            db.Bestilling.Add(nybestilling);
            db.Bestillingslinjer.Add(linje1);
            db.Bestillingslinjer.Add(linje2);
            db.Bestillingslinjer.Add(linje3);
            db.Bestillingslinjer.Add(linje4);
            db.Rute.Add(nyrute);
            db.Kunde.Add(nykunde3);

            nybestilling.Kunde = nykunde;
            linje1.Bestilling = nybestilling;
            linje2.Bestilling = nybestilling;
            linje3.Bestilling = nybestilling;
            linje4.Bestilling = nybestilling;
            linje1.Rute = nyrute;
            linje2.Rute = nyrute;
            linje3.Rute = nyrute;
            linje4.Rute = nyrute;


            Kunde nykunde2 = new Kunde();
            nykunde2.Fornavn = "Test";
            nykunde2.Etternavn = "Testersen";
            nykunde2.Telefonnummer = "00000000";
            nykunde2.Email = "suspiciouslyStickySock@gmail.com";

            Bestilling nybestilling2 = new Bestilling();
            nybestilling2.Pris = 1000;
            nybestilling2.Tid = tid;

            Bestillingslinje linje5 = new Bestillingslinje();
            linje1.AntallBilletter = 5;
            linje1.BillettKategori = BillettType.Voksen;

            Bestillingslinje linje6 = new Bestillingslinje();
            linje2.AntallBilletter = 5;
            linje2.BillettKategori = BillettType.Barn;

            Bestillingslinje linje7 = new Bestillingslinje();
            linje3.AntallBilletter = 5;
            linje3.BillettKategori = BillettType.Honnor;


            Bestillingslinje linje8 = new Bestillingslinje();
            linje3.AntallBilletter = 2;
            linje3.BillettKategori = BillettType.Student;


            db.Kunde.Add(nykunde3);
            db.Bestilling.Add(nybestilling2);
            db.Bestillingslinjer.Add(linje5);
            db.Bestillingslinjer.Add(linje6);
            db.Bestillingslinjer.Add(linje7);
            db.Bestillingslinjer.Add(linje8);
            linje8.AntallBilletter = 2;
            linje5.BillettKategori = BillettType.Voksen;
            linje6.BillettKategori = BillettType.Barn;
            linje7.BillettKategori = BillettType.Honnor;
            linje8.BillettKategori = BillettType.Student;
            linje5.Bestilling = nybestilling2;
            linje6.Bestilling = nybestilling2;
            linje7.Bestilling = nybestilling2;
            linje8.Bestilling = nybestilling2;
            linje5.Rute = nyrute;
            linje6.Rute = nyrute;
            linje7.Rute = nyrute;
            linje8.Rute = nyrute;
            nybestilling2.Kunde = nykunde2;

            Bestilling nybestilling3 = new Bestilling();
            nybestilling3.Kunde = nykunde2;
            nybestilling3.Tid = tid;
            nybestilling3.Pris = 200;

            Bestillingslinje linje9 = new Bestillingslinje();
            Bestillingslinje linje10 = new Bestillingslinje();
            Bestillingslinje linje11 = new Bestillingslinje();
            Bestillingslinje linje12 = new Bestillingslinje();

            linje9.AntallBilletter = 1;
            linje10.AntallBilletter = 2;
            linje11.AntallBilletter = 3;
            linje12.AntallBilletter = 4;
            linje9.BillettKategori = BillettType.Voksen;
            linje10.BillettKategori = BillettType.Barn;
            linje11.BillettKategori = BillettType.Honnor;
            linje12.BillettKategori = BillettType.Student;
            linje9.Rute = nyrute;
            linje10.Rute = nyrute;
            linje11.Rute = nyrute;
            linje12.Rute = nyrute;
            linje9.Bestilling = nybestilling3;
            linje10.Bestilling = nybestilling3;
            linje11.Bestilling = nybestilling3;
            linje12.Bestilling = nybestilling3;

            db.Bestilling.Add(nybestilling3);
            db.Bestillingslinjer.Add(linje9);
            db.Bestillingslinjer.Add(linje10);
            db.Bestillingslinjer.Add(linje11);
            db.Bestillingslinjer.Add(linje12);

            db.SaveChanges();
        }
        


        public static void init(IApplicationBuilder app)
        {
            using (var serviceScope = app.ApplicationServices.CreateScope())
            {
                var context = serviceScope.ServiceProvider.GetService<DB>();
                context.Database.EnsureDeleted();
                context.Database.EnsureCreated();

                SkapRuterForKommendeAar(context);
                LeggInnPriser(context);
                LeggInnBrukere(context);


            }
        }
    }
}