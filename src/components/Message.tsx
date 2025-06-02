/* eslint-disable @typescript-eslint/no-explicit-any */
import { formatTextContent } from "@/utils/formatMessageContent";
import { useEffect, useRef, useState } from "react";

/// Separate component to handle async markdown processing
export default function MessageComponent({ message }: { message: any }) {
  const [formattedContent, setFormattedContent] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const messageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (message.role === "assistant") {
      setIsProcessing(true);
      formatTextContent(message.content)
        .then(setFormattedContent)
        .finally(() => setIsProcessing(false));
    }
  }, [message.content, message.role]);

  useEffect(() => {
    messageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [message.content, message.role]);


  if (message.role === "user") {
    return (
      <div className="flex justify-end" ref={messageRef}>
        <div className="bg-primary text-primary-foreground px-4 py-2 rounded-2xl rounded-tr-none max-w-full lg:max-w-[80%]">
          {message.content}
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-start">
      <div
        className="px-6 py-4 w-full lg:max-w-full max-w-full rounded-lg prose prose-sm prose-neutral dark:prose-invert 
                   prose-headings:mt-8 prose-headings:mb-4 prose-headings:font-semibold
                   prose-p:mb-6 prose-p:leading-7 prose-p:text-gray-700 dark:prose-p:text-gray-300
                   prose-pre:p-0 prose-pre:my-6 prose-pre:bg-gray-900 prose-pre:border prose-pre:border-gray-200 dark:prose-pre:border-gray-700
                   prose-code:text-sm prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-red-600 dark:prose-code:text-red-400
                   prose-ul:my-6 prose-ol:my-6 prose-li:my-2
                   prose-blockquote:my-6 prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:pl-4 prose-blockquote:italic
                   prose-hr:my-8 prose-hr:border-gray-300 dark:prose-hr:border-gray-600
                   prose-table:my-6 prose-th:border prose-th:border-gray-300 dark:prose-th:border-gray-600 prose-th:bg-gray-50 dark:prose-th:bg-gray-800 prose-th:px-4 prose-th:py-2
                   prose-td:border prose-td:border-gray-300 dark:prose-td:border-gray-600 prose-td:px-4 prose-td:py-2
                   prose-strong:font-semibold prose-strong:text-gray-900 dark:prose-strong:text-gray-100
                   prose-em:italic prose-em:text-gray-700 dark:prose-em:text-gray-300"
        dangerouslySetInnerHTML={{
          __html: isProcessing
            ? "Processing..."
            : formattedContent || message.content,
        }}
      />
    </div>
  );
}
