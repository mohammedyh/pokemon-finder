import { SearchIcon } from '@chakra-ui/icons';
import {
	Alert,
	AlertDescription,
	AlertIcon,
	AlertTitle,
	Box,
	Button,
	Center,
	Container,
	Flex,
	Heading,
	HStack,
	Image,
	Input,
	InputGroup,
	InputLeftAddon,
	Spinner,
} from '@chakra-ui/react';
import { useMemo } from 'react';
import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function App() {
	const [pokemonData, setPokemonData] = useState({});
	const [nextURL, setNextURL] = useState(null);
	const [previousURL, setPreviousURL] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState('');
	const controller = useMemo(() => new AbortController(), []);

	// add aborts to useEffect - if request fails. (optional parameter for abort controller)
	const fetchPokemonList = useCallback(
		async (url = 'https://pokeapi.co/api/v2/pokemon') => {
			try {
				setIsLoading(true);
				const response = await fetch(url, { signal: controller });
				const data = await response.json();

				setPokemonData(data);
				setIsLoading(false);
				setNextURL(data.next);
				setPreviousURL(data.previous);
			} catch (error) {
				setIsLoading(false);
				setError(error.message);
			}
		},
		[controller]
	);

	useEffect(() => {
		fetchPokemonList();
		return () => controller.abort();
	}, [controller, fetchPokemonList]);

	const filterPokemonList = async e => {
		try {
			const response = await fetch(
				'https://pokeapi.co/api/v2/pokemon?limit=1154'
			);
			const data = await response.json();
			const filteredPokemon = data.results.filter(item =>
				item.name.includes(e.target.value.trim())
			);
			setPokemonData({ results: filteredPokemon });
		} catch (error) {
			setError(error.message);
		}
	};

	const handleNext = useCallback(async () => {
		if (nextURL === null) return;

		await fetchPokemonList(nextURL);
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}, [fetchPokemonList, nextURL]);

	const handlePrevious = useCallback(async () => {
		if (previousURL === null) return;

		await fetchPokemonList(previousURL);
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}, [fetchPokemonList, previousURL]);

	if (isLoading) {
		return (
			<Center height="100vh">
				<Spinner size="lg" color="red" />
			</Center>
		);
	}

	if (error) {
		return (
			<Alert status="error" variant="solid">
				<AlertIcon />
				<AlertTitle>An error occurred!</AlertTitle>
				<AlertDescription>{error}</AlertDescription>
			</Alert>
		);
	}

	return (
		<Container maxW="4xl" marginTop="8">
			<Box display="flex" alignItems="center">
				<Heading size={['md', 'xl']} flex={1} color="gray.300">
					Pokémon Finder
				</Heading>

				<InputGroup flex={1}>
					<InputLeftAddon
						children={<SearchIcon color="white" />}
						backgroundColor="gray.700"
					/>
					<Input
						variant="filled"
						placeholder="Search for a Pokémon"
						color="gray.300"
						onChange={filterPokemonList}
					/>
				</InputGroup>
			</Box>

			{pokemonData.results.map(pokemon => (
				<Link key={pokemon.name} to={`/pokemon/${pokemon.name}`}>
					<HStack
						marginTop={8}
						backgroundColor="gray.800"
						rounded="lg"
						padding="1rem"
						transition="all 200ms ease-in-out"
						_hover={{ backgroundColor: 'gray.700' }}
					>
						<Image
							src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
								pokemon.url.split('/')[6] ?? 'TEST'
							}.png`}
							alt={pokemon.name}
							color="white"
							boxSize="80px"
							marginRight={4}
						/>
						<Heading size="lg" color="gray.200" textTransform="capitalize">
							{pokemon.name}
						</Heading>
					</HStack>
				</Link>
			))}

			<Flex justifyContent="space-between" paddingTop={10} paddingBottom={10}>
				<Button colorScheme="teal" variant="outline" onClick={handlePrevious}>
					Previous
				</Button>

				<Button colorScheme="teal" variant="outline" onClick={handleNext}>
					Next
				</Button>
			</Flex>
		</Container>
	);
}

export default App;
