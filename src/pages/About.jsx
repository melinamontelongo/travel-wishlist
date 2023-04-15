import { Divider } from "../components/Divider"

export const About = () => {
    return (
        <div className="h-screen">
            <div className="grid place-items-center items-center mt-20">
                <h1 className="text-center font-['Lobster'] text-5xl mb-4">About Travel Wishlist</h1>
                <div className="w-1/2"><Divider /></div>
                <div className="font-['Cutive_Mono'] text-xl w-1/2">
                    <p>This is a web app where you can save the destinations you want to visit, add images, as well as explore new places.</p>
                    <p>Built with React, using Redux Toolkit, Redux Persist, React Router, Framer Motion and Tailwind.css for styling.</p>
                    <p>- Developed by <a className="underline text-orange-500 hover:text-orange-600 transition-colors" href="https://github.com/melinamontelongo">Melina M.</a></p>
                </div>
            </div>
        </div>
    )
}
