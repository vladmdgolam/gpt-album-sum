import { AnimatePresence, motion } from "framer-motion"
import type { NextPage } from "next"
import Head from "next/head"
import Image from "next/image"
import { useState } from "react"
import { Toaster } from "react-hot-toast"

import { Explanations } from "../components/Explanations"
import Footer from "../components/Footer"
import Header from "../components/Header"
import LoadingDots from "../components/LoadingDots"
import ResizablePanel from "../components/ResizablePanel"
import {
  meta,
  placeholder,
  promptMiddle,
  promptStart,
} from "../utils/constants"

const generatePrompt = (bio: string, names: string) => {
  const _names = names ? ` ${names}` : ""
  const _prompt = `${promptStart} '${bio}'${
    _names ? promptMiddle + _names : ""
  }.`
  return _prompt
}

const Home: NextPage = () => {
  const [loading, setLoading] = useState(false)
  const [bio, setBio] = useState("")
  const [names, setNames] = useState("")
  const [explanations, setExplanations] = useState<string>("")

  console.log("Streamed response: ", explanations)

  const prompt = generatePrompt(bio, names)
  console.log("Prompt:", prompt)

  const generateBio = async (e: any) => {
    e.preventDefault()
    setExplanations("")
    setLoading(true)
    // console.log(prompt)
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
      }),
    })
    console.log("Edge function returned.")

    if (!response.ok) {
      throw new Error(response.statusText)
    }

    // This data is a ReadableStream
    const data = response.body
    if (!data) {
      return
    }

    const reader = data.getReader()
    const decoder = new TextDecoder()
    let done = false

    while (!done) {
      const { value, done: doneReading } = await reader.read()
      done = doneReading
      const chunkValue = decoder.decode(value)
      console.log(chunkValue)
      setExplanations((prev) => prev + chunkValue)
    }

    setLoading(false)
  }

  return (
    <div className="flex max-w-5xl mx-auto flex-col items-center justify-center py-2 min-h-screen">
      <Head>
        <title>{meta.name}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 mt-12 sm:mt-20">
        {/* <a
          className="flex max-w-fit items-center justify-center space-x-2 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm text-gray-600 shadow-md transition-colors hover:bg-gray-100 mb-5"
          href={meta.repoLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Github />
          <p>Star on GitHub</p>
        </a> */}
        <h1 className="sm:text-6xl text-4xl max-w-2xl font-bold text-slate-900">
          {meta.description}
        </h1>
        {/* <p className="text-slate-500 mt-5">47,118 bios generated so far.</p> */}
        <div className="max-w-xl w-full">
          <div className="flex mt-10 items-center space-x-3">
            <Image
              src="/1-black.png"
              width={30}
              height={30}
              alt="1 icon"
              className="sm:mb-0"
            />
            <p className="text-left font-medium">
              Paste song's lyrics{" "}
              {/* <span className="text-slate-500">(or write them)</span>. */}
            </p>
          </div>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={4}
            maxLength={10000}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black my-5"
            placeholder={placeholder}
          />
          <div className="flex items-center space-x-3">
            <Image src="/2-black.png" width={30} height={30} alt="1 icon" />
            <p className="text-left font-medium">
              Enter the artist's name(s){" "}
              <span className="text-slate-500">(optional)</span>.
            </p>
          </div>
          <div className="block">
            <input
              value={names}
              onChange={(e) => setNames(e.target.value)}
              type="text"
              maxLength={100}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black my-5"
              placeholder="e.g. Rosalia, J Balvin, Ozuna"
            />
          </div>

          {!loading && (
            <button
              className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-5 hover:bg-black/80 w-full"
              onClick={(e) => generateBio(e)}
            >
              Analyze lyrics &rarr;
            </button>
          )}
          {loading && (
            <button
              className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-5 hover:bg-black/80 w-full"
              disabled
            >
              <LoadingDots color="white" style="large" />
            </button>
          )}
        </div>
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{ duration: 2000 }}
        />
        <hr className="h-px bg-gray-700 border-1 dark:bg-gray-700" />
        <ResizablePanel>
          <AnimatePresence mode="wait">
            <motion.div className="space-y-10 my-10">
              {explanations && <Explanations explanations={explanations} />}
            </motion.div>
          </AnimatePresence>
        </ResizablePanel>
      </main>
      <Footer />
    </div>
  )
}

export default Home
