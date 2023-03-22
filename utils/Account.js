class Account {
    static getAccessToken() {
        if(typeof window === 'undefined') return '';
        return sessionStorage?.getItem('accessToken') ||
            localStorage?.getItem('accessToken') || '';
    }

    static setAccessToken(accessToken, type = 'session') {
        if(type === 'session') {
            sessionStorage.setItem('accessToken', accessToken);
            return;
        }
        localStorage.setItem('accessToken', accessToken);
    }

    static setAccount(data, type = 'session') {
        if(type === 'session') {
            sessionStorage.setItem('account', JSON.stringify(data));
            return;
        }
        localStorage.setItem('account', JSON.stringify(data));
    }

    static getAccount() {
        let data;
        try {
            if(sessionStorage.getItem('account')) {
                data = JSON.parse(sessionStorage.getItem('account'));
            }
            if(localStorage.getItem('account')) {
                data = JSON.parse(localStorage.getItem('account'));
            }
        } catch {
            data = {};
        }
        return data;
    }

    static delete() {
        sessionStorage.removeItem('accessToken');
        sessionStorage.removeItem('account');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('account');
    }
}

export default Account;
