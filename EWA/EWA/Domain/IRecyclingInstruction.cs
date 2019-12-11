using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EWA.Domain
{
    public interface IRecyclingInstruction
    {
        string ItemName { get; }

        RecyclableMaterial Material { get; }
    }
}
