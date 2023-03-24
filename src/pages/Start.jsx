import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';

import { addDestination, removeDestination, updateDestination } from './../features/wishlist/wishlistSlice';

import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

/* Components */
import { WishlistForm } from "./../components/WishlistForm";
import { Card } from "./../components/Card";
import { UnsplashCredit } from '../components/UnsplashCredit';
import { Modal } from '../components/Modal';

export const Start = () => {
    const dispatch = useDispatch();
    const wishlist = useSelector(state => state.wishlist.destinations);
    const updateModal = useRef(null);
    const [chosenDestination, setChosenDestination] = useState(null);
    const [isUpdate, setIsUpdate] = useState(false);

    const handleAdd = (e, pic) => {
        e.preventDefault();
        const name = e.target.name.value;
        const description = e.target.description.value;
        const picture = pic ? pic : "";
        const newDestination = {
            id: uuidv4(),
            name,
            description,
            picture
        };
        dispatch(addDestination(newDestination));
    }

    const handleDelete = (id) => {
        toast.success("Destination deleted successfully!")
        dispatch(removeDestination(id));
    }

    const handleUpdate = (e, pic) => {
        e.preventDefault();
        const name = e.target.name.value;
        const description = e.target.description.value;
        const picture = pic ? pic : chosenDestination.picture ? chosenDestination.picture : "";
        const updatedDestination = {
            name,
            description,
            picture
        }
        dispatch(updateDestination({ id: chosenDestination.id, updatedDestination }));
    }
    const triggerUpdateModal = (id) => {
        wishlist.forEach((d) => {
            if (d.id === id) {
                setChosenDestination(d);
            }
        })
        setIsUpdate(!isUpdate);
        updateModal.current.classList.remove("hidden");
    }
    const closeUpdateModal = () => {
        setIsUpdate(!isUpdate);
        updateModal.current.classList.add("hidden");
    }
    return (

        <div className="grid place-items-center items-center mt-20">
            <h1 className="text-center font-['Lobster'] text-5xl mb-4">The destinations of your dreams</h1>
            <hr className="border border-pink-500 w-1/2 mb-4 mt-2" />
            <WishlistForm handleSubmit={handleAdd} />

            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 w-3/4 pb-10 ">

                {wishlist.map((destination, i) => {
                    return (
                        <Card
                            key={i}
                            id={destination.id}
                            icons={<>
                                <div className="rounded-full bg-zinc-800 hover:bg-zinc-700 w-full h-full p-2 transition duration-300">
                                    <FaRegEdit className="text-2xl" onClick={() => triggerUpdateModal(destination.id)} />
                                </div>
                                <div className="rounded-full bg-zinc-800 hover:bg-zinc-700 w-full h-full p-2 transition duration-300">
                                    <MdDelete className="text-2xl" onClick={() => handleDelete(destination.id)} />
                                </div>
                            </>}
                            title={destination.name}
                            body={destination.description}
                            image={<>
                                <img className="w-full h-2/4 object-cover" src={destination.picture ? destination.picture.img : "./fallback.png"} alt="Destination image" />
                            </>}
                            footer={<>
                                {destination.picture && <UnsplashCredit photographer={destination.picture.photographer} />}
                            </>}
                        />
                    )
                })}
            </div>
            {/* MODAL TO EDIT A CARD START*/}
            <Modal
                modalRef={updateModal}
                body={
                    <WishlistForm 
                        isUpdate={isUpdate}
                        closeUpdateModal={closeUpdateModal}
                        destinationToEdit={chosenDestination}
                        handleSubmit={handleUpdate}
                    />}
            />
        </div>

    )
}
