using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EWA.Domain
{
    public interface IRecyclableProduct
    {
        string Name { get; }

        IEnumerable<IRecyclingInstruction> Instructions { get; }
    }

    public class RecyclableProduct : IRecyclableProduct
    {
        private readonly RecyclableProductEntity _product;
        private readonly IRecyclableProductService _service;

        public RecyclableProduct(
            RecyclableProductEntity product,
            IRecyclableProductService service)
        {
            _product = product;
            _service = service;
        }

        public string Name => _product.Name;

        public IEnumerable<IRecyclingInstruction> Instructions 
            => _service.GetInstruction(_product.InstructionsId.Value);
    }
}
