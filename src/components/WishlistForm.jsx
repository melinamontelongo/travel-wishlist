import { useState, useRef } from "react";
import { SearchModal } from "./SearchModal";
import { toast } from 'react-toastify';

const ACCESS_KEY = import.meta.env.VITE_REACT_APP_ACCESS_KEY;

export const WishlistForm = ({ isUpdate, closeUpdateModal = undefined, handleSubmit, destinationToEdit, chosenPicValue = null, nameValue = "", descValue = "" }) => {

    const [picArray, setPicArray] = useState([]);
    const [chosenPic, setChosenPic] = useState(destinationToEdit ? destinationToEdit.picture : null);
    const formRef = useRef(null);
    const modal = useRef(null);

    const openModal = () => {
        modal.current.classList.remove("hidden");
    };
    const closeModal = (save) => {
        if (!save) setChosenPic(null);
        setPicArray([]);
        modal.current.classList.add("hidden");
    };
    const submit = async (e) => {
        e.preventDefault()
        try {
            if (isUpdate) {
                closeUpdateModal();
            }
            //  Comply with Unsplash API guidelines (triggering downloads each time a user selects a photo)
            if (chosenPic && chosenPic.download !== null) {
                const triggerDownload = await fetch(`${chosenPic.download}&client_id=${ACCESS_KEY}`);
            }
            handleSubmit(e, chosenPic);
            setPicArray([]);
            setChosenPic(null);
            // Show toast depending on mode
            toast.success(isUpdate ? "Destination edited successfully!" : "New destination added!");
        } catch (error) {
            toast.error("Oops! There was an error.");
        }
    };
    const search = async (query) => {
        setPicArray([]);
        setChosenPic(null);
        if (query.length > 1) {
            try {
                const newPicArray = [];
                const response = await fetch(`https://api.unsplash.com/search/photos/?client_id=${ACCESS_KEY}&query=${query}&orientation=landscape&content_filter=high`);
                const data = await response.json();       
                // Make sure there are enough search results
                if(data.total > 0){
                    data.results.forEach((pic) => {
                        let picObj = {
                            id: pic.id,
                            photographer: pic.user.username,
                            download: pic.links.download_location,
                            img: pic.urls.regular,
                        }
                        newPicArray.push(picObj);
                    })
                    setPicArray(newPicArray);
                } else {
                    toast.error("Not found! Try again.")
                }
            } catch (error) {
                toast.error("Oops! There was an error.")
            }
        } else {
            toast.warning("Enter something so we can search for it!")
        }
    }
    const choosePic = (pic) => {
        if (chosenPic) {
            document.getElementById(chosenPic.id).classList.remove("border", "border-zinc-100", "contrast-50");
        }
        document.getElementById(pic.id).classList.add("border", "border-zinc-100", "contrast-50");
        setChosenPic(pic);
    }

    return (
        <div className={`m-3 p-5 mt-0 pt-1 ${isUpdate ? "w-full" : "md:w-1/2"}`}>
            {/* START FORM */}
            <form ref={formRef} action="" onSubmit={(e) => submit(e)} className="mt-2">
                <h2 className="text-4xl text-center font-['Lobster'] mb-4">{isUpdate ? "Edit this destination" : "Add a new destination"}</h2>
                <div className="mb-6 grid">
                    <label htmlFor="destName" className="mb-2 text-3xl font-['Lobster_Two']">Destination:</label>
                    <input id="destName" required type="text" className="text-lg font-['Cutive_Mono'] shadow shadow-pink-500/50 p-2 border border-pink-500 outline-0 rounded caret-pink-500 bg-zinc-700" name="name" placeholder="Enter destination's name" defaultValue={destinationToEdit ? destinationToEdit.name : ""} key={destinationToEdit ? destinationToEdit.name : ""}></input>
                </div>
                <div className="mb-6 grid">
                    <label htmlFor="destDesc" className="mb-2 text-3xl font-['Lobster_Two']">Description:</label>
                    <textarea id="destDesc" required className="text-lg font-['Cutive_Mono'] shadow shadow-pink-500/50 p-2 border border-pink-500 outline-0 rounded caret-pink-500 bg-zinc-700" name="description" placeholder="Enter destination's description" defaultValue={destinationToEdit ? destinationToEdit.description : ""} key={destinationToEdit ? destinationToEdit.description : ""}></textarea>
                </div>
                <div className={`font-['Cutive_Mono'] text-xl grid gap-4 ${isUpdate ? "lg:grid-cols-3" : "lg:grid-cols-2"}`}>
                    <button type="button" className="bg-pink-500 p-1 md:p-1.5 mx-2 shadow-lg shadow-pink-500/50 hover:bg-pink-600 hover:shadow-pink-600/50 transition-colors rounded" onClick={openModal}>
                        {isUpdate ? "Change image" : "Choose an image"}
                    </button>
                    <button type="submit" className="bg-pink-500 p-1 md:p-1.5 mx-2 shadow-lg shadow-pink-500/50 hover:bg-pink-600 hover:shadow-pink-600/50 transition-colors rounded" >
                        {isUpdate ? "Save" : "Add"}
                    </button>
                    {isUpdate && (
                        <button type="button" className="bg-pink-500 p-1 md:p-1.5 mx-2 shadow-lg shadow-pink-500/50 hover:bg-pink-600 hover:shadow-pink-600/50 transition-colors rounded" onClick={closeUpdateModal}>
                            Cancel
                        </button>
                    )}
                </div>
            </form>
            {/* END FORM */}

            {/* START SEARCH MODAL */}
            <SearchModal modalRef={modal}
                picArray={picArray}
                chosenPic={chosenPic}
                searchHandler={search}
                chosenPicHandler={choosePic}
                closeModalHandler={closeModal}
            />
            {/* END SEARCH MODAL */}
        </div>
    )
}
