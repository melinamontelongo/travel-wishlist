import { useRef } from "react";
import { UnsplashCredit } from "./UnsplashCredit";
import { Modal } from "./Modal";
export const SearchModal = ({ modalRef, picArray, chosenPic, searchHandler, chosenPicHandler, closeModalHandler }) => {

    const searchInput = useRef(null);
    const search = (value) => {
        searchHandler(value);
        searchInput.current.value = "";
    }
    return (

        <Modal modalRef={modalRef}
            body={<>
                <div>
                    <h2 className="text-4xl text-center font-['Lobster'] font-venice leading-6" id="modal-title">Search for an image</h2>
                    <div className="my-5 text-center">
                        <input ref={searchInput} placeholder="e.g. Paris" type="search" className="font-['Cutive_Mono'] text-lg appearance-none shadow shadow-pink-500/50 p-2 border border-pink-500 outline-0 rounded caret-pink-500 bg-zinc-700"></input>
                        <button className="font-['Cutive_Mono'] text-xl bg-pink-500 p-2 mx-2 shadow-lg shadow-pink-500/50 hover:bg-pink-600 hover:shadow-pink-600/50 rounded" onClick={() => search(searchInput.current.value)}>Go!</button>
                    </div>
                    <div className="mt-5 mb-5 grid grid-cols-5 gap-1 place-items-center">
                        {picArray.length > 1 &&
                            picArray.map((pic) =>
                                <img
                                    key={pic.id}
                                    title={`Photo by ${pic.photographer} on Unsplash`}
                                    alt={`Photo by ${pic.photographer} on Unsplash`}
                                    className="w-full h-full object-cover hover:contrast-50 rounded"
                                    id={pic.id}
                                    src={pic.img}
                                    data-download={pic.download}
                                    data-card={pic.img}
                                    data-photographer={pic.photographer}
                                    onClick={() => chosenPicHandler(pic)}
                                >
                                </img>
                            )
                        }
                    </div>
                    <div className="text-center mb-4">
                        {chosenPic && <UnsplashCredit photographer={chosenPic.photographer} />}
                    </div>
                    <div className="px-4 py-3 -mt-4 mb-2 flex justify-center sm:px-6">
                        <button type="button" className="font-['Cutive_Mono'] text-xl bg-pink-500 p-1 md:p-3 mx-2 shadow-lg shadow-pink-500/50 hover:bg-pink-600 hover:shadow-pink-600/50 rounded" onClick={() => closeModalHandler(true)}>Save</button>
                        <button type="button" className="font-['Cutive_Mono'] text-xl bg-pink-500 p-1 md:p-3 mx-2 shadow-lg shadow-pink-500/50 hover:bg-pink-600 hover:shadow-pink-600/50 rounded" onClick={() => closeModalHandler(false)}>Cancel</button>
                    </div>
                </div>
            </>}
        />
    )
}