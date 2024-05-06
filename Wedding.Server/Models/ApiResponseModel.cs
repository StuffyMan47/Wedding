namespace Wedding.Server.Models;

public class ApiResponseModel
{
    public ApiResponseErrors? Errors { get; set; }
}

public class BaseApiResponseModel<T> : ApiResponseModel
{
    public T? Data { get; set; }
}

public class PaginatedApiResponseModel<T> : BaseApiResponseModel<T>
{
    public long Cursor { get; set; }
}
