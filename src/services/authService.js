import apiClient from './apiClient';
import { CURRENT_USER } from '../dummy/dummyData';

export const authService = {
  /**
   * Triggers the OTP code send operation.
   * @param {string} email
   */
  sendOtp: async (email) => {
    // Simulated promise delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Real API implementation (commented out for now):
    // const response = await apiClient.post('/auth/send-otp', { email });
    // return response.data;

    return { success: true, email };
  },

  /**
   * Verifies the OTP code.
   * @param {string} email
   * @param {string} code
   */
  verifyOtp: async (email, code) => {
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Real API implementation:
    // const response = await apiClient.post('/auth/verify-otp', { email, code });
    // return response.data; // e.g. { token: 'JWT_TOKEN', user: CURRENT_USER }

    if (code.length === 6) {
      return {
        success: true,
        token: 'mock_jwt_token_alex_rivera',
        user: CURRENT_USER
      };
    } else {
      throw new Error('Invalid security code.');
    }
  },

  /**
   * Authenticate via Google OAuth token.
   * @param {string} googleToken
   */
  googleLogin: async (googleToken) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Real API implementation:
    // const response = await apiClient.post('/auth/google', { token: googleToken });
    // return response.data;

    return {
      success: true,
      token: 'mock_jwt_google_token',
      user: CURRENT_USER
    };
  },

  fetchCurrentUser: async () => {
    const response = await apiClient.get('/auth/google/me/v2');
    return response.data;
  },
};
export default authService;
