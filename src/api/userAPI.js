import {$host} from "./index";

export const getUserByWallet = async (wallet) => {
    const data = await $host.get(`User/by-wallet/${wallet}`)
    return data;
}

export const registerUser = async (location, invitedId, isPremium, telegramId, telegramName, wallet) => {
    const data = await $host.post(`User/register`, {
        location: String(location),
        invitedId: JSON.parse(invitedId) || JSON.parse(null),
        isPremium: Boolean(isPremium),
        telegramId: String(telegramId),
        telegramName: String(telegramName),
        wallet: String(wallet)
    }, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return data;
}