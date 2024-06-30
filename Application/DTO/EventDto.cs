using Domain.Entities;

namespace Application.DTO;

public class EventDto
{
    public DateTime Date { get; set; }
    public string WelcomeSpeech { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Newlyweds { get; set; } = string.Empty;
}
