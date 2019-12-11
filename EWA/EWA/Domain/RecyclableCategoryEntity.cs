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
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Icon { get; set; }

        [Required]
        public string Description { get; set; }

        public int BinColorRgb { get; set; }
    }
}
