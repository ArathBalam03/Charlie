import {API_URL} from '../config/db.js';

export const loginUser = async ({username, password}) => {

    console.log('Attempting login for user:', username, password);
    try {
        const response = await fetch(`${API_URL}/users/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password }) });
        if (!response.ok) {
            throw new Error('Login failed');
        }
        const data = await response.json();
        return data;
        
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        return null;
    }


}