using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace EWA.Domain
{    
    public class RecyclableProductDatabase
    {
        public List<RecyclableProductEntity> Product { get; set; }

        public List<RecyclableCategoryEntity> Category { get; set; }

        public List<RecyclingInstructionEntity> Instruction { get; set; }

        public RecyclableProductDatabase()
        {
            Product = new List<RecyclableProductEntity>();
            Category = new List<RecyclableCategoryEntity>();
            Instruction = new List<RecyclingInstructionEntity>();
        }

        private static void ValidateCollections<T>(ICollection<T> collection, string name)
        {
            if(collection.Count == 0)
            {
                throw new ArgumentException(name);
            }
            foreach(T val in collection)
            {
                ValidationHelper.ValidateContract(val);
            }
        }

        private void Validate()
        {
            ValidateCollections(Product, nameof(Product));
            ValidateCollections(Category, nameof(Category));
            ValidateCollections(Instruction, nameof(Instruction));
        }

        public static RecyclableProductDatabase FromResource(string resourceName)
        {
            var assembly = Assembly.GetExecutingAssembly();

            using (Stream stream = assembly.GetManifestResourceStream(resourceName))
            using (StreamReader reader = new StreamReader(stream))
            {
                string json = reader.ReadToEnd();
                var db = JsonConvert.DeserializeObject<RecyclableProductDatabase>(json);
                db.Validate();
                return db;
            }            
        }
    }
}
