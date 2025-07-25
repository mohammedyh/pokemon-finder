import { Alert, Button, Center, Container, Flex } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";

import Header from "./components/header";
import Loading from "./components/loading";
import PokemonItem from "./components/pokemon-item";
import useDebounce from "./hooks/use-debounce";

function App() {
  const [pokemonData, setPokemonData] = useState({});
  const [nextURL, setNextURL] = useState(null);
  const [previousURL, setPreviousURL] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchPokemonList = useCallback(async (url = "https://pokeapi.co/api/v2/pokemon") => {
    try {
      setIsLoading(true);
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch data`);
      }
      const data = await response.json();

      setPokemonData(data);
      setIsLoading(false);
      setNextURL(data.next);
      setPreviousURL(data.previous);
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  }, []);

  useEffect(() => {
    fetchPokemonList();
  }, [fetchPokemonList]);

  const filterPokemonList = useDebounce(async e => {
    try {
      if (e.target.value.trim() === "") {
        return await fetchPokemonList();
      }

      const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1154");
      if (!response.ok) {
        throw new Error(`Failed to search Pokémon list`);
      }

      const data = await response.json();
      const filteredPokemon = data.results.filter(item =>
        item.name.includes(e.target.value.toLowerCase().trim()),
      );
      setPokemonData({ results: filteredPokemon });
      setNextURL(null);
      setPreviousURL(null);
    } catch (error) {
      setError(error.message);
    }
  }, 600);

  const handleNext = useCallback(async () => {
    if (nextURL === null) return;

    await fetchPokemonList(nextURL);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [fetchPokemonList, nextURL]);

  const handlePrevious = useCallback(async () => {
    if (previousURL === null) return;

    await fetchPokemonList(previousURL);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [fetchPokemonList, previousURL]);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <Center height="100vh">
        <Alert.Root status="error" variant="solid" width="fit">
          <Alert.Indicator />
          <Alert.Content>
            <Alert.Title>An error occurred!</Alert.Title>
            <Alert.Description>{error}</Alert.Description>
          </Alert.Content>
        </Alert.Root>
      </Center>
    );
  }

  return (
    <Container maxW="4xl" marginTop="8">
      <Header filterPokemonList={filterPokemonList} />

      {pokemonData.results.map(pokemon => (
        <PokemonItem key={pokemon.name} pokemon={pokemon} />
      ))}

      <Flex justifyContent="space-between" paddingTop={10} paddingBottom={10}>
        {previousURL ? (
          <Button colorPalette="teal" variant="solid" onClick={handlePrevious}>
            Previous
          </Button>
        ) : (
          <div />
        )}

        {nextURL ? (
          <Button colorPalette="teal" variant="solid" onClick={handleNext}>
            Next
          </Button>
        ) : (
          <div />
        )}
      </Flex>
    </Container>
  );
}

export default App;
