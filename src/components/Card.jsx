import { motion, AnimatePresence } from "framer-motion";

export const Card = ({ id, icons, image, title, body, footer }) => {
    return (
        <AnimatePresence>
                <motion.div key={id} initial={{ x: 5, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -5, opacity: 0 }} transition={{ ease: [0.17, 0.67, 0.83, 0.67] }}
                    className="group relative max-w-sm max-h-96 rounded overflow-y-auto shadow-lg bg-zinc-800 hover:bg-zinc-700 transition duration-300"
                    id={id}>
                    <div className="absolute right-0 top-0 flex gap-2 m-2 invisible group-hover:visible">
                        {icons}
                    </div>
                    {image}
                    <div className="px-6 py-4">
                        <div className="text-2xl font-['Lobster_Two'] mb-2">
                            {title}
                        </div>
                        <div className="text-zinc-400 text-lg font-['Cutive_Mono'] break-words">
                            {body}
                        </div>
                    </div>
                    <div className="px-6 pt-4 pb-2">
                        {footer}
                    </div>
                </motion.div>
        </AnimatePresence>
    )
}