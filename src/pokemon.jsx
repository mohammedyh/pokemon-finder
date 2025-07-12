import {
	Box,
	Center,
	Container,
	Flex,
	Grid,
	GridItem,
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
					<Box backgroundColor="gray.700" rounded="sm" padding={2}>
						<HiArrowLeft color="white" w={6} h={6} />
					</Box>
				</Link>

				<Heading
					size="3xl"
					color="gray.200"
					textTransform="capitalize"
					marginLeft={3}
				>
					{name}
				</Heading>
			</HStack>

			{[pokemonData].map(info => (
				<Box key={info.id} marginTop={8}>
					<HStack wrap="wrap">
						<Image
							src={info.sprites.front_default}
							alt={`${name} front default`}
							width={['24', '56']}
						/>
						<Image
							src={info.sprites.back_default}
							alt={`${name} back default`}
							width={['24', '56']}
						/>
						<Image
							src={info.sprites.front_shiny}
							alt={`${name} front shiny`}
							width={['24', '56']}
						/>
					</HStack>

					<Heading size="xl" color="gray.200">
						Stats
					</Heading>

					<Grid
						templateColumns={[
							'repeat(3, 1fr)',
							'repeat(auto-fit, minmax(100px, 1fr))',
						]}
						placeContent="center"
					>
						{info.stats.map(({ stat, base_stat }, i) => (
							<GridItem key={i}>
								<Stat.Root flexWrap="wrap" marginTop={4}>
									<Stat.Label textTransform="capitalize" color="gray.300">
										{stat.name}
									</Stat.Label>
									<Stat.ValueText color="gray.100">{base_stat}</Stat.ValueText>
								</Stat.Root>
							</GridItem>
						))}
					</Grid>

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
