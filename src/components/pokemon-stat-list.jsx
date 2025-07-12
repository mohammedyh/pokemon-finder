import { GridItem, Stat } from "@chakra-ui/react";

function PokemonStatList({ stat, baseStat }) {
  return (
    <Stat.Root flexWrap="wrap" marginTop={4}>
      <Stat.Label textTransform="capitalize" color="gray.300">
        {stat.name}
      </Stat.Label>
      <Stat.ValueText color="gray.100">{baseStat}</Stat.ValueText>
    </Stat.Root>
  );
}

export default PokemonStatList;
