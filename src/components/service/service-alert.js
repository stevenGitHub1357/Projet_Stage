import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
const Success = (title) =>{
    Swal.fire({
        toast: true,
        icon: 'success',
        title: title == "" || title == undefined ?'Operation perform successfully !' : title,
        animation: true,
        position: 'top-right',
        showConfirmButton: false,
        timer: 3000, 
    })
}
const Warning = (title) =>{
        Swal.fire({
            toast: true,
            icon: 'warning',
            title: title == "" || title == undefined ?'Alert Warning !' : title,
            animation: true,
            position: 'top-right',
            showConfirmButton: false,
            timer: 3000, 
        })
    
}
const Danger = (title) =>{
    Swal.fire({
        toast: true,
        icon: 'error',
        title: title == "" || title == undefined ? 'Something went wrong !' : title,
        animation: true,
        position: 'top-right',
        showConfirmButton: false,
        timer: 3000, 
    })
}

export {Success,Warning,Danger}
