using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace EWA.Domain
{
    public class RecyclableCategoryEntity : IRecyclableCategory
    {
        [Key]
        [JsonProperty("IdCategory")]
        public int Id { get; set; }

        [Required]
        [JsonProperty("categoryName")]
        public string Name { get; set; }

        [JsonProperty("categoryIcon")]
        public string Icon { get; set; }

        [Required]
        [JsonProperty("categoryDescription")]
        public string Description { get; set; }

        [Required]
        [JsonProperty("binColor")]
        public string BinColorRgb { get; set; }
    }
}
