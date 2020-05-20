function dec2hex(decimalValue: number) {
    return ('0' + decimalValue.toString(16)).substr(-2);
}

export function getRandomString(length: number = 16) {
    const array = new Uint8Array((length || 40) / 2);
    window.crypto.getRandomValues(array);
    return Array.from(array, dec2hex).join('');
}

export function pxToNumber(pixelValue: string) {
    return Number(pixelValue.replace('px', ''));
}