'use client'

import { X } from "lucide-react"
import { useState } from "react"

export default function SubmitDialog({toggleSubmitDialog, totalPages, totalFiles, handleSubmit} : 
    {
        toggleSubmitDialog: () => void,
        totalPages: number,
        totalFiles: number,
        handleSubmit: (name: string, email: string) => void
    }
){

    const [name, setName] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [error, setError] = useState<string>("")
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
    const [token, setToken] = useState<string>("");


    const onSubmit = () => {
        if(!name || !email){
            setError("please fill the details below.");
            return;
        }
        setError("")

        handleSubmit(name, email)
    }


    return (
        <div className="absolute inset-0 flex justify-center items-center backdrop-blur-lg bg-gray-900/70 z-10">
            <div className="w-full max-w-xl rounded-2xl border border-gray-200/80 bg-white p-4 backdrop-blur dark:border-white/10 dark:bg-white/[0.02] min-h-64">

                {
                    isSubmitted  ? 

                    <>
                        <div>
                            Uploading
                        </div>
                    </>

                    : 
                    
                    <>
                        <div className="flex justify-between items-center mb-4" >
                            <div className="mt-2 flex items-center gap-4 text-sm pl-3">
                                <div className="bg-gray-100/60 dark:bg-gray-900/60 rounded-full px-2 py-1 border border-gray-600">
                                    <span className="text-gray-900 dark:text-gray-100">{totalFiles} file{totalFiles === 1 ? "" : "s"}</span>
                                </div>
                                <div className="bg-cyan-300/60 dark:bg-cyan-600 rounded-full px-2 py-1 border border-gray-600">
                                    <span className="text-cyan-600 dark:text-cyan-100">{totalPages} total pages</span>
                                </div>
                            </div>

                            <button className="" onClick={()=>toggleSubmitDialog()}>
                                <X className="text-gray-900 dark:text-gray-500 cursor-pointer" />
                            </button>
                        </div>

                        <div className="flex items-center px-3 pb-4 ">
                            <h3 className="text-2xl font-bold">Upload your files and get your token</h3>
                        </div>

                        {   
                            error != "" &&
                            <div className="bg-red-500/80 mx-3 px-3 py-1 rounded-lg">
                                <p className="text-gray-100">{error}</p>
                            </div>
                        }
                        <div className="flex flex-col gap-4 w-full px-3 py-4">
                            <input type="text" 
                                    placeholder="Your name..." 
                                    className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-slate-700 transition focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 dark:border-white/10 dark:bg-[#151924] dark:text-slate-200"
                                    value={name}
                                    onChange={(e)=> setName(e.target.value)}
                            />

                            <input type="email" 
                                    placeholder="Email" 
                                    className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-slate-700 transition focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 dark:border-white/10 dark:bg-[#151924] dark:text-slate-200"       
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="w-full px-3 py-4">
                            <button className={`inline-flex items-center justify-center gap-2.5 rounded-2xl px-6 py-3 font-semibold text-white transition-all duration-300 w-full cursor-pointer ${
                                        false
                                            ? "cursor-not-allowed bg-gray-300 dark:bg-gray-700"
                                            : "bg-gradient-to-r from-cyan-500 to-cyan-400 hover:scale-[1.02] active:scale-95"
                                    }`}
                                    onClick={onSubmit}        
                            >
                                Upload & Get Token
                            </button>
                        </div>
                    </>


                }



            </div>
        </div>
    )
}