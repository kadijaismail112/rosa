import { exec } from "child_process";
import path from "path";

// Function to call a Python script with some input data
export const callPythonScript = (inputData: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const scriptPath = path.join(__dirname, "..", "scripts", "functionCalling.py");
    exec(`python "${scriptPath}" "${inputData}"`, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return reject(error);
      }
      if (stderr) {
        console.error(`Python script stderr: ${stderr}`);
        return reject(stderr);
      }
      console.log(`Python script output: ${stdout}`);
      resolve(stdout);
    });
  });
};
