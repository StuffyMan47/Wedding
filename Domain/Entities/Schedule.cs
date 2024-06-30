using Domain.Common;

namespace Domain.Entities;

public class Schedule : BaseEntity
{
    public required string Name { get; set; }
    public TimeOnly Time { get; set; }

    public Event Event { get; set; }
}
