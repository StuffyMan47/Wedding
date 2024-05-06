using Application.Common.ActionResult;
using Application.Common.ActionResult.Enum;
using Application.Common.Exceptions;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Wedding.Server.Extensions;
using Wedding.Server.Swagger;

namespace Wedding.Server.Controllers.Base;
/// <summary>
/// Base api controller
/// </summary>
[ApiController]
[Route("api/[controller]")]
[ApiExplorerSettings(GroupName = SwaggerBuilder.MainGroupName)]
public abstract class BaseApiController(IMediator mediator) : ControllerBase
{
    /// <summary>
    /// Mediator sender
    /// </summary>
    protected IMediator Mediator { get; } = mediator;

    protected IActionResult FromResult(Result result)
    {
        return result.Type switch
        {
            ResultType.Success => Ok(),
            ResultType.Unauthorized => Unauthorized(result.PackAsApiResponse()),
            ResultType.PermissionDenied => StatusCode(StatusCodes.Status403Forbidden, result.PackAsApiResponse()),
            ResultType.NotFound => BadRequest(result.PackAsApiResponse()),
            ResultType.Invalid => BadRequest(result.PackAsApiResponse()),
            _ => throw new InternalServerException(
                $"{Enum.GetName(typeof(ResultType), result.Type)} result type not implemented for transform to api response"
            )
        };
    }

    protected IActionResult FromResult<T>(Result<T> result)
    {
        if (result.IsPaginated)
        {
            return result.Type switch
            {
                ResultType.Success => Ok(result.PackAsPaginatedApiResponse()),
                ResultType.Unauthorized => Unauthorized(result.PackAsPaginatedApiResponse()),
                ResultType.PermissionDenied => StatusCode(StatusCodes.Status403Forbidden, result.PackAsPaginatedApiResponse()),
                ResultType.NotFound => BadRequest(result.PackAsPaginatedApiResponse()),
                ResultType.Invalid => BadRequest(result.PackAsPaginatedApiResponse()),
                _ => throw new InternalServerException(
                    $"{Enum.GetName(typeof(ResultType), result.Type)} result type not implemented for transform to api response"
                )
            };
        }
        return result.Type switch
        {
            ResultType.Success => Ok(result.PackAsApiResponse()),
            ResultType.Unauthorized => Unauthorized(result.PackAsApiResponse()),
            ResultType.PermissionDenied => StatusCode(StatusCodes.Status403Forbidden, result.PackAsApiResponse()),
            ResultType.NotFound => BadRequest(result.PackAsApiResponse()),
            ResultType.Invalid => BadRequest(result.PackAsApiResponse()),
            _ => throw new InternalServerException(
                $"{Enum.GetName(typeof(ResultType), result.Type)} result type not implemented for transform to api response"
            )
        };
    }
}

