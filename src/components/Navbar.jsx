import { NavLink } from "react-router-dom";
import { AiFillHome, AiFillStar } from "react-icons/ai";
import { MdTravelExplore } from "react-icons/md";
import { BsFillQuestionCircleFill } from "react-icons/bs"

export const Navbar = () => {
    return (
        <div className="fixed p-2 top-0 left-0 right-0 bg-zinc-700/50 backdrop-blur z-10">
            <div className="flex justify-evenly md:justify-start items-center">
                <NavLink to="/" className={({ isActive, isPending }) =>
                    isPending ? "text-zinc-600" : isActive ? "text-zinc-100" : "text-zinc-500"}>
                    <div className="flex justify-center items-center p-1 gap-1 mx-auto md:mx-2">
                        <span className="text-2xl"><AiFillHome /></span>
                        <span className="font-['Amatic_SC'] text-2xl hidden md:block" >Home</span>
                    </div>
                </NavLink>
                <NavLink to="/start" className={({ isActive, isPending }) =>
                    isPending ? "text-zinc-600" : isActive ? "text-zinc-100" : "text-zinc-500"}>
                    <div className="flex justify-center items-center p-1 gap-1 mx-auto md:mx-2">
                        <span className="text-2xl"><AiFillStar /></span>
                        <span className="font-['Amatic_SC'] text-2xl hidden md:block"> My wishlist</span>
                    </div>
                </NavLink>
                <NavLink to="/explore" className={({ isActive, isPending }) =>
                    isPending ? "text-zinc-600" : isActive ? "text-zinc-100" : "text-zinc-500"}>
                    <div className="flex justify-content-center items-center p-1 gap-1 mx-auto md:mx-2">
                        <span className="text-2xl"><MdTravelExplore /></span>
                        <span className="font-['Amatic_SC'] text-2xl hidden md:block"> Explore</span>
                    </div>
                </NavLink>
                <NavLink to="/about" className={({ isActive, isPending }) =>
                    isPending ? "text-zinc-600" : isActive ? "text-zinc-100" : "text-zinc-500"}>
                    <div className="flex justify-content-center items-center p-1 gap-1 mx-auto md:mx-2">
                        <span className="text-2xl"><BsFillQuestionCircleFill /></span>
                        <span className="font-['Amatic_SC'] text-2xl hidden md:block"> About</span>
                    </div>
                </NavLink>
            </div>
        </div>
    )
};