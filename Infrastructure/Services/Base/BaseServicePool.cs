using Infrastructure.Configuration;
using Infrastructure.DB;
using MediatR;
using System;

namespace Infrastructure.Services.Base;

public class BaseServicePool(
    AppConfig appConfig,
    ApplicationDbContext dbContext,
    //IUserContextProvider userContextProvider,
    IMediator mediator)
{
    public readonly AppConfig AppConfig = appConfig;
    public readonly ApplicationDbContext DbContext = dbContext;
    //public readonly IUserContextProvider UserContextProvider = userContextProvider;
    public readonly IMediator Mediator = mediator;
}
