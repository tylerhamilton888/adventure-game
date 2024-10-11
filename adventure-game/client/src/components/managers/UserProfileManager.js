const apiUrl = "https://localhost:7201"; 


export const login = (userObject) => {
    return fetch(`${apiUrl}/api/UserProfile/getbyemail?email=${userObject.email}`)
      .then((r) => {
        if (!r.ok) {
          throw new Error("Login failed");
        }
        return r.json();
      })
      .then((userProfile) => {
        if (userProfile.id) {
          if (userProfile.isDeactivated) return undefined;
  
          localStorage.setItem("userProfile", JSON.stringify(userProfile));
          return userProfile;
        } else {
          return undefined;
        }
      });
  };
  

  export const logout = () => {
    localStorage.removeItem("userProfile");
  };



  export const register = (userObject) => {
      return fetch(`${apiUrl}/api/userprofile/register`, {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(userObject),
      })
      .then((response) => {
          if (!response.ok) {
              throw new Error("Registration failed");
          }
          return response.json();
      })
      .then((savedUserProfile) => {
          localStorage.setItem("userProfile", JSON.stringify(savedUserProfile));
      });
  };
  