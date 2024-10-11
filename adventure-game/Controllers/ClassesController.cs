using Microsoft.AspNetCore.Mvc;

[Route("api/[controller]")]
[ApiController]
public class ClassesController : ControllerBase
{
    private readonly IClassRepository _classRepository;

    public ClassesController(IClassRepository classRepository)
    {
        _classRepository = classRepository;
    }

    [HttpGet]
    public IActionResult Get()
    {
        return Ok(_classRepository.GetAllClasses());
    }
}
