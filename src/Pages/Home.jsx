import { Box, Flex, Heading, Text, Divider, Input, InputLeftAddon, InputGroup, Button, Textarea, useToast} from '@chakra-ui/react';
import Background from '../assets/background.jpg'
import ReactPlayer from 'react-player'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db, storage } from "../config/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useState } from "react";


const Home = () => {
   const [name, setName] = useState('')
   const [bookname, setBookname] = useState('')
   const [imgLink, setImgLink] = useState(null)
   const [review, setReview] = useState('')
   const toast = useToast();

   const url = "https://youtu.be/jEpWYkUCL44"

   const bookSuggestRef = collection(db, "Suggestions")

   const handleImageAsFile = (e) => {
       setImgLink(e.target.files[0]);
   }

   const suggest = async () => {
      try {
         if (!name && !bookname && !imgLink && !review) {
            toast({
               title: "Fill the spaces provided",
               status: "warning",
               duration: 2000,
               isClosable: true,
               position: "top",
              });
              return null
         }else {
            let file = imgLink

            const storageRef = ref(storage, `Suggest-images/${file.name}`)
            const uploadTask = uploadBytesResumable(storageRef, file)

            uploadTask.on('state_changed', (snapshot) => {
               const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
               toast({
                  title: 'Upload is ' + progress + '% done',
                  status: "info",
                  duration: 500,
                  isClosable: false,
                  position: "bottom",
               })
               console.log('Upload is ' + progress + '% done');
            },
            (err) => {
               console.log(err.message)
            },
            () => {
               getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    addDoc(bookSuggestRef, {
                     name: name,
                     bookName: bookname,
                     imageLink: downloadURL,
                     description: review,
                     createdAt: serverTimestamp(),
                     });
                     toast({
                     title: "Book suggestion submitted",
                     status: "success",
                     duration: 3000,
                     isClosable: true,
                     position: "top",
                    });
                    setName("");
                    setBookname("");
                    setImgLink(null);
                    setReview(""); 
               })
            }
            )
      }
       
      } catch (err) {
         toast({
            title: err.message,
            position: "top",
            isClosable: true,
            variant: "subtle",
            status: "warning",
            duration: 3000
          });
      }
   }


   return (
      <>
      <Box h = '70vh' p = "130px 30px 50px" 
      bgImage={Background}
      bgRepeat={{base: "no-repeat", lg: "no-repeat"}}
      bgSize = {{base: "cover", lg: "cover"}}
      bgPosition = "center"
      >
      <Heading fontSize={{base: "30px", lg: "80px"}} color = "whiteAlpha.900" fontFamily="Alkatra">
      "Once you learn to read, you will be forever free."
      </Heading>
      <Text fontSize={{base: "10px", lg: "20px"}} color = "whiteAlpha.900">– Frederick Douglass</Text>
      </Box>
      <Box>
         <Text fontSize={{base: "5xl", lg: "6xl"}} my = "20px">— find your next favorite book with me.</Text>
         <Divider />
         <Flex direction="row" justifyContent="space-around" wrap={{base: "wrap", lg: "nowrap"}} my="10px" gap="4" p = "20px">
            <Text fontSize={{base: "2xl", lg: "4xl"}} maxW = "500px" fontFamily="Alkatra" textAlign="justify">Hi, I'm Umar Maidoki. I help people find better books to read.
             I'm also a big extreme sports fanatic. When I'm not hanging out with my family or at the computer you
             can find me cruising on my couch reading some interesting stuff.
            </Text>
            <ReactPlayer 
            url={url}
            />
         </Flex>
      </Box>
      <Divider />
      <Box>
         <Text fontSize={{base: "2xl", lg: "4xl"}} my = "40px" p = "40px 20px" color="blackAlpha.600" textAlign="justify">
         Warren Buffett was once asked about the key to success, he pointed to a stack of nearby books and said,
         "Read 500 pages like this every day. That's how knowledge works. It builds up, like compound interest. 
         All of you can do it, but I guarantee not many of you will do it."
         </Text>
      </Box>
      <Divider />
      <Box p ={{base: "10px", lg: "40px 120px"}}>
         <Text fontSize={{base: "3xl", lg: "4xl"}} my = "20px">Suggest a book for me too.</Text>
         <Text  fontSize={{base: "2xl", lg: "3xl"}}>Share books that you find interesting. Sharing is caring&#10084;</Text>
         <InputGroup my = "10px">
         <InputLeftAddon children='Your Name' />
         <Input type='text' placeholder='John doe' value={name} onChange={(e) => setName(e.target.value)}/>
        </InputGroup>
        <InputGroup my = "10px">
         <InputLeftAddon children='Book Name' />
         <Input type='text' placeholder='The Alchemist' value={bookname} onChange={(e) => setBookname(e.target.value)}/>
        </InputGroup>
        <InputGroup my = "10px">
         <InputLeftAddon children='Book Cover'/>
         <Input type='file' accept=".png, .jpg, .jpeg" onChange={handleImageAsFile} border={'none'} my={2}/>
        </InputGroup>
        <InputGroup my = "10px">
        <Textarea placeholder='Write anything about the book with max of 280 characters' maxLength="280" value={review} onChange={(e) => setReview(e.target.value)}/>
        </InputGroup>
        <Button my = "20px" onClick={suggest}>Try this read!</Button>
      </Box>
      <Divider />
      </>
   )
}

export default Home