using Microsoft.OpenApi.Models;
using System.Reflection;
using MicroElements.Swashbuckle.FluentValidation.AspNetCore;

namespace Wedding.Server.Swagger;

public static class SwaggerBuilder
{
    public const string ApplicationTitle = "Wedding";
    public const string MainGroupName = "main";

    public static IServiceCollection AddSwaggerBuilder(this IServiceCollection services)
    {

        services.AddFluentValidationRulesToSwagger();

        services.AddSwaggerGen(setup =>
        {

            setup.SwaggerDoc(
                MainGroupName,
                new()
                {
                    Title = ApplicationTitle,
                    Version = MainGroupName
                }
            );
            //setup.AddSecurityDefinition("Bearer", new()
            //{
            //    Description = "JWT Authorization header using the Bearer scheme. Example: \"Authorization: Bearer {token}\"",
            //    Name = "Authorization",
            //    In = ParameterLocation.Cookie,
            //    Type = SecuritySchemeType.Http,
            //    BearerFormat = "JWT",
            //    Scheme = "Bearer"
            //});
            //setup.AddSecurityRequirement(new()
            //{
            //    {
            //        new()
            //        {
            //            Reference = new()
            //            {
            //                Type = ReferenceType.SecurityScheme,
            //                Id = "Bearer"
            //            }
            //        },
            //        Array.Empty<string>()
            //    }
            //});
        });

        return services;
    }

    public static IApplicationBuilder UseSwaggerBuilder(this IApplicationBuilder app, IWebHostEnvironment environment)
    {
        app.UseSwagger();
        app.UseSwaggerUI(c =>
        {
            c.SwaggerEndpoint($"/swagger/{MainGroupName}/swagger.json", MainGroupName);
        });

        return app;
    }
}
