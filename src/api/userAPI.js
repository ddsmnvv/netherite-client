import {$host} from "./index";

export const getUserByWallet = async (wallet) => {
    const data = await $host.post(`User/by-wallet/${wallet}`)
    return data;
}