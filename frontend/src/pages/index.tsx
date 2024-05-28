import Image from "next/image";
import { Inter } from "next/font/google";
import { MessageForm } from "@/components/messageForm";
import { MessagesList } from "@/components/messagesList";
import { Separator } from "@/components/ui/separator";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen p-4 md:p-24 overflow-hidden ${inter.className}`}
    >
      <div className="mx-auto flex flex-[0_1_0%] flex-col min-w-full md:min-w-[500px]">
        <MessageForm />
        <Separator className="my-8" />
        <MessagesList />
      </div>
    </main>
  );
}
