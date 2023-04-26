import { Container } from "@chakra-ui/react"
import { ReactNode } from "react"

interface Props {
    children: ReactNode
}

function NavbarLayout({ children }: Props) {
    return <Container bg='#0E0F0C' maxW={'100vw'} h='100%' centerContent px={10}>{children}</Container>
}

export default NavbarLayout