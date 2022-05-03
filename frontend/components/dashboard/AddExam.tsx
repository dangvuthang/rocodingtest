import * as React from 'react'
import CreatedTests from "../interfaces/CreatedTests";
import dayjs from 'dayjs'
import toast, { Toaster } from 'react-hot-toast';

type Props = {
  saveExam: (e: React.FormEvent, formData: CreatedTests | any) => void
  setAdding: (adding: boolean) => any,
}
const AddExam: React.FC<Props> = ({ saveExam, setAdding }) => {
  const [formData, setFormData] = React.useState<CreatedTests | {}>({})
  let [startedDate, setstartedDate] = React.useState("")
  let [endDate, setendDate] = React.useState("")
  let [duration_value, setduration_value] = React.useState<number>(0)
  const handleForm = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement > ): void => {
    setFormData({
      ...formData,
      [e.currentTarget.id]: e.currentTarget.value,
    })
    console.log(formData)
  }
  const handleStartedDate = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement > ): void => {
    setFormData({
      ...formData,
      ["startedDate"]: e.currentTarget.value.substring(0, 16),
    })
    setstartedDate(e.currentTarget.value.substring(0, 16))
    console.log(formData)
  }
  const handleEndDate = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement > ): void => {
    setFormData({
      ...formData,
      ["endDate"]: e.currentTarget.value.substring(0, 16),
    })
    setendDate(e.currentTarget.value.substring(0, 16))
    console.log(formData)
  }
  const handleDuration = ( ): void => {
    setFormData({
      ...formData,
      ["duration"]: duration_value,
    })
    console.log(formData)
  }
  React.useEffect(() => {
    let date1 = dayjs(startedDate)
    let date2 = dayjs(endDate)
    let durationValid= date2.diff(date1, 'minute', true)
    setduration_value(durationValid)
    handleDuration()
  },[duration_value,startedDate,endDate]);

  const handleDuraionValue = ( duraionNum: number) => {
    if(duraionNum <= 60 ){
      return `${duraionNum} mins `;
    }
    else{
      return `${Math.floor(duraionNum/60)} hour `;
    }
  }

  const notify = () => {
    toast.success('Exam has been successfully updated!', {
      duration: 3000,
      position: 'top-right',
      icon: '👏',
      });
  };
  
  return (
    <div className="mt-10 sm:mt-0">
      <div className="mt-5 md:mt-0 md:col-span-2">
        <form onSubmit={(e) => saveExam(e, formData)} method="post" className='Form' >
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
                  <div className="w-full gap-2 flex flex-row selection:bg-fuchsia-300 selection:text-fuchsia-900">
                    <input value={handleDuraionValue(duration_value)} onChange={handleDuration} type="string" name="duration" id="duration" className=" shadow-sm focus:ring-indigo-500 focus:border-indigo-500  block w-1/6 sm:text-sm border border-gray-300 rounded-md" readOnly/>
                  </div>                
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
                    <input onChange={handleStartedDate} type="datetime-local" step="1"  id="startedDate" name="startedDate"/>                  
                  </div>
                </div>

                <div className="pt-6 flex flex-row space-x-80 gap-6">
                  <label className="block text-sm font-medium text-gray-700">
                    EndDate:
                  </label>
                  <div className="">
                    <input onChange={handleEndDate} type="datetime-local" step="1"  id="endDate" name="endDate"/>                  
                  </div>
                </div>
              </div>
            </div>
            <div className="space-x-2 px-4 py-3 bg-gray-50 text-right sm:px-6">
              <button onClick={notify} disabled={formData === undefined ? true : false} type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Save Exam
              </button>
              <button onClick={() => setAdding(false)} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Cancel
              </button>
              <Toaster/>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
export default AddExam;