import {$host} from "./index";

export const getUserByWallet = async (wallet) => {
    const data = await $host.get(`User/by-wallet/${wallet}`)
    return data;
}

export const registerUser = async (location, invitedId, isPremium, telegramId, telegramName, wallet) => {
    const data = await $host.post(`User/register`, {
        location: location,
        invitedId: invitedId || null,
        isPremium: Boolean(isPremium),
        telegramId: String(telegramId),
        telegramName: telegramName,
        wallet: wallet
    }, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return data;
}