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
import { useState, useTransition } from "react"
import { AspectRatioKey, debounce, deepMergeObjects } from "@/lib/utils"
import { updateCredits } from "@/lib/actions/users.actions"
import MediaUploader from "./MediaUploader"
import TransformedImage from "./TransformedImage"

export const formSchema = z.object({
  Title: z.string(),
  aspectRatio: z.string().optional(),
  color: z.string().optional(),
  prompt: z.string().optional(),
  publicId: z.string(),
})

const TransformationForm = ({action,data=null,userId,config=null,creditBalance,type}:TransformationFormProps) => {

    const initialValues=data && action==="Update"? {
        title:data?.title,
        aspectRatio:data?.aspectRatio,
        color:data?.color,
        prompt:data?.prompt,
        publicId:data?.publicId
    } :defaultValues

    // 1. Defined a form 
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues:initialValues
      })
     
      // 2. Defined a submit handler.
      function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
      }

const onSelectFieldHandler=(value:string, onChangeField:(value:String)=>void)=>{
  const imageSize=aspectRatioOptions[value as AspectRatioKey]
  setImage((prevState:any)=>({
    ...prevState,
    aspectRatio:imageSize.aspectRatio,
    width:imageSize.width,
    height:imageSize.height
  }))

  setNewTransformation(transformationType.config)
  return onChangeField(value)
}
const onInputChangeHandler=(fieldName:string,type:string,value:string,onChangeField:(value:String)=>void)=>{
debounce(()=>{
  setNewTransformation((prevState:any)=>(
    {
      ...prevState,
      [type]:{
        ...prevState?.[type],
        [fieldName=== 'prompt' ? 'prompt':'to']:value
      }
      
    }
  ))

  return onChangeField(value)
},1000)
}

  // TODO: Return to updateCredits
const onTransformhandler=async()=>{
setIsTransforming(true)
setTransformationConfig(
  deepMergeObjects(newTransformation,transformationConfig) //merges all the keys in the two objects and gives a new object with the keys which is then set to the transformation config

)
setNewTransformation(null)

startTransition(async ()=>{
  // await updateCredits(userId,creditFee)
})
}
const [isPending,startTransition]=useTransition()
const [isSubmitting,setIsSubmitting]=useState(false)
const [isTransforming,setIsTransforming]=useState(false)
const [transformationConfig,setTransformationConfig]=useState(config)
const transformationType=transformationTypes[type]
const [image,setImage]=useState(data)
const [newTransformation,setNewTransformation]=useState<typeof transformationType.config | null>(null)
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

     {
      (type==="remove" || type==="recolor") && (
        <div className="prompt-field">
          <CustomField
          control={form.control}
          name="prompt"
          formLabel={
            type==="remove"?"Object to remove":"object to recolor"
          }
          className="w-full"
          render={({field})=> <Input
          value={field.value}
          className="input-field"
          onChange={(e)=>onInputChangeHandler(
            'prompt',
            e.target.value,
            type,
            field.onChange,
            
          )}

          /> }
         />
{
  type==="recolor" && (
    <CustomField
    control={form.control}
    name="color"
    formLabel="Replacement Color"
    className="w-full"
    render={({field})=> <Input
    value={field.value}
    className="input-field"
    onChange={(e)=>onInputChangeHandler(
      'color',
      e.target.value,
      'recolor',
      field.onChange,
      
    )}

    /> }
   />
  )
}

        </div>
      )
     }

     <div className="media-uploader-field">
<CustomField

control={form.control}
name="publicId"
className="flex size-full flex-col"
render={({field})=>(
  <MediaUploader
  onValueChange={field.onChange}
  setImage={setImage}
  publicId={field.value}
  image={image}
  type={type}
  />
)
}



/>

<TransformedImage
image ={image}
type={type}
title={form.getValues().Title}
transformationConfig={transformationConfig}
setIsTransforming={setIsTransforming}
isTransforming={isTransforming}
/>

     </div>

     <div className="flex flex-col gap-4">

     <Button type="button"
     className="submit-button capitalize"
     onClick={onTransformhandler}
     disabled={isTransforming || newTransformation===null }
     >

{
  isTransforming ? "Transforming...": "Apply Transformation"
}

     </Button>


     <Button type="submit"
     className="submit-button capitalize"
     disabled={isSubmitting }
     >{
isSubmitting ? "Submitting...": "Save Image"
     }
     </Button>
     </div>

     
    </form>
  </Form>
  )
}

export default TransformationForm