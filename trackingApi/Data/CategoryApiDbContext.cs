using Microsoft.EntityFrameworkCore;
using trackingApi.Model;

namespace trackingApi.Data
{
    public class CategoryApiDbContext : DbContext
    {
        public CategoryApiDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Category> Catrgories { get; set; }
        public DbSet<Expense> Expenses { get; set; }

    }
}
