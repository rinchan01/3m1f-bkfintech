import React, { useState } from "react";
import AIConsultancy from "../role/AIConsultancy";

const AISupport = () => {
  
  const [inputPrompt, setInputPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (inputPrompt.trim() !== "") {
      try {
        setIsGenerating(true);
        const consultancy = await AIConsultancy(inputPrompt);
        console.log(consultancy);

        const AIText = document.querySelector("#AIResponse");
        if (AIText) {
          AIText.innerHTML = consultancy;
        } else {
          console.error("AI Text Container not found");
        }
      } catch (error) {
        console.error("Error generating text", error);
      } finally {
        setIsGenerating(false);
      }
    }
  };

  return (
      <div
         id="AIConsultancy"
         className=" w-full justify-center items-center flex flex-col border-x-4 border-gray-300 z-30 px-10 py-5"
      >
         <div className="rounded-lg border border-gray-300 bg-white text-card-foreground shadow-sm w-full p-5 flex-col flex">
            <div className=" w-full p-6 pt-0 flex flex-row space-x-2 relative">
               <input
                 className=" w-[70%] px-2 bg-transparent border-[1px] border-gray-300 rounded-lg placeholder:text-gray-700"
                  type="text"
                  placeholder="What do you need?"
                  value={inputPrompt}
                  onChange={(event) => setInputPrompt(event.target.value)}
                  required
               />
               <button
                 className={` ${isGenerating ? 'bg-gray-400 cursor-not-allowed text-white' : ''} cursor-pointer bg-blue-200 hover:bg-blue-300 text-blue-600 font-bold py-2 px-4 rounded-lg flex items-center`}
                  type="button"
                  aria-haspopup="dialog"
                  aria-expanded="false"
                  aria-controls="radix-:Rl6ula:"
                  data-state="closed"
                  onClick={() => handleGenerate()}
                  disabled={isGenerating}
               >
                  Send Messages
               </button>
            </div>
            <div className=" w-full flex justify-start items-center flex-col gap-2">
               <p className="font-bold">Answer the question:</p>
               <article className=" w-full min-h-[20vh] break-words bg-transparent border-[1px] border-gray-300 rounded-lg placeholder:text-gray-300 p-4">
                  <p id="AIResponse"></p>
               </article>
            </div>
         </div>
      </div>
   );

}

export default AISupport;