//using System.Net.Http;
//using System;
//using Microsoft.Extensions.DependencyInjection;

//namespace Infrastructure;
//public static class DependencyInjection
//{
//    public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)//, IWebHostEnvironment environment)
//    {
//        var provider = configuration.GetValue("DbProvider", "SqlServer");
//        var migrationAssembly = $"CleanArchitecture.Infrastructure.{provider}";
//        services.AddDbContext<ApplicationDbContext>(options => _ = provider switch
//        {

//            "Npgsql" => options.UseNpgsql(
//                configuration.GetConnectionString("DefaultConnection_Postgres"),
//                b =>
//                {
//                    b.MigrationsAssembly(migrationAssembly);
//                }),

//            _ => throw new Exception($"Unsupported provider: {provider}")
//        });

//        services.AddScoped<IApplicationDbContext>(provider => provider.GetService<ApplicationDbContext>());

//        services.AddScoped<IDomainEventService, DomainEventService>();

//        services.AddDefaultIdentity<ApplicationUser>()
//            .AddRoles<IdentityRole>()
//            .AddEntityFrameworkStores<ApplicationDbContext>();

//        services.AddIdentityServer()
//            .AddApiAuthorization<ApplicationUser, ApplicationDbContext>();

//        services.AddHttpClient("open-weather-api", c =>
//        {
//            c.BaseAddress = new Uri(configuration.GetSection("OpenWeatherApi:Url").Value);

//            c.DefaultRequestHeaders.Add(configuration.GetSection("OpenWeatherApi:Key:Key").Value, configuration.GetSection("OpenWeatherApi:Key:Value").Value);

//            c.DefaultRequestHeaders.Add(configuration.GetSection("OpenWeatherApi:Host:Key").Value, configuration.GetSection("OpenWeatherApi:Host:Value").Value);
//        });

        
//        return services;
//    }
//}

