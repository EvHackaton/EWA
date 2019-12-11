using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EWA.Domain
{
    public interface IRecyclableCategory
    {
        string Name { get; }

        string Icon { get; }

        string Description { get; }

        string BinColorRgb { get; }
    }
}
