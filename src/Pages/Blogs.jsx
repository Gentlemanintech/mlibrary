import { Box, Flex, Text, Divider, Card, Image, Stack, CardBody, Heading, CardFooter, Button, Avatar, Collapse } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { db } from "../config/firebase";
import { getDocs, collection } from "firebase/firestore";
import { useEffect, useState } from "react";

const Blogs = () => {
    const [blogs, setBlogs] = useState([])

    const blogsRef = collection(db, "Blogs")

    useEffect(() => {
    const getBlogs = async () => {
        try{
        const data = await getDocs(blogsRef)
        const filteredData = data.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id
        }))  
        setBlogs(filteredData)
        } catch (err) {
            console.error(err)
        } 
    }

    getBlogs()
    }, [])

    return (
        <>
         <Box>
            <Flex direction="row" justifyContent="space-around" wrap={{base: "wrap", lg: "nowrap"}} my="10px" gap="4" p = "20px">
            <Text fontSize={{base: "3xl", lg: "5xl"}} my = "20px">My Blogs</Text>
                <Text fontSize={{base: "2xl", lg: "4xl"}} maxW = "500px" fontFamily="Alkatra">
                    Here we'll share thoughts, stories and ideas around the books recommended.
                </Text>
            </Flex>
        </Box>
        <Divider />
        <Box>
            {blogs.map((blog) => ( 
            <Card
            key = {blog.id}
            direction={{ base: 'column', sm: 'row' }}
            overflow='hidden'
            variant='outline'
            my = "20px"
            justifyContent="cenetr"
            >
            <Image
                objectFit='cover'
                maxW={{ base: '100%', sm: '200px' }}
                src={blog.image}
                alt={blog.title}
                h={{base: '200px'}}
            />
            <Stack>
                <CardBody>
                <Heading size='md'>{blog.title}</Heading>
                <Text py='2' noOfLines={4} textAlign="justify">
                  {blog.description}
                </Text>
                </CardBody>
                <CardFooter justifyContent="center">
                <Link to = {blog.id}><Button variant='solid' colorScheme='blue'>
                Show Blogs
                </Button>
                </Link>
                </CardFooter>
                </Stack>
                </Card>
            ))
        }
        
            </Box>
            <Divider />
            <Box shadow="lg" my="20px">
            <Text fontSize={{base: "2xl", lg: "4xl"}} mt = "40px" p = "30px 20px" color="blackAlpha.600">
            To learn is to live. I see no other option. Once the learning curve flattens out, I get bored.
            </Text>
            <Avatar size='lg' name='Tim Ferris' src='https://i.pinimg.com/236x/e2/06/90/e2069087a589dac652c25a8e552a0546.jpg'/>
            <Text my="10px">Tim Ferris</Text>
            </Box>
        </>
    )
 }
 
 export default Blogs