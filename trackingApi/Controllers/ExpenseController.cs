﻿using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
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
        public async Task<IActionResult> AddExpense(AddExpense ex)
        {

            var data = new Expense()
            {
                Id = Guid.NewGuid(),
                CategoryId = ex.CategoryId,
                ExpenseAmount = ex.ExpenseAmount,
                ExpenseDate = ex.ExpenseDate
            };
            await categoryApiDbContext.Expenses.AddAsync(data);
            await categoryApiDbContext.SaveChangesAsync();

            return Ok(data);

        }

        [HttpPut]
        [Route("{id:guid}")]
        public async Task<IActionResult> UpdateExpense(UpdateExpense ex, [FromRoute] Guid id)
        {
            var existingData = await categoryApiDbContext.Expenses.FindAsync(id);
            if(existingData != null)
            {

                existingData.ExpenseAmount = ex.ExpenseAmount;
                existingData.ExpenseDate = ex.ExpenseDate;
                await categoryApiDbContext.Expenses.AddAsync(existingData);
                await categoryApiDbContext.SaveChangesAsync();

                return Ok(existingData);
            }

            return NotFound();

        }

        [HttpDelete]
        [Route("{id:guid}")]
        public async Task<IActionResult> DeleteExpense([FromRoute] Guid id)
        {
            var existingData = await categoryApiDbContext.Expenses.FindAsync(id);
            if (existingData != null)
            {
                categoryApiDbContext.Remove(existingData);
                return Ok("Expense from category is deleted");
            }

            return NotFound();

        }
    }
}
