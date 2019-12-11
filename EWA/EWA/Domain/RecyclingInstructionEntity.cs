using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace EWA.Domain
{
    public class RecyclingInstructionEntity : IRecyclingInstruction
    {
        public int InstructionId { get; set; }

        [Required]
        public string ItemName { get; set; }

        public RecyclableMaterial Material { get; set; }
    }
}
