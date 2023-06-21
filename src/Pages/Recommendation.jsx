import { Box, Divider, Flex, Text, Card, HStack, CardBody, Heading, Image, SimpleGrid, CardHeader, Avatar,} from "@chakra-ui/react"
import { db } from "../config/firebase";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
const Recommendations = () => {

    const [recommend, setRecommend] = useState([])
    const bookRecommendRef = collection(db, "Recommendation")

    useEffect(() => {
        const getRecommend = async () => {
            try{
             const data = await getDocs(bookRecommendRef)
             const filteredData = data.docs.map((doc) => ({
              ...doc.data(),
              id: doc.id,  
             }))
             setRecommend(filteredData)  
            } catch (err) {
                console.error(err)
            }
        }

        getRecommend()
    }, [])

    

    return (
        <>
         <Box>
            <Flex direction="row" justifyContent="space-around" wrap={{base: "wrap", lg: "nowrap"}} my="10px" gap="4" p = "20px">
            <Text fontSize={{base: "3xl", lg: "5xl"}} my = "20px">Recommendations</Text>
            <Text fontSize={{base: "", lg: "4xl"}} maxW = "500px" fontFamily="Alkatra">Discover the books I recommend for you to read.</Text>
            </Flex>
        </Box>
        <Divider />
        <SimpleGrid spacing={{base: "5", lg: "10"}} minChildWidth={{base: "120px", lg: "300px"}} my="20px" p="5px">
            {recommend.map((book) => (
            <Box h="auto" key={book.id}>
                 <Card shadow="none">
                <CardHeader>
                </CardHeader>
                <CardBody color="gray.500">
                <Image
                    src={book.book_cover}
                    alt={book.book_title}
                    borderRadius='lg'
                    m = "10px auto"
                    />
                 <Heading size='md' my="5px">{book.book_title}</Heading>
                <Text>by {book.book_author}</Text>
                </CardBody>
              </Card>
         </Box>
            ))}
        </SimpleGrid>
        <Divider />
        <Box shadow="lg" my="20px">
        <Text fontSize={{base: "2xl", lg: "4xl"}} mt = "40px" p = "30px 20px" color="blackAlpha.600" textAlign="justify">
        Reading is the gateway skill that makes all other learning possible, from complex word problems
        and the meaning of our history to scientific discovery and technological proficiency.
         </Text>
         <Avatar size='lg' name='Segun Adebayo' src='https://i.pinimg.com/236x/c3/6e/8d/c36e8ddd8ebf2bac8a77db8e24a796bd.jpg'/>
         <Text my="10px">Barack Obama</Text>
        </Box>
        </>
    )
 }
 
 export default Recommendations