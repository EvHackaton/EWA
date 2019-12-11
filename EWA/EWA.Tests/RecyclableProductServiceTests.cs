using EWA.Domain;
using System;
using Xunit;

namespace EWA.Tests
{
    public class RecyclableProductServiceTests
    {
        [Fact]
        public void HappyDay()
        {
            var service = new RecyclableProductService();
            var product = service.GetProductByBarcode("123");
            Assert.NotEmpty(product.Instructions);
        }
    }
}
