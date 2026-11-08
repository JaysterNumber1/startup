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

    const result = await response.json();
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
