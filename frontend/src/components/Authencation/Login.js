import React,{useState} from 'react'
import {Button} from '@chakra-ui/button'
import {VStack} from '@chakra-ui/layout'
import {FormControl,FormLabel} from '@chakra-ui/form-control'
import {Input,InputGroup,InputRightElement} from '@chakra-ui/input';

import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
const Login = () => {
  const toast=useToast();
  const history=useHistory();

    const [show, setShow] = useState(false);
   
    
    const [email,setEmail]=useState();
    const [password,setPassword]=useState();
    const [loading,setLoading]=useState();
    const handleClick = () => setShow(!show);

    const submitHandler=async()=>{
      setLoading(true);
      if(!email||!password)
      {
        toast({
          title: "Please Fill all the Feilds",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        setLoading(false);
        return ;

      }
      try {
          const config={
            headers:{
              "Content-type":"application/json",
            },
          };
          const {data}=await axios.post("/api/user/login",{
            email,password
          },config);
          console.log(data);
          toast({
            title: "Login Successful",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "bottom",
          });
          localStorage.setItem("userInfo",JSON.stringify(data));
          setLoading(false);
            history.push("/chats");

        
      } catch ({error}) {
        toast({
          title: "Error Occured!",
          description: error.response.data.message,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
       
        
      
      setLoading(false);

    }
    };

  return (
    <VStack spacing="6px">
   




    <FormControl id='email' isRequired>
    <FormLabel>Email</FormLabel>
    <Input 
    value={email}
    placeholder='Enter your Email'
    onChange={(e)=>setEmail(e.target.value)}
    ></Input>
    </FormControl>




    <FormControl id='password' isRequired>
    <FormLabel>Password</FormLabel>
    <InputGroup>
    <Input 
    value={password}
    type={show?"text":"password"}
    placeholder='Enter password'
    onChange={(e)=>setPassword(e.target.value)}
    ></Input>
    <InputRightElement width="4.5rem">
    <Button h="1.75rem size="sm onClick={handleClick}>
    {show?"hide":"show"}
    </Button>
    </InputRightElement>
    </InputGroup>
    </FormControl>

    <Button
    colorScheme='blue'
    width="100%"
    onClick={submitHandler}
  
    isLoading={loading}
    
    >Login</Button>

    <Button
    colorScheme='red'
    width="100%"
    onClick={()=>{
        setEmail("guest@gmail.com");
        setPassword("123456");

    }}

    >
        Guest user crediatials
    </Button>

    </VStack>

  );
};

export default Login
