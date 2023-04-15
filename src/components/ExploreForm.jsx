import { useRef } from 'react';
import { toast } from 'react-toastify';
import { Button } from './Button';

export const ExploreForm = ({ handleSearch }) => {
    const inputRef = useRef(null);
    const search = async (e) => {
        e.preventDefault()
        const option = e.target.searchOptions;
        const query = e.target.searchQuery;
        const request = await fetch(`https://restcountries.com/v3.1/${option.value}/${query.value}`);
        if (request.status === 200) {
            const response = await request.json();
            handleSearch(response);
        } else {
            toast.error("Oops! Could not find that one.")
        }
    }
    const changePlaceHolder = (e) => {
        console.log(e)
        switch(e.target.value){
            case "name":
                inputRef.current.placeholder = "e.g. France";
            break;
            case "capital":
                inputRef.current.placeholder="e.g. Paris";
            break;
            case "region": 
                inputRef.current.placeholder="e.g. Europe";
            break;
            case "subregion":
                inputRef.current.placeholder="e.g. Western Europe";
            break;
            default:
                inputRef.current.placeholder="";
            break;
        }
    }
    return (
        <div className="m-3 p-5 mt-0 pt-1">
            <form action="" className="mt-2" onSubmit={(e) => search(e)}>
                <h2 className="text-4xl text-center font-['Lobster'] mb-4">Search for a place</h2>
                <div className="mb-2">
                <label htmlFor="searchOptions" className="mb-2 text-3xl font-['Lobster_Two']">Search by:</label>
                </div>
                <div className="mb-6 grid md:grid-cols-2 gap-2">
                    <select onChange={(e) => changePlaceHolder(e)} defaultValue="" required id="searchOptions" name="searchOptions" className="text-lg font-['Cutive_Mono'] shadow-orange-500/50 p-2 border border-orange-300 outline-0 rounded caret-orange-500 bg-zinc-700">
                        <option disabled value="">Choose an option</option>
                        <option value="name">Country</option>
                        <option value="capital">Capital city</option>
                        <option value="region">Region</option>
                        <option value="subregion">Subregion</option>
                    </select>
                    <input ref={inputRef} required type="search" placeholder="" name="searchQuery" className="text-lg font-['Cutive_Mono'] shadow-orange-500/50 p-2 border border-orange-300 outline-0 rounded caret-orange-500 bg-zinc-600/20 placeholder:text-zinc-300 backdrop-blur"></input>
                </div>
                <div className="mb-6 grid w-1/2 mx-auto">
                    <Button type="submit">Find</Button>
                </div>
            </form>
        </div>

    )
};