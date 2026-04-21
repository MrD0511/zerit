import React from "react";

export default function PrintLayout({left, center, right, mobile}: {
    left: React.ReactNode,
    center: React.ReactNode,
    right: React.ReactNode,
    mobile: React.ReactNode
}){

    return (
        <div className="w-full p-4 h-full">
            <div className="md:hidden w-full">
                {mobile}
            </div>

            <div className="hidden md:grid md:grid-cols-3 gap-4 w-full">
                <aside className=" overflow-y-auto">
                    {left}
                </aside>

                <main className="overflow-y-auto">
                    {center}
                </main>

                <aside className="overflow-y-auto">
                    {right}
                </aside>
            </div>

            <div className="w-full flex justify-end items-center">
                <button type="button"
                        className="px-3 py-2 rounded-lg bg-blue-500 text-gray-50 dark:text-gray-900"
                >Submit</button>
            </div>
        </div>
    )
}