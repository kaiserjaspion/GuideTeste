using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace TesteGuide.Models
{
    [Table("Autor")]
    public class Autor
    {
        [Column("Id"),Key]
        public int Id { get; set; }
        [Column("Nome")]
        public string Nome { get; set; }
    }
}
