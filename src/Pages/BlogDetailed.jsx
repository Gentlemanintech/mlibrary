import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Image, Text, Box } from "@chakra-ui/react";
import { db } from "../config/firebase";
import { doc, getDoc } from "firebase/firestore";

function BlogDetails() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const getBlog = async () => {
      try {
        const docRef = doc(db, "Blogs", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setBlog({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.log("No such document!");
        }
      } catch (err) {
        console.error(err)
      }
    };
    getBlog();
  }, [id]);

  if (!blog) {
    return <div>Loading...</div>;
  }

  return (
    <Box textAlign="center">
      <Image maxW="100%" m="10px auto" src={blog.image}/>
      <Text fontSize={{base: "3xl", lg: "5xl"}} my="20px" textDecoration="underline">{blog.title}</Text>
      <Text fontSize={{base: "xl", lg: "3xl"}} fontFamily="Alkatra" textAlign="justify">{blog.description}</Text>
      <Text py="30px">Written by {blog.author}</Text>
    </Box>
  );
}

export default BlogDetails;
