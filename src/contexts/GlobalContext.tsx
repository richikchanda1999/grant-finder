import { OpenAI } from "langchain/llms/openai"
import { loadQAMapReduceChain, loadQAStuffChain } from "langchain/chains"
import { Document } from "langchain/document"
import { ReactNode, createContext, useEffect, useMemo, useState } from "react"
import { Data, GlobalContextType } from "src/types"
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter"

interface Props {
    children: ReactNode
}

const GlobalContext = createContext<GlobalContextType | null>(null)

function GlobalProvider({ children }: Props) {
    const [grants, setGrants] = useState<Data>()
    const [docs, setDocs] = useState<Document[]>()
    const [filteredGrants, setFilteredGrants] = useState<any[]>([])

    useEffect(() => {
        fetch('/api/grants').then(res => { console.log(res); return res.json() }).then(data => {
            console.log(data)
            if (data.data) {
                setGrants(data.data)
            }
        })
    }, [])

    useEffect(() => {
        const splitter = new RecursiveCharacterTextSplitter({
            chunkSize: 100,
            chunkOverlap: 50,
        });
        splitter.createDocuments((grants?.blockworkGrants ?? [])?.map((grant) => grant.description !== "" ? grant.description : grant.title), (grants?.blockworkGrants ?? [])?.map((grant) => grant)).then((docs) => {
            setDocs(docs)
        })
    }, [grants])

    return <GlobalContext.Provider value={{ grants, docs, filteredGrants, setFilteredGrants }}>
        {children}
    </GlobalContext.Provider>
}

export { GlobalContext, GlobalProvider }