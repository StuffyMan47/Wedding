using Application.Common.ActionResult;
using Application.DTO;
using Infrastructure.Services.Base;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Guests.Queries.GetGuestNames;

public record GetGuestNameQuery() : IRequest<Result<List<GuestDto>>>;

public class GetGuestNameQueryHandler(BaseServicePool baseServicePool) : IRequestHandler<GetGuestNameQuery, Result<List<GuestDto>>>
{
    public async Task<Result<List<GuestDto>>> Handle(GetGuestNameQuery request, CancellationToken cancellationToken) 
    {
        var result = await baseServicePool.DbContext.Guests
            .Select(x => new GuestDto { Id = x.Id, Name = x.Name, CoupleName = x.CoupleName, isCome = x.IsCome})
            .ToListAsync(cancellationToken);

        return Result<List<GuestDto>>.Success(result);
    }
}
