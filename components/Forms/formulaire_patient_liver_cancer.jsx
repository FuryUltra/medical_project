'use client'
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
    dateMRCP: z.string().min(1, 'Date is required').optional(),
    dateUS: z.string().min(1, 'Date is required').optional(),
    dateOther: z.string().min(1, 'Date is required').optional(),
    dateStartedChemo: z.string().min(1, 'Start Date is required').optional(),
    dateEndChemo: z.string().min(1, 'End Date is required').optional(),
    dateStartedRadiation: z.string().min(1, 'Start Date is required').optional(),
    dateEndRadiation: z.string().min(1, 'End Date is required').optional(),
    dateStartedProton: z.string().min(1, 'Start Date is required').optional(),
    dateEndProton: z.string().min(1, 'End Date is required').optional(),
    dateStartedSurgery: z.string().min(1, 'Start Date is required').optional(),
    dateEndSurgery: z.string().min(1, 'End Date is required').optional(),
    dateWhipple: z.string().min(1, 'Date is required').optional(),
    dateDistalPancreatectomySplenectomy: z.string().min(1, 'Date is required').optional(),
    otherChoice: z.string().min(1, 'Please specify').optional(),
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
    bodyBiopsy: z.array(z.enum(['Liver', 'Lung', 'Lymph Node', 'Other'])).optional(),
    otherBiopsy: z.string().min(1, 'Please specify what part of the body was the biopsy performed!').optional(),
    studiesPerform: z.array(z.enum(['CT Scans', 'MRI', 'PET Scan', 'Endoscopy', 'Colonoscopy', 'MRCP', 'U/S', 'Other'])).optional(),
    treatment: z.array(z.enum(['Chemotherapy', 'Radiation', 'Proton', 'Surgery'])).optional(),
    procedure: z.array(z.enum(['Liver transplant', 'Liver transplant', 'Radiofrequency Ablation of liver', 'Y-90 Microsphere Therapy', 'Other'])).optional(),
    diagnosisName: z.string().min(1, 'Ecris quelque chose required').optional(),
});

const LiverCancerForm = () => {


    const [studiesPerformed, setStudiesPerformed] = useState(false);
    const [choiceStudiesPerformed, setChoiceStudiesPerformed] = useState([]);
    const [choiceBiopsyPerformed, setChoiceBiopsyPerformed] = useState([]);
    const [treatmentCancer, setTreatmentCancer] = useState(false);
    const [choiceTreatmentCancer, setChoiceTreatmentCancer] = useState([]);
    const [repBiopsy, setRepBiopsy] = useState(false);
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


    const [responses, setResponses] = useState([]);
    const [selectedResponse, setSelectedResponse] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const option5Value = watch('option5');
    const option7Value = watch('option7');
    const option8Value = watch('option8');
    const Value = watch('option5');

    const onSubmit = (data) => {
        fetch("http://localhost:8000/liver_cancer", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(data)
        })
            .then((resp) => {
                toast(`Saved succefully!`, {
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
            })
            .catch((error) => {
                console.log(error.message);
            })

    };
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

    return (
        <div className="ml-20 mr-20 mt-5 mb-5 bg-slate-25">
            <div className="text-slate-400 text-center text-xl pt-10">EPNIA Patient Intake Form: Liver Cancer</div>
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
                                <option value="">Select a countrie</option>
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
                        <label htmlFor="diagnosis" className="font-bold mr-2">Primary Liver Cancer</label>
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
                                <input type="checkbox" id="liver" value="Liver" className="me-1" {...register('bodyBiopsy')} />
                                <label htmlFor="liver">Liver</label><br />
                            </div>
                            <div className="mb-2">
                                <input type="checkbox" id="lung" value="Lung" className="me-1" {...register('bodyBiopsy')} />
                                <label htmlFor="lung">Lung</label><br />
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
                                id="MRCP"
                                className="me-1"
                                value="MRCP"
                                {...register('studiesPerform')}
                                checked={choiceStudiesPerformed.includes("MRCP")}
                                onChange={handleChoiceStudiesPerformed}
                            />
                            <label htmlFor="">MRCP</label><br />
                            {choiceStudiesPerformed.includes("MRCP") && (
                                <div>
                                    <div className="relative z-0 w-full group flex items-center">
                                        <label htmlFor="dateMRCP">Date:</label>
                                        <input
                                            type="date"
                                            name="dateMRCP"
                                            id="dateMRCP"
                                            className="ms-2 block py-2.5 px-0 w-[50%] text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                            {...register('dateMRCP')}
                                        />
                                    </div>
                                    <div className="text-center w-[45%]">
                                        {errors.dateMRCP && <p className="text-red-800">{errors.dateMRCP.message}</p>}
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="mb-2">
                            <input
                                type="checkbox"
                                id="U/S"
                                className="me-1"
                                value="U/S"
                                {...register('studiesPerform')}
                                checked={choiceStudiesPerformed.includes("U/S")}
                                onChange={handleChoiceStudiesPerformed}
                            />
                            <label htmlFor="">U/S</label><br />
                            {choiceStudiesPerformed.includes("U/S") && (
                                <div>
                                    <div className="relative z-0 w-full group flex items-center">
                                        <label htmlFor="dateUS">Date:</label>
                                        <input
                                            type="date"
                                            name="dateUS"
                                            id="dateUS"
                                            className="ms-2 block py-2.5 px-0 w-[50%] text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                            {...register('dateUS')}
                                        />
                                    </div>
                                    <div className="text-center w-[45%]">
                                        {errors.dateUS && <p className="text-red-800">{errors.dateUS.message}</p>}
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
                                    <div className="flex flex-col">
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
                                    <div className="flex flex-col">
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
                                id="proton"
                                name="choiceTreatmentCancer"
                                className="me-1"
                                value="Proton"
                                {...register('treatment')}
                                checked={choiceTreatmentCancer.includes("Proton")}
                                onChange={handleChoiceTreatmentCancer}
                            />
                            <label htmlFor="proton">Proton</label><br />
                            {choiceTreatmentCancer.includes("Proton") && (
                                <div className="grid md:grid-cols-2 md:gap-6">
                                    <div className="flex flex-col">
                                        <div className="relative z-0 w-full group flex items-center">
                                            <label htmlFor="dateStartedProton">Date Started:</label>
                                            <input
                                                type="date"
                                                name="dateStartedProton"
                                                id="dateStarteProton"
                                                className="ms-2 block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                                {...register('dateStartedProton')}
                                            />
                                        </div>
                                        <div className="text-center">
                                            {errors.dateStartedProton && <p className='text-red-800'>{errors.dateStartedProton.message}</p>}
                                        </div>
                                    </div>
                                    <div className="flex flex-col">
                                        <div className="relative z-0 w-full group flex items-center">
                                            <label htmlFor="dateEndProton">Date End:</label>
                                            <input
                                                type="date"
                                                name="dateEndProton"
                                                id="dateEndProton"
                                                className="ms-2 block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                                {...register('dateEndProton')}
                                            />
                                        </div>
                                        <div className="text-center">
                                            {errors.dateEndProton && <p className='text-red-800'>{errors.dateEndProton.message}</p>}
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
                                    <div className="flex flex-col">
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
                    <div className='mb-1'>Chose from below surgical procedure if performed</div>
                    <div className="mb-2">
                        <input
                            type="checkbox"
                            id="liverTransplant"
                            className="me-1"
                            value="Liver transplant"
                            {...register('procedure')}

                        />
                        <label htmlFor="liverTransplant">Liver transplant</label><br />

                    </div>
                    <div className="mb-2">
                        <input
                            type="checkbox"
                            id="ChemoEmbolization"
                            className="me-1"
                            value="Chemo Embolization"
                            {...register('procedure')}
                        />
                        <label htmlFor="ChemoEmbolization">Chemo Embolization</label><br />
                    </div>
                    <div className="mb-2">
                        <input
                            type="checkbox"
                            id="radiofrequency"
                            className="me-1"
                            value="Radiofrequency Ablation of liver"
                            {...register('procedure')}
                        />
                        <label htmlFor="radiofrequency">Radiofrequency Ablation of liver</label><br />
                    </div>
                    <div className="mb-2">
                        <input
                            type="checkbox"
                            id="Y-90"
                            className="me-1"
                            value="Y-90 Microsphere Therapy"
                            {...register('procedure')}
                        />
                        <label htmlFor="Y-90">Y-90 Microsphere Therapy</label><br />
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
                                    <input
                                        type="text"
                                        id="otherChoice"
                                        className="ms-2 block py-2.5 px-0 w-[50%] text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                        {...register('otherChoice')}
                                    />
                                </div>
                                <div className="text-center w-[50%]">
                                    {errors.otherChoice && <p className="text-red-800">{errors.otherChoice.message}</p>}
                                </div>
                            </div>
                        )}
                    </div>
                    {errors.procedure && <p className="text-red-800">{errors.procedure.message}</p>}
                </div>
                <div className='flex items-center justify-center w-full mt-6'>
                    <button type="submit" className="w-[50%] text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                        Submit
                    </button>
                </div>
                <ToastContainer/>            

            </form>




        </div>

    )
}
export default LiverCancerForm