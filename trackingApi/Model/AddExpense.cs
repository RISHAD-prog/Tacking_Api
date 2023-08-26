using System.ComponentModel.DataAnnotations.Schema;

namespace trackingApi.Model
{
    public class AddExpense
    {
        public Guid Id { get; set; }
        
        public Guid CategoryId { get; set; }
        public int ExpenseAmount { get; set; }
        public DateTime ExpenseDate { get; set; }
    }
}
