using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace EWA.Domain
{
    public class RecyclingInstructionEntity
    {
        public int InstructionId { get; set; }

        [Required]
        public string ItemName { get; set; }

        [Required]
        public int? CategoryId { get; set; }
    }
}
