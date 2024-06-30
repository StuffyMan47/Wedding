using Application.Common.ActionResult;
using Application.DTO;
using Domain.Entities;
using FluentValidation;
using Infrastructure.Services.Base;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Places.Queries;

public record GetPlaceByGuestIdQuery(long id) : IRequest<Result<PlaceDto>>;
public class GetPlaceByGuestIdQueryValidator : AbstractValidator<GetPlaceByGuestIdQuery>
{
    public GetPlaceByGuestIdQueryValidator()
    {
        RuleFor(x => x.id).NotEmpty().WithName("Номер гостя");
    }
}

public class GetPlaceByGuestIdQueryHandler(BaseServicePool baseServicePool) : IRequestHandler<GetPlaceByGuestIdQuery, Result<PlaceDto>>
{
    public async Task<Result<PlaceDto>> Handle(GetPlaceByGuestIdQuery query, CancellationToken cancellationToken)
    {
        var result = await baseServicePool.DbContext.Guests
            .Where(x=>x.Id == query.id)
            .Select(x => new PlaceDto 
            { 
                Address = x.Event.Place.Address, 
                Name = x.Event.Place.Name, 
                URL = x.Event.Place.URL, 
                Longitude = x.Event.Place.Longitude, 
                Width = x.Event.Place.Width 
            })
            .FirstAsync(cancellationToken: cancellationToken);

        return Result<PlaceDto>.Success(result);
    }
}