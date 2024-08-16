import { makeAutoObservable } from "mobx";

export default class TasksStore {
    
    constructor() {
        this._tasks = [];
        makeAutoObservable(this);
    }

    setTasks(tasks) {
        this._tasks = tasks;
    }

    removeTask(taskId) {
        var index = this._tasks.map(x => {
            return x.id;
          }).indexOf(taskId);
        this._tasks.splice(index, 1);
    }

    get tasks() {
        return this._tasks;
    }

}