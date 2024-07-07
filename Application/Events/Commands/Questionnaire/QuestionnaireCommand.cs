using Application.Common.ActionResult;
using Domain.Enums;
using FluentValidation;
using Infrastructure.Services.Base;
using MediatR;

namespace Application.Events.Commands.Questionnaire;

public record QuestionnaireCommand(long guestId, string? coupleName, string isCome, List<Alcohol> alcohols) : IRequest<Result>;

public class QuestionnaireCommandValidator : AbstractValidator<QuestionnaireCommand>
{
    public QuestionnaireCommandValidator()
    {
        RuleFor(x => x.alcohols).NotEmpty().WithName("Алкоголь");
        RuleFor(x => x.isCome).NotEmpty().WithName("Статус");
    }
}

public class QuestionnaireCommandHandler(BaseServicePool baseServicePool) : IRequestHandler<QuestionnaireCommand, Result>
{
    public async Task<Result> Handle(QuestionnaireCommand request, CancellationToken cancellationToken)
    {
        var currentGuest = baseServicePool.DbContext.Guests
            .FirstOrDefault(x=>x.Id == request.guestId);

        if (currentGuest == null)
        {
            return Result.Invalid().WithMessage("Гость не найден");
        }

        bool isCome = false;
        string? coupleName = null;

        if (request.isCome.Equals("solo"))
            isCome = true;
        else if (request.isCome.Equals("couple"))
        {
            isCome = true;
            coupleName = request.coupleName;
        }
        else if (request.isCome.Equals("false"))
            isCome= false;

        currentGuest.Alcohol = request.alcohols;
        currentGuest.CoupleName = coupleName;
        currentGuest.IsCome = isCome;
        await baseServicePool.DbContext.SaveChangesAsync(cancellationToken);

        return Result.Success();
    }
}