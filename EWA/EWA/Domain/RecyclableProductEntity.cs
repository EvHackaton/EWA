using Newtonsoft.Json;
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
        [JsonProperty("idProduct")]
        public int Id { get; set; }

        [Required]
        [JsonProperty("productName")]
        public string Name { get; set; }

        [Required]
        [JsonProperty("productCode")]
        public string Code { get; set; }

        [Required]
        [JsonProperty("id_Instruction0")]
        public string Instruction0 { get; set; }

        [JsonProperty("id_Instruction1")]
        public string Instruction1 { get; set; }

        [JsonProperty("id_Instruction2")]
        public string Instruction2 { get; set; }

        [JsonProperty("id_Instruction3")]
        public string Instruction3 { get; set; }

        [JsonProperty("id_Instruction4")]
        public string Instruction4 { get; set; }

        public IEnumerable<int> Instructions
        {
            get
            {
                yield return Int32.Parse(Instruction0);
                if (!String.IsNullOrWhiteSpace(Instruction1)) yield return Int32.Parse(Instruction1);
                if (!String.IsNullOrWhiteSpace(Instruction2)) yield return Int32.Parse(Instruction2);
                if (!String.IsNullOrWhiteSpace(Instruction3)) yield return Int32.Parse(Instruction3);
                if (!String.IsNullOrWhiteSpace(Instruction4)) yield return Int32.Parse(Instruction4);
            }
        }
    }
}
