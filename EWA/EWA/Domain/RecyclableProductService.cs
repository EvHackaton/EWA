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
        public IEnumerable<IRecyclingInstruction> GetInstruction(int instructionId)
        {
            yield return new RecyclingInstruction(new RecyclingInstructionEntity
            {
                InstructionId = instructionId,
                ItemName = "package",
                CategoryId = 1
            }, this);

            yield return new RecyclingInstruction(new RecyclingInstructionEntity
            {
                InstructionId = instructionId,
                ItemName = "tea leaves",
                CategoryId = 2
            }, this);
        }

        public IRecyclableCategory GetCategory(int categoryId)
        {
            return new RecyclableCategoryEntity
            {
                Id = 1,
                Name = "Glass",
                Description = "Some description",
                BinColorRgb = 0
            };
        }

        public IRecyclableProduct GetProductByBarcode(string code)
        {
            return new RecyclableProduct(new RecyclableProductEntity
            {
                Code = "123",
                InstructionsId = 10,
                Name = "tea"
            }, this);
        }

    }
}
