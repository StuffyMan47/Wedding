using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.DB.Configurations;
public class GuestConf : IEntityTypeConfiguration<Guest>
{
    public void Configure(EntityTypeBuilder<Guest> builder)
    {
        builder.HasKey(x => x.Id);

        builder.Property(x => x.Alcohol).HasConversion<List<int>>();

        builder
            .HasOne(x => x.Event)
            .WithMany(x => x.Guests);
    }
}
