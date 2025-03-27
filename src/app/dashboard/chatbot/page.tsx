"use client";
import typingAnimation from "@/app/static/loading/typing.json";
import { chatbotService } from "@/app/service/chatbotService";
import { userInfoState } from "@/app/store/accountAtoms";
import { showToast } from "@/app/utils/toast";
import { Button } from "@heroui/react";
import { useMutation } from "@tanstack/react-query";
import DOMPurify from "isomorphic-dompurify";
import { useAtomValue } from "jotai";
import dynamic from "next/dynamic";
import { ChangeEvent, ReactNode, useState } from "react";
import { GrCircleInformation } from "react-icons/gr";
import { RiAttachment2, RiSendPlaneLine } from "react-icons/ri";
const DynamicLottie = dynamic(() => import("lottie-react"), { ssr: false });
export default function ChatbotPage() {
  const info = useAtomValue(userInfoState);
  const numericPart = info?.userId.replace(/\D/g, "");
  const [prompt, setPrompt] = useState("");
  const [realPrompt, setRealPrompt] = useState("");
  const [response, setReponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [rows, setRows] = useState(1);
  const replaceHTML = response.replace(/\n\s*\n/g, "<br />");

  const sanitizedHTML = DOMPurify.sanitize(replaceHTML, {
    ALLOWED_TAGS: [
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "p",
      "ul",
      "ol",
      "li",
      "strong",
      "em",
      "br",
      "div",
    ],
    ALLOWED_ATTR: [],
  });
  const chatbotMutation = useMutation({
    mutationKey: ["chatbot"],
    mutationFn: chatbotService,
    onMutate() {
      setIsLoading(true);
    },
    onSuccess(data) {
      if (data) {
        setReponse(data.message);
        setIsLoading(false);
      }
      setIsLoading(false);
    },
  });

  const handleOnChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value);
    const lineBreaks = e.target.value.split("\n").length;
    setRows(lineBreaks > 1 ? Math.min(lineBreaks, 5) : 1);
  };
  const handleSend = async () => {
    setRows(1);
    setRealPrompt(prompt);
    setPrompt("");
    if (prompt === "") {
      showToast("Vui lòng nhập câu hỏi", "error");
      return;
    }
    try {
      await chatbotMutation.mutateAsync({
        id: numericPart as string,
        message: prompt,
      });
    } catch (error) {
      console.error(error);
    }
  };
  const recommendPrompts: RecommendPromptProps[] = [
    {
      icon: <GrCircleInformation className="text-[20px]" />,
      message: "Cho tôi biết một số thông tin về PicareVN Loyalty",
    },
    {
      icon: <GrCircleInformation className="text-[20px]" />,
      message: "Cho tôi biết một số thông tin về PicareVN Loyalty",
    },
    {
      icon: <GrCircleInformation className="text-[20px]" />,
      message: "Cho tôi biết một số thông tin về PicareVN Loyalty",
    },
    {
      icon: <GrCircleInformation className="text-[20px]" />,
      message: "Cho tôi biết một số thông tin về PicareVN Loyalty",
    },
  ];
  return (
    <div className="relative flex flex-col font-open py-[20px] justify-between !overflow-hidden">
      {/* Introduce */}
      {realPrompt === "" && (
        <div className="flex flex-col items-center justify-center h-[550px] px-[40px]">
          <p className="text-[26px] font-bold bg-gradient-to-bl from-[#86efac] via-[#fcd34d] to-[#f9a8d4] bg-clip-text text-transparent">
            Chào mừng đến với Loyalty Chatbot
          </p>
          <div className="grid grid-cols-4 mt-[30px] gap-x-[10px]">
            {recommendPrompts.map((prompt, i) => (
              <RecommendPrompt key={i} {...prompt} />
            ))}
          </div>
        </div>
      )}
      {/* Main Chatbox */}
      {realPrompt !== "" && (
        <div className="flex flex-col min-h-[550px] max-h-[550px] !overflow-auto px-[40px] pt-[20px]">
          <div className="flex justify-end">
            <MyPrompt prompt={realPrompt} />
          </div>
          <div className="flex">
            {isLoading ? (
              <>
                <DynamicLottie
                  animationData={typingAnimation}
                  loop={true}
                  className="w-[80px] h-[80px]"
                />
              </>
            ) : (
              <>
                <div
                  className=" py-[10px] px-[20px] mt-[30px] mb-[50px]"
                  style={{
                    fontSize: "14px",
                    lineHeight: "2",
                  }}
                  dangerouslySetInnerHTML={{
                    __html: sanitizedHTML,
                  }}
                ></div>
              </>
            )}
          </div>
        </div>
      )}
      {/* Prompt input */}
      <div className="fixed w-[calc(100vw-270px)] bottom-0 py-[30px] bg-background px-[40px] flex flex-col">
        {/* Search */}
        <div className="group flex items-center py-3 px-3 border-[2px] justify-between gap-x-4 border-neutral-600 border-opacity-20 rounded-[15px] transition-all duration-300 hover:border-opacity-80 focus-within:border-opacity-80 hover:shadow-md focus-within:shadow-md">
          <div className=" flex items-center w-[90%]">
            <Button
              isIconOnly
              variant="light"
              radius="full"
              isDisabled={isLoading}
              size="md"
            >
              <RiAttachment2 className="text-[22px] text-normal" />
            </Button>
            <textarea
              rows={rows}
              value={prompt}
              disabled={isLoading}
              onChange={handleOnChange}
              placeholder="Hãy hỏi LoyaltyAI bất kỳ điều gì..."
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault(); // Ngăn xuống dòng
                  handleSend();
                }
              }}
              className="placeholder:!text-normal placeholder:text-opacity-10 resize-none outline-none bg-transparent border-none w-full disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
            />
          </div>
          <div className="">
            <Button
              isDisabled={isLoading}
              isIconOnly
              variant="light"
              radius="full"
              color="default"
              size="md"
              onPress={handleSend}
            >
              <RiSendPlaneLine className="text-[22px]" />
            </Button>
          </div>
        </div>
        <div className="flex items-center justify-center mt-[15px]">
          <p className="text-normal text-[12px]">
            Tiến trình có thể sẽ mất một chút thời gian, dữ liệu AI đưa ra có
            thể không đúng
          </p>
        </div>
      </div>
    </div>
  );
}

interface RecommendPromptProps {
  message: string;
  icon: ReactNode;
  onClick?: () => void;
}

function RecommendPrompt(props: RecommendPromptProps) {
  return (
    <div
      className="flex flex-col p-[15px] bg-neutral-700 bg-opacity-20 w-full rounded-xl gap-y-[7px] cursor-pointer duration-300 transition-all hover:bg-opacity-60"
      onClick={props.onClick}
    >
      <div className="">{props.icon}</div>
      <p className="text-normal text-sm">{props.message}</p>
    </div>
  );
}

interface MyPromptProps {
  prompt: string;
}

function MyPrompt(props: MyPromptProps) {
  return (
    <div
      className="flex bg-neutral-700 bg-opacity-40 text-sm py-[10px] px-[20px] w-[40%] rounded-xl leading-loose"
      dangerouslySetInnerHTML={{
        __html: props.prompt,
      }}
    ></div>
  );
}
