using Domain.Common;

namespace Domain.Entities;
public class Event: BaseEntity
{
    public DateTime Date { get; set; }
    public string Description { get; set; } = string.Empty;
    public string Newlyweds { get; set; } = string.Empty;
    public long PlaceId { get; set; }

    public long PhotoId {  get; set; }
    public Photo Photo {  get; set; }
    public List<Guest> Guests { get; set; } = [];
    public Place Place { get; set; }
}

