using System;
namespace KundeOrdre.Models
{
    public class DisplayRute //Klasse for fremvisning av rute, brukt for å velge rute på index.
    {
        public String DisplayNavn { get; set; }
        public String Fra { get; set; }
        public String Til { get; set; }
        public int RuteID { get; set; }
    }
    
}
