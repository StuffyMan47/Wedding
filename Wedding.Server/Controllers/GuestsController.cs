using Application.DTO;
using Application.Guests.Commands.AddGuest;
using Application.Guests.Queries.GetGuestNames;
using Application.Places.Queries;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Wedding.Server.Controllers.Base;
using Wedding.Server.Models;

namespace Wedding.Server.Controllers
{
    public class GuestsController(IMediator mediator) : BaseApiController(mediator)
    {
        [HttpGet("get-current-guest")]
        [ProducesResponseType(typeof(BaseApiResponseModel<GuestDto>), 200)]
        public async Task<IActionResult> GetName(long id) 
        {
            var result = await Mediator.Send(new GetGuestNameByIdQuery(id));
            return FromResult(result);
        }

        [HttpGet("get-guest-list")]
        [ProducesResponseType(typeof(BaseApiResponseModel<List<GuestDto>>), 200)]
        public async Task<IActionResult> GetGuestList()
        {
            var result = await Mediator.Send(new GetGuestNameQuery());
            return FromResult(result);
        }

        [HttpPost("add-guest")]
        [ProducesResponseType(typeof(ApiResponseModel), 200)]
        public async Task<IActionResult> AddGuest(AddGuestCommand request)
        {
            var result = await Mediator.Send(request);
            return FromResult(result);
        }
    }
}
