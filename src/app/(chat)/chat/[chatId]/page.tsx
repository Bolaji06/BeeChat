"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowUp, Loader2, PersonStandingIcon, Settings } from "lucide-react";
import { useChat } from "@ai-sdk/react";
import { KeyboardEvent } from "react";

import "highlight.js/styles/github-dark.css";
import MessageComponent from "@/components/Message";

export default function Page() {
  const { messages, input, handleInputChange, handleSubmit, status, stop } =
    useChat({});

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey && input.trim().length) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <>
      <section className="relative pr-10 w-full">
        <section className="relative pr-10 w-full">
          <div className="flex justify-end items-center p-4">
            <Button variant={"ghost"} size={"lg"}>
              <Settings />
            </Button>

            <Button variant={"ghost"} size={"lg"}>
              <PersonStandingIcon />
            </Button>
          </div>

          <div className="flex flex-col gap-4 px-4 mb-40 max-w-full lg:max-w-4xl mx-auto">
            {messages.map((message) => (
              <MessageComponent key={message.id} message={message} />
            ))}
          </div>

          {(status === "submitted" || status === "streaming") && (
            <div className="flex justify-start px-4 max-w-3xl mx-auto">
              <div className="bg-muted px-4 py-2 rounded-lg flex items-center gap-2">
                {status === "submitted" && (
                  <Loader2 className="animate-spin h-4 w-4" />
                )}
                <button
                  type="button"
                  onClick={() => stop()}
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Stop generating...
                </button>
              </div>
            </div>
          )}

          <div className="fixed bottom-0 left-0 right-0 flex justify-center border-t z-50 bg-white px-4 py-5">
            <div className="max-w-3xl w-full relative">
              <form onSubmit={handleSubmit}>
                <Textarea
                  name="prompt"
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  disabled={status !== "ready"}
                  value={input}
                  placeholder="What's on your mind?"
                  className="h-24 text-lg text-accent-foreground font-semibold tracking-wider pr-16 resize-none"
                  cols={30}
                />
                <div>
                  <Button
                    disabled={!input.trim().length}
                    type="submit"
                    className="absolute bottom-3 rounded-full w-12 h-12 right-3 text-2xl cursor-pointer hover:scale-105 transition-transform"
                  >
                    <ArrowUp size={28} />
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </section>
    </>
  );
}
