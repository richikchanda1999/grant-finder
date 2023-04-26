import { OpenAI } from "langchain/llms/openai";
import { RetrievalQAChain, loadQARefineChain } from "langchain/chains";
import { HNSWLib } from "langchain/vectorstores/hnswlib";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import * as fs from "fs";

async function fetchGrantsInfo() {
  try {
    const URL =
      "https://blockworks.co/_next/data/OJa3Z8_BB14zLY_N4huUY/grants.json";
    const res = await fetch(URL);

    if (!res.ok) {
      throw new Error(`Failed to fetch grants info from ${URL}`);
    }

    const json = (await res.json())['pageProps'];

    const grants = json['grants'].filter((grant: any) => grant.status === 'Active' && grant.ecosystem.includes('SOL'))
    const individualGrants = json['individualGrants'].filter((grant: any) => grant.status === 'Active' && grant.project.ecosystem.includes('SOL'))
    console.log(grants.map((grant: any) => grant.grants.map((grant: any) => grant.title)).flat().sort())
    console.log(individualGrants.map((grant: any) => grant.title).sort())
  } catch (e) {
    console.error(e);
  }
}

async function run() {
  // Initialize the LLM to use to answer the question.
  const model = new OpenAI({});
  const text = fs.readFileSync("state_of_the_union.txt", "utf8");
  const textSplitter = new RecursiveCharacterTextSplitter({ chunkSize: 1000 });
  const docs = await textSplitter.createDocuments([text]);

  // Create a vector store from the documents.
  const vectorStore = await HNSWLib.fromDocuments(docs, new OpenAIEmbeddings());

  // Create a chain that uses a Refine chain and HNSWLib vector store.
  const chain = new RetrievalQAChain({
    combineDocumentsChain: loadQARefineChain(model),
    retriever: vectorStore.asRetriever(),
  });
  const res = await chain.call({
    query: "What did the president say about Justice Breyer?",
  });
  console.log({ res });
  /*
{
  res: {
    output_text: '\n' +
      '\n' +
      "The president said that Justice Breyer has dedicated his life to serve his country, and thanked him for his service. He also said that Judge Ketanji Brown Jackson will continue Justice Breyer's legacy of excellence, emphasizing the importance of protecting the rights of citizens, especially women, LGBTQ+ Americans, and access to healthcare. He also expressed his commitment to supporting the younger transgender Americans in America and ensuring they are able to reach their full potential, offering a Unity Agenda for the Nation to beat the opioid epidemic and increase funding for prevention, treatment, harm reduction, and recovery."
  }
}
*/
}

fetchGrantsInfo()
