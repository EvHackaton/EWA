using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace EWA.Domain
{
    public static class ValidationHelper
    {
        public static void ValidateContract(object instance)
        {
            if (instance == null)
            {
                throw new ArgumentNullException(nameof(instance));
            }

            var result = new List<ValidationResult>();
            var context = new ValidationContext(instance);
            if (!Validator.TryValidateObject(instance, context, result))
            {
                throw new InvalidOperationException(string.Join(Environment.NewLine, result.Select(r => r.ErrorMessage)));
            }
        }
    }
}
