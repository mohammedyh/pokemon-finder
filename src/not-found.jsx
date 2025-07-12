import { Button, Center, Heading } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <Center flexDirection="column" height="85vh">
      <Heading size="4xl" color="gray.200">
        Pokémon doesn't exist
      </Heading>

      <Link to="/">
        <Button colorPalette="teal" size="lg" marginTop={10}>
          Back to home
        </Button>
      </Link>
    </Center>
  );
}

export default NotFound;
