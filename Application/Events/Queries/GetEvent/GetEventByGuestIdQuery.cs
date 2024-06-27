using Application.Common.ActionResult;
using Application.DTO;
using Infrastructure.Services.Base;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Events.Queries.GetEvent;

public record GetEventByGuestIdQuery(long id) : IRequest<Result<EventDto>>;

public class GetEventByGuestIdQueryHandler(BaseServicePool baseServicePool) : IRequestHandler<GetEventByGuestIdQuery, Result<EventDto>>
{
    public async Task<Result<EventDto>> Handle(GetEventByGuestIdQuery request, CancellationToken cancellationToken) 
    {
        var result = await baseServicePool.DbContext.Guests
            .Where(x=>x.Id==request.id)
            .Select(x => new EventDto {
                Date = x.Event.Date,
                Description = x.Event.Description,
                Newlyweds = x.Event.Newlyweds,
                PlaseInfo = new PlaceDto
                {
                    Address = x.Event.Place.Address,
                    Name = x.Event.Place.Name,
                    URL = x.Event.Place.URL,
                    Longitude = x.Event.Place.Longitude,
                    Width = x.Event.Place.Width
                }
            }).FirstOrDefaultAsync();
        return Result<EventDto>.Success(result);
    }
}
