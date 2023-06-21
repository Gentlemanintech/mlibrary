import { Link, NavLink } from "react-router-dom";
import {
    Box,
    Flex,
    Avatar,
    HStack,
    IconButton,
    Button,
    Menu,
    Text,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    useDisclosure,
    useColorModeValue,
    Stack,
    useToast,
  } from '@chakra-ui/react';
  import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';


  export default function Navbar() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast()
  
    return (
      <>
        <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4} >
          <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
            <IconButton
              size={'md'}
              icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
              aria-label={'Open Menu'}
              display={{ md: 'none' }}
              onClick={isOpen ? onClose : onOpen}
            />
            <HStack spacing={8} alignItems={'center'}>
              <NavLink to = '/'><Text fontWeight={'900'}>M LIBRARY</Text></NavLink>
              <HStack
                as={'nav'}
                spacing={4}
                display={{ base: 'none', md: 'flex' }}>
                  <NavLink to = '/currents'>Current Reads</NavLink>
                  <NavLink to = '/recommendations'>Recommendations</NavLink>
                  <NavLink to = '/suggestions'>Suggestions</NavLink>
                  <NavLink to = '/blogs'>Blogs</NavLink>
                  <NavLink to = '/about'>About</NavLink>
              </HStack>
            </HStack>
            <Flex alignItems={'center'}>
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={'full'}
                  variant={'link'}
                  cursor={'pointer'}
                  minW={0}>
                  <Avatar
                    size={'sm'}
                    src= ""
                    name = ""
                    bgColor={'blackAlpha.600'}
                  />
                </MenuButton>
                <MenuList>
                  {/*<MenuItem>Name</MenuItem>
                  <MenuItem>Email</MenuItem>*/}
                  <MenuDivider />
                  <Button onClick={() =>
                    toast({
                      title: `Log in feature will be added soon`,
                      position: "top",
                      isClosable: true,
                      variant: "subtle",
                      status: "warning",
                    })} mx = "10px">Log in</Button>
                  <Button onClick={() =>
                    toast({
                      title: `Log out feature will be added soon`,
                      position: "top",
                      isClosable: true,
                      variant: "subtle",
                      status: "warning",
                    })} mx = "10px">Log out</Button>
                  <MenuDivider />
                  <Button onClick={() =>
                    toast({
                      title: `Account creation feature will be added soon`,
                      position: "top",
                      isClosable: true,
                      variant: "subtle",
                      status: "warning",
                    })} mx = "10px" w = "90%">Create Account</Button>
                </MenuList>
              </Menu>
            </Flex>
          </Flex>
  
          {isOpen ? (
            <Box pb={4} display={{ md: 'none' }}>
              <Stack as={'nav'} spacing={4}>
               <NavLink to = '/currents' onClick={onClose}>Current Reads</NavLink>
               <NavLink to = '/recommendations' onClick={onClose}>Recommendations</NavLink>
               <NavLink to = '/suggestions' onClick={onClose}>Suggestions</NavLink>
               <NavLink to = '/blogs' onClick={onClose}>Blogs</NavLink>
               <NavLink to = '/about' onClick={onClose}>About</NavLink>
              </Stack>
            </Box>
          ) : null}
        </Box>
      </>
    );
  }