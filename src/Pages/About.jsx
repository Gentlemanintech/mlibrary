import { Box, Flex, Text, Divider, Modal, Button, ModalBody, ModalContent, ModalOverlay, ModalHeader, ModalCloseButton, Avatar, useDisclosure } from "@chakra-ui/react";
import Me from '../assets/about.jpg'

const About = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
        <Box>
            <Flex direction="row" justifyContent="space-around" wrap={{base: "wrap", lg: "nowrap"}} my="10px" gap="4" p = "20px">
            <Text fontSize={{base: "3xl", lg: "5xl"}} my = "20px">About</Text>
                <Text fontSize={{base: "3xl", lg: "4xl"}} maxW = "500px" fontFamily="Alkatra">
                    Here we share about the project.
                </Text>
            </Flex>
        </Box>
        <Divider />
        <Button onClick={onOpen} my="20px">Interested in Working with me?</Button>
        <Modal isOpen={isOpen} onClose={onClose} p="10px" motionPreset='slideInBottom'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Interested in Working with me?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <Text textAlign="justify" color="blackAlpha.600">I love to work on exciting and innovative projects. My expertise and knowledge can help you deliver
            your next project, big or small, whatever your location. If you're interested in working with me, I'd
            love to know more
         </Text>
         <Text textAlign="justify" color="blackAlpha.600" my="10px" fontSize={{base: "15px", lg: "20px"}}>Mail me your details on umaidoki42@gmail.com</Text>
          </ModalBody>
          </ModalContent>
          </Modal>
          <Box>
            <Text fontFamily="Alkatra" fontSize="2xl" my="20px">
            Welcome to my book recommendation website, where I share my favorite reads and current picks with fellow book lovers!
            </Text>
            <Text fontFamily="Alkatra" fontSize="2xl" textAlign="justify" my="20px">
            As a reader, reading has been a constant source of joy and inspiration in my life. Over the years, 
            I've discovered countless books that have challenged my perspectives, sparked my creativity, and given 
            me a greater understanding of the world around me.
            </Text>
            <Text fontFamily="Alkatra" fontSize="2xl" textAlign="justify" my="20px">
            On this site, you'll find a carefully curated selection of books from a variety of genres, including fiction, 
            non-fiction, and everything in between. I'm always on the lookout for books that are both entertaining and 
            thought-provoking, and I'm excited to share my latest finds with you.
            </Text>
            <Text fontFamily="Alkatra" fontSize="2xl" textAlign="justify" my="20px">
            In addition to book recommendations, I also share my current reads and thoughts on books I've recently finished. 
            I believe that reading is a conversation, and I love nothing more than discussing books with other readers. 
            So feel free to suggest a book for me too or get in touch if you want to chat about a particular book!
            </Text>
            <Text fontFamily="Alkatra" fontSize="2xl" textAlign="justify" my="20px">
            My goal with this website is to create a community of book lovers who share a passion for reading and exploring new literary worlds. 
            Whether you're a seasoned reader or just starting out, I hope that you'll find something here that speaks to you and inspires you to dive deeper into the world of books.
            </Text>
            <Text fontFamily="Alkatra" fontSize="2xl" textAlign="justify" my="20px">
            Thank you for visiting my site, and happy reading!
            </Text>
          </Box>
          <Divider />
          <Box shadow="lg" my="20px">
            <Text fontSize={{base: "2xl", lg: "4xl"}} mt = "40px" p = "30px 20px" color="blackAlpha.600" textAlign="justify">
            Books have the power to change us, to transport us to new worlds, and to inspire us to become the best versions of ourselves. 
            The magic of reading is waiting for us on every page, if only we take the time to open the book.
            </Text>
            <Avatar size='lg' name='Tim Ferris' src={Me}/>
            <Text my="10px">Umar Maidoki</Text>
          </Box>
        </>
    )
 }
 
 export default About