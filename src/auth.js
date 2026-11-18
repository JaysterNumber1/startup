async function requestAuth(path, options = {}, allowUnauthorized = false) {
    const response = await fetch(path, {
        ...options,
        credentials: 'same-origin',
        headers: {
            ...(options.body ? { 'Content-Type': 'application/json' } : {}),
            ...options.headers,
        },
    });

    if (allowUnauthorized && response.status === 401) {
        return null;
    }

    if (response.status === 204) {
        return null;
    }

    const responseText = await response.text();
    let result;
    try {
        result = responseText ? JSON.parse(responseText) : {};
    } catch {
        if (response.status === 502) {
            throw new Error('The backend server is not running. Start it with `node service/index.js`.');
        }
        throw new Error(`The server returned an unexpected response (${response.status}).`);
    }

    if (!response.ok) {
        throw new Error(result.msg || 'Authentication request failed');
    }

    return result;
}

export function getCurrentUser() {
    return requestAuth('/api/auth/me', {}, true);
}

export function login(email, password) {
    return requestAuth('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
    });
}

export function createAccount(email, password) {
    return requestAuth('/api/auth/create', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
    });
}

export function logout() {
    return requestAuth('/api/auth/logout', { method: 'DELETE' });
}

export function deleteAccount() {
    return requestAuth('/api/account', { method: 'DELETE' });
}

export function getRecentGames() {
    return requestAuth('/api/games/history');
}

export function saveGameHistory(game) {
    return requestAuth('/api/games/history', {
        method: 'POST',
        body: JSON.stringify(game),
    });
}
