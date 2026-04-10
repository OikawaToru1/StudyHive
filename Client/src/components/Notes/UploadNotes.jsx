import axios from 'axios'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
// import { Link } from 'react-router'
// import ShowFile from './showFiles'
import PopOut from './PopOut'





function UploadNotes() {
    const username = useSelector(state => state.auth.user.username)
    const theme = useSelector(state=> state.theme.value)
    const [noteData, setNoteData]= useState({})
    const {register, handleSubmit} = useForm()
    const [messageStatus, setMessageStatus] = useState(false)
    const [loading, setLoading] = useState(false);
    const [error, showError] = useState(false);

    const submit = (data)=>{

      if(!username) alert("You must log in to upload file")
      else{
        setLoading(true);
    

        console.log(data.title, data.description, data.image[0], 'your uploaded data')
        const form = new FormData();
        form.append('title',data.title)
        form.append('description',data.description)
        form.append('my_file',data.image[0]);
        form.append('creator',username)

        axios.post('https://studyhive-sse4.onrender.com/api/upload',form)
        .then(res=>{ 
          console.log("File posted !",res.data);
          setMessageStatus(true)
          setNoteData({url : res.data.url, title : res.data.title, description : res.data.description })
          setLoading(false);
        })
        .catch(err=>{ 
          console.log(err)
          showError(true)
          setLoading(false);
        })
        
        console.log('form data',form.values)
      }
    }
  return (
    <div className='w-full flex flex-col gap-4'>

      <h1 className=' text-2xl text-center font-bold  py-4 '>Upload Notes</h1>
      {
        error ? <PopOut status="error" msg="Error uploading file. Please try again." showMsg={true} /> : ''
      }
      { loading ? <h1 className=' bg-gray-400 flex absolute top-1/3 left-1/2 translate-x-[-50%] translate-y-[-50%] rounded-md p-4 '>
          <svg className="animate-spin h-8 w-8 mr-3 ..." viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        Uploading file to the storage...</h1> : ''}

      <form className={`${theme ? "bg-black text-white": "bg-white text-black" } w-full lg:flex-row  md:flex-row flex flex-col  gap-4   `} action="" onSubmit={handleSubmit(submit)}>
        <input disabled={loading} className='border-1 rounded-md px-2 py-1 lg:w-1/5 md:w-1/7  '  type="text" placeholder='title' {...register("title", {required: true})} />
        <input disabled={loading} className='border-1 rounded-md px-2 py-1 lg:flex-1 md:flex-1 ' type="text" placeholder='Description' {...register("description",{required: true})} />  
        <input disabled={loading} className = "border-1 rounded-md px-2 py-1 "  type="file" accept='image/png, image/jpg, image/jpeg , .pdf, .doc, .docx' name="File" id="" {...register("image",{required: true})} />
        <button disabled={loading} className='border-1 rounded-md px-2 py-1' text="Submit">submit</button>
      </form>
      {/* <ShowFile url = {noteData.url} title = {noteData.title} description = {noteData.description} /> */}
      {
       
        messageStatus? <PopOut status="succesful" msg="File Uploaded to the storage" showMsg={true} /> : ''
      }
    
    </div>
  )
}

export default UploadNotes