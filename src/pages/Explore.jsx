import { useState, useRef } from "react";
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';

import { ImLocation } from "react-icons/im";
import { AiFillPlusCircle } from "react-icons/ai"

import { addDestination } from './../features/wishlist/wishlistSlice';

import { ExploreForm } from "../components/ExploreForm";
import { Card } from "../components/Card";
import { Modal } from "../components/Modal";
import { Map } from "../components/Map";

export const Explore = () => {
    const dispatch = useDispatch();
    const [exploreItems, setExploreItems] = useState([]);
    const [currentExplore, setCurrentExplore] = useState({});
    const mapModal = useRef(null);

    const searchItems = (items) => {
        setExploreItems([]);
        let newItem;
        let newItemArr = [];
        items.forEach(item => {
            newItem = {
                "name": item.name.common,
                "official_name": item.name.official,
                "demonym": item.demonyms.eng,
                "area": item.area,
                "location": item.latlng,
                "population": item.population,
                "capital": item.capital,
                "capital_location": item.capitalInfo.latlng,
                "region": item.region,
                "subregion": item.subregion,
                "timezones": item.timezones,
                "domain_name": item.tld,
                "map": item.maps.googleMaps,
                "flag": item.flags.png,
                "coat_of_arms": item.coatOfArms.png
            }
            newItemArr.push(newItem);
        })
        setExploreItems(newItemArr);
    }

    const addToWishlist = (id, name) => {
        try {
            dispatch(addDestination({id, name}));
            toast.success("New destination added!");     
        } catch (error) {
            toast.error("An error occured, try again");  
        }
    }
    const triggerMapModal = (name, latLng) => {
        setCurrentExplore({
            name,
            latLng
        });
        mapModal.current.classList.remove("hidden");
    }
    const closeMapModal = () => {
        setCurrentExplore({});
        mapModal.current.classList.add("hidden");
    }
    return (
        <div className="grid place-items-center items-center mt-20">
            <h1 className="text-center font-['Lobster'] text-5xl mb-4">Find new destinations</h1>
            <hr className="border border-pink-500 w-1/2 mb-4 mt-2" />
            <ExploreForm handleSearch={searchItems} />
            <div className="flex flex-wrap gap-4 justify-center mb-10">
                {exploreItems.length > 0 ? exploreItems.map((item, i) => {
                    return (
                        <Card
                            key={i}
                            id={`exploreItem${i}`}
                            icons={<>
                            <div className="rounded-full bg-zinc-800 hover:bg-zinc-700 w-full h-full p-2 transition duration-300">
                                    <AiFillPlusCircle className="text-2xl" onClick={() => addToWishlist(uuidv4(), item.name)}/>
                                </div>
                                <div className="rounded-full bg-zinc-800 hover:bg-zinc-700 w-full h-full p-2 transition duration-300">
                                    <ImLocation className="text-2xl" onClick={() => triggerMapModal(item.name, item.location)} />
                                </div>
                            </>}
                            image={<>
                                <img className="w-full h-2/4 object-fill" src={item.flag} />
                            </>}
                            title={item.name}
                            body={<>
                                <p><span className="font-bold">Official name:</span> {item.official_name}</p>
                                <p><span className="font-bold">Population:</span> {item.population}</p>
                                <p><span className="font-bold">Area:</span> {item.area}</p>
                                <p><span className="font-bold">Region:</span> {item.region}</p>
                                <p><span className="font-bold">Subregion:</span> {item.subregion}</p>
                                <p><span className="font-bold">Capital City:</span> {item.capital}</p>
                                <p><span className="font-bold">Domain name:</span> {item.domain_name}</p>
                            </>}
                            footer={<></>}
                        />
                    )
                }) : ""}
            </div>

            {/* START MAP MODAL */}
            <Modal
                modalRef={mapModal}
                body={<>
                    <div>
                        <div className="text-center font-['Lobster'] text-5xl mb-4">
                            {currentExplore.name}
                        </div>
                        <div className="my-5">
                            {currentExplore.latLng && <Map lat={currentExplore.latLng[0]} lng={currentExplore.latLng[1]} />}
                        </div>
                        <div className="px-4 py-3 -mt-4 mb-2 flex justify-center sm:px-6">
                            <button type="button" className="font-['Cutive_Mono'] text-xl bg-pink-500 p-1 md:p-3 mx-2 shadow-lg shadow-pink-500/50 rounded" onClick={() => closeMapModal()}>Ok</button>
                        </div>
                    </div>
                </>}
            />
            {/* END MAP MODAL */}

        </div>
    )
}
