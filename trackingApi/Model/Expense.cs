namespace trackingApi.Model
{
    public class Expense
    {
        public int Id { get; set; }
        public Guid CategoryId { get; set; }
        public int ExpenseAmount { get; set; }
        public DateTime ExpenseDate { get; set; }

        public virtual Category? Categories { get; set; }

    }
}
