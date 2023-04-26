import { Flex, Image } from "@chakra-ui/react"

function Navbar() {
    return <Flex w='100%' justify={'flex-start'} py={4}><Image src='/solana-logo.svg' /></Flex>
}

export default Navbar