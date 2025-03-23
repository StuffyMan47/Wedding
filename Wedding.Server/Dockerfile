# Базовый образ для runtime
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER app
WORKDIR /app
EXPOSE 5010

# Этап сборки с установкой зависимостей
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS with-node
RUN apt-get update && \
    apt-get install -y ca-certificates tzdata && \
    update-ca-certificates && \
    rm -rf /var/lib/apt/lists/*

# Этап восстановления зависимостей
FROM with-node AS build
ARG BUILD_CONFIGURATION=Release

WORKDIR /src

# Копируем конфигурацию NuGet (если есть)
COPY ["NuGet.Config", "./"]

# 1. Копируем ВСЕ .csproj файлы первыми
COPY *.sln .
COPY ["Wedding.Server/*.csproj", "Wedding.Server/"]
COPY ["Application/*.csproj", "Application/"]
COPY ["Infrastructure/*.csproj", "Infrastructure/"]
COPY ["Domain/*.csproj", "Domain/"]

# 2. Восстанавливаем зависимости
RUN dotnet restore "Wedding.Server/Wedding.Server.csproj" -s https://api.nuget.org/v3/index.json

# 3. Копируем остальные файлы
COPY . .

# 4. Сборка и публикация
WORKDIR "/src/Wedding.Server"
RUN dotnet build "Wedding.Server.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "Wedding.Server.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

# Финальный образ
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Wedding.Server.dll"]