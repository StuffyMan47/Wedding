using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.DB.Configurations;

public class PhotoConf : IEntityTypeConfiguration<Photo>
{
    public void Configure(EntityTypeBuilder<Photo> builder)
    {
        builder.HasKey(x => x.Id);

        builder
            .HasOne(x => x.Event)
            .WithOne(x => x.Photo)
            .HasForeignKey<Photo>(x => x.EventId);
    }
}
