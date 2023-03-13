import TextareaAutosize from '@mui/base/TextareaAutosize';

export default function SubscriberList (props){
    const value = []
    
    if(props.subscribers != undefined) {
      props.subscribers[props.item_name]?.forEach((v) => {
        // filter here
        if(String(v.subscribe) == props.is_subscribed){
          value.push(v.email)
        }
        
        })
    }
                 
                

    return(
    
      props.is_editable? <TextareaAutosize
       id="textarea"
       name="textarea"
       className="text_area text_area_subs full_width"
       minRows={3}
       cols="50"
       aria-label="email list text area"
       placeholder={
        value == []?"Email list is empty": value
       }
       onChange={
        (e)=>{
          
         let final_list=[]
          let new_list = e.target.value.split(",").map((address)=>{
            return address
         })
         if(props.subscribers[props.item_name]){
          for(let item of props.subscribers[props.item_name]){
            //filter here
          for(let address of new_list){
            if(item.email == address){
              final_list.push(item)
            }
          }
          
         }
          props.subscribers_list(final_list)
         }
         
        }
       }

     />
     :
     <TextareaAutosize 
      id="textarea"
      name="textarea"
      className="text_area text_area_subs full_width"
      minRows={3}
      cols="50"
      aria-label="email list text area"
      placeholder = "Email list is empty"
      defaultValue= {value}
      readOnly
      // style={{ width: 200 }}
      
       /> 
  
    )
}