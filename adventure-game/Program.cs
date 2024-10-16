using adventure_game.Repositories;

namespace adventure_game
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add CORS policy - temporarily using AllowAnyOrigin for debugging
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowFrontend",
                    builder => builder.AllowAnyOrigin() // Allow any origin for debugging purposes
                                      .AllowAnyMethod()
                                      .AllowAnyHeader());
            });

            // Add services to the container.
            builder.Services.AddControllers();

            // Register IUserRepository and UserRepository with the service container
            builder.Services.AddScoped<IUserRepository, UserRepository>();
            builder.Services.AddScoped<ICharactersRepository, CharactersRepository>();
            builder.Services.AddScoped<IOriginRepository, OriginRepository>();
            builder.Services.AddScoped<IClassRepository, ClassRepository>();
            builder.Services.AddScoped<IInventoryRepository, InventoryRepository>();
            builder.Services.AddScoped<IItemsRepository, ItemsRepository>();
            builder.Services.AddScoped<ISaveGameRepository, SaveGameRepository>();

            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            // Use CORS
            app.UseCors("AllowFrontend");

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}
