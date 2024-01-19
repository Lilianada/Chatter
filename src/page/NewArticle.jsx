import React from 'react';
import Header from '../components/Authorized/Header';
import TextArea from '../components/Authorized/TextArea';
import UploadCoverImage from '../components/Authorized/UploadCoverImage';


export default function NewArticle() {
  return (
    <>
      <Header/>
      <div className="mx-4 my-8 sm:mx-12 sm:my-12">
        <UploadCoverImage />
       <TextArea/>

      </div>
    </>
  )
}
