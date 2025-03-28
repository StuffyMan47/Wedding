# ������� ����� ��� runtime
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER app
WORKDIR /app
EXPOSE 5010

# ���� ������ � ���������� ������������
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS with-node
RUN apt-get update && \
    apt-get install -y ca-certificates tzdata && \
    update-ca-certificates && \
    rm -rf /var/lib/apt/lists/*

# ���� �������������� ������������
FROM with-node AS build
ARG BUILD_CONFIGURATION=Release

WORKDIR /src


# 1. �������� ��� .csproj ����� �������
COPY *.sln .
COPY ["Wedding.Server/*.csproj", "Wedding.Server/"]
COPY ["Application/*.csproj", "Application/"]
COPY ["Infrastructure/*.csproj", "Infrastructure/"]
COPY ["Domain/*.csproj", "Domain/"]

# 2. ��������������� �����������
RUN dotnet restore "Wedding.Server/Wedding.Server.csproj" # -s https://api.nuget.org/v3/index.json

# 3. �������� ��������� �����
COPY . .

# 4. ������ � ����������
WORKDIR "/src/Wedding.Server"
RUN dotnet build "Wedding.Server.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "Wedding.Server.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

# ��������� �����
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Wedding.Server.dll"]