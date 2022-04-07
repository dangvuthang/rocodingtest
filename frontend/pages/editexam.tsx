import * as React from 'react'
import Dslayout from "../components/dashboard/Ds_layout/Dslayout";
import Person from "../components/interfaces/Person";

type Props = {
    updateExam: (id:number, exam: Person| any) =>void
    currentUser: any
  }
  
  const EditExam: React.FC<Props> = ({ updateExam, currentUser }) => {
    const [exam, setExam] = React.useState<Person| any>()
  
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
        <form className='Form' onSubmit={(e) => { e.preventDefault(); updateExam( exam.id , exam); }}>
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
        </form>
  )
}

export default EditExam;