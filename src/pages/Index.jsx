import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";

export const Index = () => {
    return (
        <div className="grid place-items-center items-center h-screen">
            <div className="grid grid-rows-2">
                <div>
                    <h1 className="text-5xl mb-5 font-['Lobster']">Welcome to your Travel Wishlist</h1>
                    <hr className="border border-pink-500 mb-4 mt-2" />
                    <motion.p
                        animate={{ x: [1, -100, 1, 100, 1] }}
                        transition={{ repeat: Infinity, repeatType: "loop", duration: 10 }}

                        className="text-center mt-5 text-4xl font-['Amatic_SC']">The place where your dreams begin</motion.p>
                </div>
                <div className="grid place-items-center">
                    <NavLink to="/start">
                        <motion.div
                            whileHover={{ scale: 1.2 }}
                            transition={{ type: "spring", stiffness: 50 }}
                            className="bg-pink-500 p-3 shadow-lg shadow-pink-500/50 hover:bg-pink-600 hover:shadow-pink-600/50 transition-colors rounded flex">
                            <span className="text-xl text-xl font-['Cutive_Mono']">Take off!</span>
                        </motion.div>
                    </NavLink>
                </div>
            </div>
        </div>
    )
}