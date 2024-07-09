using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Infrastructure.DB;

namespace Infrastructure;
public static class DependencyInjection
{
    public static IServiceCollection AddDataAccessLayer(this IServiceCollection services, IConfiguration config)
    {
        services.AddAppDbContext(config);

        return services;
    }
    private static IServiceCollection AddAppDbContext(this IServiceCollection services, IConfiguration config)
    {
        string? dbConnectionString = config.GetConnectionString("DBConnectionString");
        return services.AddDbContext<ApplicationDbContext>(options =>
        {
            options.UseNpgsql(dbConnectionString, x => x
                .MigrationsAssembly(typeof(ApplicationDbContext).Assembly.ToString())
                .MigrationsHistoryTable("__EFMigrationsHistory", "public")
                );
        });
    }
}

