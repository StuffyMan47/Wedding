using Domain.Entities;

namespace Application.DTO;

public class EventDto
{
    public DateTime Date { get; set; }
    public string Description { get; set; } = string.Empty;
    public string Newlyweds { get; set; } = string.Empty;
    public PlaceDto? PlaseInfo { get; set; } 
}
