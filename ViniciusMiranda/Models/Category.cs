namespace ViniciusMiranda.Models;

public class Category
{
    public long Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }

    public List<ToDo> ToDos { get; set; } = new List<ToDo>();
}
