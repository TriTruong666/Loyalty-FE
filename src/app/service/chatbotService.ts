import axios from "axios";

interface ChatboxProps {
  id: string;
  message: string;
}

export const chatbotService = async (data: ChatboxProps) => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_CHATBOT_API}/loyalty-chatbot`,
      data,
      {
        headers: {
          Authorization: `Basic ${process.env.NEXT_PUBLIC_CHATBOT_TOKEN}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
