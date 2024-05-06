using Infrastructure.Configuration;
using Infrastructure.Services.Base;
using Mapster;
using MapsterMapper;
using MediatR;
using Microsoft.Extensions.DependencyInjection;
using System.Reflection;

namespace Application;

public static class DependencyInjection
{
    public static IServiceCollection AddApplication(this IServiceCollection services)
    {
        services.AddSingleton(GetConfiguredMappingConfig());
        services.AddMediatR(c => c.RegisterServicesFromAssembly(typeof(DependencyInjection).Assembly));
        services.AddSingleton<AppConfig>();
        services.AddScoped<BaseServicePool>();
        return services;
    }

    private static TypeAdapterConfig GetConfiguredMappingConfig()
    {
        var config = TypeAdapterConfig.GlobalSettings;

        IList<IRegister> registers = config.Scan(Assembly.GetExecutingAssembly());

        config.Apply(registers);

        return config;
    }
}
