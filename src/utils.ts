/**
 * Converts amount in paise to rupees
 *
 * @param amount Amount in paise
 */
export const toRupees = (amount: number) => (amount / 100).toFixed(2);

/**
 * Converts amount in rupees to paise
 *
 * @param amount Amount in rupees
 */
export const toPaise = (amount: number) => Math.round(amount * 100);
