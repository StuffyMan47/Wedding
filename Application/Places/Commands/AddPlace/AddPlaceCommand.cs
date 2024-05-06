using Application.Common.ActionResult;
using Domain.Entities;
using FluentValidation;
using Infrastructure.Services.Base;
using MediatR;

namespace Application.Places.Commands.AddPlace;

public record AddPlaceCommand(string Name, string Url, string Address, long OwnerId) : IRequest<Result>;

public class AddPlaceCommandValidator : AbstractValidator<AddPlaceCommand>
{
    public AddPlaceCommandValidator()
    {
        RuleFor(x => x.Name).NotEmpty().WithName("Названия места");
        RuleFor(x => x.Url).NotEmpty().WithName("Ссылка");
        RuleFor(x => x.Address).NotEmpty().WithName("Адрес");
    }
}

public class AddPlaceCommandHandler(BaseServicePool baseServicePool) : IRequestHandler<AddPlaceCommand, Result>
{
    public async Task<Result> Handle(AddPlaceCommand request, CancellationToken cancellationToken)
    {
        var guest = new Place { Name = request.Name, Address = request.Address, URL = request.Url, OwnerId = request.OwnerId };
        baseServicePool.DbContext.Places.Add(guest);
        await baseServicePool.DbContext.SaveChangesAsync(cancellationToken);

        return Result.Success();
    }
}