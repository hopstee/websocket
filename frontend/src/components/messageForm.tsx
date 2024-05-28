import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import axios from "axios";

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useMutation } from "react-query";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const formSchema = z.object({
    title: z.string().min(2, {
        message: "Заголовок должен быть не меньше двух символов.",
    }),
    content: z.string().min(2, {
        message: "Сообщение должно быть не меньше двух символов.",
    }),
})

export const MessageForm = () => {
    const mutation = useMutation({
        mutationFn: (data: any) => {
          return axios.post('http://localhost:3001/messages/add', data)
        },
        onError: (error) => {
            toast.error("Ошибка", {
                description: "Повторите попытку позже"
            });
        }
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            content: "",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        mutation.mutate(values);
        form.reset();
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Заголовок</FormLabel>
                            <FormControl>
                                <Input placeholder="Новое сообщение" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Сообщение</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Вчера вечером шел дождь" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {mutation.isLoading && (
                    <Button disabled className="w-full">
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Добавить
                    </Button>
                )}

                {!mutation.isLoading && (
                    <Button type="submit" className="w-full">Добавить</Button>
                )}
            </form>
        </Form>
    )
}
