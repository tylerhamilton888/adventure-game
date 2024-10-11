using Microsoft.AspNetCore.Mvc;

[Route("api/[controller]")]
[ApiController]
public class OriginsController : ControllerBase
{
    private readonly IOriginRepository _originRepository;

    public OriginsController(IOriginRepository originRepository)
    {
        _originRepository = originRepository;
    }

    [HttpGet]
    public IActionResult Get()
    {
        return Ok(_originRepository.GetAllOrigins());
    }
}
