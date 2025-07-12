import {
	Alert,
	Box,
	Button,
	Center,
	Container,
	Flex,
	Heading,
	HStack,
	Image,
	Input,
	InputAddon,
	InputGroup,
	Spinner,
} from '@chakra-ui/react';
import { useCallback, useEffect, useState } from 'react';
import { HiMagnifyingGlass } from 'react-icons/hi2';
import { Link } from 'react-router-dom';

import useDebounce from './hooks/useDebounce';

function App() {
	const [pokemonData, setPokemonData] = useState({});
	const [nextURL, setNextURL] = useState(null);
	const [previousURL, setPreviousURL] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState('');

	const fetchPokemonList = useCallback(
		async (url = 'https://pokeapi.co/api/v2/pokemon') => {
			try {
				setIsLoading(true);
				const response = await fetch(url);
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
		[],
	);

	useEffect(() => {
		fetchPokemonList();
	}, [fetchPokemonList]);

	const filterPokemonList = useDebounce(async e => {
		try {
			if (e.target.value.trim() === '') {
				return await fetchPokemonList();
			}

			const response = await fetch(
				'https://pokeapi.co/api/v2/pokemon?limit=1154',
			);
			const data = await response.json();
			const filteredPokemon = data.results.filter(item =>
				item.name.includes(e.target.value.toLowerCase().trim()),
			);
			setPokemonData({ results: filteredPokemon });
		} catch (error) {
			setError(error.message);
		}
	}, 600);

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
			<Alert.Root status="error" variant="solid">
				<Alert.Indicator />
				<Alert.Content>
					<Alert.Title>An error occurred!</Alert.Title>
					<Alert.Description>{error}</Alert.Description>
				</Alert.Content>
			</Alert.Root>
		);
	}

	return (
		<Container maxW="4xl" marginTop="8">
			<Box display="flex" alignItems="center">
				<Heading size={['md', '3xl']} flex={1} color="gray.200">
					Pokémon Finder
				</Heading>

				<InputGroup
					flex={[2, 1]}
					startAddon={<HiMagnifyingGlass size={18} color="white" />}
					startAddonProps={{ bg: 'gray.700', border: 'none' }}
				>
					<Input
						variant="subtle"
						placeholder="Search for a Pokémon"
						_placeholder={{color: 'gray.400'}}
						color="gray.200"
						bgColor="gray.800"
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
						<Heading
							size={['2xl', '3xl']}
							color="gray.200"
							textTransform="capitalize"
						>
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
