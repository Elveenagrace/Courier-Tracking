using Microsoft.Extensions.DependencyInjection;

public class startup
{
    public void ConfigureServices(IServiceCollection services)
    {
        services.AddCors(options =>
        {
            options.AddPolicy("AllowOrigin",
                builder =>
                {
                    builder.WithOrigins("http://localhost:51306")
                           .AllowAnyHeader()
                           .AllowAnyMethod();
                });
        });

        // Other service configurations
    }

    public void Configure(IApplicationBuilder app)
    {
        app.UseCors("AllowOrigin");

        // Other middleware configurations
    }
}
