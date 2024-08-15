import {$host} from "./index";

export const getUserByWallet = async (wallet) => {
    const data = await $host.get(`User/by-wallet/${wallet}`)
    return data;
}

export const registerUser = async (location, invitedId, isPremium, telegramId, telegramName, wallet) => {
    const json = JSON.stringify({
        "location" : location,
        "invitedId" : invitedId || null,
        "isPremium" : isPremium ? "true" : "false",
        "telegramId" : telegramId,
        "telegramName" : telegramName,
        "wallet" : wallet
    });
    const data = await $host.post(`User/register`, json, {headers: {
        'Content-Type': 'application/json'
    }});
    return data;
}