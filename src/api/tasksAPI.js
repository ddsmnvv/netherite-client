import {$host} from "./index";

export const getTasks = async (userId) => {
    const data = await $host.get(`User/tasks/${userId}`)
    return data;
}

export const completeTask = async (userId, taskId) => {
    const data = await $host.post(`User/complete/${userId}/${taskId}`)
    return data;
}