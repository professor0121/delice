import React from 'react'
import { useAppSelector } from '../redux/hooks'

const home = () => {
    const user=useAppSelector((state)=>state.auth.user);
    const token=useAppSelector((state)=>state.auth.token)
 console.log(user)
  return (
    <div>
          {token}

    </div>
  )
}

export default home
