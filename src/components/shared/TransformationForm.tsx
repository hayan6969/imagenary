"use client"

import { object, z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
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
import { aspectRatioOptions, defaultValues, transformationTypes } from "../../../constants"
import { title } from "process"
import { CustomField } from "./CustomField"
import { useState } from "react"
import { AspectRatioKey } from "@/lib/utils"

export const formSchema = z.object({
  Title: z.string(),
  aspectRatio: z.string().optional(),
  color: z.string().optional(),
  prompt: z.string().optional(),
  publicId: z.string(),
})

const TransformationForm = ({action,data=null,userId,creditBalance,type}:TransformationFormProps) => {

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

const onSelectFieldHandler=(value:string, onChangeField:(value:String)=>void)=>{
  
}

const transformationType=transformationTypes[type]
const [image,setImage]=useState(data)
const [newTransformation,setNewTransformation]=useState(null)
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

     {
      type ==="fill" && (
        <CustomField
        control={form.control}
        name="aspectRatio"
        formLabel="Aspect Ratio"
        className="w-full"
        render={({field})=>
<Select
onValueChange={(value)=>{
onSelectFieldHandler(value,field.onChange)
}}
>
  <SelectTrigger className="select-field">
    <SelectValue placeholder="Select Size" />
  </SelectTrigger>
  <SelectContent>
   {
    Object.keys(aspectRatioOptions).map((key)=>(
      <SelectItem className="select-item" key={key} value={key}>{aspectRatioOptions[key as AspectRatioKey].label}</SelectItem>
    ))
   }
  </SelectContent>
</Select>

        }
        />
      )
     }
    </form>
  </Form>
  )
}

export default TransformationForm