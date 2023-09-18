'use client'
import { Suspense } from 'react'
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from 'zod';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';


const schemaValidation = z.object({
    date: z.string().nonempty('Date is required').regex(/^\d{4}-\d{2}-\d{2}$/, 'Le format de la date doit être YYYY-MM-DD'),
    name: z.string().nonempty('Name is required'),
    dateOfBirth: z.string().nonempty('Date Of Birth is required').regex(/^\d{4}-\d{2}-\d{2}$/, 'Le format de la date doit être YYYY-MM-DD'),
    address: z.string().nonempty('Address is required'),
    zipCode: z.string().nonempty('Zip Code is required'),
    phoneNumber: z.string().nonempty('Phone Number is required').regex(/^\d{10}$/, { message: 'Invalid Tel' }),
    alternateNumber: z.string().regex(/^\d{10}$/, { message: 'Invalid Tel' }).optional(),
    addressEmail: z.string().email({ message: 'Invalid Email' }).optional(),
    nameReferring: z.string().nonempty('Name is required'),
    phoneMD: z.string().nonempty('Phone Number is required').regex(/^\d{10}$/, { message: 'Invalid Tel' }),
    fax: z.string().nonempty('Fax is required'),
    states: z.string().nonempty('Please select a state!'),
    countries: z.string().nonempty('Please select a countrie!'),
    dateCtScan: z.string().min(1, 'Date is required').optional(),
    dateMRI: z.string().min(1, 'Date is required').optional(),
    datePetScan: z.string().min(1, 'Date is required').optional(),
    dateEndoscopy: z.string().min(1, 'Date is required').optional(),
    dateColonoscopy: z.string().min(1, 'Date is required').optional(),
    dateOther: z.string().min(1, 'Date is required').optional(),
    dateStartedChemo: z.string().min(1, 'Start Date is required').optional(),
    dateEndChemo: z.string().min(1, 'End Date is required').optional(),
    dateStartedImmuno: z.string().min(1, 'Start Date is required').optional(),
    dateEndImmuno: z.string().min(1, 'End Date is required').optional(),
    dateStartedRadiation: z.string().min(1, 'Start Date is required').optional(),
    dateEndRadiation: z.string().min(1, 'End Date is required').optional(),
    dateStartedProtonTreatment: z.string().min(1, 'Start Date is required').optional(),
    dateEndProtonTreatment: z.string().min(1, 'End Date is required').optional(),
    dateStartedSurgery: z.string().min(1, 'Start Date is required').optional(),
    dateEndSurgery: z.string().min(1, 'End Date is required').optional(),
    dateRAL: z.string().min(1, 'Date is required').optional(),
    dateCE: z.string().min(1, 'Date is required').optional(),
    dateYMT: z.string().min(1, 'Date is required').optional(),
    dateOther_: z.string().min(1, 'Date is required').optional(),
    option: z.enum(['yes', 'no']).optional(),
    option1: z.enum(['yes', 'no']).optional(),
    option2: z.enum(['yes', 'no']).optional(),
    option3: z.enum(['yes', 'no']).optional(),
    option4: z.enum(['yes', 'no']).optional(),
    option5: z.enum(['yes', 'no']).optional(),
    option6: z.enum(['yes', 'no']).optional(),
    option7: z.enum(['yes', 'no']).optional(),
    option8: z.enum(['yes', 'no']).optional(),
    dateBiopsy: z.string().min(1, 'Date is required').optional(),
    hospitalName: z.string().min(1, 'Hospital name is required').optional(),
    bodyBiopsy: z.array(z.enum(['Colon', 'Liver', 'Lung', 'Bone', 'Lymph Node', 'Other'])).optional(),
    otherBiopsy: z.string().min(1, 'Please specify what part of the body was the biopsy performed!').optional(),
    studiesPerform: z.array(z.enum(['CT Scans', 'MRI', 'PET Scan', 'Endoscopy', 'Colonoscopy', 'Other'])).optional(),
    treatment: z.array(z.enum(['Chemotherapy', 'Immunotherapy', 'Radiation', 'Proton Treatment', 'Surgery'])).optional(),
    procedure: z.array(z.enum(['Radiofrequency Ablation of liver', 'Chemo Embolization', 'Y-90 Microsphere Therapy', 'Other'])).optional(),
    diagnosisName: z.string().optional(),
});

const UpdatePatientForm = ({ params }) => {

    const [studiesPerformed, setStudiesPerformed] = useState(false);
    const [choiceStudiesPerformed, setChoiceStudiesPerformed] = useState([]);
    const [choiceBiopsyPerformed, setChoiceBiopsyPerformed] = useState([]);
    const [treatmentCancer, setTreatmentCancer] = useState(false);
    const [choiceTreatmentCancer, setChoiceTreatmentCancer] = useState([]);
    const [repBiopsy, setRepBiopsy] = useState(false);
    const [dateScan, setDateScan] = useState(new Date());
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const handleStudiesPerformed = (event) => {
        setStudiesPerformed(event.target.value === 'YesSP');
    };
    const handleChoiceStudiesPerformed = (event) => {
        const { value, checked } = event.target;
        setChoiceStudiesPerformed((prevSelected) => {
            if (checked) {
                return [...prevSelected, value];
            } else {
                return prevSelected.filter((item) => item !== value);
            }
        });
    };
    const handleTreatmentCancer = (event) => {
        setTreatmentCancer(event.target.value === 'YesTreatment');
    };
    const handleBiopsyPerformed = (event) => {
        setRepBiopsy(event.target.value === 'yes');
    };
    const handleChoiceTreatmentCancer = (event) => {
        const { value, checked } = event.target;
        setChoiceTreatmentCancer((prevSelected) => {
            if (checked) {
                return [...prevSelected, value];
            } else {
                return prevSelected.filter((item) => item !== value);
            }
        });
    };
    const handleChoiceBiopsyPerformed = (event) => {
        const { value, checked } = event.target;
        setChoiceBiopsyPerformed((prevSelected) => {
            if (checked) {
                return [...prevSelected, value];
            } else {
                return prevSelected.filter((item) => item !== value);
            }
        });
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch
    } = useForm({
        resolver: zodResolver(schemaValidation),
    });


    const [data, setData] = useState(params)

    useEffect(() => {
        setLoading(true);
        fetch(`http://localhost:8000/liver_cancer/${params.edit_items}`)
            .then((response) => response.json())
            .then((responseData) => {
                setData(responseData);
                console.log(responseData);
                reset(responseData);
            })
            .catch((error) => {
                console.error('Erreur lors de la requête API :', error);
            }).finally(() => {
                setLoading(false);
            });
    }, []);

    const [responses, setResponses] = useState([]);
    const [selectedResponse, setSelectedResponse] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showModalEdit, setShowModalEdit] = useState(false);
    const [resAPI, setResAPI] = useState();
    const option5Value = watch('option5');
    const option7Value = watch('option7');
    const option8Value = watch('option8');


    const onSubmit = async (data) => {
        try {
            const response = await fetch(`http://localhost:8000/liver_cancer/${params.edit_items}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.status === 200) {
                toast(`updated succefully!`, {
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
                reset();
                router.push(`/forms/liver_cancer/list_items`);
            } else if (response.status === 400) {
                throw new Error("400 - Bad Request");

            } else if (response.status === 401) {
                throw new Error('401 - Unauthorized');

            } else if (response.status === 403) {
                throw new Error('403 - Forbidden');

            } else if (response.status === 404) {
                throw new Error('404 - Forbidden');

            } else if (response.status === 500) {
                throw new Error('500 - Forbidden');

            } else {
                console.error('Erreur lors de la mise à jour des données');
            }
        } catch (error) {
            throw error;
        }
    };

    const [useData, setUseData] = useState(null);
    useEffect(() => {
        fetch("http://localhost:8000/colon_cancer")
            .then(response => response.json())
            .then((resp) => {
                setUseData(resp);
                console.log(resp);
            }).catch((error) => {
                console.log(error.message)
            })
    }, [])


    return (
        <div>
            {
                loading ? (
                    <div role="status" className='flex justify-center items-center h-screen'>
                        <svg aria-hidden="true" class="w-20 h-20 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                        </svg>
                        <span class="sr-only">Loading...</span>
                    </div>

                ) : (
                    <div className="ml-20 mr-20 mt-5 mb-5 bg-slate-25">
                        <div className="text-slate-400 text-center text-xl pt-10">EPNIA Patient Intake Form: Primary Colon Cancer</div>
                        <form className="mt-10" onSubmit={handleSubmit(onSubmit)}>
                            <div className="relative z-0 w-full group mt-4 flex items-center">
                                <label htmlFor="date">Date: </label>
                                <input
                                    type="date"
                                    name="date"
                                    id="date"
                                    className="ms-2 block py-1 px-0 w-[40%] text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                    {...register('date')}
                                />
                            </div>
                            <div className="text-center w-[40%]">
                                {errors.date && <p className="text-red-800">{errors.date.message}</p>}
                            </div>
                            <div className="grid md:grid-cols-2 md:gap-6">
                                <div className="flex flex-col">
                                    <div className="relative z-0 w-full mt-2 group flex items-center">
                                        <label htmlFor="name">Name:</label>
                                        <input
                                            type="text"
                                            name="name"
                                            id="name"
                                            className="ms-2 block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                            {...register('name')}
                                        />
                                    </div>
                                    <div className="text-center">
                                        {errors.name && <p className="text-red-800">{errors.name.message}</p>}
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <div className="relative z-0 w-full group flex items-center">
                                        <label htmlFor="DOB">DOB:</label>
                                        <input
                                            type="date"
                                            name="DOB"
                                            id="DOB"
                                            className="ms-2 block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                            {...register('dateOfBirth')}
                                        />
                                    </div>
                                    <div className="text-center">
                                        {errors.dateOfBirth && <p className="text-red-800">{errors.dateOfBirth.message}</p>}
                                    </div>
                                </div>
                            </div>
                            <div className="relative z-0 w-full group flex items-center">
                                <label htmlFor="address">Address:</label>
                                <input
                                    type="text"
                                    name="address"
                                    id="address"
                                    className="ms-2 block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                    {...register('address')}
                                />
                            </div>
                            <div className="text-center">
                                {errors.address && <p className="text-red-800">{errors.address.message}</p>}
                            </div>
                            <div className="grid md:grid-cols-3 md:gap-6 mt-2">
                                <div className="flex flex-col">
                                    <div className="relative z-0 w-full group flex items-center">
                                        <label htmlFor="states">State:</label>
                                        <select id="states" {...register('states')} name="states" className="block w-full mt-1 ms-2 py-2 border-gray-300 border rounded-md shadow-sm focus:ring focus:ring-opacity-50 focus:ring-blue-600 focus:border-blue-600">
                                            <option value="">Select a state</option>
                                            <option value="NEW YORK">New York</option>
                                            <option value="ALABAMA">Alabama</option>
                                            <option value="TEXAS">Texas</option>
                                        </select>

                                    </div>
                                    <div className='text-center'>
                                        {errors.states && <p className="text-red-800">{errors.states.message}</p>}
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <div className="relative z-0 w-full group flex items-center">
                                        <label htmlFor="zip_code">Zip Code:</label>
                                        <input
                                            type="number"
                                            name="zip_code"
                                            id="zip_code"
                                            className="ms-2 block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                            {...register('zipCode')}
                                        />
                                    </div>
                                    <div className="text-center">
                                        {errors.zipCode && <p className="text-red-800">{errors.zipCode.message}</p>}
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <div className="relative z-0 w-full group flex items-center">
                                        <label htmlFor="countries">Country:</label>
                                        <select id="countries" {...register('countries')} name="countries" className="block w-full mt-1 ms-2 py-2 border-gray-300 border rounded-md shadow-sm focus:ring focus:ring-opacity-50 focus:ring-blue-600 focus:border-blue-600">
                                            <option value="">Select a country</option>
                                            <option value="USA">USA</option>
                                            <option value="CANADA">Canada</option>
                                            <option value="MEXIQUE">Mexique</option>
                                        </select>
                                    </div>
                                    <div className='text-center'>
                                        {errors.countries && <p className="text-red-800">{errors.countries.message}</p>}
                                    </div>

                                </div>
                            </div>
                            <div className="grid md:grid-cols-2 md:gap-6 mt-2">
                                <div className="flex flex-col">
                                    <div className="relative z-0 w-full group flex items-center">
                                        <label htmlFor="primary_number_phone">Phone Number Primary ( ):</label>
                                        <input
                                            type="tel"
                                            name="primary_number_phone"
                                            id="primary_number_phone"
                                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                            {...register('phoneNumber')}
                                        />
                                    </div>
                                    <div className="text-center">
                                        {errors.phoneNumber && <p className="text-red-800">{errors.phoneNumber.message}</p>}
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <div className="relative z-0 w-full group flex items-center">
                                        <label htmlFor="alternate_number">Alternate Number ( ):</label>
                                        <input
                                            type="text"
                                            name="alternate_number"
                                            id="alternate_number"
                                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                            {...register('alternateNumber')}
                                        />
                                    </div>
                                    <div className="text-center">
                                        {errors.alternateNumber && <p className="text-red-800">{errors.alternateNumber.message}</p>}
                                    </div>
                                </div>
                            </div>
                            <div className="relative z-0 w-full mt-2 group flex items-center">
                                <label htmlFor="email_adress">Email Address:</label>
                                <input
                                    type="text"
                                    name="email_adress"
                                    id="email_adress"
                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                    {...register('addressEmail')}
                                />
                            </div>
                            <div className="text-center">
                                {errors.addressEmail && <p className="text-red-800">{errors.addressEmail.message}</p>}
                            </div>
                            <div className="relative z-0 w-full mt-2 group flex items-center">
                                <label htmlFor="nameMD">Name of Referring MD:</label>
                                <input
                                    type="text"
                                    name="nameMD"
                                    id="nameMD"
                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                    {...register('nameReferring')}
                                />
                            </div>
                            <div className="text-center">
                                {errors.nameReferring && <p className="text-red-800">{errors.nameReferring.message}</p>}
                            </div>
                            <div className="grid md:grid-cols-2 md:gap-6">
                                <div className="flex flex-col">
                                    <div className="relative z-0 w-full group flex items-center">
                                        <label htmlFor="phoneMD">Referring Phone MD:</label>
                                        <input type="tel" {...register('phoneMD')} name="phoneMD" id="phoneMD" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                                    </div>
                                    <div className="text-center">
                                        {errors.phoneMD && <p className="text-red-800">{errors.phoneMD.message}</p>}
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <div className="relative z-0 w-full group flex items-center">
                                        <label htmlFor="fax"><span>Fax:</span></label>
                                        <input type="text" {...register('fax')} name="fax" id="fax" className="ml-2  block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                                    </div>
                                    <div className="text-center">
                                        {errors.fax && <p className="text-red-800">{errors.fax.message}</p>}
                                    </div>
                                </div>
                            </div>

                            <div className="font-bold ml-5 mb-2 mt-5"><h3>Insurance Information</h3> </div>
                            <div className="border border-slate-900">
                                <div className="relative z-0 w-full group flex items-center">
                                    <label htmlFor="insurance" className="me-1">Do you have Insurance? </label>
                                    <input
                                        type="radio"
                                        value="yes"
                                        id="yes1"
                                        {...register('option')}
                                    />
                                    <label htmlFor="yes1">Yes</label>
                                    <input
                                        className="ms-2"
                                        type="radio"
                                        value="no"
                                        id="no1"
                                        {...register('option')}
                                    />
                                    <label htmlFor="no1">No</label>
                                </div>
                                {errors.option && <p className="text-red-800">{errors.option.message}</p>}
                                <div className="relative z-0 w-full mt-2 group flex items-center">
                                    <label htmlFor="selfPlay" className="me-2">Self Play?</label>
                                    <input
                                        type="radio"
                                        value="yes"
                                        id="yes2"
                                        {...register('option1')}
                                    />
                                    <label htmlFor="yes2">Yes</label>
                                    <input
                                        className="ms-2"
                                        type="radio"
                                        value="no"
                                        id="no2"
                                        {...register('option1')}
                                    />
                                    <label htmlFor="no2">No</label>
                                </div>
                                {errors.option1 && <p className="text-red-800">{errors.option1.message}</p>}
                            </div>
                            <div className="font-bold ml-5 mb-2 mt-5"><h3>Reason for visit</h3> </div>
                            <div className="border border-slate-900">
                                <div className="mb-1"><label htmlFor="">Please choose from answers below:</label></div>
                                <div className="grid md:grid-cols-3 md:gap-6">
                                    <div className="flex flex-col">
                                        <div className="relative z-0 w-full mt-2 group flex items-center">
                                            <label htmlFor="newPatient" className="me-2">New Patient Visit:</label>
                                            <input
                                                type="radio"
                                                id="YesNP"
                                                value="yes"
                                                {...register('option2')}
                                            />
                                            <label htmlFor="YesNP">Yes</label>
                                            <input
                                                className="ms-2"
                                                type="radio"
                                                id="NoNP"
                                                value="no"
                                                {...register('option2')}
                                            />
                                            <label htmlFor="NoNP">No</label>
                                        </div>
                                        {errors.option2 && <p className="text-red-800">{errors.option2.message}</p>}
                                    </div>
                                    <div className="flex flex-col">
                                        <div className="relative z-0 w-full mt-2 group flex items-center">
                                            <label htmlFor="secondOpinion" className="me-2">Second Opinion:</label>
                                            <input
                                                type="radio"
                                                id="YesSO"
                                                value="yes"
                                                {...register('option3')}
                                            />
                                            <label htmlFor="YesSO">Yes</label>
                                            <input
                                                className="ms-2"
                                                type="radio"
                                                id="NoSO"
                                                value="no"
                                                {...register('option3')}
                                            />
                                            <label htmlFor="NoSO">No</label>
                                        </div>
                                        {errors.option3 && <p className="text-red-800">{errors.option3.message}</p>}
                                    </div>
                                    <div className="flex flex-col">
                                        <div className="relative z-0 w-full mt-2 group flex items-center">
                                            <label htmlFor="recurentCancer" className="me-2">Recurrent Cancer:</label>
                                            <input
                                                type="radio"
                                                id="YesRC"
                                                value="yes"
                                                {...register('option4')}
                                            />
                                            <label htmlFor="YesRC">Yes</label>
                                            <input
                                                className="ms-2"
                                                type="radio"
                                                id="NoRC"
                                                value="no"
                                                {...register('option4')}
                                            />
                                            <label htmlFor="NoRC">No</label>
                                        </div>
                                        {errors.option4 && <p className="text-red-800">{errors.option4.message}</p>}

                                    </div>

                                </div>
                                <div className="relative z-0 w-full mt-2 mb-3 group flex items-center text-center">
                                    <label htmlFor="diagnosis" className="font-bold">Name of Diagnosis if known </label>
                                    <input
                                        type="text"
                                        name="diagnosis"
                                        id="diagnosis"
                                        className=" ms-1 me-1 block py-2.5 px-0 w-[60%] text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                        {...register('diagnosisName')}
                                    />
                                    <label htmlFor="diagnosis" className="font-bold mr-2">Colon Cancer</label>
                                </div>
                                <div className="text-center">
                                    {errors.diagnosisName && <p className="text-red-800">{errors.diagnosisName.message}</p>}
                                </div>
                            </div>
                            <div className="font-bold ml-5 mb-2 mt-5"><h3>History of Present Illness</h3></div>
                            <div className="relative z-0 w-full mt-2 group flex items-center">
                                <div className="me-2"><label htmlFor="">Did you have a biopsy perfomed?</label></div>
                                <input
                                    type="radio"
                                    id="YesBiopsy"
                                    value="yes"
                                    {...register('option5')}
                                />
                                <label htmlFor="YesBiopsy">Yes</label>
                                <input
                                    className="ms-2"
                                    type="radio"
                                    id="NoBiopsy"
                                    value="no"
                                    {...register('option5')}
                                />
                                <label htmlFor="NoBiopsy">No</label>
                            </div>
                            {errors.option5 && <p className="text-red-800">{errors.option5.message}</p>}
                            {option5Value === 'yes' && (
                                <div className="mb-6">
                                    <div className="relative z-0 w-full mt-1 group flex items-center">
                                        <label htmlFor="dateBiopsy">Date biopsy performed:</label>
                                        <input
                                            type="date"
                                            name="dateBiopsy"
                                            id="dateBiopsy"
                                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                            {...register('dateBiopsy')}
                                        />
                                    </div>
                                    <div className="text-center">
                                        {errors.dateBiopsy && <p className="text-red-800">{errors.dateBiopsy.message}</p>}
                                    </div>
                                    <div className="relative z-0 w-full mt-2 group flex items-center">
                                        <label htmlFor="hospitalBiopsy">Name of hospital/institution where biopsy was performed:</label>
                                        <input
                                            type="text"
                                            name="hospitalBiopsy"
                                            id="hospitalBiopsy"
                                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                            {...register('hospitalName')}
                                        />
                                    </div>
                                    <div className="text-center">
                                        {errors.hospitalName && <p className="text-red-800">{errors.hospitalName.message}</p>}
                                    </div>
                                    <div className="me-2 mt-2"><label htmlFor="">What part of the body was the biopsy performed?</label></div>
                                    <div className="mt-1 mb-6">
                                        <div className="mb-2">
                                            <input type="checkbox" id="colon" value="Colon" className="me-1" {...register('bodyBiopsy')} />
                                            <label htmlFor="colon">Colon</label><br />
                                        </div>
                                        <div className="mb-2">
                                            <input type="checkbox" id="liver" value="Liver" className="me-1" {...register('bodyBiopsy')} />
                                            <label htmlFor="liver">Liver</label><br />
                                        </div>
                                        <div className="mb-2">
                                            <input type="checkbox" id="lung" value="Lung" className="me-1" {...register('bodyBiopsy')} />
                                            <label htmlFor="lung">Lung</label><br />
                                        </div>
                                        <div className="mb-2">
                                            <input type="checkbox" id="bone" value="Bone" className="me-1" {...register('bodyBiopsy')} />
                                            <label htmlFor="bone">Bone</label><br />
                                        </div>
                                        <div className="mb-2">
                                            <input type="checkbox" id="lymphNode" value="Lymph Node" className="me-1" {...register('bodyBiopsy')} />
                                            <label htmlFor="lymphNode">Lymph Node</label><br />
                                        </div>
                                        <div className="mb-1">
                                            <input
                                                type="checkbox"
                                                id="Other"
                                                name="performed"
                                                className="me-1"
                                                value="Other"
                                                checked={choiceBiopsyPerformed.includes("Other")}
                                                {...register('bodyBiopsy')}
                                                onChange={handleChoiceBiopsyPerformed}

                                            />
                                            <label htmlFor="Other">Other</label><br />
                                            {choiceBiopsyPerformed.includes("Other") && (
                                                <div>
                                                    <div className="relative z-0 w-full group flex items-center">
                                                        <input
                                                            type="text"
                                                            name="otherBiopsy"
                                                            id="otheBiopsy"
                                                            className="ms-2 block py-2.5 px-0 w-[50%] text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                                            {...register('otherBiopsy')}
                                                        />
                                                    </div>
                                                    {errors.otherBiopsy && <p className="text-red-800 ml-2">{errors.otherBiopsy.message}</p>}
                                                </div>
                                            )}
                                        </div>
                                        {errors.bodyBiopsy && <p className="text-red-800">{errors.bodyBiopsy.message}</p>}
                                    </div>
                                </div>
                            )}

                            <div className="relative z-0 w-full mt-2 group flex items-center">
                                <div className="me-2"><label htmlFor="">Was labs drawn in the last 2 weeks of diagnosis? </label></div>
                                <input
                                    type="radio"
                                    id="YesDiagno"
                                    value="yes"
                                    {...register('option6')}
                                />
                                <label htmlFor="YesDiagno">Yes</label>
                                <input
                                    className="ms-2"
                                    type="radio"
                                    id="NoDiagno"
                                    value="no"
                                    {...register('option6')}

                                />
                                <label htmlFor="NoDiagno">No</label>
                            </div>
                            {errors.option6 && <p className="text-red-800">{errors.option6.message}</p>}
                            <div className="relative z-0 w-full mt-2 group flex items-center">
                                <div className="me-2"><label htmlFor="">Was imaging studies performed?</label></div>
                                <input
                                    type="radio"
                                    id="YesSP"
                                    value="yes"
                                    {...register('option7')}
                                />
                                <label htmlFor="YesSP">Yes</label>
                                <input
                                    className="ms-2"
                                    type="radio"
                                    id="NoSP"
                                    value="no"
                                    {...register('option7')}
                                />
                                <label htmlFor="NoSP">No</label>
                            </div>
                            {errors.option7 && <p className="text-red-800">{errors.option7.message}</p>}
                            {option7Value === 'yes' && (
                                <div className="mt-1 mb-6">
                                    <div className="mb-2">
                                        <input
                                            type="checkbox"
                                            id="ctScan"
                                            className="me-1"
                                            value="CT Scans"
                                            {...register('studiesPerform')}
                                            checked={choiceStudiesPerformed.includes("CT Scans")}
                                            onChange={handleChoiceStudiesPerformed}
                                        />
                                        <label htmlFor="">CT Scans</label><br />
                                        {choiceStudiesPerformed.includes("CT Scans") && (
                                            <div>
                                                <div className="relative z-0 w-full group flex items-center">
                                                    <label htmlFor="dateCtScan">Date:</label>
                                                    <input
                                                        type="date"
                                                        name="dateCtScan"
                                                        id="dateCtScan"
                                                        className="ms-2 block py-2.5 px-0 w-[50%] text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                                        {...register('dateCtScan')}
                                                    />
                                                </div>
                                                <div className="text-center w-[45%]">
                                                    {errors.dateCtScan && <p className="text-red-800">{errors.dateCtScan.message}</p>}
                                                </div>
                                            </div>
                                        )

                                        }
                                    </div>
                                    <div className="mb-2">
                                        <input
                                            type="checkbox"
                                            id="mri"
                                            className="me-1"
                                            value="MRI"
                                            {...register('studiesPerform')}
                                            checked={choiceStudiesPerformed.includes("MRI")}
                                            onChange={handleChoiceStudiesPerformed}
                                        />
                                        <label htmlFor="">MRI</label><br />
                                        {choiceStudiesPerformed.includes("MRI") && (
                                            <div>
                                                <div className="relative z-0 w-full group flex items-center">
                                                    <label htmlFor="dateMRI">Date:</label>
                                                    <input
                                                        type="date"
                                                        name="dateMRI"
                                                        id="dateMRI"
                                                        className="ms-2 block py-2.5 px-0 w-[50%] text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                                        {...register('dateMRI')}
                                                    />
                                                </div>
                                                <div className="text-center w-[45%]">
                                                    {errors.dateMRI && <p className="text-red-800">{errors.dateMRI.message}</p>}
                                                </div>
                                            </div>
                                        )

                                        }
                                    </div>
                                    <div className="mb-2">
                                        <input
                                            type="checkbox"
                                            id="petScan"
                                            className="me-1"
                                            value="PET Scan"
                                            {...register('studiesPerform')}
                                            checked={choiceStudiesPerformed.includes("PET Scan")}
                                            onChange={handleChoiceStudiesPerformed}
                                        />
                                        <label htmlFor="PET Scan">PET Scan</label><br />
                                        {choiceStudiesPerformed.includes("PET Scan") && (
                                            <div>
                                                <div className="relative z-0 w-full group flex items-center">
                                                    <label htmlFor="datePetScan">Date:</label>
                                                    <input
                                                        type="date"
                                                        name="datePetScan"
                                                        id="datePetScan"
                                                        className="ms-2 block py-2.5 px-0 w-[50%] text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                                        {...register('datePetScan')}
                                                    />
                                                </div>
                                                <div className="text-center w-[45%]">
                                                    {errors.datePetScan && <p className="text-red-800">{errors.datePetScan.message}</p>}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <div className="mb-2">
                                        <input
                                            type="checkbox"
                                            id="endoscopy"
                                            className="me-1"
                                            value="Endoscopy"
                                            {...register('studiesPerform')}
                                            checked={choiceStudiesPerformed.includes("Endoscopy")}
                                            onChange={handleChoiceStudiesPerformed}
                                        />
                                        <label htmlFor="">Endoscopy</label><br />
                                        {choiceStudiesPerformed.includes("Endoscopy") && (
                                            <div>
                                                <div className="relative z-0 w-full group flex items-center">
                                                    <label htmlFor="dateEndoscopy">Date:</label>
                                                    <input
                                                        type="date"
                                                        name="dateEndoscopy"
                                                        id="dateEndoscopy"
                                                        className="ms-2 block py-2.5 px-0 w-[50%] text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                                        {...register('dateEndoscopy')}
                                                    />
                                                </div>
                                                <div className="text-center w-[45%]">
                                                    {errors.dateEndoscopy && <p className="text-red-800">{errors.dateEndoscopy.message}</p>}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <div className="mb-2">
                                        <input
                                            type="checkbox"
                                            id="colonoscopy"
                                            className="me-1"
                                            value="Colonoscopy"
                                            {...register('studiesPerform')}
                                            checked={choiceStudiesPerformed.includes("Colonoscopy")}
                                            onChange={handleChoiceStudiesPerformed}
                                        />
                                        <label htmlFor="">Colonoscopy</label><br />
                                        {choiceStudiesPerformed.includes("Colonoscopy") && (
                                            <div>
                                                <div className="relative z-0 w-full group flex items-center">
                                                    <label htmlFor="dateColonoscopy">Date:</label>
                                                    <input
                                                        type="date"
                                                        name="dateColonoscopy"
                                                        id="dateColonoscopy"
                                                        className="ms-2 block py-2.5 px-0 w-[50%] text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                                        {...register('dateColonoscopy')}
                                                    />
                                                </div>
                                                <div className="text-center w-[45%]">
                                                    {errors.dateColonoscopy && <p className="text-red-800">{errors.dateColonoscopy.message}</p>}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <div className="mb-2">
                                        <input
                                            type="checkbox"
                                            id="other"
                                            className="me-1"
                                            value="Other"
                                            {...register('studiesPerform')}
                                            checked={choiceStudiesPerformed.includes("Other")}
                                            onChange={handleChoiceStudiesPerformed}
                                        />
                                        <label htmlFor="">Other</label><br />
                                        {choiceStudiesPerformed.includes("Other") && (
                                            <div>
                                                <div className="relative z-0 w-full group flex items-center">
                                                    <label htmlFor="dateOther">Date:</label>
                                                    <input
                                                        type="date"
                                                        name="dateOther"
                                                        id="dateOther"
                                                        className="ms-2 block py-2.5 px-0 w-[50%] text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                                        {...register('dateOther')}
                                                    />
                                                </div>
                                                <div className="text-center w-[45%]">
                                                    {errors.dateOther && <p className="text-red-800">{errors.dateOther.message}</p>}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    {errors.studiesPerform && <p className="text-red-800">{errors.studiesPerform.message}</p>}
                                </div>
                            )}
                            <div className="relative z-0 w-full mt-2 group flex items-center">
                                <div className="me-2"><label htmlFor="">Have you started treatment for your cancer?</label></div>
                                <input
                                    type="radio"
                                    id="YesTreatment"
                                    value="yes"
                                    {...register('option8')}

                                />
                                <label htmlFor="YesTreatment">Yes</label>
                                <input
                                    className="ms-2"
                                    type="radio"
                                    id="NoTreatment"
                                    value="no"
                                    {...register('option8')}
                                />
                                <label htmlFor="NoTreatment">No</label>
                            </div>
                            {errors.option8 && <p className="text-red-800">{errors.option8.message}</p>}
                            {option8Value === 'yes' && (
                                <div className="mt mb-6">
                                    <div className="mb-2">
                                        <input
                                            type="checkbox"
                                            id="chemotherapy"
                                            name="choiceTreatmentCancer"
                                            className="me-1"
                                            value="Chemotherapy"
                                            {...register('treatment')}
                                            checked={choiceTreatmentCancer.includes("Chemotherapy")}
                                            onChange={handleChoiceTreatmentCancer}

                                        />
                                        <label htmlFor="">Chemotherapy</label><br />
                                        {choiceTreatmentCancer.includes("Chemotherapy") && (
                                            <div className="grid md:grid-cols-2 md:gap-6">
                                                <div classname="flex flex-col">
                                                    <div className="relative z-0 w-full group flex items-center">
                                                        <label htmlFor="dateStartedChemo">Date Started:</label>
                                                        <input
                                                            type="date"
                                                            name="dateStartedChemo"
                                                            id="dateStartedChemo"
                                                            className="ms-2 block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                                            {...register('dateStartedChemo')}
                                                        />
                                                    </div>
                                                    <div className="text-center">
                                                        {errors.dateStartedChemo && <p className='text-red-800'>{errors.dateStartedChemo.message}</p>}
                                                    </div>
                                                </div>
                                                <div className="flex flex-col">
                                                    <div className="relative z-0 w-full group flex items-center">
                                                        <label htmlFor="dateEndChemo">Date End:</label>
                                                        <input
                                                            type="date"
                                                            name="dateEndChemo"
                                                            id="dateEndChemo"
                                                            className="ms-2 block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                                            {...register('dateEndChemo')}
                                                        />
                                                    </div>
                                                    <div className="text-center">
                                                        {errors.dateEndChemo && <p className='text-red-800'>{errors.dateEndChemo.message}</p>}
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <div className="mb-2">
                                        <input
                                            type="checkbox"
                                            id="immunotherapy"
                                            name="choiceTreatmentCancer"
                                            className="me-1"
                                            value="Immunotherapy"
                                            {...register('treatment')}
                                            checked={choiceTreatmentCancer.includes("Immunotherapy")}
                                            onChange={handleChoiceTreatmentCancer}
                                        />
                                        <label htmlFor="">Immunotherapy</label><br />
                                        {choiceTreatmentCancer.includes("Immunotherapy") && (
                                            <div className="grid md:grid-cols-2 md:gap-6">
                                                <div classname="flex flex-col">
                                                    <div className="relative z-0 w-full group flex items-center">
                                                        <label htmlFor="dateStartedImmuno">Date Started:</label>
                                                        <input
                                                            type="date"
                                                            name="dateStartedImmuno"
                                                            id="dateStartedImmuno"
                                                            className="ms-2 block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                                            {...register('dateStartedImmuno')}
                                                        />
                                                    </div>
                                                    <div className="text-center">
                                                        {errors.dateStartedImmuno && <p className='text-red-800'>{errors.dateStartedImmuno.message}</p>}
                                                    </div>
                                                </div>
                                                <div className="flex flex-col">
                                                    <div className="relative z-0 w-full group flex items-center">
                                                        <label htmlFor="dateEndImmuno">Date End:</label>
                                                        <input
                                                            type="date"
                                                            name="dateEndImmuno"
                                                            id="dateEndImmuno"
                                                            className="ms-2 block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                                            {...register('dateEndImmuno')}
                                                        />
                                                    </div>
                                                    <div className="text-center">
                                                        {errors.dateEndImmuno && <p className='text-red-800'>{errors.dateEndImmuno.message}</p>}
                                                    </div>
                                                </div>

                                            </div>
                                        )}
                                    </div>
                                    <div className="mb-2">
                                        <input
                                            type="checkbox"
                                            id="radiation"
                                            name="choiceTreatmentCancer"
                                            className="me-1"
                                            value="Radiation"
                                            {...register('treatment')}
                                            checked={choiceTreatmentCancer.includes("Radiation")}
                                            onChange={handleChoiceTreatmentCancer}
                                        />
                                        <label htmlFor="">Radiation</label><br />
                                        {choiceTreatmentCancer.includes("Radiation") && (
                                            <div className="grid md:grid-cols-2 md:gap-6">
                                                <div classname="flex flex-col">
                                                    <div className="relative z-0 w-full group flex items-center">
                                                        <label htmlFor="dateStartedRadiation">Date Started:</label>
                                                        <input
                                                            type="date"
                                                            name="dateStartedRadiation"
                                                            id="dateStartedRadiation"
                                                            className="ms-2 block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                                            {...register('dateStartedRadiation')}
                                                        />
                                                    </div>
                                                    <div className="text-center">
                                                        {errors.dateStartedRadiation && <p className='text-red-800'>{errors.dateStartedRadiation.message}</p>}
                                                    </div>
                                                </div>
                                                <div className="flex flex-col">
                                                    <div className="relative z-0 w-full group flex items-center">
                                                        <label htmlFor="dateEndRadiation">Date End:</label>
                                                        <input
                                                            type="date"
                                                            name="dateEndRadiation"
                                                            id="dateEndRadiation"
                                                            className="ms-2 block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                                            {...register('dateEndRadiation')}
                                                        />
                                                    </div>
                                                    <div className="text-center">
                                                        {errors.dateEndRadiation && <p className='text-red-800'>{errors.dateEndRadiation.message}</p>}
                                                    </div>
                                                </div>

                                            </div>

                                        )}
                                    </div>
                                    <div className="mb-2">
                                        <input
                                            type="checkbox"
                                            id="protonTreatment"
                                            name="choiceTreatmentCancer"
                                            className="me-1"
                                            value="Proton Treatment"
                                            {...register('treatment')}
                                            checked={choiceTreatmentCancer.includes("Proton Treatment")}
                                            onChange={handleChoiceTreatmentCancer}
                                        />
                                        <label htmlFor="">Proton Treatment</label><br />
                                        {choiceTreatmentCancer.includes("Proton Treatment") && (
                                            <div className="grid md:grid-cols-2 md:gap-6">
                                                <div classname="flex flex-col">
                                                    <div className="relative z-0 w-full group flex items-center">
                                                        <label htmlFor="dateStartedProtonTreatment">Date Started:</label>
                                                        <input
                                                            type="date"
                                                            name="dateStartedProtonTreatment"
                                                            id="dateStartedProtonTreatment"
                                                            className="ms-2 block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                                            {...register('dateStartedProtonTreatment')}
                                                        />
                                                    </div>
                                                    <div className="text-center">
                                                        {errors.dateStartedProtonTreatment && <p className='text-red-800'>{errors.dateStartedProtonTreatment.message}</p>}
                                                    </div>
                                                </div>
                                                <div className="flex flex-col">
                                                    <div className="relative z-0 w-full group flex items-center">
                                                        <label htmlFor="dateEndProtonTreatment">Date End:</label>
                                                        <input
                                                            type="date"
                                                            name="dateEndProtonTreatment"
                                                            id="dateEndProtonTreatment"
                                                            className="ms-2 block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                                            {...register('dateEndProtonTreatment')}
                                                        />
                                                    </div>
                                                    <div className="text-center">
                                                        {errors.dateEndProtonTreatment && <p className='text-red-800'>{errors.dateEndProtonTreatment.message}</p>}
                                                    </div>
                                                </div>

                                            </div>

                                        )}

                                    </div>
                                    <div className="mb-2">
                                        <input
                                            type="checkbox"
                                            id="surgery"
                                            name="choiceTreatmentCancer"
                                            className="me-1"
                                            value="Surgery"
                                            {...register('treatment')}
                                            checked={choiceTreatmentCancer.includes("Surgery")}
                                            onChange={handleChoiceTreatmentCancer}
                                        />
                                        <label htmlFor="">Surgery</label><br />
                                        {choiceTreatmentCancer.includes("Surgery") && (
                                            <div className="grid md:grid-cols-2 md:gap-6">
                                                <div classname="flex flex-col">
                                                    <div className="relative z-0 w-full group flex items-center">
                                                        <label htmlFor="dateStartedSurgery">Date Started:</label>
                                                        <input
                                                            type="date"
                                                            name="dateStartedSurgery"
                                                            id="dateStartedSurgery"
                                                            className="ms-2 block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                                            {...register('dateStartedSurgery')}
                                                        />
                                                    </div>
                                                    <div className="text-center">
                                                        {errors.dateStartedSurgery && <p className='text-red-800'>{errors.dateStartedSurgery.message}</p>}
                                                    </div>
                                                </div>
                                                <div className="flex flex-col">
                                                    <div className="relative z-0 w-full group flex items-center">
                                                        <label htmlFor="dateEndSurgery">Date End:</label>
                                                        <input
                                                            type="date"
                                                            name="dateEndSurgery"
                                                            id="dateEndSurgery"
                                                            className="ms-2 block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                                            {...register('dateEndSurgery')}
                                                        />
                                                    </div>
                                                    <div className="text-center">
                                                        {errors.dateEndSurgery && <p className='text-red-800'>{errors.dateEndSurgery.message}</p>}
                                                    </div>
                                                </div>

                                            </div>

                                        )}
                                    </div>
                                    {errors.treatment && <p className="text-red-800">{errors.treatment.message}</p>}
                                </div>
                            )}
                            <div className="mt-2">
                                <div className='mb-1'>Chose from below procedure/surgical procedure if performed</div>
                                <div className="mb-2">
                                    <input
                                        type="checkbox"
                                        id="RAL"
                                        className="me-1"
                                        value="Radiofrequency Ablation of liver"
                                        {...register('procedure')}
                                        checked={choiceStudiesPerformed.includes("Radiofrequency Ablation of liver")}
                                        onChange={handleChoiceStudiesPerformed}

                                    />
                                    <label htmlFor="RAL">Radiofrequency Ablation of liver</label><br />
                                    {choiceStudiesPerformed.includes("Radiofrequency Ablation of liver") && (
                                        <div>
                                            <div className="relative z-0 w-full group flex items-center">
                                                <label htmlFor="dateRAL">Date:</label>
                                                <input
                                                    type="date"
                                                    name="dateRAL"
                                                    id="dateRAL"
                                                    className="ms-2 block py-2.5 px-0 w-[50%] text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                                    {...register('dateRAL')}
                                                />
                                            </div>
                                            <div className="text-center w-[50%]">
                                                {errors.dateRAL && <p className="text-red-800">{errors.dateRAL.message}</p>}
                                            </div>
                                        </div>
                                    )

                                    }
                                </div>
                                <div className="mb-2">
                                    <input
                                        type="checkbox"
                                        id="CE"
                                        className="me-1"
                                        value="Chemo Embolization"
                                        {...register('procedure')}
                                        checked={choiceStudiesPerformed.includes("Chemo Embolization")}
                                        onChange={handleChoiceStudiesPerformed}
                                    />
                                    <label htmlFor="CE">Chemo Embolization</label><br />
                                    {choiceStudiesPerformed.includes("Chemo Embolization") && (
                                        <div>
                                            <div className="relative z-0 w-full group flex items-center">
                                                <label htmlFor="dateCE">Date:</label>
                                                <input
                                                    type="date"
                                                    name="dateCE"
                                                    id="dateCE"
                                                    className="ms-2 block py-2.5 px-0 w-[50%] text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                                    {...register('dateCE')}
                                                />
                                            </div>
                                            <div className="text-center w-[50%]">
                                                {errors.dateCE && <p className="text-red-800">{errors.dateCE.message}</p>}
                                            </div>
                                        </div>
                                    )

                                    }
                                </div>
                                <div className="mb-2">
                                    <input
                                        type="checkbox"
                                        id="YMT"
                                        className="me-1"
                                        value="Y-90 Microsphere Therapy"
                                        {...register('procedure')}
                                        checked={choiceStudiesPerformed.includes("Y-90 Microsphere Therapy")}
                                        onChange={handleChoiceStudiesPerformed}
                                    />
                                    <label htmlFor="YMT">Y-90 Microsphere Therapy</label><br />
                                    {choiceStudiesPerformed.includes("Y-90 Microsphere Therapy") && (
                                        <div>
                                            <div className="relative z-0 w-full group flex items-center">
                                                <label htmlFor="dateYMT">Date:</label>
                                                <input
                                                    type="date"
                                                    name="dateYMT"
                                                    id="dateYMT"
                                                    className="ms-2 block py-2.5 px-0 w-[50%] text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                                    {...register('dateYMT')}
                                                />
                                            </div>
                                            <div className="text-center w-[50%]">
                                                {errors.dateYMT && <p className="text-red-800">{errors.dateYMT.message}</p>}
                                            </div>
                                        </div>
                                    )

                                    }
                                </div>
                                <div className="mb-2">
                                    <input
                                        type="checkbox"
                                        id="other_"
                                        name="choiceStudiesPerfomed"
                                        className="me-1"
                                        value="Other"
                                        {...register('procedure')}
                                        checked={choiceStudiesPerformed.includes("Other")}
                                        onChange={handleChoiceStudiesPerformed}
                                    />
                                    <label htmlFor="other_">Other</label><br />
                                    {choiceStudiesPerformed.includes("Other") && (
                                        <div>
                                            <div className="relative z-0 w-full group flex items-center">
                                                <label htmlFor="dateOther_">Date:</label>
                                                <input
                                                    type="date"
                                                    name="dateOther_"
                                                    id="dateOther_"
                                                    className="ms-2 block py-2.5 px-0 w-[50%] text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                                    {...register('dateOther_')}
                                                />
                                            </div>
                                            <div className="text-center w-[50%]">
                                                {errors.dateOther_ && <p className="text-red-800">{errors.dateOther_.message}</p>}
                                            </div>
                                        </div>
                                    )}
                                </div>
                                {errors.procedure && <p className="text-red-800">{errors.procedure.message}</p>}
                            </div>
                            <div className='flex items-center justify-center w-full mt-6'>
                                <button type="submit" className="w-[50%] text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                                    Update
                                </button>
                            </div>
                            <ToastContainer />

                        </form>
                    </div>
                )
            }
        </div>
    )
}
export default UpdatePatientForm