using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.DB.Configurations;
public class EventConf : IEntityTypeConfiguration<Event>
{
    public void Configure(EntityTypeBuilder<Event> builder)
    {
        builder.HasKey(x => x.Id);

        builder
            .HasOne(x => x.Place)
            .WithMany(x => x.Events);

        builder
            .HasMany(x => x.Guests)
            .WithOne(x => x.Event);

        builder
            .HasOne(x => x.Photo)
            .WithOne(x => x.Event)
            .HasForeignKey<Event>(x => x.PhotoId);
    }
}
