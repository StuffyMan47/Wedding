namespace Application.Common.Exceptions;

public class InternalServerException(string message) : CustomException(message);
