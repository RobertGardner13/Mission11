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
        public IActionResult GetBooks(int pageSize = 5, int pageNum = 1, string sortOrder = "asc",
            [FromQuery] List<string>? bookTypes = null)
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

        [HttpPost("AddBook")]
        public IActionResult AddBook([FromBody] Book newBook)
        {
            _booksContext.Books.Add(newBook);
            _booksContext.SaveChanges();
            return Ok();
        }

        [HttpPut("UpdateBook/{bookId}")]
        public IActionResult UpdateBook(int bookId, [FromBody] Book updatedBook)
        {
            var existingBook = _booksContext.Books.Find(bookId);

            existingBook.Title = updatedBook.Title;
            existingBook.Author = updatedBook.Author;
            existingBook.Publisher = updatedBook.Publisher;
            existingBook.ISBN = updatedBook.ISBN;
            existingBook.Classification = updatedBook.Classification;
            existingBook.Category = updatedBook.Category;
            existingBook.PageCount = updatedBook.PageCount;
            existingBook.Price = updatedBook.Price;

            _booksContext.Books.Update(existingBook);
            _booksContext.SaveChanges();

            return Ok(existingBook);



        }
        
        
        [HttpDelete("DeleteBook/{bookId}")]
        public IActionResult DeleteBook(int bookId)
        {
            var book = _booksContext.Books.Find(bookId);

            if (book == null)
            {
                return NotFound( new {mesage = "Book not found"});
                
            }
            
            _booksContext.Books.Remove(book);
            _booksContext.SaveChanges();

            return NoContent();

        }
    }
}


 
