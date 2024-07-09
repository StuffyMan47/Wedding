using Application;
using Infrastructure;
using Infrastructure.DB;
using Infrastructure.Services.Base;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using System.Reflection;
using Wedding.Server.Swagger;

namespace Wedding.Server
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddControllers();
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerBuilder();
            builder.Services.AddCors(options =>
            {
                options.AddDefaultPolicy(policy =>
                {
                    policy.AllowAnyOrigin();
                    //policy.WithOrigins("https://localhost:5173");
                    policy.AllowAnyHeader();
                    policy.AllowAnyMethod();
                });
            });

            //builder.Services.AddDbContext<ApplicationDbContext>(
            //    options =>
            //    {
            //        options.UseNpgsql(builder.Configuration.GetConnectionString("DBConnectionString"));
            //    });


            builder.Services.AddApplication();
            builder.Services.AddDataAccessLayer(builder.Configuration);

            var app = builder.Build();

            using var scope = app.Services.CreateScope();
            using var dbContext = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
            dbContext.Database.EnsureCreated();

            app.UseCors();

            app.UseDefaultFiles();
            app.UseStaticFiles();

            // Configure the HTTP request pipeline.
            app.UseSwaggerBuilder(app.Environment);

            app.UseHttpsRedirection();

            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}
