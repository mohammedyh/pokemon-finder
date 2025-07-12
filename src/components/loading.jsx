import { Center, Spinner } from "@chakra-ui/react";

function Loading() {
  return (
    <Center height="100vh">
      <Spinner size="lg" color="red" />
    </Center>
  );
}

export default Loading;
