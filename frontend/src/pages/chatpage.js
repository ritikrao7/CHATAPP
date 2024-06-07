import React, { useState } from 'react';
import { ChatState } from '../context/chatProvider';
import SideDrawer from '../components/misslensous/sideDrawer';
import ChatBox from '../components/chatBox';
import MyChat from '../components/myChat';

import { Box } from '@chakra-ui/react';
import { set } from 'mongoose';


const Chatpage = () => {
  const {user}=ChatState();
  const [fetchAgain,setFetchAgain]=useState(false);


  return (
    <div style={{width :"100%"}}>
    {user&&<SideDrawer/>}
    <Box
      display="flex" 
      justifyContent="space-between" 
      height="91.5vh" 
      padding="10px"
      width="100%"
      >
      {user && <MyChat fetchAgain={fetchAgain}/>}
      {user && <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>}
      
    </Box>

    </div>
    
    
   
  )
}

export default Chatpage;
