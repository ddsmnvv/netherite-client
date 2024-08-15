import {$host} from "./index";

export const startMining = async (userId) => {
    const data = await $host.post(`Miner/start/${userId}`)
    return data;
}

export const getMiningTime = async (userId) => {
    const data = await $host.get(`Miner/time/${userId}`)
    return data;
}

export const endMining = async (userId) => {
    const data = await $host.delete(`Miner/end/${userId}`)
    return data;
}