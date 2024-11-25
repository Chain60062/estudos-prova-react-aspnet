using static Microsoft.AspNetCore.Http.Results;
using ViniciusMiranda.Data;
using ViniciusMiranda.Models;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<AppDbContext>();
builder.Services.AddCors(
    options =>
        options.AddPolicy("acessototal",
            configs => configs
                .AllowAnyOrigin()
                .AllowAnyHeader()
                .AllowAnyMethod())
);
builder.Services.ConfigureHttpJsonOptions(options =>
{
    options.SerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles;
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.MapPost("/api/categoria/cadastrar", async (AppDbContext db, CategoryVM category) =>
{
    var newCategory = new Category()
    {
        Description = category.Description,
        Name = category.Name
    };
    await db.AddAsync(newCategory);
    await db.SaveChangesAsync();

    Created();
});

app.MapGet("/api/categoria/listar", async (AppDbContext db) =>
{
    return Ok(await db.Categories.ToListAsync());
});

app.MapPost("/api/tarefa/cadastrar", async (AppDbContext db, ToDoVM toDo) =>
{
    var newToDo = new ToDo()
    {
        Description = toDo.Description,
        Status = "Não iniciada",
        Title = toDo.Title,
        CategoryId = toDo.CategoryId
    };
    await db.AddAsync(newToDo);
    await db.SaveChangesAsync();

    Created();
});

app.MapGet("/api/tarefa/listar", async (AppDbContext db) =>
{
    return Ok(await db.ToDos.Include(t => t.Category).ToListAsync());
});

app.MapPatch("/api/tarefa/alterar/{id}", async (long id, AppDbContext dbContext) =>
{
    var tarefa = await dbContext.ToDos.FindAsync(id);
    if (tarefa == null)
    {
        return NotFound($"Tarefa com Id {id} não encontrada.");
    }
    tarefa.Status = tarefa.Status switch
    {
        "Não iniciada" => "Em andamento",
        "Em andamento" => "Concluída",
        _ => tarefa.Status
    };

    // Salva as alterações
    await dbContext.SaveChangesAsync();

    return Ok(tarefa);
});

app.MapGet("/api/tarefa/naoconcluidas", async (AppDbContext db) =>
{
    string[] statusNotCompleted = { "Em andamento", "Não iniciada" };

    var pendingToDos = await db.ToDos
        .Where(t => statusNotCompleted
            .Select(s => s.ToLower())
            .Contains(t.Status.ToLower()))
        .ToListAsync();

    return Ok(pendingToDos);
});

app.MapGet("/api/tarefa/concluidas", async (AppDbContext db) =>
{
    var completedToDos = await db.ToDos
        .Where(t => t.Status.ToLower() == "concluída".ToLower())
        .ToListAsync();

    return Ok(completedToDos);
});

app.UseCors("acessototal");
await app.RunAsync();