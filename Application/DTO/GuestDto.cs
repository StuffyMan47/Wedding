using Domain.Enums;

namespace Application.DTO;

public class GuestDto
{
    public long Id { get; set; }
    public string? CoupleName { get; set; }
    public required string Name { get; set; }
    public bool isCome { get; set; }
    public MessageType MessageType { get; set; }
    public List<Alcohol> alcohols { get; set; } = [];
}
