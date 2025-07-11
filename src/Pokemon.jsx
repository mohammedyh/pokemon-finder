import {
	Box,
	Center,
	Container,
	Flex,
	Heading,
	HStack,
	Image,
	Spinner,
	Stat,
} from '@chakra-ui/react';
import { useCallback, useEffect, useState } from 'react';
import { HiArrowLeft } from 'react-icons/hi2';
import { Link, useNavigate, useParams } from 'react-router-dom';

function Pokemon() {
	const [pokemonData, setPokemonData] = useState({});
	const [isLoading, setIsLoading] = useState(true);
	const { name } = useParams();
	const navigate = useNavigate();

	const fetchPokemonList = useCallback(async () => {
		try {
			const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
			const data = await response.json();
			setPokemonData(data);
			setIsLoading(false);
		} catch (error) {
			navigate('/404');
		}
	}, [name, navigate]);

	useEffect(() => {
		fetchPokemonList();
	}, [fetchPokemonList]);

	if (isLoading) {
		return (
			<Center height="100vh">
				<Spinner />
			</Center>
		);
	}

	return (
		<Container maxW="4xl" marginTop={8}>
			<HStack>
				<Link to="/">
					<Box
						backgroundColor="gray.700"
						rounded="base"
						padding={2}
						marginRight={3}
					>
						<HiArrowLeft color="gray.200" w={6} h={6} />
					</Box>
				</Link>

				<Heading size="2xl" color="gray.200" textTransform="capitalize">
					{name}
				</Heading>
			</HStack>

			{[pokemonData].map(info => (
				<Box key={info.id} marginTop={8}>
					<HStack wrap="wrap">
						<Image
							src={info.sprites.front_default}
							alt={`${name} front default`}
							boxSize="12rem"
						/>
						<Image
							src={info.sprites.back_default}
							alt={`${name} back default`}
							boxSize="12rem"
						/>
						<Image
							src={info.sprites.front_shiny}
							alt={`${name} front shiny`}
							boxSize="12rem"
						/>
					</HStack>

					<Heading size="xl" color="gray.200">
						Stats
					</Heading>

					<Flex>
						{info.stats.map(({ stat, base_stat }, i) => (
							<Stat.Root key={i} flexWrap="wrap" marginTop={4}>
								<Stat.Label textTransform="capitalize">{stat.name}</Stat.Label>
								<Stat.ValueText>{base_stat}</Stat.ValueText>
							</Stat.Root>
						))}
					</Flex>

					<Heading size="xl" color="gray.200" marginTop={8}>
						Abilities
					</Heading>
					<HStack gap="2rem" marginTop={4}>
						{info.abilities.map(({ ability }, i) => (
							<Heading
								key={i}
								size="md"
								color="white"
								textTransform="capitalize"
							>
								{ability.name}
							</Heading>
						))}
					</HStack>

					<Heading size="xl" color="gray.200" marginTop={8}>
						Types
					</Heading>
					<HStack gap="2rem" marginTop={4}>
						{info.types.map(({ type }, i) => (
							<Heading
								key={i}
								size="md"
								color="white"
								textTransform="capitalize"
							>
								{type.name}
							</Heading>
						))}
					</HStack>

					<Heading size="xl" color="gray.200" marginTop={8}>
						Moves
					</Heading>
					<HStack gap="2rem" marginTop={4}>
						{info.moves.slice(0, 3).map(({ move }, i) => (
							<Heading
								key={i}
								size="md"
								color="white"
								textTransform="capitalize"
							>
								{move.name}
							</Heading>
						))}
					</HStack>
				</Box>
			))}
		</Container>
	);
}

export default Pokemon;
