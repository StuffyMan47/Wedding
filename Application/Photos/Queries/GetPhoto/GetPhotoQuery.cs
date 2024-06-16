using Infrastructure.Services.Base;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Photos.Queries.GetPhoto;

public record GetPhotoQuery(long eventId) : IRequest<FileStream>;

public class GetPhotoQueryHandler(BaseServicePool baseServicePool) : IRequestHandler<GetPhotoQuery, FileStream>
{
    public async Task<FileStream> Handle(GetPhotoQuery request, CancellationToken cancellationToken)
    {
        var fileName = await baseServicePool.DbContext.Photos
            .Where(x => x.Event.Id == request.eventId)
            .Select(x => x.FileName)
            .FirstOrDefaultAsync();
        var currentDirectory = Directory.GetCurrentDirectory();
        var path = Path.Combine(Directory.GetParent(currentDirectory).FullName, "Files", fileName);
        var result = File.OpenRead(path);

        return result;
    }
}
