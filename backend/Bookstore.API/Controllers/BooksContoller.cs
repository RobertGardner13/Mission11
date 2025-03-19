using Bookstore.API.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;

namespace Bookstore.API.Controllers
{
    [Route("[controller]")]
    [ApiController]

    
    public class BooksController : ControllerBase
    {
        private BookstoreDBContext _booksContext;
        public BooksController(BookstoreDBContext temp)
        {
            _booksContext = temp;
        }
        
        [HttpGet]
        public IEnumerable<Book> GetBooks()
        {
            var something = _booksContext.Books.ToList();
            
            return something;
        }
    }
}


