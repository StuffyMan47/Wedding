using Application.Common.ActionResult;
using Application.DTO;
using Infrastructure.Services.Base;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Schedules.Queries;

public record GetScheduleListQuery(long eventId) : IRequest<Result<List<ScheduleDto>>>;

public class GetScheduleListQueryHandler(BaseServicePool baseServicePool) : IRequestHandler<GetScheduleListQuery, Result<List<ScheduleDto>>>
{
    public async Task<Result<List<ScheduleDto>>> Handle(GetScheduleListQuery request, CancellationToken cancellationToken)
    {
        var result = await baseServicePool.DbContext.Schedule
            .Where(x => x.Event.Id == request.eventId)
            .Select(x => new ScheduleDto { Name = x.Name, Time = x.Time })
            .ToListAsync();
        return Result<List<ScheduleDto>>.Success(result);
    }
}