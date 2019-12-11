using System.Linq;
using EWA.Domain;
using Microsoft.AspNetCore.Mvc;

namespace EWA.Controllers
{
    [Route("api/[controller]")]
    public class BarcodeController : ControllerBase
    {
        [HttpGet("{id}")]
        public JsonResult Get(int id)
        {
            var service = new RecyclableProductService();
            var result = service.GetProductByBarcode("123");
            return new JsonResult(new {result.Name, Instructions = result.Instructions.ToList()});
        }
    }
}