using Application.Common.ActionResult;
using Application.DTO;
using FluentValidation;
using Infrastructure.Services.Base;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Places.Queries;

public record GetPlaceByIdQuery(long id) : IRequest<Result<PlaceDto>>;
public class GetPlaceByIdQueryValidator : AbstractValidator<GetPlaceByIdQuery>
{
    public GetPlaceByIdQueryValidator()
    {
        RuleFor(x => x.id).NotEmpty().WithName("Номер гостя");
    }
}

public class GetPlaceByIdQueryHandler(BaseServicePool baseServicePool) : IRequestHandler<GetPlaceByIdQuery, Result<PlaceDto>>
{
    public async Task<Result<PlaceDto>> Handle(GetPlaceByIdQuery query, CancellationToken cancellationToken)
    {
        var result = await baseServicePool.DbContext.Places
            .Where(x=>x.OwnerId == query.id)
            .Select(x => new PlaceDto { Address = x.Address, Name = x.Name, URL = x.URL, Longitude = x.Longitude, Width = x.Width })
            .FirstAsync(cancellationToken: cancellationToken);

        return Result<PlaceDto>.Success(result);
    }
}