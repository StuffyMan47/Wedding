using Domain.Common;

namespace Domain.Entities;
public class CoupleGuests: BaseEntity
{
    public required string MaleName { get; set; }
    public required string WomanName { get; set;}
    public bool HeIsCome { get; set;}
    public bool SheIsCome { get; set;}
    public bool NeedTransfer { get; set; }
}

