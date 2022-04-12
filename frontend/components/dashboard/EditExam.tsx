import * as React from 'react'
import CreatedTests from "../interfaces/CreatedTests";
import {TextField,InputLabel, FormControl, Input, Button } from '@mui/material';

type Props = {
    updateExam: (exam_id:number, exam: CreatedTests| any) =>void
    currentUser: any
    setEditing: (editing:boolean) => any
  }
  
  const EditExam: React.FC<Props> = ({ updateExam, currentUser ,setEditing}) => {
    const [exam, setExam] = React.useState<CreatedTests| any>()
  
    React.useEffect(
        () => {
            setExam(currentUser)
        },
        [ currentUser ]
      )

    const handleForm = (e: React.FormEvent<HTMLInputElement>) => {
        setExam({
        ...exam,
        [e.currentTarget.id]: e.currentTarget.value,
      })
    }
    
  return (
        <form className='Form' onSubmit={(e) => {updateExam( exam.exam_id , exam); e.preventDefault(); }}>
            <div>
                <div className='Form--field'>
                <label htmlFor='name'>Name</label>
                <input onChange={handleForm} type='text' id='name' />
                </div>
                <div className='Form--field'>
                <label htmlFor='body'>Question</label>
                <input onChange={handleForm} type='text' id='question' />
                </div>
            </div>
            <button
                className='Form__button'
                disabled={exam === undefined ? true : false}
            >
                Update Exam
            </button>
            <button onClick={() => setEditing(false)} className="button muted-button">
              Cancel
            </button>
        </form>
  )
}

export default EditExam;