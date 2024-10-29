using System.Security.Claims;
using BookNest.Data;
using BookNest.model;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();



builder.Services.AddAuthentication().AddBearerToken(IdentityConstants.BearerScheme);
builder.Services.AddAuthorizationBuilder();
builder.Services.AddDbContext<AppDbContext>(x => x.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

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

app.MapIdentityApi<User>();

app.MapGet("/hello", (ClaimsPrincipal user) => user.Identity!.Name).RequireAuthorization();

app.MapPost("/api/books", async (AppDbContext db, Book book, ClaimsPrincipal user) =>
{
    // Retrieve the user's email from ClaimsPrincipal
    var userName = user.Identity?.Name;

    if (string.IsNullOrEmpty(userName))
    {
        return Results.Unauthorized();
    }

    // Set the CreatedBy property to the user's email or username
    book.CreatedBy = userName;

    db.Books.Add(book);
    await db.SaveChangesAsync();

    return Results.Created($"/api/books/{book.Id}", book);
}).RequireAuthorization();


app.Run();

