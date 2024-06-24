using Application.Common.ActionResult;
using Application.DTO;
using Application.Events.Commands.AddEvent;
using Application.Events.Commands.Questionnaire;
using Application.Events.Queries.GetEvent;
using Application.Guests.Commands.AddGuest;
using Application.Guests.Queries.GetGuestNames;
using Application.Photos.Queries.GetPhoto;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting;
using Wedding.Server.Controllers.Base;
using Wedding.Server.Models;

namespace Wedding.Server.Controllers;

public class EventsController(IMediator mediator) : BaseApiController(mediator)
{
    [HttpGet("get-current-event")]
    [ProducesResponseType(typeof(BaseApiResponseModel<EventDto>), 200)]
    public async Task<IActionResult> GetEvent(long id)
    {
        var result = await Mediator.Send(new GetEventByGuestIdQuery(id));
        return FromResult(result);
    }

    [HttpGet("get-events-list")]
    [ProducesResponseType(typeof(BaseApiResponseModel<List<EventDto>>), 200)]
    public async Task<IActionResult> GetEventsList()
    {
        var result = await Mediator.Send(new GetEventsListQuery());
        return FromResult(result);
    }

    [HttpPost("add-event")]
    [ProducesResponseType(typeof(ApiResponseModel), 200)]
    public async Task<IActionResult> AddEvent(AddEventCommand request)
    {
        var result = await Mediator.Send(request);
        return FromResult(result);
    }

    [HttpGet("get-photo")]
    [ProducesResponseType(typeof(BaseApiResponseModel<FileStreamResult>), 200)]
    public async Task<IActionResult> GetPhoto(long EventId)
    {
        var image = await Mediator.Send(new GetPhotoQuery(EventId));
        var result = File(image, "image/jpeg");
        return result;
    }

    [HttpPost("questionnaire")]
    [ProducesResponseType(typeof(BaseApiResponseModel<Result>), 200)]
    public async Task<IActionResult> Questionnaire(QuestionnaireCommand request)
    {
        var result = await Mediator.Send(request);
        return FromResult(result);
    }
}
