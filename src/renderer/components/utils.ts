export function getDomain(url: string) {
    url = url.replace(/(https?:\/\/)?(www.)?/i, '');
    if (url.indexOf('/') !== -1) {
        return url.split('/')[0];
    }
    return url;
}

export function isMac(): boolean {
    return window.navigator.platform.match(/^Mac/) !== null;
}