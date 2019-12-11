using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EWA.Domain
{
    public interface IRecyclableProductService
    {
        IRecyclableProduct GetProductByBarcode(string code);

        IEnumerable<IRecyclingInstruction> GetInstruction(int instructionId);

        IRecyclableCategory GetCategory(int categoryId);
    }

    public class RecyclableProductService : IRecyclableProductService
    {
        private Dictionary<int, RecyclableProductEntity> _products;
        private Dictionary<int, RecyclableCategoryEntity> _category;
        private Dictionary<int, RecyclingInstructionEntity[]> _instruction;

        public RecyclableProductService()
        {
            var db = RecyclableProductDatabase.FromResource("EWA.data.json");
            _products = db.Product.ToDictionary(e => e.Id, e => e);
            _category = db.Category.ToDictionary(e => e.Id, e => e);
            _instruction = db.Instruction.GroupBy(e => e.InstructionId).ToDictionary(e => e.Key, e => e.ToArray());
        }

        public IEnumerable<IRecyclingInstruction> GetInstruction(int instructionId)
        {
            return _instruction[instructionId].Select(i => new RecyclingInstruction(i, this));
        }

        public IRecyclableCategory GetCategory(int categoryId)
        {
            return _category[categoryId];
        }

        public IRecyclableProduct GetProductByBarcode(string code)
        {
            var entity = _products.Values.First(p => p.Code == code);
            if (entity == null)
                return null;
            else
                return new RecyclableProduct(entity, this);
        }

        public IEnumerable<IRecyclableProduct> GetAllProducts()
        {
            foreach(int key in _products.Keys)
            {
                yield return new RecyclableProduct(_products[key], this);
            }
        }
    }
}
