import * as React from 'react'
import CreatedTests from "../interfaces/CreatedTests";
import {TextField,InputLabel, FormControl, Input, Button } from '@mui/material';

type Props = {
    updateExam: (_id:string, exam: CreatedTests| any) =>void
    currentUser: any
    setEditing: (editing:boolean) => any
    editing: boolean
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
        <form className='Form' onSubmit={(e) => {e.preventDefault(); updateExam( exam._id , exam); }}>
            <div>
                <div className='Form--field'>
                <label htmlFor='name'>Name</label>
                <input onChange={handleForm} type='text' id='name' />
                </div>
                <div className='Form--field'>
                <label htmlFor='body'>User Name</label>
                <input onChange={handleForm} type='text' id='username' />
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