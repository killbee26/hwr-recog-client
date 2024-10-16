// src/utils/token.ts
export const saveToken = (token: string) => {
    localStorage.setItem('token', token); // Save the token in local storage
  };
  
  export const getToken = () => {
    return localStorage.getItem('token'); // Get the token from local storage
  };
  
  export const removeToken = () => {
    localStorage.removeItem('token'); // Remove the token from local storage
  };
  