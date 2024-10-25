'use client';

import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';
import { getToken } from './token';
import apiClient from './apiClient';
const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const useTokenCheck = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const checkToken = async () => {
            const token = getToken();
            if (!token) {
                router.push('/login');  // If no token, redirect to login
                return;
            }

            try {
                const response = await apiClient.get(`/api/users/verifyToken`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (response.data.valid) {
                    setIsAuthenticated(true);  // User is authenticated
                    console.log("Authenticated user sucesfully using /api/verifyToken")
                } else {
                    localStorage.removeItem('token');  // Clear invalid token
                    router.push('/login');  // Redirect to login
                }
            } catch (error) {
                console.error('Token verification failed:', error);
                router.push('/login');  // Redirect to login on failure
            }
        };

        checkToken();
    }, [router]);

    return isAuthenticated;
};

export default useTokenCheck;
