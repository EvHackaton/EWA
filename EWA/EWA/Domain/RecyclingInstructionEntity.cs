using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace EWA.Domain
{
    public class RecyclingInstructionEntity
    {
        [JsonProperty("instructionId")]
        public int InstructionId { get; set; }

        [Required]
        [JsonProperty("itemName")]
        public string ItemName { get; set; }

        [Required]
        [JsonProperty("categoryId")]
        public int? CategoryId { get; set; }
    }
}
