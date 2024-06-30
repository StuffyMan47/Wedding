using Application.Common.ActionResult;
using Application.DTO;
using Infrastructure.Services.Base;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Events.Queries.GetEvent;

public record GetEventsListQuery : IRequest<Result<List<EventDto>>>;

public class GetEventsListQueryHandler(BaseServicePool baseServicePool) : IRequestHandler<GetEventsListQuery, Result<List<EventDto>>>
{
    public async Task<Result<List<EventDto>>> Handle(GetEventsListQuery request, CancellationToken cancellationToken) 
    {
        var result = await baseServicePool.DbContext.Events
            .Select(x => new EventDto
            { Date = x.Date, 
                Description = x.Description, 
                Newlyweds = x.Newlyweds, 
                WelcomeSpeech = x.WelcomeSpeech,
            })
            .ToListAsync(cancellationToken);

        return Result<List<EventDto>>.Success(result);
    }
}
