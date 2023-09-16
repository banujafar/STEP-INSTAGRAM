import React from 'react'
import appRouter from './router'
import { RouterProvider } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { modalsData } from './constants/modals'
import ModalLayout from './components/modals/ModalLayout'


const App = () => {
  const {modals} = useSelector(state => state.modal)
  return (
    <>
    
      <RouterProvider router={appRouter}/>
    
    </>
  )
}

export default App