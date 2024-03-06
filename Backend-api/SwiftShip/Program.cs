using SwiftShip.Repository;
using SwiftShip.Repository.Interfaces;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

using SwiftShip.Services;
using System.Text;
using System.Text.Unicode;

var builder = WebApplication.CreateBuilder(args);

var config = builder.Configuration;
// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidIssuer = config["Jwt:Issuer"],
        ValidAudience = config["Jwt:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["Jwt:Key"]))

    };
});
builder.Services.AddSwaggerGen();
builder.Services.AddTransient<courierservice>();
builder.Services.AddScoped<Icourier, courier>();
builder.Services.AddScoped<Icourierservice, courierservice>();

builder.Services.AddCors((o) =>
{
    o.AddPolicy("AllowOrigin", builder =>
    {


        builder.WithOrigins("http://localhost:4200").AllowAnyHeader().AllowAnyMethod();
});
});


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseAuthentication();

app.UseHttpsRedirection();

app.UseAuthorization();
app.UseCors("AllowOrigin");
app.MapControllers();

app.Run();
