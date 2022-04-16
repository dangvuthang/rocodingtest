import axios, { AxiosResponse, Method } from "axios";
import { Response } from "express";
import { AuthRequest } from "../controllers/AuthController";

export const getSubmission = async (req: AuthRequest, res: Response) => {

    const {language, source, stdin} = req.body;
    const methodPost : Method  = 'POST';
    const methodGet: Method = 'GET';
    let language_id;

    if(language == 'Python'){
        language_id = 72
    } else if (language == 'C++') {
        language_id = 52
    } else if (language == 'Java') {
        language_id = 62
    }

    let options = {
        method: methodPost,
        url: 'https://judge0-ce.p.rapidapi.com/submissions',
        params: {base64_encoded: 'true', fields: '*'},
        headers: {
          'content-type': 'application/json',
          'Content-Type': 'application/json',
          'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
          'X-RapidAPI-Key': 'def8fa5ab2msh13479c5814fe5a6p155afejsn04dc3768057b'
        },
        data : {
            "source_code": Buffer.from(source, 'binary').toString('base64'),
            "language_id": language_id,
            "stdin": stdin,
        }
      };


    try {
        let response = await axios.request(options);
        let {token} = response.data;
        let responseResult: AxiosResponse<any, any>;
        if(token){
            let solutions = {
                method: methodGet,
                url: `https://judge0-ce.p.rapidapi.com/submissions/${token}`,
                params: {base64_encoded: 'true', fields: '*'},
                headers: {
                  'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
                  'X-RapidAPI-Key': 'def8fa5ab2msh13479c5814fe5a6p155afejsn04dc3768057b'
                }
            };
            responseResult = await axios.request(solutions);
        }
        let {stdout, time, memory, stderr, compilation_error} = responseResult!.data
        if (stdout) {
            let output = Buffer.from(stdout, 'base64').toString('binary');
            console.log(output);
            return res.status(200).json({
                status: "success",
                data: {
                  "output": output,
                  "execution_time": time,
                  "memory": memory

                },
              });
          } else if (stderr) {
            let error = Buffer.from(stderr, 'base64').toString('binary');
            return res.status(400).json({
                status: "error",
                msg: error
              });
          } else {
            let compilation_error_mss = Buffer.from(compilation_error, 'base64').toString('binary');
            return res.status(400).json({
                status: "error",
                msg: compilation_error_mss
              });
          }

    } catch (err) {
        return res.status(400).json({
            status: "error",
            message: err.message,
        });
    }

};