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
            <FormControl>
                <FormControl className='Form--field'>
                <InputLabel htmlFor='name'>Name</InputLabel>
                <input onChange={handleForm} type='text' id='name' />
                </FormControl>
                <FormControl className='Form--field'>
                <InputLabel htmlFor='body'>User Name</InputLabel>
                <input onChange={handleForm} type='text' id='username' />
                </FormControl>
            </FormControl>
            <button
                className='Form__button'
                disabled={exam === undefined ? true : false}
            >
                Update Exam
            </button>
            <Button onClick={() => setEditing(false)} className="button muted-button">
              Cancel
            </Button>
        </form>
  )
}

export default EditExam;