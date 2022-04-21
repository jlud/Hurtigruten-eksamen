using KundeOrdre.Models;

namespace EF_2.Models
{
    public class Bestillingslinje
    {
        public int Id { get; set; }
        public BillettType BillettKategori { get; set; } //BillettType.cs forklarer
        public int AntallBilletter { get; set; }
        public virtual Rute Rute { get; set; }
        public virtual Bestilling Bestilling { get; set; }
    }
}