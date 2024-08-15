import { useState, useEffect, useCallback } from 'react';
import { requestForToken } from 'firebase';
import { sendTokenToServer } from '@api/push';
import { toast } from 'react-toastify';

export function useTokenManagement() {
    const [token, setToken] = useState<string | null>(null);

    const fetchToken = useCallback(async () => {
        try {
            const newToken = await requestForToken();
            if (newToken && newToken !== token) {
                setToken(newToken);
                toast.success('푸시 알림을 받을 준비가 완료되었습니다.');
            }
        } catch (error) {
            console.error('Error fetching token:', error);
            toast.error('푸시 알림 설정에 실패했습니다.');
        }
    }, [token]);

    const saveToken = useCallback(async (username: string) => {
        if (token) {
            await sendTokenToServer(token, username);
        }
    }, [token]);

    useEffect(() => {
        fetchToken();
        // 주기적으로 토큰을 새로 고치는 로직 추가
        const tokenRefreshInterval = setInterval(fetchToken, 60 * 60 * 1000); // 예: 1시간마다

        return () => clearInterval(tokenRefreshInterval);
    }, [fetchToken]);

    return { token, saveToken };
}
