import axios from 'axios';

const API_URL = 'http://192.168.254.105/api'; // CHANGE THIS TO YOUR API URL

export const registerUser = async (name, email, password, department) => {
    try {
        const response = await axios.post(`${API_URL}/register.php`, {
            name,
            UBmail: email, // Ensure the key matches what the PHP expects
            password,
            department
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const loginUser = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/login.php`, {
            UBmail: email,
            password
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error.response?.data || error.message;
    }
};