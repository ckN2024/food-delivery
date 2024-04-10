"use client"
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Profile = ({userId}: {userId: string}) => {

    const [user, setUser] = useState({});

    useEffect(()=>{
        ;(async () => {
            const response = await axios.get(`/api/users/${userId}`)
            console.log(response.data);
        })()
    })

  return (
    <>
        <div>
            <p>
                Username :
            </p>
        </div>
    </>
  )
}

export default Profile