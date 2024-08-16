import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react';
import { getFriends } from '../api/friendsAPI';
import { Context } from '..';

const Friends = observer(() => {

    const {user, friends} = useContext(Context);

    useEffect(() => {
        if(user.isAuth) {
            getFriends(user.user.id)
            .then(response => {
                friends.setFriends(response.data);
            })
            .catch(error => {
                console.error(error);
            });
        }
    }, [user.isAuth]);

    return(
        <>
        <p>Friends</p>
        {friends.friends.length > 0 ? friends.friends.map(friend => 
            <ul>
                <li>{friend.id}</li>
                <li>{friend.telegramName}</li>
                <li>{friend.profit}</li>
                <li>{friend.referals}</li>
            </ul>)
            :
            "no friends"
        }
        </>
    )
});

export default Friends;