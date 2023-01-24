export const debounce = <T extends (...args: any[]) => any>(
    callback: T,
    waitFor: number
): any => {
    let timeout: any = 0;
    return (...args: Parameters<T>): ReturnType<T> => {
        let result: any;
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            result = callback(...args);
        }, waitFor);
        return result;
    };
};
