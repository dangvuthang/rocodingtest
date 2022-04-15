import CreatedTests from "../interfaces/CreatedTests";
import * as React from 'react'

type Property = {
  prop: CreatedTests;
  deleteExam: (deleteId: number) => void
  editRow: ( prop: CreatedTests| any) =>void
}

const ExamCard: React.FC<Property> =  ({ prop , deleteExam, editRow }) => {
  return (
      <div key={prop.exam_id} className="mt-4 ml-4 mr-4 h-32  border border-black flex gap-3 items-center">
        <div className="w-10">
            <input className="ml-2" type="checkbox" />
        </div>
        <div className="">
            <img src="https://picsum.photos/200/120" />
        </div>
        {/* Exam details */}
        <div className="grid justify-between items-center h-full w-4/6">
            <div>
                <h2 className="text-3xl">{prop.name}</h2>
            </div>
            <div>
                {prop.question}
            </div>
            <div>
                System Admin
            </div>
        </div>
        {/* Button Edit and Delete */}
        <div className="flex mr-4 content-center justify-end gap-2 w-2/6">
            <div>
                <button onClick={ () =>{ editRow(prop)} } className="px-4 py-2 text-white rounded-md border-solid border bg-blue-400 ml-5">Edit</button>
            </div>
            <div>
                <button onClick={ () =>{ deleteExam(prop.exam_id)} } className="px-4 py-2 text-white rounded-md border-solid border bg-blue-400 ml-5">Delete</button>
            </div>
        </div>
      </div>
  )
}

export default ExamCard
