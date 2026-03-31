import axios from 'axios';
import React, { useEffect } from 'react'
import { set } from 'react-hook-form';
import { useSelector } from 'react-redux'

function QueryDetail({ query, author, answers}) {
  console.log( 'i got ', query, author)
    const theme = useSelector((state) => state.theme.value);
    const username = useSelector((state) => state.auth.user.username);
    const [answer, setAnswer] = React.useState({author : username|| "Testing", comment : ""});
    const handleAnswer = ()=>{
      axios.post('/api/queries/answer',(query,answer))
      .then(res=> {
        console.log(res)
      })
      .catch(err=>{
        console.log(err)
      })
    }
    

    useEffect(()=>{
        // axios.get(`/api/query/${queryId}`)
        // .then(res => {
        //     console.log("Query details fetched - ", res.data);
        // })
        // .catch(err => {
        //     console.log("Error fetching query details - ", err);
        // })
        // axios.post('/api/queries/answer',(id,answer))

    },[])   
  return (
    <div className={`p-6  rounded-xl ${theme ? "bg-black/50 text-white" : "bg-white text-black"} backdrop-blur-sm`}>
        <h1 className='text-2xl font-bold mb-4'>{query}</h1>
        <div className='mb-6'>
          <span className='text-sm text-gray-500'>Asked by {author}</span>
        </div>
        <textarea
            value={answer.comment}
            onChange={(e)=>{
                e.preventDefault();
                console.log(e.target.value);
                setAnswer(prev=> ({...prev, comment : e.target.value}))
            }}
            onKeyDown={(e)=>{
                if(e.key == "Enter")
                {   
                    handleAnswer
                    answers.unshift(answer)
                    console.log("Submitting answer - ", answer.comment, " to query - ", query, " by user - ", answer.author)
                    setAnswer(prev=> ({...prev, comment : ""}) )
                }
            }}
          className={`w-full p-4 rounded-lg border-2 focus:outline-none transition-all ${
            theme ? "bg-white/5 border-white/5 focus:border-blue-500 text-white" : "bg-white border-slate-200 text-black focus:border-blue-500"
          }`}
          placeholder="Help this user with an answer..."
        />
        <button className='mt-4 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold transition-all active:scale-[0.98]'>
          Submit Answer
        </button>

        <div className='mt-8 max-h-52 overflow-scroll'>
          <h2 className='text-xl font-semibold mb-4'>Other Answers</h2>
          {answers?.map((answer, index) => (
            <div key={index} className={`mb-4 p-4 rounded-lg ${theme ? "bg-white/5" : "bg-slate-100"}`}>
              <p>{answer.comment}</p>
              <p className="text-sm text-gray-500 mt-1">Answered by {answer.author}</p>
            </div>
          ))}
          {/*

          */}
        </div>
    </div>
  )
}

export default QueryDetail