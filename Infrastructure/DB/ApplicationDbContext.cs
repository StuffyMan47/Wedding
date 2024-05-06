using Domain.Entities;
using Infrastructure.DB.Configurations;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.DB;
public class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : DbContext(options)
{

    public DbSet<Event> Events { get; set; }
    public DbSet<Guest> Guests { get; set; }
    public DbSet<Place> Places { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfiguration(new EventConf());
        modelBuilder.ApplyConfiguration(new PlaceConf());
        modelBuilder.ApplyConfiguration(new GuestConf());
        base.OnModelCreating(modelBuilder);
    }
}
