export const MAX_STRING_LENGTH: number = 70;

export function shortenStringIfRequired(str: string): string {
    if (str.length <= MAX_STRING_LENGTH) {
        return str;
    }

    return str.slice(0, MAX_STRING_LENGTH - 3) + '...';
}
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