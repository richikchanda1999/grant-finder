import { Button, Image, Text, Flex, Grid, GridItem } from "@chakra-ui/react"
import { ExternalLinkIcon } from "@chakra-ui/icons"
import { ReactElement, useEffect, useState } from "react"
import { Data } from "src/types"
import NavbarLayout from "src/components/navbar"

function Home() {
  const [grants, setGrants] = useState<Data>()

  useEffect(() => {
    fetch('/api/grants').then(res => { console.log(res); return res.json() }).then(data => {
      console.log(data)
      if (data.data) {
        setGrants(data.data)
      }
    })
  }, [])

  return (
    <Flex direction='column' align={'center'}>
      <Image src='/solana-header.svg' />
      <Text mt={14} bg='linear-gradient(90.25deg, #B8B5BF 0%, #FFFFFF 49.96%, #B8B5BF 99.91%)' backgroundClip='text' fontSize='48px' lineHeight={'56px'} fontWeight={'900'}>Don't miss out on</Text>
      <Text mt={1} bg='linear-gradient(90.55deg, #F7C477 0%, #F89272 53.88%, #ED7A7A 100%)' backgroundClip='text' fontSize='48px' lineHeight={'56px'} fontWeight={'900'}>"Free Money"</Text>
      <Flex mt={2} gap={1}>
        <Text as='span' fontSize={'18px'}>Find the best grant programs to fund for your</Text>
        <Text as='span' fontSize={'18px'} fontWeight={'700'}>billion</Text>
        <Text as='span' fontSize={'18px'}>dollar idea</Text>
      </Flex>

      <Button mt={8}>
        What are you Building?
      </Button>

      <Flex mt={8} direction={'column'} align={'flex-start'} w='100%'>
        <Text fontSize='48px' lineHeight={'56px'} fontWeight={'900'}>Open Grants</Text>
        <Grid templateColumns={'repeat(3, 1fr)'} w='100%' gap={10} mt={10}>
          {
            grants?.blockworkGrants?.map((grant, index) => {
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
    </Flex>
  )
}

Home.getLayout = function(page: ReactElement) {
	return (
		<NavbarLayout>
			{page}
		</NavbarLayout>
	)
}

export default Home