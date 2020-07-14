import React from "react";


export const Input =({input,meta,...props}:any)=>{
    const  hasError=meta.touched && meta.error;
    return(
        <div >
            <div>
                <input {...input}{...props} />
            </div>
            {hasError && <span>{meta.error}</span>}

        </div>
    )
}