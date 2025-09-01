import api from './api';

const authService = {
  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      const data = response.data;
      
      // Check if we have user and token in the response
      if (data.token && data.user) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        return data;
      } else if (data.token) {
        // If backend doesn't return user object, create one from the request
        const user = {
          id: data.id || data.userId,
          username: userData.username,
          email: userData.email
        };
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(user));
        return { token: data.token, user };
      }
      
      return data;
    } catch (error) {
      throw error;
    }
  },

  login: async (userData) => {
    try {
      const response = await api.post('/auth/login', userData);
      const data = response.data;
      
      // Check if we have user and token in the response
      if (data.token && data.user) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        return data;
      } else if (data.token) {
        // If backend doesn't return user object, create one
        const user = {
          id: data.id || data.userId,
          email: userData.email,
          username: data.username || userData.email.split('@')[0]
        };
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(user));
        return { token: data.token, user };
      }
      
      return data;
    } catch (error) {
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  getToken: () => {
    return localStorage.getItem('token');
  }
};

export default authService;


// import api from './api';

// const authService = {
//   register: async (userData) => {
//     const response = await api.post('/auth/register', userData);
//     if (response.data.token) {
//       localStorage.setItem('token', response.data.token);
//       localStorage.setItem('user', JSON.stringify(response.data.user));
//     }
//     return response.data;
//   },

//   login: async (userData) => {
//     const response = await api.post('/auth/login', userData);
//     if (response.data.token) {
//       localStorage.setItem('token', response.data.token);
//       localStorage.setItem('user', JSON.stringify(response.data.user));
//     }
//     return response.data;
//   },

//   logout: () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//   },

//   getCurrentUser: () => {
//     const userStr = localStorage.getItem('user');
//     return userStr ? JSON.parse(userStr) : null;
//   },

//   getToken: () => {
//     return localStorage.getItem('token');
//   }
// };

// export default authService;