import React from 'react'
import { Route, Routes } from "react-router-dom";
import Home from './Pages/Home';
import Current from './Pages/Current';
import Recommendations from './Pages/Recommendation';
import About from './Pages/About';
import Blogs from './Pages/Blogs';
import './App.css'
import Navbar from './components/Nav';
import Footer from './components/Footer';
import BlogDetailed from './Pages/BlogDetailed';
import Suggestion from './Pages/Suggestion';
import {
  Box,
  Container
} from '@chakra-ui/react';


function App() {
  return (
    <>
     <header className='Heading'>
     <Navbar />
     </header>
     <main>
     <Container p = "2px" maxW="85%" my={'20px'}>
      <Box p = "px" textAlign="center">
          <Routes>
            <Route path = "/" element = {<Home />}/>
            <Route path = "/currents" element = {<Current />}/>
            <Route path = "/recommendations" element = {<Recommendations />}/>
            <Route path = "/blogs" >
              <Route index element = {<Blogs />}/>
              <Route path=':id' element ={<BlogDetailed />} />
            </Route>
            <Route path='/suggestions' element = {<Suggestion />}/>
            <Route path = "/about" element = {<About />}/>
         </Routes>  
      </Box>
     </Container >
     </main>
     <footer>
      <Footer />
     </footer>
    </>
  )
 }
 
export default App;
