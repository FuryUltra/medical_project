'use client'
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from 'zod';

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
    dateStartedSurgery: z.string().min(1, 'Start Date is required').optional(),
    dateEndSurgery: z.string().min(1, 'End Date is required').optional(),
    dateWhipple: z.string().min(1, 'Date is required').optional(),
    dateDistalPancreatectomySplenectomy: z.string().min(1, 'Date is required').optional(),
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
    bodyBiopsy: z.array(z.enum(['Pancreas', 'Liver', 'Bone', 'Other'])).optional(),
    otherBiopsy: z.string().min(1, 'Please specify what part of the body was the biopsy performed!').optional(),
    studiesPerform: z.array(z.enum(['CT Scans', 'MRI', 'PET Scan', 'Endoscopy', 'Colonoscopy', 'MRCP', 'U/S', 'Other'])).optional(),
    treatment: z.array(z.enum(['Chemotherapy', 'Radiation', 'Surgery'])).optional(),
    procedure: z.array(z.enum(['Whipple', 'Distal Pancreatectomy/ Splenectomy', 'Other'])).optional(),
    diagnosisName: z.string().min(1, 'Ecris quelque chose required').optional(),
});

const PancreaticForm = () => {


    const [studiesPerformed, setStudiesPerformed] = useState(false);
    const [choiceStudiesPerformed, setChoiceStudiesPerformed] = useState([]);
    const [choiceBiopsyPerformed, setChoiceBiopsyPerformed] = useState([]);
    const [treatmentCancer, setTreatmentCancer] = useState(false);
    const [choiceTreatmentCancer, setChoiceTreatmentCancer] = useState([]);
    const [repBiopsy, setRepBiopsy] = useState(false);


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
        console.log(data);
        setResponses([...responses, data]);
        reset();

    };
    const handleDetailsClick = (index, e) => {
        setSelectedResponse(responses[index]);

    };
    const handleDeleteClick = (index) => {
        const newResponses = responses.filter((_, i) => i !== index);
        setResponses(newResponses);
        setSelectedResponse(null);
    };
    return (
        <div className="ml-20 mr-20 mt-5 mb-5 bg-slate-25">
            <div className="text-slate-400 text-center text-xl pt-10">EPNIA Patient Intake Form: Pancreatic</div>
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
                        <label htmlFor="diagnosis" className="font-bold mr-2">Pancreatic Cancer</label>
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
                                <input type="checkbox" id="pancreas" value="Pancreas" className="me-1" {...register('bodyBiopsy')} />
                                <label htmlFor="pancreas">Pancreas</label><br />
                            </div>
                            <div className="mb-2">
                                <input type="checkbox" id="liver" value="Liver" className="me-1" {...register('bodyBiopsy')} />
                                <label htmlFor="liver">Liver</label><br />
                            </div>
                            <div className="mb-2">
                                <input type="checkbox" id="bone" value="Bone" className="me-1" {...register('bodyBiopsy')} />
                                <label htmlFor="bone">Bone</label><br />
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
                    <div className='mb-1'>Chose from below surgical procedure if performed</div>
                    <div className="mb-2">
                        <input
                            type="checkbox"
                            id="Whipple"
                            className="me-1"
                            value="Whipple"
                            {...register('procedure')}

                        />
                        <label htmlFor="Whipple">Whipple</label><br />

                    </div>
                    <div className="mb-2">
                        <input
                            type="checkbox"
                            id="DPS"
                            className="me-1"
                            value="Distal Pancreatectomy/ Splenectomy"
                            {...register('procedure')}
                        />
                        <label htmlFor="DPS">Distal Pancreatectomy/ Splenectomy</label><br />
                    </div>
                    <div className="mb-2">
                        <input
                            type="checkbox"
                            id="other_"
                            name="choiceStudiesPerfomed"
                            className="me-1"
                            value="Other"
                            {...register('procedure')}
                        />
                        <label htmlFor="other_">Other</label><br />
                    </div>
                    {errors.procedure && <p className="text-red-800">{errors.procedure.message}</p>}
                </div>
                <div className='flex items-center justify-center w-full mt-6'>
                    <button type="submit" className="w-[50%] text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                        Submit
                    </button>
                </div>


            </form>

            <div className="relative overflow-x-auto mt-3">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-4 py-3">
                                ID
                            </th>
                            <th scope="col" className="px-4 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-4 py-3">
                                Date Of Birth
                            </th>
                            <th scope="col" className="px-4 py-3">
                                Address
                            </th>
                            <th scope="col" className="px-4 py-3">
                                Action
                            </th>

                        </tr>
                    </thead>
                    <tbody>
                        {responses.map((response, index) => (
                            <tr key={index}>
                                <td scope="col" className="px-4 py-3">{index + 1}</td>
                                <th scope="col" className="px-4 py-3">{response.name}</th>
                                <td scope="col" className="px-4 py-3">{response.dateOfBirth}</td>
                                <td scope="col" className="px-4 py-3">{response.address}</td>
                                <td scope="col" className="px-6 py-3">
                                    <button type="button" onClick={() => handleDetailsClick(index)}>
                                        <svg className="w-[15px] h-[15px] text-blue-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 14">
                                            <path d="M10 0C4.612 0 0 5.336 0 7c0 1.742 3.546 7 10 7 6.454 0 10-5.258 10-7 0-1.664-4.612-7-10-7Zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
                                        </svg>
                                    </button>
                                    |
                                    <button type='button' onClick={() => handleDeleteClick(index)}>
                                        <svg className="w-[15px] h-[15px] text-blue-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h16M7 8v8m4-8v8M7 1h4a1 1 0 0 1 1 1v3H6V2a1 1 0 0 1 1-1ZM3 5h12v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5Z" />
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
                                                            {selectedResponse && (
                                                                <div className=''>
                                                                    <ul>
                                                                        <li><span className="font-bold">ID : </span> {responses.indexOf(selectedResponse) + 1}</li>
                                                                        <li><span className="font-bold">Name : </span> {selectedResponse.name}</li>
                                                                        <li><span className="font-bold">Date of Birth : </span> {selectedResponse.dateOfBirth}</li>
                                                                        <li><span className="font-bold">Address : </span> {selectedResponse.address}</li>
                                                                        <li><span className="font-bold">State : </span> {selectedResponse.states}</li>
                                                                        <li><span className="font-bold">Zip-Code : </span>{selectedResponse.zipCode}</li>
                                                                        <li><span className="font-bold">Countrie : </span>{selectedResponse.countries}</li>
                                                                        <li><span className="font-bold">Phone number primary : </span> {selectedResponse.phoneNumber}</li>
                                                                        <li><span className="font-bold">Alternate number : </span>{selectedResponse.alternateNumber}</li>
                                                                        <li><span className="font-bold">Email address : </span> {selectedResponse.addressEmail}</li>
                                                                        <li><span className="font-bold">Name of Referring MD : </span> {selectedResponse.nameReferring}</li>
                                                                        <li><span className="font-bold">Referring Phone MD : </span>{selectedResponse.phoneMD}</li>
                                                                        <li><span className="font-bold">Insurance : </span>{selectedResponse.option}</li>
                                                                        <li><span className="font-bold">Self Play : </span>{selectedResponse.option1}</li>
                                                                        <li><span className="font-bold">New Patient Visit : </span>{selectedResponse.option2}</li>
                                                                        <li><span className="font-bold">Second Opinion : </span>{selectedResponse.option3}</li>
                                                                        <li><span className="font-bold">Recurrent Cancer : </span>{selectedResponse.option4}</li>
                                                                        <li><span className="font-bold">Name of diagnosis : </span>{selectedResponse.diagnosisName}</li>
                                                                        <li><span className="font-bold">Biopsy Performed : </span>{selectedResponse.option5}</li>
                                                                        <li><span className="font-bold">Date Biopsy Performed : </span>{selectedResponse.dateBiopsy}</li>
                                                                        <li><span className="font-bold">Name Of Hospital : </span>{selectedResponse.hospitalName}</li>
                                                                        <li><span className="font-bold">Part of body was the Biopsy Performed : </span>{selectedResponse.bodyBiopsy && selectedResponse.bodyBiopsy.join(', ')}</li>
                                                                        <li><span className="font-bold">Other : </span>{selectedResponse.otherBiopsy}</li>
                                                                        <li><span className="font-bold">Was labs drawn in the last 2 weeks of diagnosis : </span>{selectedResponse.option6}</li>
                                                                        <li><span className="font-bold">Was imaging studies performed : </span>{selectedResponse.option7}</li>
                                                                        <li><span className="font-bold">Studies Performed : </span>{selectedResponse.studiesPerform && selectedResponse.studiesPerform.join(', ')}</li>
                                                                        <li><span className="font-bold">Date CT Scans : </span>{selectedResponse.dateCtScan}</li>
                                                                        <li><span className="font-bold">Date MRI : </span>{selectedResponse.dateMRI}</li>
                                                                        <li><span className="font-bold">Date PET Scan : </span>{selectedResponse.datePetScan}</li>
                                                                        <li><span className="font-bold">Date Endoscopy : </span>{selectedResponse.dateEndoscopy}</li>
                                                                        <li><span className="font-bold">Date Colonoscopy : </span>{selectedResponse.dateColonoscopy}</li>
                                                                        <li><span className="font-bold">Date MRCP : </span>{selectedResponse.dateMRCP}</li>
                                                                        <li><span className="font-bold">Date U/S : </span>{selectedResponse.dateUS}</li>
                                                                        <li><span className="font-bold">Date Other : </span>{selectedResponse.dateOther}</li>
                                                                        <li><span className="font-bold">Started treatment for cancer : </span>{selectedResponse.option8}</li>
                                                                        <li><span className="font-bold">Treatment for cancer : </span>{selectedResponse.treatment && selectedResponse.treatment.join(', ')}</li>
                                                                        <li><span className="font-bold">Started treatment for Chemotherapy : </span>{selectedResponse.dateStartedChemo}</li>
                                                                        <li><span className="font-bold">End treatment for Chemotherapy : </span>{selectedResponse.dateEndChemo}</li>
                                                                        <li><span className="font-bold">Started treatment for Radiation : </span>{selectedResponse.dateStartedRadiation}</li>
                                                                        <li><span className="font-bold">End treatment for Radiation : </span>{selectedResponse.dateEndRadiation}</li>
                                                                        <li><span className="font-bold">Started treatment for Proton Surgery : </span>{selectedResponse.dateStartedSurgery}</li>
                                                                        <li><span className="font-bold">End treatment for Proton Surgery : </span>{selectedResponse.dateEndSurgery}</li>
                                                                        <li><span className="font-bold">Procedure/Surgical procedure : </span>{selectedResponse.procedure && selectedResponse.procedure.join(', ')}</li>

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
                        ))}
                    </tbody>
                </table>


            </div>




        </div>

    )
}
export default PancreaticForm