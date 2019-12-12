using EWA.Domain;
using Microsoft.AspNetCore.Mvc;

namespace EWA.Controllers
{
    [Route("api/[controller]")]
    public class NameController : ControllerBase
    {
        private readonly IRecyclableProductService _recyclableProductService;

        public NameController(IRecyclableProductService recyclableProductService)
        {
            _recyclableProductService = recyclableProductService;
        }

        [HttpGet("{name}")]
        public JsonResult Get(string name)
        {
            if (string.IsNullOrWhiteSpace(name))
            {
                Response.StatusCode = 400;
                return new JsonResult(null);
            }

            var response = _recyclableProductService.FindProduct(name.Trim());

            if (response == null)
            {
                Response.StatusCode = 404;
                return new JsonResult(null);
            }

            return new JsonResult(response);
        }
    }
}