'use client'
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Link from "next/link"
import Swal from 'sweetalert2';

function List() {
    const [useData, setUseData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const router = useRouter();
    const [selectedOption, setSelectedOption] = useState('');
    const [responses, setResponses] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const apiUrl = "http://localhost:8000/liver_cancer";
    const page = currentPage;
    const itemsPerPage = 5;
    const requestUrl = `${apiUrl}?page=${page}&perPage=${itemsPerPage}`;
    const totalDataSize = useData.length;
    const totalPages = Math.ceil(totalDataSize / itemsPerPage);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);

    const filterItems = (items, searchTerm) => {
        return items.filter((item) =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.addressEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.phoneNumber.includes(searchTerm)
        );
    };

    const handleOptionChange = (event) => {
        const selectedValue = event.target.value
        setSelectedOption(selectedValue);
        router.push(`/forms/${selectedValue}/list_items`);

    };

    useEffect(() => {
        setLoading(true);
        fetch(requestUrl)
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                } else if (response.status === 404) {
                    throw new Error("Not Found");
                } else if (response.status === 401) {
                    throw new Error('Unautorized');
                } else if (response.status === 500) {
                    throw new Error('Internal server Error');
                } else {
                    throw new Error('Unknown status : ' + response.status);
                }
            })
            .then((resp) => {
                setUseData(resp);
                console.log(resp);
            })
            .catch((error) => {
                throw error;
            })
            .finally(() => {
                setLoading(false);
            });
    }, [page, itemsPerPage]);


    let itemsToShow = [];
    if (useData !== null) {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        itemsToShow = useData.slice(startIndex, endIndex);
    }
    const nextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const filteredItems = filterItems(itemsToShow, searchTerm);

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const [details, setDetails] = useState(null)
    const getDetailsById = async (id) => {
        try {
            const response = await fetch(`http://localhost:8000/liver_cancer/${id}`);
            if (response.ok) {
                const data = await response.json();
                setDetails(data);
                setShowModal(true);
            } else {
                console.error('Error retrieving details');
            }
        } catch (error) {
            console.error('Error during API request:', error);
        }


    };

    const deleteEntry = async (id) => {
        try {
            const shouldDelete = await Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'Cancel',
            });

            if (shouldDelete.isConfirmed) {
                const response = await fetch(`http://localhost:8000/liver_cancer/${id}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    const updatedResponses = responses.filter((response) => response.id !== id);
                    setResponses(updatedResponses);
                    Swal.fire('Deleted!',
                        'Your file has been deleted.',
                        'success',
                    );
                } else {
                    console.error('Error while deleting');
                    Swal.fire('Error', 'Your file has been deleted!', 'error');
                }
            }
        } catch (error) {
            console.error('Error during API request:', error);
            Swal.fire('Error', 'An error occurred during the API request.', 'error');
        }
    };

    const goToUpdateForm = async (id) => {
        try {
            const response = await fetch(`http://localhost:8000/liver_cancer/${id}`);
            if (response.ok) {
                const data = await response.json();
                console.log(data)
                router.push(`/forms/liver_cancer/list_items/${id}`);
            } else {
                console.error('Erreur lors de la récupération des détails');
            }
        } catch (error) {
            console.error('Erreur lors de la requête API:', error);
        }
    }

    return (
        <div>
            {
                loading ? (
                    <div role="status" className="animate-pulse">
                        <div>
                            <div className="flex justify-center items-center mt-8 mb-16">
                                <p className="text-gray-300 text-3xl font-semibold rounded-full h-8 max-w-[360px] bg-gray-300 mb-2.5">Liver Cancer</p>
                            </div>
                            <div className="flex justify-center items-center mb-3">
                                <div className="relative flex w-[65%] flex-wrap items-stretch">
                                    <input
                                        className="relative bg-gray-300 m-0 block w-[1px] min-w-0 flex-auto rounded text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
                                        disabled
                                    />
                                    <span
                                        disabled
                                        className="input-group-text flex items-center whitespace-nowrap rounded px-3 py-1.5 text-center text-base font-normal text-neutral-50 dark:text-neutral-200"
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
                                <select disabled value={selectedOption} onChange={handleOptionChange} id="underline_select" className="bg-gray-400 text-gray-400 pl-4 rounded-full text-base font-bold block py-2.5 px-0 w-[10%]  bg-gray-200">
                                    <option selected>List of items</option>
                                    <option value="liver_cancer">Liver Cancer</option>
                                    <option value="colon_cancer">Colon Cancer</option>
                                    <option value="breast">Breast</option>
                                    <option value="head_and_neck">Head and Neck</option>
                                    <option value="pancreatic">Pancreatic</option>
                                </select>
                            </div>
                            <div className="flex justify-center items-center">
                                <table className="w-[75%] border text-sm text-left text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-300 uppercase bg-gray-300 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th scope="col" className="px-6 py-4">
                                                ID
                                            </th>
                                            <th scope="col" className="px-6 py-4">
                                                Date
                                            </th>
                                            <th scope="col" className="px-6 py-4">
                                                Name
                                            </th>
                                            <th scope="col" className="px-6 py-4">
                                                Date Of Birth
                                            </th>
                                            <th scope="col" className="px-6 py-4">
                                                Address
                                            </th>
                                            <th scope="col" className="px-6 py-4 ps-14">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* Skeleton Loader */}
                                        {[1, 2, 3, 4, 5].map((index) => (
                                            <tr key={index} className="animate-pulse">
                                                <td className="bg-gray-300 dark:bg-gray-600 h-8 w-12"></td>
                                                <td className="bg-gray-300 dark:bg-gray-600 h-8 w-20"></td>
                                                <td className="bg-gray-300 dark:bg-gray-600 h-8 w-32"></td>
                                                <td className="bg-gray-300 dark:bg-gray-600 h-8 w-24"></td>
                                                <td className="bg-gray-300 dark:bg-gray-600 h-8 w-40"></td>
                                                <td className="bg-gray-300 dark:bg-gray-600 h-8 w-20"></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </div>
                ) : (
                    <div>
                        <div className="flex justify-center items-center mt-8 mb-16">
                            <p className="text-blue-500 text-3xl font-semibold">Liver Cancer</p>
                        </div>

                        <div className="flex justify-center items-center mb-3">
                            <div className="relative flex w-[65%] flex-wrap items-stretch">
                                <input
                                    type="search"
                                    className="relative m-0 block w-[1px] min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
                                    placeholder="Search"
                                    aria-label="Search"
                                    aria-describedby="button-addon2"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
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
                                <option value="liver_cancer">Liver Cancer</option>
                                <option value="colon_cancer">Colon Cancer</option>
                                <option value="breast">Breast</option>
                                <option value="head_and_neck">Head and Neck</option>
                                <option value="pancreatic">Pancreatic</option>
                            </select>
                        </div>
                        <div className="flex justify-center items-center">
                            <table className="w-[75%] border text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-slate-50 uppercase bg-blue-500 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-6 py-4">
                                            ID
                                        </th>
                                        <th scope="col" className="px-6 py-4">
                                            Date
                                        </th>
                                        <th scope="col" className="px-6 py-4">
                                            Name
                                        </th>
                                        <th scope="col" className="px-6 py-4">
                                            Date Of Birth
                                        </th>
                                        <th scope="col" className="px-6 py-4">
                                            Address
                                        </th>
                                        <th scope="col" className="px-6 py-4 ps-14">
                                            Actions
                                        </th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredItems &&
                                        filteredItems.map(item => (
                                            <tr key={item.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    {item.id}
                                                </th>
                                                <td className="px-6 py-4">
                                                    {item.date}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {item.name}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {item.dateOfBirth}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {item.address}
                                                </td>
                                                <td scope="col" className="px-6 py-4">
                                                    <button onClick={() => getDetailsById(item.id)} >
                                                        <svg className="w-[40px] h-[20px] text-blue-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 14">
                                                            <path d="M10 0C4.612 0 0 5.336 0 7c0 1.742 3.546 7 10 7 6.454 0 10-5.258 10-7 0-1.664-4.612-7-10-7Zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
                                                        </svg>
                                                    </button>
                                                    |
                                                    <Link href={`/app/forms/liver_cancer/list_items/${item.id}`}>
                                                        <button onClick={() => goToUpdateForm(item.id)}>
                                                            <svg className="w-[40px] h-[20px] text-blue-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                                                <path d="M12.687 14.408a3.01 3.01 0 0 1-1.533.821l-3.566.713a3 3 0 0 1-3.53-3.53l.713-3.566a3.01 3.01 0 0 1 .821-1.533L10.905 2H2.167A2.169 2.169 0 0 0 0 4.167v11.666A2.169 2.169 0 0 0 2.167 18h11.666A2.169 2.169 0 0 0 16 15.833V11.1l-3.313 3.308Zm5.53-9.065.546-.546a2.518 2.518 0 0 0 0-3.56 2.576 2.576 0 0 0-3.559 0l-.547.547 3.56 3.56Z" />
                                                                <path d="M13.243 3.2 7.359 9.081a.5.5 0 0 0-.136.256L6.51 12.9a.5.5 0 0 0 .59.59l3.566-.713a.5.5 0 0 0 .255-.136L16.8 6.757 13.243 3.2Z" />
                                                            </svg>
                                                        </button>
                                                    </Link>
                                                    |
                                                    <button onClick={() => deleteEntry(item.id)}>
                                                        <svg className="w-[40px] h-[20px] text-blue-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h16M7 8v8m4-8v8M7 1h4a1 1 0 0 1 1 1v3H6V2a1 1 0 0 1 1-1ZM3 5h12v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5Z" />
                                                        </svg>
                                                    </button>
                                                    {showModal ? (
                                                        <>
                                                            <div
                                                                className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                                                            >
                                                                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                                                                    {/*content*/}
                                                                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                                                        {/*header*/}
                                                                        <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                                                            <h3 className="text-2xl font-semibold">
                                                                                Details
                                                                            </h3>
                                                                            <button
                                                                                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                                                                onClick={() => setShowModal(false)}
                                                                            >
                                                                                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                                                                    ×
                                                                                </span>
                                                                            </button>
                                                                        </div>
                                                                        {/*body*/}
                                                                        <div className="relative p-6 flex-auto overflow-y-scroll h-[300px]">
                                                                            {details && (
                                                                                <div className=''>
                                                                                    <ul>
                                                                                        <li><span className="font-bold">Id : </span> {details.id}</li>
                                                                                        <li><span className="font-bold">Name : </span> {details.name}</li>
                                                                                        <li><span className="font-bold">Date of Birth : </span> {details.dateOfBirth}</li>
                                                                                        <li><span className="font-bold">Address : </span> {details.address}</li>
                                                                                        <li><span className="font-bold">State : </span> {details.states}</li>
                                                                                        <li><span className="font-bold">Zip-Code : </span>{details.zipCode}</li>
                                                                                        <li><span className="font-bold">Countrie : </span>{details.countries}</li>
                                                                                        <li><span className="font-bold">Phone number primary : </span> {details.phoneNumber}</li>
                                                                                        <li><span className="font-bold">Alternate number : </span>{details.alternateNumber}</li>
                                                                                        <li><span className="font-bold">Email address : </span> {details.addressEmail}</li>
                                                                                        <li><span className="font-bold">Name of Referring MD : </span> {details.nameReferring}</li>
                                                                                        <li><span className="font-bold">Referring Phone MD : </span>{details.phoneMD}</li>
                                                                                        <li><span className="font-bold">Insurance : </span>{details.option}</li>
                                                                                        <li><span className="font-bold">Self Play : </span>{details.option1}</li>
                                                                                        <li><span className="font-bold">New Patient Visit : </span>{details.option2}</li>
                                                                                        <li><span className="font-bold">Second Opinion : </span>{details.option3}</li>
                                                                                        <li><span className="font-bold">Recurrent Cancer : </span>{details.option4}</li>
                                                                                        <li><span className="font-bold">Diagnosis Name : </span>{details.diagnosisName}</li>
                                                                                        <li><span className="font-bold">Biopsy Performed : </span>{details.option5}</li>
                                                                                        <li><span className="font-bold">Date Biopsy Performed : </span>{details.dateBiopsy}</li>
                                                                                        <li><span className="font-bold">Name Of Hospital : </span>{details.hospitalName}</li>
                                                                                        <li><span className="font-bold">Part of body was the Biopsy Performed : </span>{details.bodyBiopsy && details.bodyBiopsy.join(', ')}</li>
                                                                                        <li><span className="font-bold">Other : </span>{details.otherBiopsy}</li>
                                                                                        <li><span className="font-bold">Was labs drawn in the last 2 weeks of diagnosis : </span>{details.option6}</li>
                                                                                        <li><span className="font-bold">Was imaging studies performed : </span>{details.option7}</li>
                                                                                        <li><span className="font-bold">Studies Performed : </span>{details.studiesPerform && details.studiesPerform.join(', ')}</li>
                                                                                        <li><span className="font-bold">Date CT Scans : </span>{details.dateCtScan}</li>
                                                                                        <li><span className="font-bold">Date MRI : </span>{details.dateMRI}</li>
                                                                                        <li><span className="font-bold">Date PET Scan : </span>{details.datePetScan}</li>
                                                                                        <li><span className="font-bold">Date Endoscopy : </span>{details.dateEndoscopy}</li>
                                                                                        <li><span className="font-bold">Date Colonoscopy : </span>{details.dateColonoscopy}</li>
                                                                                        <li><span className="font-bold">Date Other : </span>{details.dateOther}</li>
                                                                                        <li><span className="font-bold">Started treatment for cancer : </span>{details.option8}</li>
                                                                                        <li><span className="font-bold">Treatment for cancer : </span>{details.treatment && details.treatment.join(', ')}</li>
                                                                                        <li><span className="font-bold">Started treatment for Chemotherapy : </span>{details.dateStartedChemo}</li>
                                                                                        <li><span className="font-bold">End treatment for Chemotherapy : </span>{details.dateEndChemo}</li>
                                                                                        <li><span className="font-bold">Started treatment for Immunotherapy : </span>{details.dateStartedImmuno}</li>
                                                                                        <li><span className="font-bold">End treatment for Immunotherapy : </span>{details.dateEndImmuno}</li>
                                                                                        <li><span className="font-bold">Started treatment for Radiation : </span>{details.dateStartedRadiation}</li>
                                                                                        <li><span className="font-bold">End treatment for Radiation : </span>{details.dateEndRadiation}</li>
                                                                                        <li><span className="font-bold">Started treatment for Proton Treatment : </span>{details.dateStartedProtonTreatment}</li>
                                                                                        <li><span className="font-bold">End treatment for Proton Treatment : </span>{details.dateEndProtonTreatment}</li>
                                                                                        <li><span className="font-bold">Started treatment for Proton Surgery : </span>{details.dateStartedSurgery}</li>
                                                                                        <li><span className="font-bold">End treatment for Proton Surgery : </span>{details.dateEndSurgery}</li>
                                                                                        <li><span className="font-bold">Procedure/Surgical procedure : </span>{details.procedure && details.procedure.join(', ')}</li>
                                                                                        <li><span className="font-bold">Date Radiofrequency Ablation of liver : </span>{details.dateRAL}</li>
                                                                                        <li><span className="font-bold">Date Chemo Embolization : </span>{details.dateCE}</li>
                                                                                        <li><span className="font-bold">Date Y-90 Microsphere Therapy : </span>{details.dateYMT}</li>
                                                                                        <li><span className="font-bold">Other : </span>{details.dateOther_}</li>


                                                                                    </ul>
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                        {/*footer*/}
                                                                        <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                                                            <button
                                                                                className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                                                type="button"
                                                                                onClick={() => setShowModal(false)}
                                                                            >
                                                                                Close
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                                                        </>
                                                    ) : null}

                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>

                        </div>
                        <ToastContainer />
                        <div class="flex justify-center mt-3">
                            <button href="#" onClick={prevPage} disabled={currentPage === 1} class="flex items-center justify-center mr-3 px-4 h-10 text-base font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                <svg class="w-3.5 h-3.5 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5H1m0 0 4 4M1 5l4-4" />
                                </svg>
                                Previous
                            </button>
                            <span class="text-sm text-gray-700 dark:text-gray-400 mt-2">
                                Showing <span class="font-semibold text-gray-900 dark:text-white">{currentPage}</span> to <span class="font-semibold text-gray-900 dark:text-white">{totalPages}</span> of <span class="font-semibold text-gray-900 dark:text-white">{totalDataSize}</span> Entries
                            </span>
                            <button onClick={nextPage} disabled={currentPage === totalPages} class="flex items-center justify-center px-4 h-10 ml-3 text-base font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                Next
                                <svg class="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                </svg>
                            </button>
                        </div>

                    </div>

                )
            }

        </div>

    )
}
export default List