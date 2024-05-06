using Domain.Common;

namespace Domain.Entities;
public class Guest: BaseEntity
{
    public required string Name { get; set; }
    public bool IsCome { get; set; }
    public bool NeedTransfer {  get; set; }
    public string? CoupleName { get; set; }
    public long EventId { get; set; }

    public Event Event { get; set; }
}

