import { Heading, HStack, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function PokemonItem({ pokemon }) {
  return (
    <Link key={pokemon.name} to={`/pokemon/${pokemon.name}`}>
      <HStack
        marginTop={8}
        backgroundColor="gray.800"
        rounded="lg"
        padding="1rem"
        transition="all 200ms ease-in-out"
        _hover={{ backgroundColor: "gray.700" }}
      >
        <Image
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
            pokemon.url.split("/")[6] ?? "TEST"
          }.png`}
          alt={pokemon.name}
          color="white"
          boxSize="80px"
          marginRight={4}
        />
        <Heading size={["2xl", "3xl"]} color="gray.200" textTransform="capitalize">
          {pokemon.name}
        </Heading>
      </HStack>
    </Link>
  );
}

export default PokemonItem;
