import * as React from 'react'
import Dslayout from "../components/dashboard/Ds_layout/Dslayout";
import Person from "../components/interfaces/Person";

type Props = {
    saveExam: (e: React.FormEvent, formData: Person| any) => void
  }
  
  const AddExam: React.FC<Props> = ({ saveExam }) => {
    const [formData, setFormData] = React.useState<Person| {}>()
  
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
                <label htmlFor='body'>User Name</label>
                <input onChange={handleForm} type='text' id='username' />
                </div>
            </div>
            <button
                className='Form__button'
                disabled={formData === undefined ? true : false}
            >
                Add Exam
            </button>
        </form>
  )
}

export default AddExam;