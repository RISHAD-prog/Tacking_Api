using System.ComponentModel.DataAnnotations;

namespace trackingApi.Model
{
    public class Category
    {
        public Guid Id { get; set; }
        public string? CategoryName { get; set; }

        public virtual List<Expense> Expenses { get; set; }
        public Category()
        {
            this.Expenses = new List<Expense>();
        }
    }
}
