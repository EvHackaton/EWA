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

        public string Name => _product.Name.Trim();

        public IEnumerable<IRecyclingInstruction> Instructions 
            => _product.Instructions.SelectMany(i => _service.GetInstruction(i));
    }
}
