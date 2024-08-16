import {$host} from "./index";

export const getFriends = async (userId) => {
    const data = await $host.get(`User/referals/${userId}`)
    return data;
}