import { useRef } from "react";
import { UnsplashCredit } from "./UnsplashCredit";
import { Modal } from "./Modal";
import { Button } from "./Button";
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
                        <input ref={searchInput} placeholder="e.g. Paris" type="search" className="font-['Cutive_Mono'] text-lg appearance-none  shadow shadow-orange-500/50 p-2 border border-orange-300 outline-0 rounded caret-orange-500 bg-zinc-600/20 placeholder:text-zinc-300 backdrop-blur" />
                        <Button handleOnClick={() => search(searchInput.current.value)}>Go!</Button>
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
                        <Button type="button" handleOnClick={() => closeModalHandler(true)}>Save</Button>
                        <Button type="button" handleOnClick={() => closeModalHandler(false)}>Cancel</Button>
                    </div>
                </div>
            </>}
        />
    )
}