import { Container } from "@chakra-ui/react"
import { ReactNode } from "react"
import Navbar from "../navbar"

interface Props {
    children: ReactNode
}

function NavbarLayout({ children }: Props) {
    return <Container bg='#0E0F0C' maxW={'100vw'} h='100%' centerContent px={10}><Navbar />{children}</Container>
}

export default NavbarLayout