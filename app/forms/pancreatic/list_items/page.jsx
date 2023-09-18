'use client'
import { useState, useEffect } from "react";

function List() {
    

    const [showModal, setShowModal] = useState(false);

    const [useData, setUseData] = useState(null);
    useEffect(() => {
        fetch("http://localhost:8000/liver_cancer")
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
            const response = await fetch(`http://localhost:8000/liver_cancer/${id}`);
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

    return (
        <div >
            <div className="flex justify-center items-center mt-8 mb-16">
                <p className="text-blue-500 text-3xl font-semibold">Liver Cancer</p>
            </div>

            <div class="mb-3 flex justify-center items-center">
                <div class="relative mb-4 flex w-[50%] flex-wrap items-stretch">
                    <input
                        type="search"
                        class="relative m-0 block w-[1px] min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
                        placeholder="Search"
                        aria-label="Search"
                        aria-describedby="button-addon2" />
                    <span
                        class="input-group-text flex items-center whitespace-nowrap rounded px-3 py-1.5 text-center text-base font-normal text-neutral-700 dark:text-neutral-200"
                        id="basic-addon2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            class="h-5 w-5">
                            <path
                                fill-rule="evenodd"
                                d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                                clip-rule="evenodd" />
                        </svg>
                    </span>
                </div>
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
                                Action
                            </th>

                        </tr>
                    </thead>
                    <tbody>
                        {useData &&
                            useData.map(item => (
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
                                    <td scope="col" className="px-6 py-4">
                                        <button onClick={() => getDetailsById(item.id)} >
                                            <svg className="w-[15px] h-[15px] text-blue-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 14">
                                                <path d="M10 0C4.612 0 0 5.336 0 7c0 1.742 3.546 7 10 7 6.454 0 10-5.258 10-7 0-1.664-4.612-7-10-7Zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
                                            </svg>
                                        </button>
                                        |
                                        <button onClick={() => setShowModalEdit(true)} >
                                            <svg class="w-[15px] h-[15px] text-blue-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                                <path d="M12.687 14.408a3.01 3.01 0 0 1-1.533.821l-3.566.713a3 3 0 0 1-3.53-3.53l.713-3.566a3.01 3.01 0 0 1 .821-1.533L10.905 2H2.167A2.169 2.169 0 0 0 0 4.167v11.666A2.169 2.169 0 0 0 2.167 18h11.666A2.169 2.169 0 0 0 16 15.833V11.1l-3.313 3.308Zm5.53-9.065.546-.546a2.518 2.518 0 0 0 0-3.56 2.576 2.576 0 0 0-3.559 0l-.547.547 3.56 3.56Z" />
                                                <path d="M13.243 3.2 7.359 9.081a.5.5 0 0 0-.136.256L6.51 12.9a.5.5 0 0 0 .59.59l3.566-.713a.5.5 0 0 0 .255-.136L16.8 6.757 13.243 3.2Z" />
                                            </svg>
                                        </button>
                                        |
                                        <button onClick={() => deleteEntry(item.id)}>
                                            <svg className="w-[15px] h-[15px] text-blue-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
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
        </div>
    )
}
export default List