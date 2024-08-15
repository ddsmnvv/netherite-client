import {$host} from "./index";

export const getUserByWallet = async (wallet) => {
    const data = await $host.get(`User/by-wallet/${wallet}`)
    return data;
}

export const registerUser = async (location, invitedId, isPremium, telegramId, telegramName, wallet) => {
    const data = await $host.post(`User/register`, {
        location,
        invitedId,
        isPremium,
        telegramId,
        telegramName,
        wallet
    })
    return data;
}