import { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { MessageCircle, Trash2 } from "lucide-react"
import axios from "axios";
import { toast } from "sonner";
import { format } from "date-fns";
import { useQuery } from "react-query";

const socketUrl = 'ws://localhost:3001';
const ws = new WebSocket(socketUrl);

export const MessagesList = () => {
    const [messagesList, setMessagesList] = useState([]);
    const [reloadMessagesList, setReloadMessagesList] = useState(false);

    const { isLoading, isError, refetch } = useQuery(
        'messages',
        () => axios.get(
            'http://localhost:3001/messages/all'
        ).then((response) => setMessagesList(response.data?.messages || []))
    );

    if (isError) {
        toast.error("Ошибка при получении списка сообщений. Попробуйте позже.");
    }

    useEffect(() => {
        refetch();
    }, [reloadMessagesList]);

    ws.onmessage = (event) => {
        if (event.data === "update") {
            setReloadMessagesList(prevState => !prevState);
            toast.success("Было создано новое сообщение.");
        }
    };

    return (
        <div className="flex-1 overflow-hidden">
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                Список сообщений
            </h4>

            {isLoading && (
                <div className="my-3">
                    Загрузка...
                </div>
            )}

            {!isLoading && (
                <ScrollArea className="flex-1 my-3">
                    {(!messagesList || messagesList.length === 0) && (
                        <p className="leading-7 [&:not(:first-child)]:mt-3">
                            Сообщения отсутствуют
                        </p>
                    )}

                    {messagesList.length > 0 && messagesList.map((message: any, index: number) => (
                        <Alert key={`message-${index}`} className="mt-4">
                            <MessageCircle className="h-4 w-4" />
                            <AlertTitle className="flex justify-between">
                                {message.title}
                                <Badge variant='secondary'>
                                    {format(new Date(message.date), "yyyy-MM-dd HH:mm")}
                                </Badge>
                            </AlertTitle>
                            <AlertDescription>{message.content}</AlertDescription>
                        </Alert>
                    ))}
                </ScrollArea>
            )}
        </div>
    )
}