using Microsoft.AspNetCore.Mvc;

namespace EWA.Controllers
{
    [Route("api/[controller]")]
    public class BarcodeController : ControllerBase
    {
        
        [HttpGet("{id}")]
        public ActionResult<string> Get(int id)
        {
            return "Product with ID: " + id;
        }
    }
}