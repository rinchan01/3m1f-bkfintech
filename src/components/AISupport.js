import React, { useState } from "react";
import AIConsultancy from "../role/AIConsultancy";
import p2p from '../assets/PEER_TO_PEER.svg';

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
      <>
            <section id="AIConsultancy" className="bg-white dark:bg-gray-900">
                  <div className="grid max-w-screen-xl px-4 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
                    <div className="mr-auto place-self-center lg:col-span-6">
                        <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
                            Advice from AI
                        </h1>
                        <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
                            Trouble getting to know something? Ask the AI Consultancy!
                        </p>
                    </div>

                    <div class="mr-auto place-self-center lg:col-span-5 ">
                        <div className='tab-content mt-5'>
                          <div className="w-full justify-center items-center flex flex-col  z-30 px-10 py-5">
                            <div className="rounded-lg border border-gray-300 bg-white text-card-foreground shadow-sm w-full p-5 flex-col flex">
                              <div className="w-full p-6 pt-0 flex flex-row space-x-2 relative">
                                <input
                                  className="w-[70%] px-2 bg-transparent border-[1px] border-gray-300 rounded-lg placeholder:text-gray-700"
                                  type="text"
                                  placeholder="What do you need?"
                                  value={inputPrompt}
                                  onChange={(event) => setInputPrompt(event.target.value)}
                                  required
                                />
                                <button
                                  className={`${
                                    isGenerating ? 'bg-gray-400 cursor-not-allowed text-white' : 'bg-blue-200 hover:bg-blue-300'
                                  } cursor-pointer text-blue-600 font-bold py-2 px-4 rounded-lg flex items-center`}
                                  type="button"
                                  onClick={handleGenerate}
                                  disabled={isGenerating}
                                >
                                  Send
                                </button>
                              </div>
                              <div className="w-full flex justify-start items-center flex-col gap-2">
                                <p className="font-bold">Answer:</p>
                                <article className="w-full min-h-[20vh] break-words bg-transparent border-[1px] border-gray-300 rounded-lg placeholder:text-gray-300 p-4">
                                  <p id="AIResponse"></p>
                                </article>
                              </div>
                            </div>
                          </div>
                        </div>
                    </div>              
                </div>

                
            </section>
        </>
   );
}

export default AISupport;