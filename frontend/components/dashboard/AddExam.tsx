import * as React from 'react'
import CreatedTests from "../interfaces/CreatedTests";


type Props = {
  saveExam: (e: React.FormEvent, formData: CreatedTests | any) => void
  setAdding: (adding: boolean) => any,
  
}
const AddExam: React.FC<Props> = ({ saveExam, setAdding }) => {
  const [formData, setFormData] = React.useState<CreatedTests | {}>()

  const handleForm = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    setFormData({
      ...formData,
      [e.currentTarget.id]: e.currentTarget.value,
    })
    console.log(formData)
  }

  return (
    <div className="mt-10 sm:mt-0">
      <div className="mt-5 md:mt-0 md:col-span-2">
        <form onSubmit={(e) => saveExam(e, formData)} className='Form' >
          <div className="shadow overflow-hidden sm:rounded-md">
            <div className="mx-4 px-4 py-5 bg-white sm:p-6">
              <div className="flex flex-col gap-6 divide-y">
                <div className="px-4 sm:px-0">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">Add Examination</h3>
                  <p className="italic pt-2 text-sm text-gray-600">
                    "Education breeds confidence. Confidence breeds hope. Hope breeds peace. ~ Confucius"
                  </p>
                </div>
                <div className=" pt-6 flex flex-row space-x-80 ">
                  <label className="block text-sm font-medium text-gray-700">
                    Title of Exam
                  </label>
                  <input onChange={handleForm} type="text" name="name" id="name" className=" shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-2/5 sm:text-sm border border-gray-300 rounded-md" />
                </div>
                <div className="pt-6 flex flex-row space-x-80 gap-7">
                  <label className="block text-sm font-medium text-gray-700">
                    Duration
                  </label>
                  <input onChange={handleForm} type="number" name="duration" id="duration" className=" shadow-sm focus:ring-indigo-500 focus:border-indigo-500  block w-1/5 sm:text-sm border border-gray-300 rounded-md" />
                </div>
                <div className=" pt-6 flex flex-row space-x-80 gap-6">
                  <label className="block text-sm font-medium text-gray-700">
                    Question
                  </label>
                  <div className="w-full selection:bg-fuchsia-300 selection:text-fuchsia-900">
                    <textarea placeholder="Your question details ..." onChange={handleForm} rows={6} id="question" name="question" className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-4/5 sm:text-sm border border-gray-300 rounded-md"></textarea>
                      <p className="mt-2 text-sm text-gray-500">
                        Please state your question according to the exam's purpose. 
                        <span>
                          <a className="pl-1 relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500" target="_blank" href="https://commonmark.org/help/"> 
                            Need help writing in Markdown format?
                          </a>
                        </span>
                      </p>
                  </div>
                </div>
                <div className="pt-6 flex flex-row space-x-80">
                  <label className="block text-sm font-medium text-gray-700">
                    StartedDate:
                  </label>
                  <div className="">
                    <input onChange={handleForm} type="datetime-local" id="startedDate" name="startedDate"/>                  
                  </div>
                </div>

                <div className="pt-6 flex flex-row space-x-80 gap-6">
                  <label className="block text-sm font-medium text-gray-700">
                    EndDate:
                  </label>
                  <div className="">
                    <input onChange={handleForm} type="datetime-local" id="endDate" name="endDate"/>                  
                  </div>
                </div>
              </div>
            </div>
            <div className="space-x-2 px-4 py-3 bg-gray-50 text-right sm:px-6">
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