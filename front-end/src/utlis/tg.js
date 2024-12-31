export function TGReady() {
    if (typeof window !== "undefined" && window.Telegram) {
        const tg = window.Telegram.WebApp;
        tg.ready();
    }
}

export function getTGUser() {
    if (
        window.Telegram !== undefined &&
        window.Telegram.WebApp.initDataUnsafe.user !== undefined
    ) {
        return window.Telegram.WebApp.initDataUnsafe.user;
    }
    return false;
}