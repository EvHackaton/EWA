using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EWA.Domain
{
    public interface IRecyclableProductService
    {
        IRecyclableProduct GetProductByBarcode(string code);

        IEnumerable<RecyclingInstructionEntity> GetInstruction(int instructionId);
    }

    public class RecyclableProductService : IRecyclableProductService
    {
        public IEnumerable<RecyclingInstructionEntity> GetInstruction(int instructionId)
        {
            yield return new RecyclingInstructionEntity
            {
                InstructionId = instructionId,
                ItemName = "package",
                Material = RecyclableMaterial.Paper
            };

            yield return new RecyclingInstructionEntity
            {
                InstructionId = instructionId,
                ItemName = "tea leaves",
                Material = RecyclableMaterial.Bio
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
