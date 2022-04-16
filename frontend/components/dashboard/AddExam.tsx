import * as React from 'react'
import CreatedTests from "../interfaces/CreatedTests";

type Props = {
  saveExam: (e: React.FormEvent, formData: CreatedTests | any) => void
  setAdding: (adding: boolean) => any
}

const AddExam: React.FC<Props> = ({ saveExam, setAdding }) => {
  const [formData, setFormData] = React.useState<CreatedTests | {}>()

  const handleForm = (e: React.FormEvent<HTMLInputElement>): void => {
    setFormData({
      ...formData,
      [e.currentTarget.id]: e.currentTarget.value,
    })
  }

  return (
    <div className="mt-10 sm:mt-0">
      <div className="mt-5 md:mt-0 md:col-span-2">
        <form onSubmit={(e) => saveExam(e, formData)} className='Form' >
          <div className="shadow overflow-hidden sm:rounded-md">
            <div className="px-4 py-5 bg-white sm:p-6">
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3">
                  <label className="block text-sm font-medium text-gray-700">Title of Exam</label>
                  <input onChange={handleForm} type="text" name="name" id="name" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label className="block text-sm font-medium text-gray-700">Duration</label>
                  <input onChange={handleForm} type="text" name="question" id="question" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                </div>
                <div className="col-span-6 ">
                  <label className="block text-sm font-medium text-gray-700">
                    Question
                  </label>
                  <div className="mt-1">
                    <textarea id="about" name="about" className="height shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md"></textarea>
                  </div>
                </div>

                <div className="col-span-6">
                  <label className="block text-sm font-medium text-gray-700">
                    About
                  </label>
                  <div className="mt-1">
                    <textarea id="about" name="about" className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md" placeholder="you@example.com"></textarea>
                  </div>
                </div>

                <div className="col-span-6">
                  <label className="block text-sm font-medium text-gray-700">Street address</label>
                  <input type="text" name="street_address" id="street_address" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                </div>
              </div>
            </div>
            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
              <button disabled={formData === undefined ? true : false} type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Save Exam
              </button>
              <button onClick={() => setAdding(false)} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>

  )
}
{/*
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
*/ }
export default AddExam;