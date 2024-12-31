export function isAuth() {
    if (localStorage.getItem("auth_token")) {
        return true;
    }
    return false;
}

export function setAuth(token) {
    localStorage.setItem("auth_token", token);
    return localStorage.getItem("auth_token") !== null;
}

export function getAuth() {
    return localStorage.getItem("auth_token");
}

export function clearAuth() {
    localStorage.removeItem("auth_token");
    return localStorage.getItem("auth_token") !== null;
}

export function clearStorage() {
    localStorage.clear();
}

export function setLocalStorage(key, value) {
    if (typeof window !== 'undefined') {
        localStorage.setItem(key, JSON.stringify(value));
    }
};

export function getLocalStorage(key) {
    if (typeof window !== 'undefined') {
        const storedValue = localStorage.getItem(key);
        return JSON.parse(storedValue);
    }
    return null;
};


export const fetchLatestData = async() => {

    const response = await fetch('/api/game/getscore', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    return response.json();
};




export async function checkLocal() {
    let localData = getLocalStorage('browserlog');
    console.log('browserlog', localData);


    if (!localData) {
        const latestData = await fetchLatestData();
        const initialData = {
            currentTimestammp: Date.now(),
            overallCoin: updatedCoin,
            deductedPoints: multiplierVal != null && multiplierVal != '' ? multiplierVal : '',
            timePlayed,
            isGameActive,
            "istimeLeft": timeLeft > 0 ? true : false,
            "used_multiplier": multiplierVal
        };
        setLocalStorage('browserlog', initialData);
        return;
    }

    // Fetch the latest data from the API
    const latestData = await fetchLatestData();

    // Check for ID mismatch
    if (localData.id !== latestData.id) {
        console.error('ID mismatch');
        return;
    }

    // Check for timestamp difference greater than 15-30 minutes
    const fifteenMinutes = 15 * 60 * 1000;
    const thirtyMinutes = 30 * 60 * 1000;
    const timeDifference = Math.abs(Date.now() - localData.timestamp);

    if (timeDifference > fifteenMinutes && timeDifference < thirtyMinutes) {
        // Check for score difference
        const scoreDifference = Math.abs(latestData.points - localData.points);
        if (scoreDifference > 500) {
            console.error('Score difference exceeds 500 points');
            return;
        }
    }

    // Check for last login time difference
    const loginTimeDifference = Math.abs(Date.now() - localData.lastLoginTime);
    const loginThreshold = 24 * 60 * 60 * 1000; // Example threshold of 24 hours

    if (loginTimeDifference > loginThreshold) {
        console.warn('Login time difference exceeds threshold');
    } else {
        console.log('Login time within acceptable range');
    }

    // If no problems, log true
    console.log(true);
}