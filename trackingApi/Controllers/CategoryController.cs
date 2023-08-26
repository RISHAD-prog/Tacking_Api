using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using trackingApi.Data;
using trackingApi.Model;

namespace trackingApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    
    public class CategoryController : ControllerBase
    {
        private readonly CategoryApiDbContext dbContext;
        public CategoryController(CategoryApiDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet]
        public async Task<IActionResult> GetCategory()
        {
            return Ok(await dbContext.Catrgories.ToListAsync());
        }

        [HttpPost]
        public async Task<IActionResult> AddCategory(AddCategory category)
        {
            var c = new Category()
            {
                Id = Guid.NewGuid(),
                CategoryName = category.CategoryName
            };

            await dbContext.Catrgories.AddAsync(c);
            await dbContext.SaveChangesAsync();

            return Ok(c);
        }

        /*[HttpGet]
        [Route("{id:guid}")]
        public async Task<IActionResult> GetCategory([FromRoute] Guid id)
        {
            var data = await dbContext.Catrgories.FindAsync(id);

            if(data == null)
            {
                return NotFound();
            }
            return Ok(data);
        }*/
    }
}
