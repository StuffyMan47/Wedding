using Application.DTO;
using Application.Guests.Commands.AddGuest;
using Application.Guests.Queries.GetGuestNames;
using Application.Places.Commands.AddPlace;
using Application.Places.Queries;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Wedding.Server.Controllers.Base;
using Wedding.Server.Models;

namespace Wedding.Server.Controllers;

public class PlacesController(IMediator mediator) : BaseApiController(mediator)
{
    [HttpGet("{id:long}")]
    [ProducesResponseType(typeof(BaseApiResponseModel<PlaceDto>), 200)]
    public async Task<IActionResult> GetPlaceById(long id)
    {
        var result = await Mediator.Send(new GetPlaceByGuestIdQuery(id));
        return FromResult(result);
    }

    [HttpGet("get-current-place")]
    [ProducesResponseType(typeof(BaseApiResponseModel<PlaceDto>), 200)]
    public async Task<IActionResult> GetPlaceByGuestId(long id)
    {
        var result = await Mediator.Send(new GetPlaceByGuestIdQuery(id));
        return FromResult(result);
    }

    [HttpGet("get-place-list")]
    [ProducesResponseType(typeof(BaseApiResponseModel<List<PlaceDto>>), 200)]
    public async Task<IActionResult> GetPlaceList()
    {
        var result = await Mediator.Send(new GetPlacesListQuery());
        return FromResult(result);
    }

    [HttpPost("add-place")]
    [ProducesResponseType(typeof(ApiResponseModel), 200)]
    public async Task<IActionResult> AddPlace(AddPlaceCommand request)
    {
        var result = await Mediator.Send(request);
        return FromResult(result);
    }
}
