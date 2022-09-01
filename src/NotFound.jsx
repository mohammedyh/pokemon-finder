import { Button, Center, Heading } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

function NotFound() {
	return (
		<Center flexDirection="column" height="85vh">
			<Heading size="2xl" color="gray.300">
				Pokémon Not Found
			</Heading>

			<Link to="/">
				<Button colorScheme="teal" size="md" marginTop="8">
					Back to Home
				</Button>
			</Link>
		</Center>
	);
}

export default NotFound;
