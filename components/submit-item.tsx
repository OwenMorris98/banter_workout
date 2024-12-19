'use client'

import { useState } from "react";

interface SubmitItemProps {
    labelValue : string
}

export default function SubmitItem({ labelValue } : SubmitItemProps) {

const [submitValue, setSubmitValue] = useState('');


return (
<div>      
   <div className="mb-4">
        <label htmlFor="inputValue" className="block text-md font-medium text-white">{labelValue}</label>
        <input type="text"
             name="inputValue" 
             id="inputValue" 
             className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-lg py-1" 
             value={submitValue}
             onChange={(e) => setSubmitValue(e.target.value)}
             required />
     </div>        
</div>
)};