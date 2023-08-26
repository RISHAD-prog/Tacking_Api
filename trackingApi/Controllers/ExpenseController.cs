﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using trackingApi.Data;
using trackingApi.Model;

namespace trackingApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExpenseController : ControllerBase
    {
        private readonly CategoryApiDbContext categoryApiDbContext;

        public ExpenseController(CategoryApiDbContext categoryApiDbContext)
        {
            this.categoryApiDbContext = categoryApiDbContext;
        }

        [HttpGet]
        [Route("{id:guid}")]
        public async Task<IActionResult> GetExpense([FromRoute] Guid id)
        {
            var AllData = await categoryApiDbContext.Expenses.Where(x => x.CategoryId.Equals(id)).ToListAsync();
            return Ok(AllData);
        
        }

        [HttpPost]
        [Route("AddExpense/{id:guid}")]
        public async Task<IActionResult> AddExpense(Expense e, [FromRoute] Guid id)
        {
            var data = new Expense()
            {
                Id = e.Id,
                CategoryId = id,
                ExpenseAmount = e.ExpenseAmount,
                ExpenseDate = e.ExpenseDate
            };
            await categoryApiDbContext.Expenses.AddAsync(data);
            await categoryApiDbContext.SaveChangesAsync();

            return Ok(data);    
        }
    }
}