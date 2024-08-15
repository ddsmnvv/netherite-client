import {$host} from "./index";

export const getUserByWallet = async (wallet) => {
    const data = await $host.get(`User/by-wallet/${wallet}`)
    return data;
}