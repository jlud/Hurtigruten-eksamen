using Microsoft.EntityFrameworkCore;
using ObligHurtigruten.Models;

namespace EF_2.Models
{

    public class Brukere
    {
        public int ID { get; set; }
        public string Brukernavn { get; set; }
        public byte[] Passord { get; set; }
        public byte[] Salt { get; set; }
    }
    public class DB:DbContext
    {       
        public DB(DbContextOptions<DB> options) : base(options)
        {
            Database.EnsureCreated();
        }

        public virtual DbSet<Rute> Rute { get; set; }
        public virtual DbSet<Kunde> Kunde { get; set; }
        public virtual DbSet<Bestilling> Bestilling { get; set; }
        public virtual DbSet<Bestillingslinje> Bestillingslinjer { get; set; }
        public virtual DbSet<Priser> Priser { get; set; }
        public virtual DbSet<Brukere> Brukere { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseLazyLoadingProxies();
        }
    }
}
