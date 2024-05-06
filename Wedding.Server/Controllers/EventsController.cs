using Application.DTO;
using Application.Events.Commands.AddEvent;
using Application.Events.Queries.GetEvent;
using Application.Guests.Commands.AddGuest;
using Application.Guests.Queries.GetGuestNames;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Wedding.Server.Controllers.Base;
using Wedding.Server.Models;

namespace Wedding.Server.Controllers;

public class EventsController(IMediator mediator) : BaseApiController(mediator)
{
    //[HttpGet("{id:long}")]
    //[ProducesResponseType(typeof(BaseApiResponseModel<EventDto>), 200)]
    //public async Task<IActionResult> GetEvent(long id)
    //{
    //    var result = await Mediator.Send(new GetGuestNameByIdQuery(id));
    //    return FromResult(result);
    //}

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
}
