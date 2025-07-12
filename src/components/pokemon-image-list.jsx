import { HStack, Image } from "@chakra-ui/react";

function PokemonImageList({ sprites }) {
  return (
    <HStack wrap="wrap">
      <Image src={sprites.front_default} alt={`${name} front default`} width={["24", "56"]} />
      <Image src={sprites.back_default} alt={`${name} back default`} width={["24", "56"]} />
      <Image src={sprites.front_shiny} alt={`${name} front shiny`} width={["24", "56"]} />
    </HStack>
  );
}

export default PokemonImageList;
