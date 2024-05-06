using Application.Common.ActionResult;
using Domain.Entities;
using FluentValidation;
using Infrastructure.Services.Base;
using MediatR;

namespace Application.Events.Commands.AddEvent;

public record AddEventCommand(DateTime Date, string Description, string Newlyweds, long PlaceId, long OwnerId) : IRequest<Result>;

public class AddEventCommandValidator : AbstractValidator<AddEventCommand>
{
    public AddEventCommandValidator()
    {
        RuleFor(x => x.Date).NotEmpty().WithName("Дата проведения мероприятия");
        RuleFor(x => x.PlaceId).NotEmpty().WithName("Место проведения");
    }
}

public class AddEventCommandHandler(BaseServicePool baseServicePool) : IRequestHandler<AddEventCommand, Result>
{
    public async Task<Result> Handle(AddEventCommand request, CancellationToken cancellationToken)
    {
        var guest = new Event {Date = request.Date, Description = request.Description, Newlyweds = request.Newlyweds, PlaceId = request.PlaceId, OwnerId = request.OwnerId};
        baseServicePool.DbContext.Events.Add(guest);
        await baseServicePool.DbContext.SaveChangesAsync(cancellationToken);

        return Result.Success();
    }
}