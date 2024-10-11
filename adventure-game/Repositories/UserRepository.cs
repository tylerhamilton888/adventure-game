using adventure_game.Models;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using adventure_game.Utils;

namespace adventure_game.Repositories
{
    public class UserRepository : BaseRepository, IUserRepository
    {
        public UserRepository(IConfiguration configuration) : base(configuration) { }

        // Get all users
        public List<User> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT id, username, email, isAdmin
                        FROM users
                        ORDER BY username";

                    var reader = cmd.ExecuteReader();
                    List<User> users = new List<User>();

                    while (reader.Read())
                    {
                        users.Add(new User
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("id")),
                            Email = reader.GetString(reader.GetOrdinal("email")),
                            Username = reader.GetString(reader.GetOrdinal("username")),
                            IsAdmin = reader.GetBoolean(reader.GetOrdinal("isAdmin"))
                        });
                    }
                    reader.Close();
                    return users;
                }
            }
        }

        // Get user by ID
        public User GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT id, username, email, isAdmin
                        FROM users
                        WHERE id = @Id";

                    cmd.Parameters.AddWithValue("@Id", id);

                    var reader = cmd.ExecuteReader();
                    User user = null;

                    if (reader.Read())
                    {
                        user = new User
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("id")),
                            Email = reader.GetString(reader.GetOrdinal("email")),
                            Username = reader.GetString(reader.GetOrdinal("username")),
                            IsAdmin = reader.GetBoolean(reader.GetOrdinal("isAdmin"))
                        };
                    }
                    reader.Close();
                    return user;
                }
            }
        }

        // Get user by email
        public User GetByEmail(string email)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT id, username, email, isAdmin
                        FROM users
                        WHERE email = @Email";

                    DbUtils.AddParameter(cmd, "@Email", email);

                    var reader = cmd.ExecuteReader();
                    User user = null;

                    if (reader.Read())
                    {
                        user = new User()
                        {
                            Id = DbUtils.GetInt(reader, "id"),
                            Username = DbUtils.GetString(reader, "username"),
                            Email = DbUtils.GetString(reader, "email"),
                            IsAdmin = reader.GetBoolean(reader.GetOrdinal("isAdmin"))
                        };
                    }

                    reader.Close();
                    return user;
                }
            }
        }

        public void Add(User user)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    // First, find the current maximum ID in the users table
                    cmd.CommandText = @"SELECT ISNULL(MAX(Id), 0) + 1 FROM Users";
                    int newId = (int)cmd.ExecuteScalar(); // Get the next available ID

                    // Now, insert the new user with the generated ID
                    cmd.CommandText = @"
                INSERT INTO Users (Id, Email, Username, IsAdmin)
                VALUES (@Id, @Email, @Username, @IsAdmin)";

                    cmd.Parameters.AddWithValue("@Id", newId); // Set the new generated ID
                    cmd.Parameters.AddWithValue("@Email", user.Email);
                    cmd.Parameters.AddWithValue("@Username", user.Username); 
                    cmd.Parameters.AddWithValue("@IsAdmin", user.IsAdmin);

                    cmd.ExecuteNonQuery();

                    // Assign the generated ID back to the user object
                    user.Id = newId;
                }
            }
        }



        // Update an existing user
        public void Update(User user)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE users
                        SET username = @Username,
                            email = @Email,
                            isAdmin = @IsAdmin
                        WHERE id = @Id";

                    cmd.Parameters.AddWithValue("@Username", user.Username);
                    cmd.Parameters.AddWithValue("@Email", user.Email);
                    cmd.Parameters.AddWithValue("@IsAdmin", user.IsAdmin);
                    cmd.Parameters.AddWithValue("@Id", user.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
