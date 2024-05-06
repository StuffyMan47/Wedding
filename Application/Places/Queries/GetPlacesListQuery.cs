using Application.Common.ActionResult;
using Application.DTO;
using Application.Places.Commands.AddPlace;
using Infrastructure.Services.Base;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Places.Queries;

public record GetPlacesListQuery() : IRequest<Result<List<PlaceDto>>>;

public class GetPlacesListQueryHandler(BaseServicePool baseServicePool) : IRequestHandler<GetPlacesListQuery, Result<List<PlaceDto>>>
{
    public async Task<Result<List<PlaceDto>>> Handle(GetPlacesListQuery request, CancellationToken cancellationToken)
    {
        var result = await baseServicePool.DbContext.Places
            .Select(x => new PlaceDto { Name = x.Name, Address = x.Address, URL = x.URL })
            .ToListAsync(cancellationToken);

        return Result<List<PlaceDto>>.Success(result);
    }
}