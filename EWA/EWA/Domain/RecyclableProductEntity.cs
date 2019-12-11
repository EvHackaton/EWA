using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace EWA.Domain
{
    public class RecyclableProductEntity
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        public string Code { get; set; }

        [Required]
        public int? InstructionsId { get; set; }
    }
}
