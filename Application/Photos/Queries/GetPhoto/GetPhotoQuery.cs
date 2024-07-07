using Infrastructure.Services.Base;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Photos.Queries.GetPhoto;

public record GetPhotoQuery(long guestId) : IRequest<FileStream>;

public class GetPhotoQueryHandler(BaseServicePool baseServicePool) : IRequestHandler<GetPhotoQuery, FileStream>
{
    public async Task<FileStream> Handle(GetPhotoQuery request, CancellationToken cancellationToken)
    {
        var fileName = await baseServicePool.DbContext.Guests
            .Where(x => x.Id == request.guestId)
            .Select(x => x.Event.Photo.FileName)
            .FirstOrDefaultAsync();
        var currentDirectory = Directory.GetCurrentDirectory();
        var path = Path.Combine(Directory.GetParent(currentDirectory).FullName, "Files", fileName);
        var result = File.OpenRead(path);

        return result;
    }
}
