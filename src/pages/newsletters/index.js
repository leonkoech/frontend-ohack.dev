import { textAlign } from "@mui/system";
import React from "react";
import reactDom from "react-dom";

export default function newsletters(){
   return(
    //    <div>
           <form id="newsletterForm">
               <label> Enter your title:</label><br></br>
                <input type= "Header" /><br></br>
                <label>Enter your contents:<br></br></label>
                <textarea id="w3review" name="w3review" rows="4" cols="50">
                    At w3schools.com you will learn how to make a website. They offer free tutorials in all web development technologies.
                    </textarea>
                <button type="button"> "Send" </button>
           </form>
    //    </div>

   )
}