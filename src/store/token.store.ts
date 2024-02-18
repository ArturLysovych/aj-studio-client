import { create } from 'zustand';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

const getUserFromToken = () => {
  try {
    const token = Cookies.get('access_token');
    if (token !== undefined) {
        const decodedToken: any = jwtDecode(token);
        const user = decodedToken.user;
        return user;
    }
  } catch (error) {
    return null;
  }
};

const useTokenStore = create((set) => ({
  token: Cookies.get('access_token'),
  user: getUserFromToken()
}));

export default useTokenStore;
