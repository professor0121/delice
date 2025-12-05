import React from 'react'
import { useAppSelector } from '../redux/hooks'

const home = () => {
    const user=useAppSelector((state)=>state.auth.user);

  return (
    <div>
        {user?.email}
    </div>
  )
}

export default home
