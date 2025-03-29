using Bookstore.API.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

namespace Bookstore.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        private readonly BookstoreDBContext _booksContext;

        public BooksController(BookstoreDBContext temp)
        {
            _booksContext = temp;
        }

        [HttpGet]
        public IActionResult GetBooks(int pageSize = 5, int pageNum = 1, string sortOrder = "asc", [FromQuery] List<string>? bookTypes = null)
        {
            var query = _booksContext.Books.AsQueryable();

            if (bookTypes != null && bookTypes.Any())
            {
                query = query.Where(b => bookTypes.Contains(b.Category));
            }
            
            var totalNumberOfBooks = query.Count();

            HttpContext.Response.Cookies.Append("FavoriteCategory", "Action", new CookieOptions()
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.Strict,
                Expires = DateTime.Now.AddMinutes(1) 
            });

            // Apply sorting
            query = sortOrder.ToLower() == "desc" 
                ? query.OrderByDescending(b => b.Title) 
                : query.OrderBy(b => b.Title);

            // Get total filtered count before pagination
             

            var books = query
                .Skip((pageNum - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            return Ok(new
            {
                Books = books,
                TotalNumberOfBooks = totalNumberOfBooks
            });
        }

        [HttpGet("GetBookTypes")]
        public IActionResult GetBookCategories()
        {
            var bookCategories = _booksContext.Books
                .Select(b => b.Category)
                .Distinct()
                .ToList();

            return Ok(bookCategories);
        }
    }
}


 
