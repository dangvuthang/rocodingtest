import { FC } from "react";
import ReactMarkdown from "react-markdown";
import { AnnotationIcon } from "@heroicons/react/outline";
interface QuestionAreaProps {
  question: string;
}

const QuestionArea: FC<QuestionAreaProps> = ({ question }) => {
  return (
    <div className="flex flex-col h-full">
      <div className="bg-[#f7f9fa] flex">
        <div className="text-sm flex justify-center items-center px-11 py-3 bg-white gap-x-2 border border-transparent text-[#37474f]">
          <AnnotationIcon className="h-4 w-4" />
          <div>Description</div>
        </div>
      </div>
      <div className="h-full overflow-auto flex flex-col">
        <ReactMarkdown className="prose prose-sm flex flex-col px-5">
          {question}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default QuestionArea;
