import { ArrowBackIcon, ExternalLinkIcon } from "@chakra-ui/icons"
import { Flex, Text, Image, Button, Grid, GridItem } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { ReactElement, useContext } from "react"
import NavbarLayout from "src/components/layout"
import { GlobalContext } from "src/contexts/GlobalContext"

function FilteredGrants() {
    const { filteredGrants } = useContext(GlobalContext)!

    const router = useRouter()

    return <Flex direction='column' align={'center'} w='100%'>
        <Flex mt={14} ml={6} w='100%' justify={'flex-start'}>
            <Button height={'48px'} fontSize='18px' lineHeight={'24px'} fontWeight={'700'} leftIcon={<ArrowBackIcon color='white' boxSize='18px' />} onClick={() => {
                router.back()
            }}>Back</Button>
        </Flex>
        <Text bg='linear-gradient(90.25deg, #B8B5BF 0%, #FFFFFF 49.96%, #B8B5BF 99.91%)' backgroundClip='text' fontSize='48px' lineHeight={'56px'} fontWeight={'900'}>Grant programs worth your time!</Text>
        <Text mt={2} fontSize='18px' lineHeight={'24px'}>Programs that we think are a good fit for your project</Text>
        <Grid templateColumns={'repeat(3, 1fr)'} w='100%' gap={10} mt={10}>
            {
                filteredGrants?.map((grant, index) => {
                    return <GridItem key={index} height={'-webkit-fill-available'}>
                        <Flex borderRadius={'12px'} bg='linear-gradient(119.55deg, #201E21 0%, #111112 99.94%)' direction={'column'} p={8} h='100%'>
                            <Flex justify={'space-between'} align='flex-start' w='100%'>
                                <Image boxSize={'56px'} src={grant.project.imageUrl} />
                                <Text bg='#1AE18C' py={2} px={4} color='black' borderRadius={'16px'}>{grant.status === 'Active' ? 'Open Now' : 'Closed'}</Text>
                            </Flex>
                            <Text mt={10} fontSize='28px' lineHeight={'36px'} fontWeight={'900'} mb={8}>{grant.title}</Text>
                            <Flex mt='auto' justify={'space-between'} w='100%' align={'baseline'}>
                                <Button variant='link' rightIcon={<ExternalLinkIcon color='linear-gradient(90.25deg, #B8B5BF 0%, #FFFFFF 49.96%, #B8B5BF 99.91%)' />} onClick={() => {
                                    window.open(grant.moreInformation, "_blank")
                                }}>
                                    <Text fontSize='18px' lineHeight={'24px'} fontWeight='900' bg='linear-gradient(90.25deg, #B8B5BF 0%, #FFFFFF 49.96%, #B8B5BF 99.91%)' sx={{
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                    }}>More Info</Text>
                                </Button>
                                <Button variant='link' rightIcon={<ExternalLinkIcon color='linear-gradient(93.69deg, #EAED4B 0%, #90FBBB 100%)' />} onClick={() => {
                                    window.open(grant.applyUrl, "_blank")
                                }}>
                                    <Text fontSize='18px' lineHeight={'24px'} fontWeight='900' bg='linear-gradient(93.69deg, #EAED4B 0%, #90FBBB 100%)' sx={{
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                    }}>Apply Now</Text>
                                </Button>
                            </Flex>
                        </Flex>
                    </GridItem>
                })
            }
        </Grid>
    </Flex>
}

FilteredGrants.getLayout = function (page: ReactElement) {
    return (
        <NavbarLayout>
            {page}
        </NavbarLayout>
    )
}

export default FilteredGrants