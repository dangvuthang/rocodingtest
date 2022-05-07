import Editor from "@monaco-editor/react";
import { FC, ChangeEvent, Dispatch, SetStateAction } from "react";

interface CodeAreaProps {
  language: string;
  setLanguage: Dispatch<SetStateAction<string>>;
  content: string;
  setContent: Dispatch<SetStateAction<string>>;
}

const languages = ["javascript", "java", "python"];

const displayLanguage = (language: string) =>
  `${language.slice(0, 1).toUpperCase() + language.slice(1)}`;

const CodeArea: FC<CodeAreaProps> = ({
  language,
  content,
  setLanguage,
  setContent,
}) => {
  const handleContentChanged = (value: string | undefined) => {
    if (value) setContent(value);
    else setContent("");
  };

  const handleLanguageChanged = (e: ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value);
  };

  return (
    <div className="flex flex-col w-full h-full bg-[#f7f9fa] pl-3 gap-y-1">
      <div className="flex items-center">
        <div className="text-sm flex justify-center items-center py-[1px] gap-x-2 border border-transparent text-[#37474f] ">
          <select
            className="pr-12 pl-4 text-[#546e7a] border-[#cfd8dc] focus:ring-[#263238] focus:text-[#263238]"
            onChange={handleLanguageChanged}
          >
            {languages.map((language) => (
              <option key={language} value={language}>
                {displayLanguage(language)}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="w-full h-full">
        <Editor
          width="100%"
          height="100%"
          theme="vs-dark"
          language={language}
          onChange={handleContentChanged}
          value={content}
        />
      </div>
    </div>
  );
};

export default CodeArea;
