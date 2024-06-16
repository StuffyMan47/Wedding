﻿namespace Application.DTO;

public class PlaceDto
{
    public required string Name { get; set; }
    public string URL { get; set; } = string.Empty;
    public required string Address { get; set; }
    public double Width { get; set; }
    public double Longitude { get; set; }
}
