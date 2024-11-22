using Microsoft.EntityFrameworkCore;
using ViniciusMiranda.Models;

namespace ViniciusMiranda.Data;
public class AppDbContext : DbContext
{
    public string DbPath { get; }
    public DbSet<ToDo> ToDos { get; set; }
    public DbSet<Category> Categories { get; set; }


    public AppDbContext()
    {
        var folder = Environment.SpecialFolder.LocalApplicationData;
        var path = Environment.GetFolderPath(folder);
        DbPath = System.IO.Path.Join(path, "viniciusmiranda.db");
    }

    // The following configures EF to create a Sqlite database file in the
    // special "local" folder for your platform.
    protected override void OnConfiguring(DbContextOptionsBuilder options)
        => options.UseSqlite($"Data Source={DbPath}");
}
