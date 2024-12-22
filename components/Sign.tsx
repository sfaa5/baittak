
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";


const onSelectChange = () => {

    
}


function Sign() {
  return (
    <Select  onValueChange={onSelectChange}>
    <SelectTrigger
      className='w-[80px] h-8 border-none bg-transparent focus:ring-0 focus:ring-offset-0'

    >
      <SelectValue />
    </SelectTrigger>
    <SelectContent>
   
        <SelectItem  value='sign-out'>
  SIGN OUT      
        </SelectItem>


    </SelectContent>
  </Select>
  )
}

export default Sign