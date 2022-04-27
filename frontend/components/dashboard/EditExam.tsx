import * as React from 'react'
import CreatedTests from "../interfaces/CreatedTests";
import dayjs from 'dayjs'

type Props = {
    updateExam: (e: React.FormEvent, _id: string, exam: CreatedTests) => void
    currentUser: CreatedTests | any
    setEditing: (editing:boolean) => any
  }
  

  const EditExam: React.FC<Props> = ({ updateExam, currentUser ,setEditing}) => {
    const [exam, setExam] = React.useState<CreatedTests| any>({})
    let [startedDate, setstartedDate] = React.useState("")
    let [endDate, setendDate] = React.useState("")
    let [duration_value, setduration_value] = React.useState<number>()
    const dayStarted = dayjs(currentUser.startedDate).format('YYYY-MM-DDTHH:mm:ss') 
    const dayEnded = dayjs(currentUser.endDate).format('YYYY-MM-DDTHH:mm:ss')

    const handleForm = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setExam({
        ...exam,
        [e.currentTarget.id]: e.currentTarget.value,
      })
      console.log(exam)
    }
    const handleStartedDate = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement > ): void => {
      setExam({
        ...exam,
        ["startedDate"]: e.currentTarget.value.substring(0, 16),
      })
      setstartedDate(e.currentTarget.value.substring(0, 16))
      console.log(exam)
    }
    const handleEndDate = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement > ): void => {
      setExam({
        ...exam,
        ["endDate"]: e.currentTarget.value.substring(0, 16),
      })
      setendDate(e.currentTarget.value.substring(0, 16))
      console.log(exam)
    }
    const handleDuration = ( ): void => {
      setExam({
        ...exam,
        ["duration"]: duration_value,
      })
      console.log(exam)
    }
    React.useEffect(() => {
      let date1 = dayjs(startedDate)
      let date2 = dayjs(endDate)
      setduration_value(date2.diff(date1, 'minute', true))
      handleDuration()
    },[duration_value,startedDate,endDate]);
  return (
    <div className="mt-10 sm:mt-0">
    <div className="mt-5 md:mt-0 md:col-span-2">
      <form onSubmit={(e) => updateExam( e, currentUser._id , exam)} method="post" className='Form' >
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
                <input defaultValue={currentUser.name} onChange={handleForm} type="text" name="name" id="name" className=" shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-2/5 sm:text-sm border border-gray-300 rounded-md" />
              </div>
              <div className="pt-6 flex flex-row space-x-80 gap-7">
                <label className="block text-sm font-medium text-gray-700">
                  Duration
                </label>
                <div className="w-full gap-2 flex flex-row selection:bg-fuchsia-300 selection:text-fuchsia-900">
                    <input value={duration_value} onChange={handleDuration} type="string" name="duration" id="duration" className=" shadow-sm focus:ring-indigo-500 focus:border-indigo-500  block w-1/6 sm:text-sm border border-gray-300 rounded-md" />
                    <p className=" text-sm text-gray-500">mins - {currentUser.duration} mins</p>    
                  </div>              
               </div>
              <div className=" pt-6 flex flex-row space-x-80 gap-6">
                <label className="block text-sm font-medium text-gray-700">
                  Question
                </label>
                <div className="w-full selection:bg-fuchsia-300 selection:text-fuchsia-900">
                  <textarea defaultValue={currentUser.question} placeholder="Your question details ..." onChange={handleForm} rows={6} id="question" name="question" className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-4/5 sm:text-sm border border-gray-300 rounded-md"></textarea>
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
                  <input defaultValue={dayStarted} onChange={handleStartedDate} step ="1" type="datetime-local" id="startedDate" name="startedDate"/>                  
                </div>
              </div>
              <div className="pt-6 flex flex-row space-x-80 gap-6">
                <label className="block text-sm font-medium text-gray-700">
                  EndDate:
                </label>
                <div className="">
                  <input defaultValue={dayEnded} onChange={handleEndDate} step ="1" type="datetime-local" id="endDate" name="endDate"/>                  
                </div>
              </div>
            </div>
          </div>
          <div className="space-x-2 px-4 py-3 bg-gray-50 text-right sm:px-6">
            <button disabled={exam === undefined ? true : false} type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Update Exam
            </button>
            <button onClick={() => setEditing(false)} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
  )
}
{/*  <form className='Form' onSubmit={(e) => {updateExam( exam.exam_id , exam); e.preventDefault(); }}>
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
        </form> */}
export default EditExam;