import { OpenAI } from "langchain/llms/openai"
import { loadQAMapReduceChain, loadQAStuffChain } from "langchain/chains"
import { Document } from "langchain/document"
import { ReactNode, createContext, useEffect, useMemo, useState } from "react"
import { Data, GlobalContextType } from "src/types"

interface Props {
    children: ReactNode
}

const GlobalContext = createContext<GlobalContextType | null>(null)

function GlobalProvider({ children }: Props) {
    const [grants, setGrants] = useState<Data>()

    useEffect(() => {
        fetch('/api/grants').then(res => { console.log(res); return res.json() }).then(data => {
            console.log(data)
            if (data.data) {
                setGrants(data.data)
            }
        })
    }, [])

    const docs = useMemo(() => {
        const docs = grants?.blockworkGrants?.map((grant) => {
            return new Document({ pageContent: grant.description !== "" ? grant.description : grant.title, metadata: grant })
        })
        console.log(docs)
        return docs
    }, [grants])

    const chain = useMemo(() => {
        const llm = new OpenAI({ maxConcurrency: 10, openAIApiKey: process.env.OPENAPI_KEY });
        const chain = loadQAStuffChain(llm);
        console.log(chain)
        return chain
    }, [])

    return <GlobalContext.Provider value={{ grants, docs, chain }}>
        {children}
    </GlobalContext.Provider>
}

export { GlobalContext, GlobalProvider }