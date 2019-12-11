using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EWA.Domain
{
    public class RecyclingInstruction : IRecyclingInstruction
    {
        private readonly RecyclingInstructionEntity _entity;
        private readonly RecyclableProductService _service;

        public RecyclingInstruction(RecyclingInstructionEntity entity, RecyclableProductService service)
        {
            _entity = entity;
            _service = service;
        }

        public string ItemName => _entity.ItemName.Trim();

        public IRecyclableCategory Category => _service.GetCategory(_entity.CategoryId.Value);
    }
}
