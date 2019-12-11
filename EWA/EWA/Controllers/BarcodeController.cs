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
        public JsonResult Get(string id)
        {
            if (string.IsNullOrWhiteSpace(id))
            {
                Response.StatusCode = 400;
                return new JsonResult(null);
            }

            var response = _recyclableProductService.GetProductByBarcode(id.Trim());

            if (response == null)
            {
                Response.StatusCode = 404;
                return new JsonResult(null);
            }

            return new JsonResult(response);
        }
    }
}