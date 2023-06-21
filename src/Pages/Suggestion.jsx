import { useState, useEffect } from "react";
import { 
    Box,
    Card, 
    CardBody, 
    CardHeader,
    Divider, 
    Flex, 
    Heading, 
    Avatar, 
    Text, 
    Image,
    useToast
  } from "@chakra-ui/react";
  import { db } from "../config/firebase";
  import { getDocs, collection } from "firebase/firestore";

const Suggestion = () => {
    const [current, setCurrent] = useState([]);
    const toast = useToast();

    const suggestedBookRef = collection(db, "Suggestions");

    useEffect(() => {
       const getCurrent = async () => {
        try {
          const data = await getDocs(suggestedBookRef);
          const filteredData = data.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,  
           }));
           setCurrent(filteredData);
        } catch (err) {
          console.error(err)
      }
       }

       getCurrent();
    },[]);

    return (
        <>
        <Box>
            <Flex direction="row" justifyContent="space-around" wrap={{base: "wrap", lg: "nowrap"}} my="10px" gap="4" p = "20px">
            <Text fontSize={{base: "3xl", lg: "5xl"}} my = "20px">Books Suggestions</Text>
                <Text fontSize={{base: "2xl", lg: "4xl"}} maxW = "500px" fontFamily="Alkatra">Discover the {current.length > 1 ? 'books': 'book'} Suggested from other readers.</Text>
            </Flex>
        </Box>
        <Divider />
        <Box>
            <Box>
              {current.map((post) => (
                 <Card maxW='md' key={post.id} m="20px auto">
                 <CardHeader>
                   <Flex spacing='4'>
                     <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                       <Avatar name={post.name} src={post.name} />
               
                       <Box>
                         <Heading size='sm' ml={{base: '10px', md: '2px'}}>{post.name}</Heading>
                       </Box>
                     </Flex>
                   </Flex>
                 </CardHeader>
                 <Image
                   objectFit='fit'
                   h={'450px'}
                   src={post.imageLink}
                   alt={post.bookName}
                 />
               
               <CardBody>
                   <Text fontFamily="Alkatra" fontSize="2xl" fontWeight="800">{post.bookName}</Text>
                   <Divider />
                   <Text textAlign="justify" my="5px">
                    {post.description}
                   </Text>
                 </CardBody>
               </Card>
              ))}
            </Box>
        </Box>
        <Divider />
       </>
    )
}

export default Suggestion