export default function ConfirmationContent(
    {
        token,
    }:
    {
        token: string
    }
){
    return (
        <div className="w-full flex justify-center items-center">
            <div className="w-full max-w-3xl">
                <h2 className="text-green-500 font-bold text-2xl md:text-3xl">Order Placed Successfully!</h2>
            
                <div className="w-full flex justify-center items-center">
                    <div className="px-4 py-3 rounded-2xl border border-gray-200/80 bg-white/80 p-4 backdrop-blur dark:border-white/10 dark:bg-white/[0.02]">
                        <span className="text-gray-900 dark:text-gray-100">
                            {token}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}