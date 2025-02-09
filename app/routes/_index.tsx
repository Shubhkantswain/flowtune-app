import React from 'react'
import { useCurrentUser } from '~/hooks/auth'

function _index() {
  const {data} = useCurrentUser()
  console.log("data", data);
  
  return (
    <div>_index</div>
  )
}

export default _index