"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
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
import { defaultValues } from "../../../constants"
import { title } from "process"
import { CustomField } from "./CustomField"

export const formSchema = z.object({
  Title: z.string(),
  aspectRatio: z.string().optional(),
  color: z.string().optional(),
  prompt: z.string().optional(),
  publicId: z.string(),
})

const TransformationForm = ({action,data=null}:TransformationFormProps) => {

    const initialValues=data && action==="Update"? {
        title:data?.title,
        aspectRatio:data?.aspectRatio,
        color:data?.color,
        prompt:data?.prompt,
        publicId:data?.publicId
    } :defaultValues

    // 1. Define a form 
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues:initialValues
      })
     
      // 2. Define a submit handler.
      function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
      }

  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
     <CustomField
     control={form.control}
        name="Title"
        formLabel="Image Title"
        className="w-full"
        render={({field})=> <Input
    {...field}
    className="input-field"
    />}
     />
    </form>
  </Form>
  )
}

export default TransformationForm