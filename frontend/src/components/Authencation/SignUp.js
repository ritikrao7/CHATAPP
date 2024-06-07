import React,{useState} from 'react'
import {Button} from '@chakra-ui/button'
import {VStack} from '@chakra-ui/layout'
import {FormControl,FormLabel} from '@chakra-ui/form-control'
import {Input,InputGroup,InputRightElement} from '@chakra-ui/input';
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import { useHistory } from "react-router";


const SignUp = () => {
  const toast=useToast();
  const history=useHistory();

    const [show, setShow] = useState(false);
   
    const [name,setName]=useState();
    const [email,setEmail]=useState();
    const [password,setPassword]=useState();
    const [confirmpassword,setConfirmpassword]=useState();
    const [pic,setPic]=useState();
    const [picloading,setPicloading]=useState();
    const handleClick = () => setShow(!show);



    const postDetails=(pics)=>{
      setPicloading(true);

      if(pics===undefined)
      {
        toast({
          title: "Please Select an Image!",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        return;
      }
      console.log(pics);

      if(pics.type==="image/jpeg"||pics.type==="image/png")
      {
        const data=new FormData();
        data.append("file",pics);
        data.append("upload_preset","chat-app");
        data.append("cloud_name","dqbmhm3x2");

        fetch("https://api.cloudinary.com/v1_1/dqbmhm3x2/image/upload",{
          method:"post",
          body:data,
        }).then((res)=>res.json()).then((data)=>{
          setPic(data.url.toString());
          console.log(data.url.toString());
          setPicloading(false);  
        }).catch((err)=>{
          console.log(err);
          setPicloading(false);

        });
      }
      else
      {
        toast({
          title: "Please Select an Image!",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        setPicloading(false);
        return ;
      }
    };

    const submitHandler= async()=>{
      setPicloading(true);
        if(!name||!email||!password||!confirmpassword)
        {
          toast({
            title: "Please Fill all the Feilds",
            status: "warning",
            duration: 5000,
            isClosable: true,
            position: "bottom",
          });
          setPicloading(false);
            return ;
        }

            if(password !== confirmpassword)
            {
              toast({
                title: "Passwords Do Not Match",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
              });
              return ;
            }

            console.log(name,email,password,pic);
            try {
              const config={
                headers:{
                  "Content-type":"application/json",
                },
              };
              const {data}=await axios.post("/api/user",{
                name,email,password,pic,
              },config);
              console.log(data);
              toast({
                title: "Registration Successful",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom",
              });
              localStorage.setItem("UserInfo",JSON.stringify(data));
              setPicloading(false);
              history.push("/chats");

              
            } catch (error) {
              toast({
                title: "Error Occured!",
                description: error.response.data.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
              });
              setPicloading(false);


              
            }
        
    }
  return (
    <VStack spacing="5px">
      <FormControl id='name' isRequired>
      <FormLabel>Name</FormLabel>
      <Input 
      placeholder='Enter your name'
      onChange={(e)=>setName(e.target.value)}
      ></Input>
      </FormControl>




      <FormControl id='email' isRequired>
      <FormLabel>Email</FormLabel>
      <Input 
      placeholder='Enter your Email'
      onChange={(e)=>setEmail(e.target.value)}
      ></Input>
      </FormControl>




      <FormControl id='password' isRequired>
      <FormLabel>Password</FormLabel>
      <InputGroup>
      <Input 
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



      <FormControl id='confirmpassword' isRequired>
      <FormLabel>Confirm password</FormLabel>
      <InputGroup>
      <Input 
      type={show?"text":"password"}
      placeholder='Enter password '
      onChange={(e)=>setConfirmpassword(e.target.value)}
      ></Input>
      <InputRightElement width="4.5rem">
      <Button h="1.75rem size="sm onClick={handleClick}>
      {show?"hide":"show"}
      </Button>
      </InputRightElement>
      </InputGroup>
      </FormControl>




      <FormControl id='pic' isRequired>
      <FormLabel>picture</FormLabel>
      <Input 
      type='file'
      p={1}
      accept='image/*'
      
      onChange={(e)=>postDetails(e.target.files[0])}
      ></Input>
      </FormControl>


      <Button
      colorScheme='blue' 
      width="100%"
      onClick={submitHandler}
    
      isLoading={picloading}
      >
        Sign Up
      </Button>



    </VStack>
  );
};

export default SignUp
