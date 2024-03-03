import { create } from 'zustand';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

interface IUser {
  _id: string;
  username: string;
  role: string;
  email: string;
  password: string;
}

interface ITokenStore {
  token: string | undefined;
  user: IUser | null;
}

const getUserFromToken = ():any => {
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

const useTokenStore = create<ITokenStore>((set) => ({
  token: Cookies.get('access_token'),
  user: getUserFromToken()
}));

export default useTokenStore;
