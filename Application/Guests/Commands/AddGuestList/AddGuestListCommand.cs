using Application.Common.ActionResult;
using Domain.Entities;
using Domain.Enums;
using Infrastructure.Services.Base;
using MediatR;

namespace Application.Guests.Commands.AddGuestList;

public record GuestRequestModel(string Name, string? CoupleName, long EventId, long OwnerId, MessageType MessageType);
public record AddGuestListCommand(List<GuestRequestModel> Guests) : IRequest<Result>;

public class AddGuestListCommandHandler(BaseServicePool baseServicePool) : IRequestHandler<AddGuestListCommand, Result>
{
    public async Task<Result> Handle(AddGuestListCommand request, CancellationToken cancellationToken)
    {
        var guestModel = new List<Guest>();

        foreach (var guest in request.Guests)
        {
            guestModel.Add(new Guest
            {
                Name = guest.Name,
                CoupleName = guest.CoupleName,
                EventId = guest.EventId,
                OwnerId = guest.OwnerId,
                MessageType = guest.MessageType,
            });
        }

        baseServicePool.DbContext.Guests.AddRange(guestModel);
        await baseServicePool.DbContext.SaveChangesAsync(cancellationToken);

        return Result.Success();
    }
}