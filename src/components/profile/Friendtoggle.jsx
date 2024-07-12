import React, { useState, useEffect } from 'react';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function FriendToggle({ userId, friendId, isFriend, setIsFriend }) {
    const [localIsFriend, setLocalIsFriend] = useState(isFriend);

    useEffect(() => {
        setLocalIsFriend(isFriend);
    }, [isFriend]);

    const handleAdd = async () => {
        try {
            const url = `${BACKEND_URL}/users/friends`;
            const method = localIsFriend ? 'DELETE' : 'POST';
            const token = localStorage.getItem('token');
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ friendUserId: friendId //userid 
                    
                }),
            });

            if (!response.ok) {
                console.log(response)
                throw new Error('Network response was not ok');
            }
            console.log(response)
            await response.json();
            setLocalIsFriend(!localIsFriend);
            setIsFriend(!localIsFriend);
        } catch (error) {
            console.error('Error updating friend status:', error);
        }
    };

    return (
        <button className="primary-button" onClick={handleAdd}>
            {localIsFriend ? 'Unfriend' : 'Add Friend'}
        </button>
    );
}

export default FriendToggle;
