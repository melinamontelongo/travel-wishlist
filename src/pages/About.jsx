export const About = () => {
    return (
        <div className="grid place-items-center items-center mt-20">
            <h1 className="text-center font-['Lobster'] text-5xl mb-4">About Travel Wishlist</h1>
            <hr className="border border-pink-500 w-1/2 mb-4 mt-2" />
            <div className="font-['Cutive_Mono'] text-xl w-1/2">
                <p>This is a web app where you can save the destinations you want to visit, add images, as well as exploring new places.</p>
                <p>Built with React, using Redux Toolkit, Redux Persist, React Router, Framer Motion and Tailwind.css for styling.</p>
                <p>- Developed by <a className="underline text-pink-500 hover:text-pink-600 transition-colors"href="https://github.com/melinamontelongo">Melina M.</a></p>

            </div>
        </div>
    )
}
