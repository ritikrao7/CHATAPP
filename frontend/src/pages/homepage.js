import React, { useEffect } from 'react'
import 
{Container,
  Box,
  Text,
  Tabs,Tab,TabList,TabPanel,TabPanels

} from '@chakra-ui/react'
import Login from '../components/Authencation/Login'
import SignUp from '../components/Authencation/SignUp'
import { useHistory } from "react-router-dom"


const Homepage = () => {

  const history=useHistory();

  // useEffect(()=>{
  //   const userInfo=JSON.parse(localStorage.getItem("userInfo"));
  //   if(userInfo)
  //   history.push("/chats");

  // },[history]);


  return (
    <Container maxW="xl" centerContent>
      <Box
        d="flex"
        justifyContent="center"
        p={1}
        bg="white"
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
      >
        <Text fontSize="3xl" fontFamily="Work sans" marginLeft="190px">
          CHAT APP
        </Text>
      </Box>
      <Box
      fontSize="1px"
      p={1}
      bg="white"
      w="100%"
      borderRadius="lg"
      borderWidth="1px"
      color="black" 
      >
       <Tabs fontSize="small" variant='soft-rounded' >
     <TabList mb="1em">
    <Tab width="50%">Login</Tab>
    <Tab width="50%">Sign Up</Tab>
      </TabList>
  <TabPanels>
    <TabPanel>
      <p><Login/></p>
    </TabPanel>
    <TabPanel>
      <p><SignUp/></p>
    </TabPanel>
  </TabPanels>
</Tabs>
      </Box>
      
    </Container>
  )
}

export default Homepage;
