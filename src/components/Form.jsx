import React, { useContext,useEffect, useState, useRef } from 'react';
import Display from './Display';
import { context } from '../context/context'
import { contextEdit } from '../context/context';
import { v4 as uuidv4 } from 'uuid';


const Form = () => {
  
  const [form, setForm] = useContext(context);
  const [edit, setEdit] = useContext(contextEdit);
  const eyeRef = useRef(null);
  const passShow = useRef(null);
  const formRef = useRef(null);

useEffect(() => {
  const storedPasswords = localStorage.getItem('passwords');

  if (storedPasswords) {
    try {
      const parsedPasswords = JSON.parse(storedPasswords);
      setForm(parsedPasswords);
      console.log('local', parsedPasswords);
    } catch (error) {
      console.error('Error parsing JSON:', error);
    }
  } else {
    setForm([]);
  }
}, []);

useEffect(() => {
  if(edit){
    document.getElementById('site').value=edit[0].site;
    document.getElementById('username').value=edit[0].username;
    document.getElementById('password').value=edit[0].password;

    console.log(edit[0].site)
  }
}, [edit]);


  

  

  const toggleEye = () => {
    if (eyeRef.current.src.includes('public/img/eye.png')) {
      eyeRef.current.src = 'public/img/eye-off.png';
      passShow.current.type = 'text';
    } else {
      eyeRef.current.src = 'public/img/eye.png';
      passShow.current.type = 'password';
    }
  };

  const savePass = (e) => {
    e.preventDefault();
    const site = document.getElementById('site').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
  

    const newEntry = { id:uuidv4(),site, username, password };
    const updatedForm = [...form, newEntry];
    setForm(updatedForm);
    localStorage.setItem('passwords', JSON.stringify(updatedForm));
    formRef.current.reset();
  };

  return (
    <>    
    
    <div className='flex flex-col gap-2 bg-blue-100 container w-1/2 mx-auto p-4 rounded-md'>
      <form action="" ref={formRef} onSubmit={(e)=>{savePass(e)}}>
        <div className='w-full'>
          <input type="text" className='p-2 rounded-lg my-1 w-full' name="site" id="site" placeholder='sitename' required />
        </div>
        <div className='w-full'>
          <input type="text" className='p-2 rounded-lg my-1 w-full' name="username" id="username" placeholder='username' required />
        </div>
        <div className='w-full relative'>
          <input ref={passShow} type="password" className='p-2 rounded-lg my-1 w-full' name="password" id="password" placeholder='password' required />
          <span className='absolute top-3 right-3'>
            <img className='cursor-pointer' ref={eyeRef} onClick={()=>{toggleEye()}} src="public/img/eye.png" alt="showpass" />
          </span>
        </div>
        <div className='w-full flex flex-row justify-center my-2'>
          <button type="submit" className='border-2 border-blue-50 w-1/3 mx-auto bg-slate-500 text-white p-2 rounded-full'>
            Save Password
          </button>
        </div>
      </form>
    </div>
    
   
    </>

  );

};

export default Form;
