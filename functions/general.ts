export const customNumberFormat = (value: number) => {
    const parts = value?.toString().split('.');
    if (parts) {
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        return parts.join('.');
    } else return 0
}