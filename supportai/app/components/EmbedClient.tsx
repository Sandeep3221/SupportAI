"use client"
import { motion } from 'motion/react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

function EmbedClient({ ownerId }: { ownerId: string }) {
  const router = useRouter()
  const [copied, setCopied] = useState(false);
  
  const embedCode = `<script 
  src="${process.env.NEXT_PUBLIC_BASE_URL}/chatbot.js"
  data-owner-id="${ownerId}"
></script>`

  const copyCode = () => {
    navigator.clipboard.writeText(embedCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className='min-h-screen bg-[#fafafa] text-zinc-900 relative selection:bg-blue-100'>
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-0 right-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-gradient-to-bl from-purple-200/40 to-transparent rounded-full blur-2xl sm:blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-gradient-to-tr from-blue-200/40 to-transparent rounded-full blur-2xl sm:blur-3xl"></div>
      </div>

      <motion.div 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className='fixed top-0 left-0 w-full bg-white/70 backdrop-blur-2xl border-b border-zinc-200/50 z-50'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between'>
          <div className='text-lg sm:text-xl font-extrabold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-zinc-900 to-zinc-500 cursor-pointer transition-opacity hover:opacity-80' onClick={() => router.push("/")}>Support AI</div>
          <button className='px-4 sm:px-5 py-2 sm:py-2.5 rounded-full border border-zinc-200 bg-white shadow-sm text-xs sm:text-sm font-medium hover:bg-zinc-50 hover:border-zinc-300 hover:shadow transition-all cursor-pointer text-zinc-700' onClick={() => router.push("/dashboard")}>
            Back to Dashboard
          </button>
        </div>
      </motion.div>

      <div className='flex justify-center px-4 sm:px-6 py-24 sm:py-32'>
        <motion.div
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className='w-full max-w-4xl bg-white rounded-2xl sm:rounded-[2rem] shadow-xl shadow-zinc-200/40 border border-zinc-100 p-5 sm:p-10 lg:p-14'
        >
          <div className='mb-8 sm:mb-10'>
            <h1 className='text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-zinc-900 mb-2 sm:mb-3'>Embed Your Support Chatbot</h1>
            <p className='text-zinc-500 text-base sm:text-lg'>Copy the code below and paste it into your website's HTML where you want the chatbot to appear.</p>
          </div>
          
          <div className='relative bg-[#0d0d0d] text-zinc-100 rounded-xl sm:rounded-2xl p-4 sm:p-8 text-xs sm:text-sm font-mono mb-8 sm:mb-10 shadow-2xl overflow-hidden border border-zinc-800'>
            <div className="flex gap-2 mb-4 sm:mb-6">
              <div className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-zinc-700"></div>
              <div className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-zinc-700"></div>
              <div className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-zinc-700"></div>
            </div>
            
            <pre className='overflow-x-auto text-blue-300 leading-relaxed pb-4 sm:pb-0'>
              <code className="text-zinc-300">
                <span className="text-pink-400">&lt;script</span>
                {"\n  "}
                <span className="text-blue-300">src=</span><span className="text-emerald-300">"{process.env.NEXT_PUBLIC_BASE_URL}/chatbot.js"</span>
                {"\n  "}
                <span className="text-blue-300">data-owner-id=</span><span className="text-emerald-300">"{ownerId}"</span>
                {"\n"}
                <span className="text-pink-400">&gt;&lt;/script&gt;</span>
              </code>
            </pre>
            
            <button 
              onClick={copyCode} 
              className={`absolute top-3 sm:top-5 right-3 sm:right-5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-semibold flex items-center gap-1.5 sm:gap-2 transition-all cursor-pointer border ${copied ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700 border-zinc-700 hover:text-white'}`}
            >
              {copied ? (
                <>
                  <svg className="w-3 sm:w-4 h-3 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  Copied!
                </>
              ) : (
                <>
                  <svg className="w-3 sm:w-4 h-3 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
                  Copy Code
                </>
              )}
            </button>
          </div>

          <div className='mb-10 sm:mb-14'>
            <h3 className="text-base sm:text-lg font-bold text-zinc-900 mb-3 sm:mb-4">Quick Setup Guide</h3>
            <ul className='space-y-3 sm:space-y-4 text-sm sm:text-base text-zinc-600 font-medium'>
              <li className="flex items-start sm:items-center gap-3 sm:gap-4">
                <span className="flex-shrink-0 flex items-center justify-center w-6 sm:w-8 h-6 sm:h-8 rounded-full bg-blue-50 text-blue-600 text-xs sm:text-sm font-bold border border-blue-100 mt-0.5 sm:mt-0">1</span> 
                <span>Copy the embed code snippet above.</span>
              </li>
              <li className="flex items-start sm:items-center gap-3 sm:gap-4">
                <span className="flex-shrink-0 flex items-center justify-center w-6 sm:w-8 h-6 sm:h-8 rounded-full bg-blue-50 text-blue-600 text-xs sm:text-sm font-bold border border-blue-100 mt-0.5 sm:mt-0">2</span> 
                <span>Paste it just before the closing <code className="bg-zinc-100 px-1.5 py-0.5 rounded text-zinc-800 text-xs border border-zinc-200">&lt;/body&gt;</code> tag in your HTML.</span>
              </li>
              <li className="flex items-start sm:items-center gap-3 sm:gap-4">
                <span className="flex-shrink-0 flex items-center justify-center w-6 sm:w-8 h-6 sm:h-8 rounded-full bg-blue-50 text-blue-600 text-xs sm:text-sm font-bold border border-blue-100 mt-0.5 sm:mt-0">3</span> 
                <span>Save your changes and reload your website.</span>
              </li>
            </ul>
          </div>

          <div className='mt-12 sm:mt-16 pt-8 sm:pt-10 border-t border-zinc-100'>
            <div className="flex items-center gap-3 mb-6 sm:mb-8">
              <div className="w-8 sm:w-10 h-8 sm:h-10 rounded-lg sm:rounded-xl bg-purple-50 flex items-center justify-center text-purple-600 flex-shrink-0">
                <svg className="w-4 sm:w-5 h-4 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
              </div>
              <div>
                <h1 className='text-lg sm:text-xl font-bold text-zinc-900'>Live Preview</h1>
                <p className='text-xs sm:text-sm text-zinc-500'>This is how your chatbot will appear on your website.</p>
              </div>
            </div>

            <div className='rounded-xl sm:rounded-2xl border border-zinc-200 bg-white shadow-xl shadow-zinc-200/50 overflow-hidden relative'>
              <div className='flex items-center gap-2 px-3 sm:px-4 h-10 sm:h-12 bg-zinc-50 border-b border-zinc-200'>
                <div className="flex gap-1.5">
                  <span className='w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-red-400'/>
                  <span className='w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-yellow-400'/>
                  <span className='w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-green-400'/>
                </div>
                <div className='flex-1 flex justify-center'>
                  <div className="bg-white border border-zinc-200 rounded-md px-6 sm:px-32 py-1 text-[10px] sm:text-xs text-zinc-400 flex items-center gap-1.5 sm:gap-2 shadow-sm truncate max-w-[150px] sm:max-w-none">
                    <svg className="w-2.5 sm:w-3 h-2.5 sm:h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                    <span className="truncate">your-website.com</span>
                  </div>
                </div>
              </div>
              
              <div className='relative h-96 sm:h-[420px] p-4 sm:p-8 bg-[#fafafa]'>
                <div className="w-3/4 h-6 sm:h-8 bg-zinc-200/50 rounded-lg mb-3 sm:mb-4"></div>
                <div className="w-1/2 h-3 sm:h-4 bg-zinc-200/50 rounded-lg mb-2"></div>
                <div className="w-5/6 h-3 sm:h-4 bg-zinc-200/50 rounded-lg mb-2"></div>
                <div className="w-2/3 h-3 sm:h-4 bg-zinc-200/50 rounded-lg"></div>
                
                <div className='absolute bottom-20 sm:bottom-24 right-4 sm:right-6 w-[calc(100%-2rem)] sm:w-[280px] max-w-[280px] bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-zinc-100 overflow-hidden transform transition-all'>
                  <div className='bg-gradient-to-r from-zinc-900 to-zinc-800 text-white px-3 sm:px-4 py-2.5 sm:py-3 flex justify-between items-center'>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-green-400 animate-pulse"></div>
                      <span className="font-semibold text-xs sm:text-sm">Customer Support</span>
                    </div>
                    <svg className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-zinc-400 cursor-pointer hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                  </div>
                  <div className='p-3 sm:p-4 space-y-2.5 sm:space-y-3 bg-zinc-50/50'>
                    <div className='bg-white border border-zinc-100 text-zinc-800 text-xs sm:text-sm px-3 sm:px-4 py-2 sm:py-2.5 rounded-2xl rounded-tl-sm w-fit shadow-sm max-w-[90%]'>
                      Hello, how can I help you today?
                    </div>
                    <div className='bg-gradient-to-tr from-blue-600 to-purple-600 text-white text-xs sm:text-sm py-2 sm:py-2.5 px-3 sm:px-4 rounded-2xl rounded-tr-sm ml-auto w-fit shadow-md max-w-[90%]'>
                      I have a question about my order.
                    </div>
                  </div>
                  <div className="p-2 sm:p-3 bg-white border-t border-zinc-100 flex items-center gap-2">
                    <div className="flex-1 bg-zinc-100 rounded-full h-8 sm:h-9 px-3 sm:px-4 flex items-center text-[10px] sm:text-xs text-zinc-400">Type a message...</div>
                    <div className="h-8 sm:h-9 px-3 sm:px-4 rounded-full bg-zinc-900 text-white flex items-center justify-center flex-shrink-0 text-[10px] sm:text-xs font-semibold">
                      Send
                    </div>
                  </div>
                </div>
                
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                  className='absolute bottom-4 right-4 sm:right-6 w-12 sm:w-14 h-12 sm:h-14 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 text-white flex items-center justify-center shadow-xl shadow-purple-500/30 text-lg sm:text-xl border-[2px] sm:border-[3px] border-white cursor-pointer'> 
                  💬 
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default EmbedClient