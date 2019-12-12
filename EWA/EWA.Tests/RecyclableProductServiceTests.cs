using EWA.Domain;
using System;
using System.Linq;
using Xunit;

namespace EWA.Tests
{
    public class RecyclableProductServiceTests
    {
        [Fact]
        public void HappyDay()
        {
            var service = new RecyclableProductService();
            var product = service.GetProductByBarcode("5900120016378");
            Assert.NotEmpty(product.Instructions.First().ItemName);
        }

        [Fact]
        public void FindMilk()
        {
            var service = new RecyclableProductService();
            var product = service.FindProduct("milk");
            Assert.NotEmpty(product.Instructions.First().ItemName);
            Assert.Equal("5900120016378", product.Code);
        }

        [Fact]
        public void TestAll()
        {
            var service = new RecyclableProductService();
            var product = service.GetProductByBarcode("5900120016378");
            Assert.NotEmpty(service.GetAllProducts().SelectMany(p => p.Instructions).Select(i => i.Category));
        }
    }
}
