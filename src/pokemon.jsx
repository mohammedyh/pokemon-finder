import { Box, Container, Grid, Heading, HStack } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { HiArrowLeft } from "react-icons/hi2";
import { Link, useNavigate, useParams } from "react-router-dom";

import ListItem from "./components/list-item";
import Loading from "./components/loading";
import PokemonImageList from "./components/pokemon-image-list";
import PokemonStatList from "./components/pokemon-stat-list";

function Pokemon() {
  const [pokemonData, setPokemonData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { name } = useParams();
  const navigate = useNavigate();

  const fetchPokemon = useCallback(async () => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch Pokemon data`);
      }

      const data = await response.json();
      setPokemonData(data);
      setIsLoading(false);
    } catch (error) {
      navigate("/404", { state: { error } });
    }
  }, [name, navigate]);

  useEffect(() => {
    fetchPokemon();
  }, [fetchPokemon]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Container maxW="4xl" marginTop={8}>
      <HStack>
        <Link to="/">
          <Box backgroundColor="gray.700" rounded="sm" padding={2}>
            <HiArrowLeft color="white" w={6} h={6} />
          </Box>
        </Link>

        <Heading size="3xl" color="gray.200" textTransform="capitalize" marginLeft={3}>
          {name}
        </Heading>
      </HStack>

      {[pokemonData].map(info => (
        <Box key={info.id} marginTop={8}>
          <PokemonImageList sprites={info.sprites} />

          <Heading size="xl" color="gray.200">
            Stats
          </Heading>

          <Grid
            templateColumns={["repeat(3, 1fr)", "repeat(auto-fit, minmax(100px, 1fr))"]}
            placeContent="center"
          >
            {info.stats.map(({ stat, base_stat }, i) => (
              <PokemonStatList key={i} stat={stat} baseStat={base_stat} />
            ))}
          </Grid>

          <Heading size="xl" color="gray.200" marginTop={8}>
            Abilities
          </Heading>
          <HStack gap="2rem" marginTop={4}>
            {info.abilities.map(({ ability }, i) => (
              <ListItem key={i} data={ability} />
            ))}
          </HStack>

          <Heading size="xl" color="gray.200" marginTop={8}>
            Types
          </Heading>
          <HStack gap="2rem" marginTop={4}>
            {info.types.map(({ type }, i) => (
              <ListItem key={i} data={type} />
            ))}
          </HStack>

          <Heading size="xl" color="gray.200" marginTop={8}>
            Moves
          </Heading>
          <HStack gap="2rem" marginTop={4}>
            {info.moves.slice(0, 3).map(({ move }, i) => (
              <ListItem key={i} data={move} />
            ))}
          </HStack>
        </Box>
      ))}
    </Container>
  );
}

export default Pokemon;
