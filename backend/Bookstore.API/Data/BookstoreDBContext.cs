using Microsoft.EntityFrameworkCore;

namespace Bookstore.API.Data;

public class BookstoreDBContext : DbContext
{

    public BookstoreDBContext(DbContextOptions<BookstoreDBContext> options) : base(options)
    {
        
    }
    public DbSet<Book> Books { get; set; } 
    

}