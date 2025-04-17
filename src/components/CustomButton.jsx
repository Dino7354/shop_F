import React from 'react'
import { useSnapshot } from 'valtio'
import state from '../store'
import { getContrastingColor } from '../config/helpers'

const CustomButton = ({ type, title, customStyles, handleClick}) => {
const snap = useSnapshot(state)
const generatesStyles = (type) => {
  if(type === 'filled'){
    return {
      backgroundColor: snap.color,
      color: getContrastingColor(snap.color),
    }
  } else if(type === 'outline'){
    return {
      borderWidth: '1px',
      borderColor: snap.color,
      color: '#FFFFFF',
    }
  } else if(type === 'text'){
    return {
      backgroundColor: 'transparent',
      color: snap.color,
    }
  } 
}





  return (
    <button
    className={`px-2 py-1.5 flex-1 rounded-md ${customStyles}`}
    style={generatesStyles(type)}
    onClick={handleClick}
    >
      {title}


    </button>
  )
}

export default CustomButton
