import { Flex, Image } from "@chakra-ui/react"
import { useRouter } from "next/router"

function Navbar() {
    const router = useRouter()

    return <Flex w='100%' justify={'flex-start'} py={4}><Image src='/solana-logo.svg' cursor={'pointer'} onClick={() => {
        router.replace('/')
    }}/></Flex>
}

export default Navbar