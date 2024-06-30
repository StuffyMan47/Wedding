namespace Application.DTO;

public class ScheduleDto
{
    public required string Name { get; set; }
    public TimeOnly Time { get; set; }
}
