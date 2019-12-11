using EWA.Domain;
using Microsoft.AspNetCore.Mvc;

namespace EWA.Controllers
{
    [Route("api/[controller]")]
    public class BarcodeController : ControllerBase
    {
        private readonly IRecyclableProductService _recyclableProductService;
        public BarcodeController(IRecyclableProductService recyclableProductService)
        {
            _recyclableProductService = recyclableProductService;
        }
        [HttpGet("{id}")]
        public JsonResult Get(int id)
        {
            return new JsonResult(_recyclableProductService.GetProductByBarcode("123"));
        }
    }
}