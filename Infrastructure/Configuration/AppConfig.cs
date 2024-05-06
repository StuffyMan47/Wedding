using Microsoft.Extensions.Configuration;

namespace Infrastructure.Configuration;

public class AppConfig
{
    public string Name { get; }

    public AppConfig(IConfiguration configuration)
    {
        var applicationSection = configuration.GetSection("Application");
        Name = applicationSection["Name"]!;
    }
}
