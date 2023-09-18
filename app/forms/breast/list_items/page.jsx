'use client'
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function List() {

    const [showModal, setShowModal] = useState(false);
    const router = useRouter();
    const [selectedOption, setSelectedOption] = useState('');
    const [responses, setResponses] = useState([]);
    const handleOptionChange = (event) => {
        const selectedValue = event.target.value
        setSelectedOption(selectedValue);
        router.push(`/forms/${selectedValue}/list_items`);
        
    };

    const [useData, setUseData] = useState(null);
    useEffect(() => {
        fetch("http://localhost:8000/breast")
            .then(response => response.json())
            .then((resp) => {
                setUseData(resp);
                console.log(resp);
            }).catch((error) => {
                console.log(error.message)
            })
    }, [])

    const [details, setDetails] = useState(null)
    const getDetailsById = async (id) => {
        try {
            const response = await fetch(`http://localhost:8000/colon_cancer/${id}`);
            if (response.ok) {
                const data = await response.json();
                setDetails(data);
                setShowModal(true);
            } else {
                console.error('Erreur lors de la récupération des détails');
            }
        } catch (error) {
            console.error('Erreur lors de la requête API:', error);
        }


    };

    const deleteEntry = async (id) => {
        try {
            const response = await fetch(`http://localhost:8000/colon_cancer/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                const updatedResponses = responses.filter((response) => response.id !== id);
                setResponses(updatedResponses);
                toast(`Deleted succefully!`, {
                    type: 'success',
                    position: 'top-center',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",

                });
                window.location.reload();
            } else {
                console.error('Erreur lors de la suppression');
            }
        } catch (error) {
            console.error('Erreur lors de la requête API:', error);
        }
    };

    return (
        <div>
            <div className="flex justify-center items-center mt-8 mb-16">
                <p className="text-blue-500 text-3xl font-semibold">Breast</p>
            </div>

            <div className="mb-3 flex justify-center items-center">
                <div className="relative flex w-[50%] flex-wrap items-stretch">
                    <input
                        type="search"
                        className="relative m-0 block w-[1px] min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
                        placeholder="Search"
                        aria-label="Search"
                        aria-describedby="button-addon2" />
                    <span
                        className="input-group-text flex items-center whitespace-nowrap rounded px-3 py-1.5 text-center text-base font-normal text-neutral-700 dark:text-neutral-200"
                        id="basic-addon2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="h-5 w-5">
                            <path
                                fill-rule="evenodd"
                                d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                                clip-rule="evenodd" />
                        </svg>
                    </span>
                </div>
                <select value={selectedOption} onChange={handleOptionChange} id="underline_select" className="bg-slate-100 focus:ring-2 focus:ring-blue-500 text-blue-500 pl-4 rounded-full text-base font-bold block py-2.5 px-0 w-[10%]  bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer">
                    <option selected>List of items</option>
                    <option value="breast">Breast</option>
                    <option value="colon_cancer">Colon Cancer</option>
                    <option value="head_and_neck">Head and Neck</option>
                    <option value="liver_cancer">Liver Cancer</option>
                    <option value="pancreatic">Pancreatic</option>
                </select>
            </div>
            <ToastContainer/>
        </div>
    )
}
export default List