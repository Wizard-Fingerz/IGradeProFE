import { BASE_URL } from "../../constant";


interface AuthResponse {
    access: string;
    token: string;
    type: string;
    user: {
        id: number;
        email: string;
        name: string;
        type: string;
    };
}


class AuthApiService {
    private static STORAGE_KEY = 'auth';

    constructor() { }

    async login(username: string, password: string): Promise<AuthResponse> {
        try {
            const response = await fetch(`${BASE_URL}/login/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });
            const authResponse = await response.json();

            this.saveTokenToLocalStorage(authResponse.access,);
            return authResponse;
        } catch (error) {
            throw error;
        }
    }

    private saveTokenToLocalStorage(token: string,): void {
        localStorage.setItem('token', token);
        // localStorage.setItem('user_type', type);
    }


    // private saveAuthToLocalStorage(auth: any): void {
    //     localStorage.setItem(AuthApiService.STORAGE_KEY, JSON.stringify(auth));
    // }


    getAuth(): any {
        const auth = localStorage.getItem(AuthApiService.STORAGE_KEY);
        return auth ? JSON.parse(auth) : null;
    }

    async logout(): Promise<void> {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No token found');

        try {
            const response = await fetch(`${BASE_URL}/logout/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`, // Include the token in the header
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to log out');
            }

            localStorage.removeItem(AuthApiService.STORAGE_KEY);
            localStorage.removeItem('token'); // Clear the token
        } catch (error) {
            throw error;
        }
    }
}

export default AuthApiService;