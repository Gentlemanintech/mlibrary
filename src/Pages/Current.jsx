import { ViewIcon } from "@chakra-ui/icons";
import { useState, useEffect } from "react";
import { 
    Box, 
    Button, 
    Card, 
    CardBody, 
    CardFooter, 
    CardHeader, 
    Container, 
    Divider, 
    Flex, 
    Heading, 
    HStack, 
    Text, 
    Image,
    Collapse,
  } from "@chakra-ui/react";
  import { db } from "../config/firebase";
  import { getDocs, collection } from "firebase/firestore";

const Current = () => {
    const [current, setCurrent] = useState([]);
    const [openStates, setOpenStates] = useState([]);

    const currentBookRef = collection(db, "Current");

    useEffect(() => {
       const getCurrent = async () => {
        try {
          const data = await getDocs(currentBookRef);
          const filteredData = data.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,  
           }));
           setCurrent(filteredData);
           setOpenStates(Array(filteredData.length).fill(false));
        } catch (err) {
          console.log(err)
      }
       }

       getCurrent();
    },[]);

    const handleToggle = (index) => {
      setOpenStates(
        openStates.map((state, i) => (i === index ? !state : state))
      );
    };

    return (
        <>
        <Box>
            <Flex direction="row" justifyContent="space-around" wrap={{base: "wrap", lg: "nowrap"}} my="10px" gap="4" p = "20px">
            <Text fontSize={{base: "3xl", lg: "5xl"}} my = "20px">Reading Now</Text>
                <Text fontSize={{base: "2xl", lg: "4xl"}} maxW = "500px" fontFamily="Alkatra">Discover the {current.length > 1 ? 'books': 'book'} I'm currently reading.</Text>
            </Flex>
        </Box>
        <Divider />
        <Box>
            <Heading as="h5" textAlign="start" fontSize={{base: "3xl", lg: "4xl"}} my = "20px" fontFamily="Alkatra">Current {current.length > 1 ? 'Reads': 'Read'}</Heading>
            <Box p = "10px">
              {current.map((book, index) => (
                 <Card my="15px"  boxShadow='2xl' key={book.id}>
                <CardHeader>
                <Heading size='md' my="5px">{book.title}</Heading>
                <Text>by {book.author}</Text>
                </CardHeader>
                <CardBody color="gray.500" textAlign="justify">
                <Image
                    src={book.image}
                    alt={book.name}
                    borderRadius='lg'
                    m = "10px auto"
                    />
                 <Collapse startingHeight={100} in={openStates[index]}>
                    {book.review}</Collapse>
                </CardBody>
                <CardFooter>
                 <HStack spacing={5}>
                    <Button onClick={() => handleToggle(index)}>Show {openStates[index] ? 'Less' : 'More'}</Button>
                    <a href={book.link}><Button leftIcon={<ViewIcon />}>Download</Button></a>
                 </HStack>
                </CardFooter>
              </Card>
              ))}
            </Box>
        </Box>
        <Divider />
        </>
)}

export default Current