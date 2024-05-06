using Application.Common.ActionResult;
using Domain.Entities;
using FluentValidation;
using Infrastructure.Services.Base;
using MediatR;

namespace Application.Guests.Commands.AddGuest;

public record AddGuestCommand(string Name, bool IsCome, bool NeedTransfer, string Couple, long EventId) : IRequest<Result>;

public class AddGuestCommandValidator : AbstractValidator<AddGuestCommand>
{
    public AddGuestCommandValidator()
    {
        RuleFor(x=>x.Name).NotEmpty().WithName("Имя");
        RuleFor(x => x.Couple).NotEmpty().WithName("Имя партнёра");
        RuleFor(x => x.EventId).NotEmpty().WithName("Номер мероприятия");
    }
}

public class AddGuestCommandHandler(BaseServicePool baseServicePool) : IRequestHandler<AddGuestCommand, Result>
{
    public async Task<Result> Handle(AddGuestCommand request, CancellationToken cancellationToken)
    {
        var guest = new Guest {Name = request.Name, IsCome = request.IsCome, CoupleName = request.Couple, EventId = request.EventId, NeedTransfer = request.NeedTransfer};
        baseServicePool.DbContext.Guests.Add(guest);
        await baseServicePool.DbContext.SaveChangesAsync(cancellationToken);

        return Result.Success();
    }
}