import { Heading } from "@chakra-ui/react";

function ListItem({ data }) {
  return (
    <Heading size="md" color="white" textTransform="capitalize">
      {data.name}
    </Heading>
  );
}

export default ListItem;
