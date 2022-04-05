import { FC, useState } from "react";
import MonacoEditor from "@monaco-editor/react";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
} from "@mui/material";
interface EditorProps {}

const languages = ["javascript", "java", "python"];

const upperCaseFirstCharacter = (input: string) => {
  return input.substring(0, 1).toUpperCase() + input.substring(1);
};

const Editor: FC<EditorProps> = () => {
  const [editorContent, setEditorContent] = useState("");
  const [language, setLanguage] = useState("javascript");

  const handleEditorOnChange = (value: string | undefined) => {
    if (value) setEditorContent(value);
  };

  const handleLanguageChanged = (e: SelectChangeEvent) => {
    setLanguage(e.target.value);
  };

  return (
    <Stack spacing={1} alignItems="flex-start" sx={{ height: "100%" }}>
      <Box width={135}>
        <FormControl fullWidth size="small">
          <InputLabel id="language-label">Language</InputLabel>
          <Select
            autoWidth={false}
            labelId="language-label"
            id="language"
            value={language}
            label="Langugage"
            onChange={handleLanguageChanged}
          >
            {languages.map((lang) => (
              <MenuItem key={lang} value={lang}>
                {upperCaseFirstCharacter(lang)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <MonacoEditor
        height="100%"
        defaultLanguage={language}
        language={language}
        theme="vs-dark"
        value={editorContent}
        onChange={handleEditorOnChange}
      />
    </Stack>
  );
};

export default Editor;
