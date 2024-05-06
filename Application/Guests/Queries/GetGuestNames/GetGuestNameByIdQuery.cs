using Application.Common.ActionResult;
using Application.DTO;
using FluentValidation;
using Infrastructure.Services.Base;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Guests.Queries.GetGuestNames;

public record GetGuestNameByIdQuery(long id) : IRequest<Result<GuestDto>>;

public class GetGuestNameByIdQueryValidator : AbstractValidator<GetGuestNameByIdQuery>
{
    public GetGuestNameByIdQueryValidator()
    {
        RuleFor(x => x.id).NotEmpty().WithName("Номер гостя");
    }
}

public class GetGuestNameByIdQueryHandler(BaseServicePool baseServicePool) : IRequestHandler<GetGuestNameByIdQuery, Result<GuestDto>>
{
    public async Task<Result<GuestDto>> Handle(GetGuestNameByIdQuery query, CancellationToken cancellationToken)
    {
        var result = await baseServicePool.DbContext.Guests
            .Select(x=> new GuestDto { Name = x.Name, Id = x.Id})
            .FirstAsync(x => x.Id == query.id, cancellationToken: cancellationToken);

        return Result<GuestDto>.Success(result);
    }
}
