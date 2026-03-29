'use client'
import React, { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { useRouter } from 'next/navigation'
import axios from 'axios'

const DashboardClient = ({ ownerId }: { ownerId: string }) => {
  const navigator = useRouter()
  const [businessName, setBusinessName] = useState('')
  const [supportEmail, setSupportEmail] = useState('')
  const [knowledgeBase, setKnowledgeBase] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [settingsSaved, setSettingsSaved] = useState(false)

  const handleSettings = async () => {
    setIsLoading(true)
    try {
      const result = await axios.post("/api/settings", {
        ownerId,
        businessName,
        supportEmail,
        knowledgeBase
      })
      console.log(result.data.settings)
      setIsLoading(false)
      setSettingsSaved(true)
      setTimeout(() => { setSettingsSaved(false) }, 3000)
    } catch (error) {
      console.error("Error updating settings:", error)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (ownerId) {
      const handleGetDetails = async () => {
        try {
          const result = await axios.post("/api/settings/get", { ownerId });
          setBusinessName(result.data.businessName || "");
          setSupportEmail(result.data.supportEmail || "");
          setKnowledgeBase(result.data.knowledgeBase || "");
        } catch (error) {
          console.error("Failed to fetch settings", error);
        }
      };
      handleGetDetails();
    }
  }, [ownerId]);

  return (
    <div className='min-h-screen bg-[#fafafa] text-zinc-900 selection:bg-blue-100 relative'>
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[300px] bg-gradient-to-b from-blue-100/40 to-transparent blur-3xl"></div>
      </div>

      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className='fixed top-0 left-0 w-full bg-white/70 backdrop-blur-2xl border-b border-zinc-200/50 z-50'>
        <div className='max-w-7xl mx-auto px-6 h-20 flex items-center justify-between'>
          <div className='text-xl font-extrabold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-zinc-900 to-zinc-500 cursor-pointer' onClick={() => navigator.push("/")}>Support AI</div>
          <button className='px-5 py-2.5 rounded-full border border-zinc-200 bg-white shadow-sm text-sm font-medium hover:bg-zinc-50 hover:border-zinc-300 hover:shadow transition-all cursor-pointer text-zinc-700' onClick={() => navigator.push("/embed")}>
            Embed Chatbot
          </button>
        </div>
      </motion.div>

      <div className='flex justify-center px-4 sm:px-6 py-32'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className='w-full max-w-4xl bg-white rounded-[2rem] shadow-xl shadow-zinc-200/40 border border-zinc-100 p-6 sm:p-10 lg:p-14'
        >
          <div className='mb-12 border-b border-zinc-100 pb-8'>
            <h1 className='text-3xl font-extrabold tracking-tight text-zinc-900'>Chatbot Settings</h1>
            <p className='text-zinc-500 mt-2 text-lg'>Manage your AI's configuration and knowledge base.</p>
          </div>

          <div className='mb-12'>
            <h2 className='text-xl font-bold mb-6 flex items-center gap-2'>
              <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
              </div>
              Business Details
            </h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-700 ml-1">Business Name</label>
                <input type="text" className='w-full rounded-xl border border-zinc-200 bg-zinc-50/50 px-4 py-3.5 text-sm outline-none transition-all hover:bg-zinc-50 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10' placeholder='e.g. Acme Corp' value={businessName} onChange={(e) => setBusinessName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-700 ml-1">Support Email</label>
                <input type="email" className='w-full rounded-xl border border-zinc-200 bg-zinc-50/50 px-4 py-3.5 text-sm outline-none transition-all hover:bg-zinc-50 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10' placeholder='support@example.com' value={supportEmail} onChange={(e) => setSupportEmail(e.target.value)} />
              </div>
            </div>
          </div>

          <div className='mb-12'>
            <div className="mb-6">
                <h2 className='text-xl font-bold flex items-center gap-2'>
                <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
                </div>
                Knowledge Base
                </h2>
                <p className='text-sm text-zinc-500 mt-2 ml-10'>Train your AI with FAQs, policies, and delivery info.</p>
            </div>
            
            <div className='space-y-4'>
              <textarea className='w-full min-h-[250px] resize-y rounded-2xl border-2 border-dashed border-zinc-200 bg-zinc-50/50 px-5 py-4 text-sm outline-none transition-all hover:bg-zinc-50 hover:border-zinc-300 focus:border-solid focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 leading-relaxed' placeholder={`Example:\n- Refund Policy: 30 days money-back guarantee.\n- Delivery time: 3-5 business days.\n- Support hours: Monday to Friday, 9 AM - 5 PM.`} value={knowledgeBase} onChange={(e) => setKnowledgeBase(e.target.value)} />
            </div>
          </div>

          <div className='flex flex-col sm:flex-row items-center gap-5 pt-6 border-t border-zinc-100'>
            <button
              className='w-full sm:w-auto px-8 py-3.5 rounded-full bg-zinc-900 text-white text-sm font-semibold hover:bg-zinc-800 shadow-lg shadow-zinc-200 hover:shadow-xl hover:-translate-y-0.5 transition-all disabled:opacity-70 disabled:hover:translate-y-0 disabled:cursor-not-allowed cursor-pointer'
              onClick={handleSettings}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Saving...
                </div>
              ) : "Save Changes"}
            </button>
            
            {settingsSaved && (
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className='flex items-center gap-2 text-emerald-600 bg-emerald-50 px-4 py-2 rounded-lg font-medium text-sm w-full sm:w-auto justify-center'
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                Settings saved successfully
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default DashboardClient