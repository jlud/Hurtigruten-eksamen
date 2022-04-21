using System;
using System.Collections.Generic;

namespace EF_2.Models
{
    public class Bestilling
    {
        public int Id { get; set; }
        public DateTime Tid { get; set; }
        public double Pris { get; set; }
        public virtual Kunde Kunde { get; set; }
        public virtual List<Bestillingslinje> Bestillingslinjer { get; set; }
    }
}