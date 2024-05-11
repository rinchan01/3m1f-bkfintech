import axios from "axios";

const api_key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiOTFlMGNmMWQtYTNjMi00ZThkLTlhZTItNWZkOTJkZDgzODJlIiwidHlwZSI6ImFwaV90b2tlbiJ9.zgcwic78X0b6K6DKLf-iRgJOFiIJglgAGtv3CwLsh2I"

function AIConsultancy(prompt) {

  const options = {
    method: "POST",
    url: "https://api.edenai.run/v2/text/chat",
    headers: {
      authorization: `Bearer ${api_key}`,
    },
    data: {
      providers: "openai",
      text: prompt,
      chatbot_global_action: "Act as an assistant",
      previous_history: [],
      temperature: 0.0,
      max_tokens: 150,
      fallback_providers: "openai",
    },
  };

  return axios
    .request(options)
    .then((response) => {
      const consultancy = response?.data?.openai?.generated_text;
      return consultancy;
    })
    .catch((error) => {
      console.error(error);
    });
}

export default AIConsultancy;