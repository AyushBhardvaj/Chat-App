import React from 'react'
import { useGetMesssagesQuery } from '../../features/Chat/chatApi'
const Onboarding = () => {
    const {data } = useGetMesssagesQuery("654c6826cca2d01f83420bce")
  return (
    <div>Onboarding</div>
  )
}

export default Onboarding