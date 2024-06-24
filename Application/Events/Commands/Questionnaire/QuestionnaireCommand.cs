using Application.Common.ActionResult;
using Domain.Enums;
using FluentValidation;
using Infrastructure.Services.Base;
using MediatR;

namespace Application.Events.Commands.Questionnaire;

public record QuestionnaireCommand(long guestId, string? coupleName, bool isCome, List<Alcohol> alcohols) : IRequest<Result>;

public class QuestionnaireCommandValidator : AbstractValidator<QuestionnaireCommand>
{
    public QuestionnaireCommandValidator()
    {
        RuleFor(x => x.alcohols).NotEmpty().WithName("Алкоголь");
        RuleFor(x => x.isCome).NotEmpty().WithName("Место проведения");
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

        currentGuest.Alcohol = request.alcohols;
        currentGuest.CoupleName = request.coupleName;
        currentGuest.IsCome = request.isCome;
        await baseServicePool.DbContext.SaveChangesAsync(cancellationToken);

        return Result.Success();
    }
}