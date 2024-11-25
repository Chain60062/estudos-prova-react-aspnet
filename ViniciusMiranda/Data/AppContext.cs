using Microsoft.EntityFrameworkCore;
using ViniciusMiranda.Models;

namespace ViniciusMiranda.Data;
public class AppDbContext : DbContext
{
    public virtual string DbPath { get; }
    public virtual DbSet<ToDo> ToDos { get; set; }
    public virtual DbSet<Category> Categories { get; set; }

    public AppDbContext()
    {
        var directory = AppContext.BaseDirectory;// /bin/Debug/net8.0
        DbPath = Path.Join(directory, "viniciusmiranda.db");
    }
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseSqlite($"Data Source={DbPath}");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        var category1 = new Category
        {
            Id = 1,
            Name = "Casa",
            Description = "Afazeres Domésticos"
        };
        
        var category2 = new Category
        {
            Id = 2,
            Name = "Trabalho",
            Description = "Afazeres do trabalho"
        };

        modelBuilder.Entity<Category>().HasData(category1, category2);
    }
}
