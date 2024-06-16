using Domain.Common;

namespace Domain.Entities;

public class Photo : BaseEntity
{
    public required string FileName { get; set; }

    public long EventId { get; set; }
    public Event Event { get; set; }
}
