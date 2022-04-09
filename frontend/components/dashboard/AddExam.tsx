import * as React from 'react'
import CreatedTests from "../interfaces/CreatedTests";

type Props = {
    saveExam: (e: React.FormEvent, formData: CreatedTests| any) => void
    setAdding: (editing:boolean) => any
    adding:boolean
  }
  
  const AddExam: React.FC<Props> = ({ saveExam, setAdding}) => {
    const [formData, setFormData] = React.useState<CreatedTests| {}>()
  
    const handleForm = (e: React.FormEvent<HTMLInputElement>): void => {
      setFormData({
        ...formData,
        [e.currentTarget.id]: e.currentTarget.value,
      })
    }
    
  return (
        <form className='Form' onSubmit={(e) => saveExam(e, formData)}>
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
                disabled={formData === undefined ? true : false}
            >
                Add Exam
            </button>
            <button onClick={() => setAdding(false)} className="button muted-button">
              Cancel
            </button>
        </form>
  )
}

export default AddExam;