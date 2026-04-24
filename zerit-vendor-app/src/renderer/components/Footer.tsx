export default function Footer(){
    return (
        <footer className="border-t border-gray-100 dark:border-white/5 py-8 px-6">
          <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="font-display font-bold text-xl text-gray-900 dark:text-white">
              Zerit<span className="text-cyan-400">.</span>
            </span>
            <p className="text-xs text-gray-400 font-display tracking-wide">
              © {new Date().getFullYear()} Zerit · Campus printing, simplified.
            </p>
          </div>
        </footer>
    )
}