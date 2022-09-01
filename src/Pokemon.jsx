import { ArrowBackIcon } from '@chakra-ui/icons';
import {
	Alert,
	AlertDescription,
	AlertIcon,
	AlertTitle,
	Box,
	Center,
	Container,
	Flex,
	Heading,
	HStack,
	Image,
	Spinner,
	Stat,
	StatGroup,
	StatLabel,
	StatNumber,
} from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { Link, useParams } from 'react-router-dom';

function Pokemon() {
	const { name } = useParams();

	const { data, error, isLoading, isError } = useQuery(
		['fetchPokemon'],
		async () => {
			try {
				const res = await axios.get(
					`https://pokeapi.co/api/v2/pokemon/${name}`
				);
				return res.data;
			} catch (error) {
				console.error(error);
				return error;
			}
		},
		{ retry: false, useErrorBoundary: true }
	);

	if (isLoading) {
		return (
			<Center height="100vh">
				<Spinner size="lg" color="red" />
			</Center>
		);
	}

	if (isError) {
		return (
			<Alert status="error" color="white" backgroundColor="red.400">
				<AlertIcon />
				<AlertTitle>Pokemon of name {name}, wasn't found</AlertTitle>
				<AlertDescription>{error}</AlertDescription>
			</Alert>
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
						<ArrowBackIcon color="gray.200" w={6} h={6} />
					</Box>
				</Link>

				<Heading size="2xl" color="gray.200" textTransform="capitalize">
					{name}
				</Heading>
			</HStack>

			{/* TODO: Destructure info object */}
			{[data].map(info => (
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
					<StatGroup flexWrap="wrap" marginTop={4}>
						{info.stats.map(({ stat, base_stat }, i) => (
							<Stat key={i} color="gray.300">
								<StatLabel textTransform="capitalize">{stat.name}</StatLabel>
								<StatNumber>{base_stat}</StatNumber>
							</Stat>
						))}
					</StatGroup>

					<Flex gap={[0, 24]} flexWrap="wrap">
						<Box>
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
						</Box>

						<Box>
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
						</Box>
					</Flex>

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
