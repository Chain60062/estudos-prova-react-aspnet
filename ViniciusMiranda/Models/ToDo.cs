namespace ViniciusMiranda.Models;

public class ToDo
{
    public long Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public string Status { get; set; }
    public DateTime CreatedAt { get; set; }
    public long CategoryId { get; set; }
    public Category Category { get; set; }
}
