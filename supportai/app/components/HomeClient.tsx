'use client'
import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import axios from 'axios'
import { useRouter } from 'next/navigation'

function HomeClient({ email }: { email: string }) {
  const handleLogin = () => {
    setLoading(true)
    window.location.href = '/api/auth/login'
  }
  const firstLetter = email?.[0]?.toUpperCase() || "U";
  const [loading, setLoading] = useState(false)
  let [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement | null>(null)
  const buttonRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    if (!open) return

    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node | null
      if (!target) return

      if (menuRef.current?.contains(target)) return
      if (buttonRef.current?.contains(target)) return

      setOpen(false)
    }

    document.addEventListener('pointerdown', onPointerDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
    }
  }, [open])
  
  const navigate = useRouter()
  
  const features = [
    {
      title: "Instant Support",
      description: "Provide 24/7 support to your customers with our AI-powered chatbot."
    },
    {
      title: "Admin Controlled",
      description: "You can control what the AI knows and answers."
    },
    {
      title: "Customizable",
      description: "Tailor the chatbot to match your brand and specific needs."
    }
  ]
  
  const handleLogout = async () => {
    try {
      const result = await axios.get('/api/auth/logout')
      window.location.href = '/'
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='min-h-screen bg-[#fafafa] text-zinc-900 overflow-x-hidden selection:bg-blue-100 relative'>
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
            <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-blue-400/20 blur-[120px]"></div>
            <div className="absolute top-[20%] -right-[10%] w-[30%] h-[30%] rounded-full bg-purple-400/20 blur-[120px]"></div>
        </div>

        <motion.div 
        initial={{y: -50, opacity: 0}}
        animate={{y: 0, opacity: 1}}
        transition={{duration: 0.5}}
        className='fixed top-0 left-0 w-full bg-white/60 backdrop-blur-2xl border-b border-zinc-200/50 z-50'>
        <div className='max-w-7xl mx-auto px-6 h-20 flex items-center justify-between'>
                <div className='text-xl font-extrabold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-zinc-900 to-zinc-500'>Support AI</div>
                {email ? <div className='text-sm text-zinc-600 relative'>
                  <button ref={buttonRef} className='w-10 h-10 rounded-full bg-gradient-to-tr from-zinc-900 to-zinc-700 text-white flex items-center justify-center font-bold shadow-lg shadow-zinc-200 hover:scale-105 hover:shadow-xl transition-all cursor-pointer ring-2 ring-white' onClick={()=>setOpen(!open)}>{firstLetter}</button>
                  {open && <div ref={menuRef} className='absolute top-14 right-0 bg-white/90 backdrop-blur-xl rounded-xl shadow-2xl border border-zinc-100 py-2 w-48 overflow-hidden transform origin-top-right transition-all'>
                    <div className='px-4 py-2.5 text-sm font-medium text-zinc-700 cursor-pointer hover:bg-zinc-50 transition-colors' onClick={()=>navigate.push("/dashboard")}>Dashboard</div>
                    <button className='w-full text-left px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors' onClick={handleLogout}>Logout</button>
                  </div>}
                  </div> :
                <motion.button className='px-6 py-2.5 rounded-full bg-zinc-900 text-white text-sm font-semibold hover:bg-zinc-800 hover:shadow-lg hover:shadow-zinc-200 transition-all disabled:opacity-60 flex items-center gap-2' onClick={handleLogin} disabled={loading}>
                  {loading ? "Loading..." : "Login"}
                </motion.button>
                }
        </div>
        </motion.div>

        <section className='pt-40 pb-32 px-6 relative'>
            <div className='max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center'>
                <motion.div
                initial={{opacity: 0,y: 40}}
                animate={{y: 0, opacity: 1}}
                transition={{duration: 0.7, ease: "easeOut"}}>
                  <h1 className='text-5xl lg:text-7xl font-extrabold tracking-tight text-zinc-900 leading-[1.1]'>
                    <span className='text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600'>AI support</span> <br />
                    built for modern websites.
                  </h1>
                  <p className='mt-8 text-xl text-zinc-600 max-w-lg leading-relaxed font-medium'>
                    Add a powerful AI chatbot to your platform in minutes. Let your customers get instant answers using your own business knowledge.
                  </p>
                  <div className='flex flex-col sm:flex-row gap-4 mt-10'>
                    {email? <button className='px-8 py-4 bg-zinc-900 text-white rounded-full font-semibold hover:bg-zinc-800 shadow-xl shadow-zinc-200 hover:shadow-2xl hover:-translate-y-0.5 transition-all cursor-pointer' onClick={()=>navigate.push("/dashboard")}>
                      Go to dashboard
                    </button> : <button className='px-8 py-4 bg-zinc-900 text-white rounded-full font-semibold hover:bg-zinc-800 shadow-xl shadow-zinc-200 hover:shadow-2xl hover:-translate-y-0.5 transition-all cursor-pointer' onClick={handleLogin}>
                      Get started free
                    </button>}
                    
                    <button className='px-8 py-4 bg-white border border-zinc-200 text-zinc-700 rounded-full font-semibold hover:bg-zinc-50 hover:border-zinc-300 transition-all cursor-pointer shadow-sm'>
                      See how it works
                    </button>
                  </div>
                </motion.div>

                <motion.div 
                initial={{opacity: 0, scale: 0.9, rotateX: 10}}
                animate={{opacity: 1, scale: 1, rotateX: 0}}
                transition={{duration: 0.8, delay: 0.2, type: "spring"}}
                className='relative perspective-1000'
                >
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-3xl blur-2xl opacity-20 animate-pulse"></div>
                <div className='relative rounded-3xl bg-white/80 backdrop-blur-xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-white p-8'>
                      <div className='flex items-center gap-3 mb-6'>
                        <div className="flex gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-zinc-200"></div>
                            <div className="w-3 h-3 rounded-full bg-zinc-200"></div>
                            <div className="w-3 h-3 rounded-full bg-zinc-200"></div>
                        </div>
                        <div className='text-xs font-semibold uppercase tracking-wider text-zinc-400 ml-auto'>
                          Live Preview
                        </div>
                      </div>
                      <div className='space-y-5'>
                        <div className='bg-gradient-to-br from-zinc-900 to-zinc-800 text-white rounded-2xl rounded-tr-sm px-5 py-3.5 text-sm ml-auto w-fit shadow-md'>
                            Do you offer cash on delivery?
                        </div>
                        <div className='bg-zinc-100/80 text-zinc-800 rounded-2xl rounded-tl-sm px-5 py-3.5 text-sm w-fit border border-zinc-200/50 shadow-sm'>
                            Yes, cash on delivery is available.
                        </div>
                      </div>
                      <motion.div
                      animate={{y:[0,-10,0]}}
                      transition={{repeat: Infinity, duration: 2.5, ease: "easeInOut"}}
                      className='absolute -bottom-6 -right-6 w-16 h-16 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 text-white flex items-center justify-center shadow-2xl shadow-purple-500/30 text-2xl border-4 border-white'>
                        💬 
                      </motion.div>
                </div> 
                </motion.div>

            </div>
        </section>

        <section className='bg-white py-32 px-6 border-t border-zinc-100 relative z-10'>
          <div className='max-w-7xl mx-auto'>
            <motion.div 
            initial={{opacity: 0, y: 20}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once:true, margin: "-100px"}}
            transition={{duration:0.6}}
            className="text-center max-w-2xl mx-auto">
                <h2 className='text-3xl md:text-4xl font-extrabold tracking-tight'>Why choose Support AI</h2>
                <p className="mt-4 text-zinc-500 text-lg">Everything you need to scale your customer support without scaling your team.</p>
            </motion.div>

            <div className='mt-20 grid grid-cols-1 md:grid-cols-3 gap-8'>
                      {features.map((feature,index)=>(
                        <motion.div
                          initial={{opacity: 0, y: 20}}
                          whileInView={{opacity: 1, y: 0}}
                          viewport={{once:true, margin: "-50px"}}
                          transition={{delay: index * 0.15, duration: 0.5}}
                          key={index} className='bg-zinc-50/50 hover:bg-white border border-zinc-100 hover:border-zinc-200 hover:shadow-xl hover:shadow-zinc-200/50 rounded-2xl p-8 transition-all duration-300 group'>
                          <div className="w-12 h-12 rounded-xl bg-white border border-zinc-200 shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                             <div className="w-5 h-5 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-md"></div>
                          </div>
                          <h3 className='text-xl font-bold tracking-tight text-zinc-900'>{feature.title}</h3>
                          <p className='mt-3 text-zinc-500 leading-relaxed'>{feature.description}</p>
                        </motion.div>
                      ))}
            </div>
          </div>
        </section>

        <footer className='py-12 border-t border-zinc-100 bg-white text-center text-sm font-medium text-zinc-400'>
          &copy; {new Date().getFullYear()} Support AI. All rights reserved.
        </footer>
    </div>
  )
}

export default HomeClient