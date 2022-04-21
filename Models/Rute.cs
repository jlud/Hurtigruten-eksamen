using System;
using System.Collections.Generic;

namespace EF_2.Models
{
    public class Rute
    {
        public int Id { get; set; }
        public string Fra { get; set; }
        public string Til { get; set; }
        public DateTime Avgang { get; set; }
    }
} 