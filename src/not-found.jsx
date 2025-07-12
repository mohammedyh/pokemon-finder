import { Button, Center, Heading } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";

function NotFound() {
  const location = useLocation();
  return (
    <Center flexDirection="column" height="85vh">
      <Heading size="4xl" color="gray.200">
        {location.state.error.message}
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
