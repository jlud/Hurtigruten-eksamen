using System;
namespace ObligHurtigruten.Models
{
    public class Priser
    {
        public int ID { get; set; }
        public double VoksenPris { get; set; }
        public double BarnePris { get; set; }
        public double Honorpris { get; set; }
        public double Studentpris { get; set; }
    }
}
