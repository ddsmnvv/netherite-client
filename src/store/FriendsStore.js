import { makeAutoObservable } from "mobx";

export default class FriendsStore {
    
    constructor() {
        this._friends = [];
        makeAutoObservable(this);
    }

    setFriends(friends) {
        this._friends = friends;
    }

    get friends() {
        return this._friends;
    }

}