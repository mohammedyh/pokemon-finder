import { Box, Heading, Input, InputGroup } from "@chakra-ui/react";
import { HiMagnifyingGlass } from "react-icons/hi2";

function Header({ filterPokemonList }) {
  return (
    <Box display="flex" alignItems="center">
      <Heading size={["md", "3xl"]} flex={1} color="gray.200">
        Pokémon Finder
      </Heading>

      <InputGroup
        flex={[2, 1]}
        startAddon={<HiMagnifyingGlass size={18} color="white" />}
        startAddonProps={{ bg: "gray.700", border: "none" }}
      >
        <Input
          variant="subtle"
          placeholder="Search for a Pokémon"
          _placeholder={{ color: "gray.400" }}
          color="gray.200"
          bgColor="gray.800"
          onChange={filterPokemonList}
        />
      </InputGroup>
    </Box>
  );
}

export default Header;
