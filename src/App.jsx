import { SearchIcon } from '@chakra-ui/icons';
import {
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
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function App() {
	const [search, setSearch] = useState('');
	const [pokemonData, setPokemonData] = useState({});
	const [nextURL, setNextURL] = useState(null);
	const [previousURL, setPreviousURL] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const initialURL = 'https://pokeapi.co/api/v2/pokemon';

	useEffect(() => {
		async function fetchPokemonList() {
			try {
				const response = await axios(initialURL);
				setPokemonData(response.data);
				setIsLoading(false);
				setNextURL(response.data.next);
				setPreviousURL(response.data.previous);
			} catch (error) {
				console.log(error.message);
			}
		}
		fetchPokemonList();
	}, []);

	// const { isLoading, isError, data, error } = useQuery(['fetchSearchedPokemon'], () =>
	// 	axios(`https://pokeapi.co/api/v2/pokemon/${search}`).then(res => res.data),
	// );

	// TODO: When next button is clicked make request to `nextURL`

	if (isLoading) {
		return (
			<Center height="100vh">
				<Spinner size="lg" color="red" />
			</Center>
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
						value={search}
						color="gray.300"
						onChange={e => setSearch(e.target.value)}
					/>
				</InputGroup>
			</Box>

			{pokemonData.results.map((pokemon, index) => (
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
								index + 1
							}.png`}
							alt={pokemon.name}
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
				<Link to="#">
					<Button colorScheme="teal" variant="outline">
						Previous {previousURL}
					</Button>
				</Link>

				<Link to="#">
					<Button colorScheme="teal" variant="outline">
						Next - {nextURL}
					</Button>
				</Link>
			</Flex>
		</Container>
	);
}

export default App;
