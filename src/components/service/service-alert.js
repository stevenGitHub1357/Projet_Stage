import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
const Success = (theme,title) =>{
    Swal.fire({
        toast: true,
        icon: 'success',
        title: title == "" || title == undefined ?'Operation perform successfully !' : title,
        // animation: true,
        position: 'top-right',
        showConfirmButton: false,
        timer: 3000, 
        background: theme ? "#000000" : "#ffffff"
    })
}
const Warning = (title) =>{
        Swal.fire({
            toast: true,
            icon: 'warning',
            title: title == "" || title == undefined ?'Alert Warning !' : title,
            // animation: true,
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
        // animation: true,
        position: 'top-right',
        showConfirmButton: false,
        timer: 3000, 
    })
}

const Confirmation = (theme,title,confirmButtonText,showCancelButton) => {
    return Swal.fire({
      title: title ,
      icon: "warning",
      showCancelButton: showCancelButton,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: confirmButtonText ,
      background: theme ? "#000000" : "#ffffff"
    });
  };

export {Success,Warning,Danger,Confirmation}
