import { Flex, Text, Image, Input, Textarea, Button } from "@chakra-ui/react"
import { ReactElement, useMemo, useState } from "react"
import NavbarLayout from "src/components/layout"
import { FormDataType } from "src/types"

function Form() {
    const [formData, setFormData] = useState<FormDataType>({ title: '', details: '', tldr: '', funding: '' })

    const isDisabled = useMemo(() => {
        const { title, details, tldr, funding } = formData
        return (title === '' || details === '' || tldr === '' || funding === '')
    }, [formData])

    return <Flex direction='column' align={'center'} w='100%'>
        <Text mt={14} bg='linear-gradient(90.25deg, #B8B5BF 0%, #FFFFFF 49.96%, #B8B5BF 99.91%)' backgroundClip='text' fontSize='48px' lineHeight={'56px'} fontWeight={'900'}>What are you building?</Text>
        <Text mt={2} fontSize='18px' lineHeight={'24px'}>Write your proposal, and find grant programs that are a good fit for your project</Text>
        <Flex mt={14} borderRadius={'12px'} bg='linear-gradient(119.55deg, #201E21 0%, #111112 99.94%)' direction={'column'} h='100%' w='80%' p={16}>
            <Flex w='100%' align='flex-start'>
                <Flex w='10%' align='center'>
                    <Text fontSize='32px' lineHeight={'40px'} fontWeight='900' bg='linear-gradient(90.55deg, #F7C477 0%, #F89272 53.88%, #ED7A7A 100%)' sx={{
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                    }}>1</Text>
                    <Image ml={2} src='/arrow.svg' />
                </Flex>
                <Flex w='90%' direction='column'>
                    <Text fontSize={'36px'} lineHeight={'44px'} fontWeight={'900'}>Title</Text>
                    <Input mt={6} color='white' fontSize='24px' lineHeight='32px' variant={'flushed'} placeholder="Name of your project" value={formData.title} onChange={(e) => {
                        setFormData({ ...formData, title: e.target.value })
                    }} />
                </Flex>
            </Flex>

            <Flex w='100%' align='flex-start' mt={20}>
                <Flex w='10%' align='center'>
                    <Text fontSize='32px' lineHeight={'40px'} fontWeight='900' bg='linear-gradient(90.55deg, #F7C477 0%, #F89272 53.88%, #ED7A7A 100%)' sx={{
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                    }}>2</Text>
                    <Image ml={2} src='/arrow.svg' />
                </Flex>
                <Flex w='90%' direction='column'>
                    <Text fontSize={'36px'} lineHeight={'44px'} fontWeight={'900'}>tl;dr</Text>
                    <Input mt={6} color='white' fontSize='24px' lineHeight='32px' variant={'flushed'} placeholder="Explain your proposal in one line" value={formData.tldr} onChange={(e) => {
                        setFormData({ ...formData, tldr: e.target.value })
                    }} />
                </Flex>
            </Flex>

            <Flex w='100%' align='flex-start' mt={20}>
                <Flex w='10%' align='center'>
                    <Text fontSize='32px' lineHeight={'40px'} fontWeight='900' bg='linear-gradient(90.55deg, #F7C477 0%, #F89272 53.88%, #ED7A7A 100%)' sx={{
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                    }}>3</Text>
                    <Image ml={2} src='/arrow.svg' />
                </Flex>
                <Flex w='90%' direction='column'>
                    <Text fontSize={'36px'} lineHeight={'44px'} fontWeight={'900'}>Details</Text>
                    <Textarea minH='40vh' color='white' fontSize='24px' lineHeight='32px' mt={6} placeholder="What are you building? What’s on your roadmap? When do you expect to complete it by?" value={formData.details} onChange={(e) => {
                        setFormData({ ...formData, details: e.target.value })
                    }} />
                </Flex>
            </Flex>

            <Flex w='100%' align='flex-start' mt={20}>
                <Flex w='10%' align='center'>
                    <Text fontSize='32px' lineHeight={'40px'} fontWeight='900' bg='linear-gradient(90.55deg, #F7C477 0%, #F89272 53.88%, #ED7A7A 100%)' sx={{
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                    }}>4</Text>
                    <Image ml={2} src='/arrow.svg' />
                </Flex>
                <Flex w='90%' direction='column'>
                    <Text fontSize={'36px'} lineHeight={'44px'} fontWeight={'900'}>Funding ask</Text>
                    <Input mt={6} color='white' fontSize='24px' lineHeight='32px' variant={'flushed'} placeholder="Sum of all milestones funding ask" type='number' value={formData.funding} onChange={(e) => {
                        setFormData({ ...formData, funding: e.target.value })
                    }} />
                </Flex>
            </Flex>

            <Flex mt={8} justify={'center'} w='100%'>
                <Button isDisabled={isDisabled} px={8} h='72px' fontSize={'24px'} lineHeight={'36px'} fontWeight={'900'} rightIcon={<Image boxSize='24px' src='/subtract.svg' />}>
                    Explore grant programs
                </Button>
            </Flex>

        </Flex>
    </Flex>
}

Form.getLayout = function (page: ReactElement) {
    return (
        <NavbarLayout>
            {page}
        </NavbarLayout>
    )
}

export default Form