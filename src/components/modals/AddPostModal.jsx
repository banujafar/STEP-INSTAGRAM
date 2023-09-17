import React, { useCallback, useState } from 'react'
import UploadImage from './UploadImage'

import EditPost from './EditPost'
import { useAddPost } from '../../utils/addPost'

const AddPostModal = () => {
  const {step} = useAddPost()

  return (
    <>

        {step === 1 ? (
            <UploadImage/>
        ) : step === 2 ? (
          <EditPost />
        ) : null}

        
    </>
  )
}

export default AddPostModal