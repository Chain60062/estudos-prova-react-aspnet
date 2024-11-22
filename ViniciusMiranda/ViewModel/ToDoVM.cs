public record ToDoVM
{
    public string Title { get; set; }
    public string Description { get; set; }
    public string Status { get; set; }

    public int CategoryId { get; set; }
}