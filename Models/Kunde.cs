using System.Collections.Generic;

namespace EF_2.Models
{
    public class Kunde
    {
        public int Id { get; set; }
        public string Fornavn { get; set; }
        public string Etternavn { get; set; }
        public string Telefonnummer { get; set; }
        public string Email { get; set; }
        public virtual List<Bestilling> Bestilling { get; set; }
    }
}