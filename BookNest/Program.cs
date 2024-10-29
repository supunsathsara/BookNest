using System.Security.Claims;
using BookNest.Data;
using BookNest.model;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configure authentication and authorization
builder.Services.AddAuthentication().AddBearerToken(IdentityConstants.BearerScheme);
builder.Services.AddAuthorizationBuilder();

// Configure database context
builder.Services.AddDbContext<AppDbContext>(x => x.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

// Configure identity services
builder.Services.AddIdentityCore<User>()
    .AddEntityFrameworkStores<AppDbContext>()
    .AddApiEndpoints();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// Map identity API
app.MapIdentityApi<User>();

// Test endpoint to get the current user's name
app.MapGet("/hello", (ClaimsPrincipal user) => user.Identity!.Name).RequireAuthorization();

// Endpoint to create a new book
app.MapPost("/api/books", async (AppDbContext db, Book book, ClaimsPrincipal user) =>
{
    var userName = user.Identity?.Name;

    if (string.IsNullOrEmpty(userName))
    {
        return Results.Unauthorized();
    }

    // Set the CreatedBy property to the user's name
    book.CreatedBy = userName;

    db.Books.Add(book);
    await db.SaveChangesAsync();

    return Results.Created($"/api/books/{book.Id}", book);
}).RequireAuthorization();

// Endpoint to get books created by the current user
app.MapGet("/api/books", async (AppDbContext db, ClaimsPrincipal user) =>
{
    var userName = user.Identity?.Name;

    if (string.IsNullOrEmpty(userName))
    {
        return Results.Unauthorized();
    }

    var books = await db.Books.Where(b => b.CreatedBy == userName).ToListAsync();
    return Results.Ok(books);
}).RequireAuthorization();

// Endpoint to get a specific book by ID
app.MapGet("/api/books/{id}", async (int id, AppDbContext db, ClaimsPrincipal user) =>
{
    var userName = user.Identity?.Name;

    if (string.IsNullOrEmpty(userName))
    {
        return Results.Unauthorized();
    }

    var book = await db.Books.FindAsync(id);

    if (book == null || book.CreatedBy != userName)
    {
        return Results.NotFound();
    }

    return Results.Ok(book);
}).RequireAuthorization();

// Endpoint to update a book
app.MapPut("/api/books/{id}", async (int id, AppDbContext db, Book updatedBook, ClaimsPrincipal user) =>
{
    var userName = user.Identity?.Name;

    if (string.IsNullOrEmpty(userName))
    {
        return Results.Unauthorized();
    }

    var book = await db.Books.FindAsync(id);

    if (book == null || book.CreatedBy != userName)
    {
        return Results.NotFound();
    }

    // Update book properties
    book.Title = updatedBook.Title;
    book.Author = updatedBook.Author;
    book.Description = updatedBook.Description;

    await db.SaveChangesAsync();

    return Results.NoContent();
}).RequireAuthorization();

// Endpoint to delete a book
app.MapDelete("/api/books/{id}", async (int id, AppDbContext db, ClaimsPrincipal user) =>
{
    var userName = user.Identity?.Name;

    if (string.IsNullOrEmpty(userName))
    {
        return Results.Unauthorized();
    }

    var book = await db.Books.FindAsync(id);

    if (book == null || book.CreatedBy != userName)
    {
        return Results.NotFound();
    }

    db.Books.Remove(book);
    await db.SaveChangesAsync();

    return Results.NoContent();
}).RequireAuthorization();

app.Run();