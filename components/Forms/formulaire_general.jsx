'use client'
import React from 'react';
import {useState} from 'react';
import {useForm} from 'react-hook-form';
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from 'zod';

const schema = z.object({
    name: z.string().nonempty('Name is required'),
    date: z.string().nonempty('Date is required').regex(/^\d{4}-\d{2}-\d{2}$/, 'Le format de la date doit être YYYY-MM-DD'),
    address: z.string().nonempty('Address is required'),
    answerRequired: z.string().nonempty('Please answer this question!'),
    phoneNumber: z.string().nonempty('Phone Number is required').regex(/^\d{10}$/, { message: 'Invalid Tel' }),
    leaveMessage: z.enum(['Yes', 'No']).optional(),
    maritalStatus: z.enum(['Single', 'Married', 'Significant Other', 'Divorced', 'Widowed']).optional(),
    livingArrangement: z.enum(['Lives Alone', 'With Spouse', 'Significant Other', 'Parents', 'Children']).optional(),
    children: z.string().nonempty('Choose an Option!'),
    message: z.string().nonempty('Write something when you choose "Yes"!'),
    phoneNumber1: z.string().nonempty('Phone Number is required').regex(/^\d{10}$/, { message: 'Invalid Tel' }),
    phoneNumber2: z.string().nonempty('Phone Number is required').regex(/^\d{10}$/, { message: 'Invalid Tel' }),
    phoneNumber3: z.string().nonempty('Phone Number is required').regex(/^\d{10}$/, { message: 'Invalid Tel' }),
    famCaregiver: z.string().nonempty('Please answer!'),
    religion: z.string().nonempty('Please enter your religion!'),
    occupation: z.string().nonempty('Please answer!'),
    preferredSpokenLanguage: z.string().nonempty('Please answer!'),
    preferredWrittenLanguageCommunication: z.string().nonempty('Please answer!'),
    medical: z.string().nonempty('Please answer!'),
    alergie: z.string().nonempty('Please answer!'),
    environmental: z.string().nonempty('Please answer!'),
    diagnosisTreatment: z.string().nonempty('Please answer!'),
    primaryCarePhysician: z.string().nonempty('Please answer!'),
    surgeon: z.string().nonempty('Please answer!'),
    plasticSurgeon: z.string().nonempty('Please answer!'),
    medicalOncologist: z.string().nonempty('Please answer!'),
    radiationOncologist: z.string().nonempty('Please answer!'),
    other: z.string().nonempty('Please answer!'),
    otherSymptoms: z.string().nonempty('Please answer!'),
    painDescribed: z.string().nonempty('Please answer!'),
    concern: z.string().nonempty('Please answer!'),
    help: z.string().nonempty('Please answer!'),
    preferredLanguage: z.string().nonempty('Please answer!'),
    other1: z.string().nonempty('Please answer!'),
    other2: z.string().nonempty('Please answer!'),
});

const GeneralForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm({
    resolver: zodResolver(schema),
  });
  
  const children = watch('children');

  const onSubmit = (data) => {
    console.log(data);
  };  

  const [range, setRange] = useState(0);
  const [range_, setRange_] = useState(0);

  const [respChildren, setRespChildren] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showModal1, setShowModal1] = useState(false);
  const [showModal2, setShowModal2] = useState(false); 

  const [quitSmoking, setQuitSmoking] = useState(false);
  const [cancerDiagnosis, setCancerDiagnosis] = useState(false);
  const [cancerTreatement, setCancerTreatement] = useState(false);
  const [clinicalTrial, setClinicalTrial] = useState(false);
  const [lostWeight, setLostWeight] = useState(false);
  const [financialConcern, setFinancialConcern] = useState(false);
  const [physicalDisability, setPhysicalDisability] = useState(false);
  const [physDisChoice, setPhysDisChoice] = useState(false);
  const [substanceAbuse, setSubstanceAbuse] = useState(false);
  const [journalEducational, setJournalEducational] = useState(false);
  const [goalsTreatment, setGoalsTreatment] = useState(false);
  const [prevCancerTreatment, setPrevCancerTreatment] = useState(false);
  const [diffDiagnosis, setDiffDiagnosis] = useState(false);
  const [adressConcern, setAdressConcern] = useState(false);
  const [specificSupport, setSpecificSupport] = useState(false);
  const [healthConcerns, setHealthConcerns] = useState(false)         
  const [alcoholStatus, setAlcoholStatus] = useState('');

  const [formProcedure, setFormProcedure] = useState([]);
  const [idProcedure, setIdProcedure] = useState();
  const [procedure, setProcedure] = useState('');
  const [dateProcedure, setDateProcedure] = useState('');

  const [formHistoryFamily, setFormHistoryFamily] = useState([]);
  const [relationship, setRelationship] = useState('');
  const [typeOfCancer, setTypeOfCancer] = useState('');

  const [formMedication, setFormMedication] = useState([]);
  const [nameMedication, setNameMedication] = useState('');
  const [doseMedication, setDoseMedication] = useState('');
  const [frequencyMedication, setFrequencyMedication] = useState('')


  const handleRespChildren = (event) => {
    setRespChildren(event.target.value === 'Yes2');
  };
  const handleQuitSmoking = (event) => {
    setQuitSmoking(event.target.value === 'Quit3')
  }
  const handleCancerDiagnosis = (event) => {
    setCancerDiagnosis(event.target.value === 'EP')
  }
  const handleCancerTreatement = (event) => {
    setCancerTreatement(event.target.value === 'EP1')
  }
  const handleClinicalTrial = (event) => {
    setClinicalTrial(event.target.value === 'referral')
  }
  const handleLostWeight = (event) => {
    setLostWeight(event.target.value === 'Yes4')
  }
  const handleFinancialConcern = (event) => {
    setFinancialConcern(event.target.value === 'Yes6')
  }
  const handlePhysicalDisability = (event) => {
    setPhysicalDisability(event.target.value === 'Yes20')
  }
  const handlePhysDisChoice = (event) => {
    setPhysDisChoice(event.target.value === 'AD')
  }
  const handleSubstanceAbuse = (event) => {
    setSubstanceAbuse(event.target.value === 'Yes21')
  }
  const handleJournalEducational = (event) => {
    setJournalEducational(event.target.value === 'Yes22')
  }
  const handleGoalsTreatment = (event) => {
    setGoalsTreatment(event.target.value === 'Yes23')
  }
  const handlePrevCancerTreatment = (event) => {
    setPrevCancerTreatment(event.target.value === 'Yes24')
  }
  const handleDiffDiagnosis = (event) => {
    setDiffDiagnosis(event.target.value === 'Yes25')
  }
  const handleAdressConcern = (event) => {
    setAdressConcern(event.target.value === 'Yes26')
  }
  const handleSpecificSupport = (event) => {
    setSpecificSupport(event.target.value === 'Yes27')
  }
  const handleHealthConcerns = (event) => {
    setHealthConcerns(event.target.value === 'Yes19')
  }
  const handleAlcoholStatus = (event) => {
    setAlcoholStatus(event.target.value)
  }
  const handleAddProcedure = () => {
    if (procedure.trim() && dateProcedure.trim()) {
        setFormProcedure([...formProcedure, {id: formProcedure.length + 1, procedure, dateProcedure }]);
        setProcedure('');
        setDateProcedure('');
    }
  }

  const handleAddMedication = () => {
    if (nameMedication.trim() && doseMedication.trim() && frequencyMedication.trim()){
        setFormMedication([...formMedication, {id: formMedication.length + 1, nameMedication, doseMedication, frequencyMedication}])
        setNameMedication('');
        setDoseMedication('');
        setFrequencyMedication('');
    }    
  }
  const handleAddHistoryFamily = () => {
    if (relationship.trim() && typeOfCancer.trim()){
        setFormHistoryFamily([...formHistoryFamily, {id: formHistoryFamily.length + 1, relationship, typeOfCancer}])
        setRelationship('');
        setTypeOfCancer('');
    }    
  }
  const handleDeleteHistoryFamily = (id) => {
    const updatedHistoryFamily = formHistoryFamily.filter(item => item.id !== id);
    setFormHistoryFamily(updatedHistoryFamily);
  };
  const handleDeleteMedication = (id) => {
    const updatedMedication = formMedication.filter(item => item.id !== id);
    setFormMedication(updatedMedication);
  };
  const handleDeleteProcedure = (id) => {
    const updatedProcedure = formProcedure.filter(item => item.id !== id);
    setFormProcedure(updatedProcedure);
  };
  
  const showMyModal = (e) => {
    e.preventDefault();
    setShowModal(true)

  }
  const showMyModal1 = (e) => {
    e.preventDefault();
    setShowModal1(true)

  }
  const showMyModal2 = (e) => {
    e.preventDefault();
    setShowModal2(true)

  }  

  return (
    <div className="ml-20 mr-20 mt-5 mb-5 bg-slate-25">
        <div className="text-slate-400 text-center text-xl pt-10">Patient Intake Assessment Tools for Navigation</div>
        <form onSubmit={handleSubmit(onSubmit)} className='mt-10' >
            <div className="grid md:grid-cols-2 md:gap-6">
                <div className="flex flex-col">
                    <div className="relative z-0 w-full group flex items-center">
                    <label htmlFor="name">Name:</label>
                    <input 
                        type="text"
                        id="name" 
                        className="ms-2 block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                        placeholder=" "
                        {...register('name')}
                    />
                    </div>
                    <div className="grid-cols-2 text-center">
                        {errors.name && <p className="text-red-800">{errors.name.message}</p>}
                    </div>
                </div>

                <div className="flex flex-col">
                    <div className="relative z-0 w-full  group flex items-center">
                    <label htmlFor="DOB">Date Of Birth:</label>
                    <input 
                        type="date" 
                        id="DOB" 
                        className="ms-2 block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                        placeholder=""
                        {...register('date')}
                    />
                    </div>
                    <div className="grid-cols-2 text-center">
                        {errors.date && <p className="text-red-800">{errors.date.message}</p>}
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
            <div className="text-center">{errors.address && <p className="text-red-800">{errors.address.message}</p>}</div>
            <div className="relative z-0 w-full group flex items-center">
                <label htmlFor="cancerDiagnosis_">Cancer diagnosis:</label>
                <input 
                    type="text" 
                    name="cancerDiagnosis_" 
                    id="cancerDiagnosis_" 
                    className="ms-2 block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  
                    {...register('answerRequired')}
                />
            </div>
            <div className="text-center">{errors.answerRequired && <p className="text-red-800">{errors.answerRequired.message}</p>}</div>
            <div className="grid md:grid-cols-2 md:gap-6">
                <div className="flex flex-col">
                    <div className="relative z-0 w-full group flex items-center">
                    <label htmlFor="phoneNumber">Phone Number:(home)</label>
                    <input 
                        type="tel"
                        id="phoneNumber" 
                        className="ms-2 block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                        placeholder=" "
                    />
                    </div>
                    <div className="grid-cols-2 text-center">
                    </div>
                </div>

                <div className="flex flex-col">
                    <div className="relative z-0 w-full  group flex items-center">
                    <label htmlFor="cell">(cell):</label>
                    <input 
                        type="tel" 
                        id="cell" 
                        className="ms-2 block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                        placeholder=""
                        {...register('phoneNumber')}
                    />
                    </div>
                    <div className="grid-cols-2 text-center">
                        {errors.phoneNumber && <p className="text-red-800">{errors.phoneNumber.message}</p>}
                    </div>
                </div>
            </div>
            <div className="relative z-0 w-full mt-2 group flex items-center">
                <label htmlFor="answer">May we leave a message?</label>
                    <input 
                        type="radio" 
                        name="answer" 
                        id="Yes"
                        value="Yes" 
                        className='ms-2' 
                        {...register('leaveMessage')}
                    />
                    <label htmlFor="Yes">Yes</label>
                    <input 
                        type="radio" 
                        name="answer" 
                        id="No" 
                        value="No"
                        className='ms-2' 
                        {...register('leaveMessage')}
                    />
                    <label htmlFor="No">No</label>
            </div>
            <div>
                {errors.leaveMessage && <p className="text-red-800">{errors.leaveMessage.message}</p>}
            </div>
            <div className="relative z-0 w-full mt-2 group flex items-center">
                <label htmlFor="emergencyContact">Emergency Contact:</label>
                <input 
                    type="tel" 
                    name="emergencyContact" 
                    id="emergencyContact" 
                    className="ms-2 block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " 
                    {...register('name')}
                />
            </div>
            <div className="text-center">
                {errors.name && <p className="text-red-800">{errors.name.message}</p>}
            </div>
            <div className="grid md:grid-cols-2 md:gap-6">
                <div className="flex flex-col">
                    <div className="relative z-0 w-full group flex items-center">
                    <label htmlFor="phoneNumber2">Phone Number:(home)</label>
                    <input 
                        type="tel"
                        id="phoneNumber2" 
                        className="ms-2 block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                        placeholder=" "
                    />
                    </div>
                    <div className="grid-cols-2 text-center">
                    </div>
                </div>

                <div className="flex flex-col">
                    <div className="relative z-0 w-full  group flex items-center">
                    <label htmlFor="cell2">(cell):</label>
                    <input 
                        type="tel" 
                        id="cell2" 
                        className="ms-2 block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                        placeholder=""
                        {...register('phoneNumber1')}
                    />
                    </div>
                    <div className="grid-cols-2 text-center">
                        {errors.phoneNumber1 && <p className="text-red-800">{errors.phoneNumber1.message}</p>}
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 mt-2">
                <label htmlFor="">Marital Status:</label>
                <div className="flex items-center">
                    <input 
                        type="radio" 
                        name="maritalStatus" 
                        id="single"
                        value="Single"
                        {...register('maritalStatus')}
                    />
                    <label htmlFor="single" className="ml-2">Single</label>
                </div>

                <div className="flex items-center">
                    <input 
                        type="radio" 
                        name="maritalStatus" 
                        id="married"
                        value="Married" 
                        className="mr-1"
                        {...register('maritalStatus')}
                    />
                    <label htmlFor="married" className="ml-2">Married</label>
                </div>

                <div className="flex items-center">
                    <input 
                        type="radio" 
                        name="maritalStatus" 
                        id="significantOther"
                        value="Significant Other" 
                        className="mr-1"
                        {...register('maritalStatus')}
                    />
                    <label htmlFor="significantOther" className="ml-2">Significant Other</label>
                </div>

                <div className="flex items-center">
                    <input 
                        type="radio" 
                        name="maritalStatus" 
                        id="divorced"
                        value="Divorced" 
                        className="mr-1"
                        {...register('maritalStatus')}
                    />
                    <label htmlFor="divorced" className="ml-2">Divorced</label>
                </div>

                <div className="flex items-center">
                    <input 
                        type="radio" 
                        name="maritalStatus" 
                        id="widowed"
                        value="Widowed"
                        {...register('maritalStatus')}
                    />
                    <label htmlFor="widowed" className="ml-2">Widowed</label>
                </div>
            </div>
            <div>
                {errors.maritalStatus && <p className="text-red-800">{errors.maritalStatus.message}</p>}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 mt-2">
                <label htmlFor="">Living Arrangement:</label>
                <div className="flex items-center">
                    <input 
                        type="radio" 
                        name="livingArrangement" 
                        id="livesAlone"
                        value="Lives Alone"
                        {...register('livingArrangement')}
                    />
                    <label htmlFor="livesAlone" className="ml-2">Lives Alone</label>
                </div>

                <div className="flex items-center">
                    <input 
                        type="radio" 
                        name="livingArrangement" 
                        id="withSpouse" 
                        className="mr-1"
                        value="With Spouse"
                        {...register('livingArrangement')}
                    />
                    <label htmlFor="withSpouse" className="ml-2">With Spouse</label>
                </div>

                <div className="flex items-center">
                    <input 
                        type="radio" 
                        name="livingArrangement" 
                        id="significantOther_" 
                        className="mr-1"
                        value="Significant Other"
                        {...register('livingArrangement')}
                    />
                    <label htmlFor="significantOther_" className="ml-2">Significant Other</label>
                </div>

                <div className="flex items-center">
                    <input 
                        type="radio" 
                        name="livingArrangement" 
                        id="parents" 
                        className="mr-1"
                        value="Parents"
                        {...register('livingArrangement')}
                    />
                    <label htmlFor="parents" className="ml-2">Parents</label>
                </div>

                <div className="flex items-center">
                    <input 
                        type="radio" 
                        name="livingArrangement" 
                        id="children"
                        value="Children"
                        {...register('livingArrangement')}
                    />
                    <label htmlFor="children" className="ml-2">Children</label>
                </div>
            </div>
            <div>
                {errors.livingArrangement && <p className="text-red-800">{errors.livingArrangement.message}</p>}
            </div>
            <div className="relative z-0 w-full mt-2 group flex items-center">
                <label htmlFor="careGiverName">Caregiver Name:</label>
                <input 
                    type="text" 
                    name="careGiverName" 
                    id="careGiverName" 
                    className="ms-2 block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " 
                    {...register('name')}
                />
            </div>
            <div className="text-center">
                {errors.name && <p className="text-red-800">{errors.name.message}</p>}
            </div><div className="grid md:grid-cols-2 md:gap-6">
                <div className="flex flex-col">
                    <div className="relative z-0 w-full group flex items-center">
                    <label htmlFor="phoneNumber3">Phone Number:(home)</label>
                    <input 
                        type="tel"
                        id="phoneNumber3" 
                        className="ms-2 block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                        placeholder=" "
                    />
                    </div>
                    <div className="grid-cols-2 text-center">
                    </div>
                </div>

                <div className="flex flex-col">
                    <div className="relative z-0 w-full  group flex items-center">
                    <label htmlFor="cell3">(cell):</label>
                    <input 
                        type="tel" 
                        id="cell3" 
                        className="ms-2 block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                        placeholder=""
                        {...register('phoneNumber3')}
                    />
                    </div>
                    <div className="grid-cols-2 text-center">
                        {errors.phoneNumber3 && <p className="text-red-800">{errors.phoneNumber3.message}</p>}
                    </div>
                </div>
            </div>
            <div className='mt-2'>
                <label htmlFor="familyCaregiver">Family and Caregiver concerns:</label>
                <textarea
                    {...register('famCaregiver')} 
                    id="familyCaregiver" 
                    rows="4" 
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here...">
                </textarea>
                {errors.famCaregiver && <p className="text-red-800">{errors.famCaregiver.message}</p>}
            </div>
            <div className="relative z-0 w-full mt-2 group flex items-center">
                <label htmlFor="" className='me-3'>Children?</label>
                    <input 
                        type="radio" 
                        name="answering" 
                        id="Yes2" 
                        value="Yes2"
                        onChange={handleRespChildren}
                    />
                    <label htmlFor="Yes2" className="me-2">Yes</label>
                    <input 
                        type="radio" 
                        name="answering" 
                        id="No2" 
                        value="No2"
                        onChange={handleRespChildren}
                    />
                    <label htmlFor="No2" className='me-2'>No</label>
            </div>
            {respChildren && (
                <div className='mb-6'>
                    <label htmlFor="childrenDiagnosis">Concerns with children related to diagnosis, specify:</label>
                    <textarea id="childrenDiagnosis" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>
                </div>
            )}
            
            <div className="relative z-0 w-full mt-2 group flex items-center">
                <label htmlFor="religion">Religion:</label>
                <input 
                    type="text" 
                    name="religion" 
                    id="religion" 
                    className="ms-2 block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                    {...register('religion')}  
                />
            </div>
            <div className="text-center">
                {errors.religion && <p className="text-red-800">{errors.religion.message}</p>}
            </div>
            <div className='text-center'>
            </div>
            <div className="relative z-0 w-full mt-2 group flex items-center">
                <label htmlFor="ocupation">Occupation:</label>
                <input 
                    type="text" 
                    name="occupation" 
                    id="occupation" 
                    className="ms-2 block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " 
                    {...register('occupation')}   
                />
            </div>
            <div className='text-center'>
                {errors.occupation && <p className="text-red-800">{errors.occupation.message}</p>}
            </div>
            <div className="relative z-0 w-full mt-2 group flex items-center">
                <label htmlFor="PSL">Preferred Spoken Language:</label>
                <input 
                    type="text" 
                    name="PSL" 
                    id="PSL" 
                    className="ms-2 block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " 
                    {...register('preferredSpokenLanguage')}
                />
            </div>
            <div className='text-center'>
                {errors.preferredSpokenLanguage && <p className="text-red-800">{errors.preferredSpokenLanguage.message}</p>}
            </div>
            <div className="relative z-0 w-full mt-2 group flex items-center">
                <label htmlFor="PWLC">Preferred Written Language Communication:</label>
                <input 
                    type="text" 
                    name="PWLC" 
                    id="PWLC" 
                    className="ms-2 block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " 
                    {...register('preferredWrittenLanguageCommunication')}
                />
            </div>
            <div className='text-center'>
                {errors.preferredWrittenLanguageCommunication && <p className="text-red-800">{errors.preferredWrittenLanguageCommunication.message}</p>}
            </div>
            <div className='mt-2'>
                <label htmlFor="medicalHistory">Medical History / Other Medical Conditions: </label>
                <textarea id="medicalHistory" {...register('medical')} rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-blue-700 dark:border-blue-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>
                {errors.medical && <p className='text-red-800'>{errors.medical.message}</p>}
            </div>
            <div className='mt-2'>
                <label htmlFor="surgeryHistory">Surgery: History: (list procedure and date):  </label>                
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Procedure
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Date
                                </th>
                                <th scope="col" className="px-6 py-4 text-right">
                                    <a href="#" onClick={showMyModal} type='button' data-modal-target="authentication-modal" data-modal-toggle="authentication-modal">
                                        <svg className="w-6 h-6 text-blue-600 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 5.757v8.486M5.757 10h8.486M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                                        </svg>
                                    </a>
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
                                                <h3 className="text-3xl font-semibold">
                                                    Add a procedure
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
                                                <div className="relative p-6 flex-auto">
                                                <div className="grid md:grid-cols-2 md:gap-6">
                                                    <div className="relative z-0 w-full mb-6 group flex items-center">
                                                        <label htmlFor="procedure">Procedure:</label>
                                                        <input 
                                                            type="text" 
                                                            name="procedure" 
                                                            id="name" 
                                                            className="ms-2 block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " 
                                                            value={procedure}
                                                            onChange={(e) => setProcedure(e.target.value)}                                                             
                                                        />                   
                                                    </div>
                                                    <div className="relative z-0 w-full mb-6 group flex items-center">
                                                        <label htmlFor="dateProcedure">Date:</label>
                                                        <input 
                                                            type="date" 
                                                            name="dateProcedure" 
                                                            id="dateProcedure" 
                                                            className="ms-2 block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " 
                                                            value={dateProcedure}
                                                            onChange={(e) => setDateProcedure(e.target.value)}                                                            
                                                        />
                                                    </div>
                                                </div>
                                                </div>
                                                {/*footer*/}
                                                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                                <button
                                                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                    type="button"
                                                    onClick={() => setShowModal(false)}
                                                >
                                                    Close
                                                </button>
                                                <button
                                                    className="bg-blue-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                    type="button"
                                                    onClick={handleAddProcedure}
                                                >
                                                    Save
                                                </button>
                                                </div>
                                            </div>
                                            </div>
                                        </div>
                                        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                                        </>
                                    ) : null}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {formProcedure.map((data, index) => (
                                <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {data.procedure}
                                    </th>
                                    <td className="px-6 py-4">
                                        {data.dateProcedure}
                                    </td>
                                    <td className="px-3 py-4 text-right">
                                        <a href="#" onClick={() => handleDeleteProcedure(data.id)} type='button' className='mr-3' data-modal-target="authentication-modal" data-modal-toggle="authentication-modal">
                                            <svg className="w-[18px] h-[18px] text-red-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h16M7 8v8m4-8v8M7 1h4a1 1 0 0 1 1 1v3H6V2a1 1 0 0 1 1-1ZM3 5h12v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5Z"/>
                                            </svg>
                                        </a>
                                    </td>
                                </tr>
                                ))}
                        </tbody>
                    </table>
                </div>

            </div>
            <div className='mt-2'>
                <label htmlFor="surgeryHistory">Medications (include name, dose and frequency):  </label>                
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Dose
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Frequency
                                </th>
                                <th scope="col" className="px-6 py-4 text-right">
                                    <a href="#" onClick={showMyModal1} type='button' data-modal-target="authentication-modal" data-modal-toggle="authentication-modal">
                                        <svg className="w-6 h-6 text-blue-600 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 5.757v8.486M5.757 10h8.486M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                                        </svg>
                                    </a>
                                    {showModal1 ? (
                                        <>
                                        <div
                                            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                                        >
                                            <div className="relative w-auto my-6 mx-auto max-w-3xl">
                                            {/*content*/}
                                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                                {/*header*/}
                                                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                                <h3 className="text-3xl font-semibold">
                                                    Medications
                                                </h3>
                                                <button
                                                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                                    onClick={() => setShowModal1(false)}
                                                >
                                                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                                    ×
                                                    </span>
                                                </button>
                                                </div>
                                                {/*body*/}
                                                <div className="relative p-6 flex-auto">
                                                    <div className="relative z-0 w-full mb-6 group flex items-center">
                                                        <label htmlFor="nameMedication">Name:</label>
                                                        <input 
                                                            type="text" 
                                                            name="nameMedication" 
                                                            id="nameMedication" 
                                                            className="ms-2 block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " 
                                                            value={nameMedication}
                                                            onChange={(e) => setNameMedication(e.target.value)}
                                                        />    
                                                    </div>
                                                    <div className="relative z-0 w-full mb-6 group flex items-center">
                                                        <label htmlFor="doseMedication">Dose:</label>
                                                        <input 
                                                            type="text" 
                                                            name="doseMedication" 
                                                            id="doseMedication" 
                                                            className="ms-2 block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                                            value={doseMedication}
                                                            onChange={(e) => setDoseMedication(e.target.value)}
                                                        />    
                                                    </div>
                                                    <div className="relative z-0 w-full mb-6 group flex items-center">
                                                        <label htmlFor="frequencyMedication">Frequency:</label>
                                                        <input 
                                                            type="text" 
                                                            name="frequencyMedication" 
                                                            id="frequencyMedication" 
                                                            className="ms-2 block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " 
                                                            value={frequencyMedication}
                                                            onChange={(e) => setFrequencyMedication(e.target.value)}
                                                        />            
                                                    </div>
                                                </div>
                                                {/*footer*/}
                                                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                                <button
                                                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                    type="button"
                                                    onClick={() => setShowModal1(false)}
                                                >
                                                    Close
                                                </button>
                                                <button
                                                    className="bg-blue-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                    type="button"
                                                    onClick={handleAddMedication}
                                                >
                                                    Save
                                                </button>
                                                </div>
                                            </div>
                                            </div>
                                        </div>
                                        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                                        </>
                                    ) : null}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {formMedication.map((data, index) => (
                                <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {data.nameMedication}
                                    </th>
                                    <td className="px-6 py-4">
                                        {data.doseMedication}
                                    </td>
                                    <td className="px-6 py-4">
                                        {data.frequencyMedication}
                                    </td>
                                    <td className="px-3 py-4 text-right">
                                        <a href="#" onClick={() => handleDeleteMedication(data.id)} type='button' className='mr-3' data-modal-target="authentication-modal" data-modal-toggle="authentication-modal">
                                            <svg className="w-[18px] h-[18px] text-red-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h16M7 8v8m4-8v8M7 1h4a1 1 0 0 1 1 1v3H6V2a1 1 0 0 1 1-1ZM3 5h12v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5Z"/>
                                            </svg>
                                        </a>
                                    </td>
                                </tr>
                                ))}
                        </tbody>
                    </table>
                </div>

            </div>
            <div className="relative z-0 w-full mt-2 group flex items-center">
                <label htmlFor="alergies">Alergies:</label>
                <input 
                    type="text" 
                    name="alergies" 
                    id="alergies" 
                    className="ms-2 block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " 
                    {...register('alergie')}            
                />
            </div>
            <div className='text-center'>
                {errors.alergie && <p className='text-red-800'>{errors.alergie.message}</p>}                    
            </div>
            <div className="relative z-0 w-full mt-2 group flex items-center">
                <label htmlFor="smoking" className='me-3'>Smoking?</label>
                    <input 
                        type="radio" 
                        name="respSmoking" 
                        id="Yes3" 
                        value="Yes3"
                        onChange={handleQuitSmoking}
                    />
                    <label htmlFor="Yes3" className="me-2">Yes</label>
                    <input 
                        type="radio" 
                        name="respSmoking" 
                        id="No3"
                        value="No3"
                        onChange={handleQuitSmoking}
                    />
                    <label htmlFor="No3" className="me-2">No</label>
                    <input 
                        type="radio" 
                        name="respSmoking" 
                        id="Quit3"
                        value="Quit3"
                        onChange={handleQuitSmoking}
                    />
                    <label htmlFor="Quit3" class>Quit</label>
            </div>
            {quitSmoking && (
                <div>    
                    <div className='mt-1'>
                        <label htmlFor="historySmoking">History Smoking: </label>
                        <textarea id="historySmoking" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-blue-700 dark:border-blue-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>
                    </div>    
                    <div className="relative z-0 w-full mt-2 group flex items-center">
                        <label htmlFor="PPD">PPD / Years:</label>
                        <input 
                            type="number" 
                            name="PPD" 
                            id="PPD" 
                            className="ms-2 block py-2.5 px-0 w-[15%] text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " 
                            
                        />

                    </div>
                </div>

            )}
            <div className="relative z-0 w-full mt-2 group flex items-center">
                <label htmlFor="alcohol" className='me-3'>Alcohol Use?</label>
                    <input 
                        type="radio" 
                        name="respAlcohol" 
                        id="Yes4" 
                        value="Yes4"
                        checked={alcoholStatus === 'Yes4'}
                        onChange={handleAlcoholStatus}
                    />
                    <label htmlFor="Yes4" className="me-2">Yes</label>
                    <input 
                        type="radio" 
                        name="respAlcohol" 
                        id="No4" 
                        value="No4"
                        checked={alcoholStatus === 'No4'}
                        onChange={handleAlcoholStatus}
                    />
                    <label htmlFor="No4" className="me-2">No</label>
                    <input 
                        type="radio" 
                        name="respAlcohol" 
                        id="Quit4" 
                        value="Quit4"
                        checked={alcoholStatus === 'Quit4'}
                        onChange={handleAlcoholStatus}
                    />
                    <label htmlFor="Quit4" className="me-2">Quit</label>
            </div>
            {alcoholStatus === 'Yes4' && (
                <div className="relative z-0 w-full group flex items-center">
                    <label htmlFor="drinkTimes">How Much(drinks/week)?</label>
                    <input 
                        type="number" 
                        name="drinkWeek" 
                        id="drinkWeek" 
                        className="ms-2 block py-2.5 px-0 w-[15%] text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  
                        
                    />

                </div>
            )} 
            {alcoholStatus === 'Quit4' && (
                <div>    
                    <div className='mt-1'>
                        <label htmlFor="historyDrinking">History Drinking: </label>
                        <textarea id="historyDrinking" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-blue-700 dark:border-blue-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>
                    </div>    
                    <div className="relative z-0 w-full mb-6 group flex items-center">
                        <label htmlFor="DWY">Drinks/Weeks/Years:</label>
                        <input 
                            type="number" 
                            name="DWY" 
                            id="DWK" 
                            className="ms-2 block py-2.5 px-0 w-[15%] text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                            
                        />

                    </div>
                </div>
            )}    
            <div className="relative z-0 w-full mt-2 group flex items-center">
                <label htmlFor="environmental">Environmental factors/Occupational exposure: </label>
                <input 
                    type="text" 
                    name="environmental" 
                    id="environmental" 
                    className="ms-2 block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " 
                    {...register('environmental')}
                />
            </div>
            <div className="text-center">
                 {errors.environmental && <p className="text-red-800">{errors.environmental.message}</p>}
            </div>
            <div className='mb-6'>
                <label htmlFor="familyHistory" className='font-bold'>Family History</label>
                <div className='mb-6 mt-2'>
                    <label htmlFor="surgeryHistory">Family History of Cancer (list relationship, type of cancer): </label>                
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Relationship 
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Type of Cancer
                                    </th>
                                    <th scope="col" className="px-6 py-4 text-right">
                                        <a href="#" onClick={showMyModal2} type='button' data-modal-target="authentication-modal" data-modal-toggle="authentication-modal">
                                            <svg className="w-6 h-6 text-blue-600 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 5.757v8.486M5.757 10h8.486M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                                            </svg>
                                        </a>
                                        {showModal2 ? (
                                            <>
                                            <div
                                                className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                                            >
                                                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                                                {/*content*/}
                                                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                                    {/*header*/}
                                                    <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                                    <h3 className="text-3xl font-semibold">
                                                        Family History of Cancer
                                                    </h3>
                                                    <button
                                                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                                        onClick={() => setShowModal2(false)}
                                                    >
                                                        <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                                        ×
                                                        </span>
                                                    </button>
                                                    </div>
                                                    {/*body*/}
                                                    <div className="relative p-6 flex-auto">
                                                        <div className="relative z-0 w-full mb-6 group flex items-center">
                                                            <label htmlFor="relationship">Relationship:</label>
                                                            <input 
                                                                type="text" 
                                                                name="relationship" 
                                                                id="relationship" 
                                                                className="ms-2 block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " 
                                                                value={relationship}
                                                                onChange={(e) => setRelationship(e.target.value)}
                                                            />    
                                                        </div>
                                                        <div className="relative z-0 w-full mb-6 group flex items-center">
                                                            <label htmlFor="typeOfCancer">Type Of Cancer:</label>
                                                            <input 
                                                                type="text" 
                                                                name="typeOfCancer" 
                                                                id="typeOfCancer" 
                                                                className="ms-2 block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                                                value={typeOfCancer}
                                                                onChange={(e) => setTypeOfCancer(e.target.value)}
                                                            />    
                                                        </div>
                                                    </div>
                                                    {/*footer*/}
                                                    <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                                    <button
                                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                        type="button"
                                                        onClick={() => setShowModal2(false)}
                                                    >
                                                        Close
                                                    </button>
                                                    <button
                                                        className="bg-blue-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                        type="button"
                                                        onClick={handleAddHistoryFamily}
                                                    >
                                                        Save
                                                    </button>
                                                    </div>
                                                </div>
                                                </div>
                                            </div>
                                            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                                            </>
                                        ) : null}
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {formHistoryFamily.map((data, index) => (
                                    <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {data.relationship}
                                        </th>
                                        <td className="px-6 py-4">
                                            {data.typeOfCancer}
                                        </td>
                                        <td className="px-3 py-4 text-right">
                                            <a href="#" onClick={() => handleDeleteHistoryFamily(data.id)} type='button' className='mr-3' data-modal-target="authentication-modal" data-modal-toggle="authentication-modal">
                                                <svg className="w-[18px] h-[18px] text-red-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h16M7 8v8m4-8v8M7 1h4a1 1 0 0 1 1 1v3H6V2a1 1 0 0 1 1-1ZM3 5h12v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5Z"/>
                                                </svg>
                                            </a>
                                        </td>
                                    </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>

                </div>

            </div>
            <div>
                <label htmlFor="aboutCancer" className='font-bold'>What do you know about your cancer diagnosis? </label>
                <div className="me-2 mt-2"><label htmlFor="">What has your doctor told you about your cancer diagnosis? </label></div>
                    <div className="mt-1 mb-6">
                            <div className="mb-2">
                                <input 
                                    type="radio" 
                                    id="PKD" 
                                    name="cancerDiagnosis" 
                                    className="me-1"
                                    value="PKD"
                                    onChange={handleCancerDiagnosis}
                                />
                                <label htmlFor="PKD">Patient knowledgeable about cancer diagnosis</label><br/>
                            </div>
                            <div className="mb-2">
                                <input 
                                    type="radio" 
                                    id="PNKD" 
                                    name="cancerDiagnosis" 
                                    className="me-1"
                                    value="PNKD"
                                    onChange={handleCancerDiagnosis}
                                />
                                <label htmlFor="PNKD">Patient not knowledgeable about cancer diagnosis</label><br/>
                            </div>
                            <div className="mb-2">
                                <input 
                                    type="radio" 
                                    id="MEN"  
                                    name="cancerDiagnosis" 
                                    className="me-1"
                                    value="MEN"
                                    onChange={handleCancerDiagnosis}

                                />
                                <label htmlFor="MEN">More education needed</label><br/>
                            </div>
                            <div className="mb-2">
                                <input 
                                    type="radio" 
                                    id="EP" 
                                    name="cancerDiagnosis" 
                                    className="me-1"
                                    value="EP"
                                    onChange={handleCancerDiagnosis}
                                />
                                <label htmlFor="EP">Education provided</label><br/>
                            </div>
                            {cancerDiagnosis && (
                                <div className='mb-6'>
                                <textarea id="EP" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-blue-700 dark:border-blue-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>
                            </div> 
                            )}
                            
                    </div>

                    <div className="me-2 mt-2"><label htmlFor="">What has your doctor told you about your cancer treatment? </label></div>
                    <div className="mt-1 mb-6">
                            <div className="mb-2">
                                <input 
                                    type="radio" 
                                    id="PKD" 
                                    name="cancerTreatement" 
                                    className="me-1"
                                    value="PKT"
                                    onChange={handleCancerTreatement}
                                />
                                <label htmlFor="PKT">Patient knowledgeable about cancer treatement</label><br/>
                            </div>
                            <div className="mb-2">
                                <input 
                                    type="radio" 
                                    id="PNKT" 
                                    name="cancerTreatement" 
                                    className="me-1"
                                    value="PNKT"
                                    onChange={handleCancerTreatement}
                                />
                                <label htmlFor="PNKT">Patient not knowledgeable about cancer treatement</label><br/>
                            </div>
                            <div className="mb-2">
                                <input 
                                    type="radio" 
                                    id="MEN1"  
                                    name="cancerTreatement" 
                                    className="me-1"
                                    value="MEN1"
                                    onChange={handleCancerTreatement}

                                />
                                <label htmlFor="MEN1">More education needed</label><br/>
                            </div>
                            <div className="mb-2">
                                <input 
                                    type="radio" 
                                    id="EP1" 
                                    name="cancerTreatement" 
                                    className="me-1"
                                    value="EP1"
                                    onChange={handleCancerTreatement}
                                />
                                <label htmlFor="EP1">Education provided</label><br/>
                            </div>
                            {cancerTreatement && (
                                <div className='mb-6'>
                                <textarea id="EP1" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-blue-700 dark:border-blue-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>
                            </div> 
                            )}
                            
                    </div>
                    <div className='mb-6'>
                        <label htmlFor="diagnosisTreatement">What specific concerns do you have about your diagnosis and treatment? </label>
                        <textarea {...register('diagnosisTreatment')} id="diagnosisTreatement" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>
                        {errors.diagnosisTreatment && <p className="text-red-800">{errors.diagnosisTreatment.message}</p>}        
                    </div>
                    <div className="me-2 mt-2"><label htmlFor="">Do you have an understanding of clinical trials? </label></div>
                    <div className="mt-1 mb-6">
                            <div className="mb-2">
                                <input 
                                    type="radio" 
                                    id="Yes4" 
                                    name="clinicalTrial" 
                                    className="me-1"
                                    value="Yes4"
                                    onChange={handleClinicalTrial}
                                />
                                <label htmlFor="Yes4">Yes</label><br/>
                            </div>
                            <div className="mb-2">
                                <input 
                                    type="radio" 
                                    id="No4" 
                                    name="clinicalTrial" 
                                    className="me-1"
                                    value="No4"
                                    onChange={handleClinicalTrial}
                                />
                                <label htmlFor="No4">No</label><br/>
                            </div>
                            <div className="mb-2">
                                <input 
                                    type="radio" 
                                    id="NoNeed"  
                                    name="clinicalTrial" 
                                    className="me-1"
                                    value="NoNeed"
                                    onChange={handleClinicalTrial}

                                />
                                <label htmlFor="NoNeed">Not needed at this time</label><br/>
                            </div>
                            <div className="mb-2">
                                <input 
                                    type="radio" 
                                    id="referral" 
                                    name="clinicalTrial" 
                                    className="me-1"
                                    value="referral"
                                    onChange={handleClinicalTrial}
                                />
                                <label htmlFor="referral">Referral to research nurse</label><br/>
                            </div>
                            {clinicalTrial && (
                                <div className='mb-6'>
                                    <textarea id="referral" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-blue-700 dark:border-blue-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>
                                </div> 
                            )}
                            
                    </div>
                                       
            </div>
            <div className='mb-6'>
                <label htmlFor="" className='font-bold'>Other Physicians involved in your care: </label>                
                <div className="relative z-0 w-[50%] mt-3 group flex items-center">
                    <label htmlFor="PCP">Primary Care Physician:</label>
                    <input 
                        type="text" 
                        name="PCP" 
                        id="PCP" 
                        className="ms-2 block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " 
                        {...register('primaryCarePhysician')}        
                    />
                </div>
                <div className='text-center w-[60%]'>
                    {errors.primaryCarePhysician && <p className='text-red-800'>{errors.primaryCarePhysician.message}</p>}
                </div>
                <div className="relative z-0 w-[50%] mt-2 group flex items-center">
                    <label htmlFor="surgeon">Surgeon:</label>
                    <input 
                        type="text" 
                        name="surgeon" 
                        id="surgeon" 
                        className="ms-2 block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " 
                        {...register('surgeon')}        
                    />
                </div>
                <div className='text-center w-[60%]'>
                    {errors.surgeon && <p className='text-red-800'>{errors.surgeon.message}</p>}
                </div>
                <div className="relative z-0 w-[50%] mt-2 group flex items-center">
                    <label htmlFor="plasticSurgeon">Plastic Surgeon: </label>
                    <input 
                        type="text" 
                        name="plasticSurgeon" 
                        id="plasticSurgeon" 
                        className="ms-2 block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                        {...register('plasticSurgeon')}          
                    />
                </div>
                <div className='text-center w-[60%]'>
                    {errors.plasticSurgeon && <p className='text-red-800'>{errors.plasticSurgeon.message}</p>}
                </div>
                <div className="relative z-0 w-[50%] mt-2 group flex items-center">
                    <label htmlFor="medicalOncologist">Medical Oncologist: </label>
                    <input 
                        type="text" 
                        name="medicalOncologist" 
                        id="medicalOncologist" 
                        className="ms-2 block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " 
                        {...register('medicalOncologist')}          
                    />
                </div>
                <div className='text-center w-[60%]'>
                    {errors.medicalOncologist && <p className='text-red-800'>{errors.medicalOncologist.message}</p>}
                </div>
                <div className="relative z-0 w-[50%] mt-2 group flex items-center">
                    <label htmlFor="radiationOncologist">Radiation Oncologist:</label>
                    <input 
                        type="text" 
                        name="radiationOncologist" 
                        id="radiationOncologist" 
                        className="ms-2 block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " 
                        {...register('radiationOncologist')}        
                    />
                </div>
                <div className='text-center w-[60%]'>
                    {errors.radiationOncologist && <p className='text-red-800'>{errors.radiationOncologist.message}</p>}
                </div>
                <div className="relative z-0 w-full mt-2 group flex items-center">
                    <label htmlFor="Other1">Other:</label>
                    <input 
                        type="text" 
                        name="Other1" 
                        id="Other1" 
                        className="ms-2 block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " 
                        {...register('other')}        
                    />
                </div>
                <div className='text-center'>
                    {errors.other && <p className='text-red-800'>{errors.other.message}</p>}
                </div>
            </div>
            <div className='mb-6'>
                <label htmlFor="familyHistory" className='font-bold'>Pain and Symptom Management Assessment:  </label> 
                <div className='mb-2 mt-2'>
                    <label htmlFor="pain">Pain:  Scale of 0 - 10, (10 is the highest, rate your pain level over the last 24 hours) </label><br/>
                    <div className="text-center w-[50%]">            
                        <input 
                            type="range"
                            id="pain" 
                            min="0" 
                            max="10" 
                            className="mt-2"
                            step="1"
                            value={range}
                            onChange={(e)=>setRange(e.target.value)}
                        /><br/>
                        <b>{range}</b>
                    </div>    
                </div>
                <div className='mb-6'>
                    <label htmlFor="pain">Describe your pain</label>
                    <textarea id="painDescribed"  {...register('painDescribed')}  rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-blue-700 dark:border-blue-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>
                    {errors.painDescribed && <p className="text-red-800">{errors.painDescribed.message}</p>}           
                </div>
                <div className='mb-6 mt-2'>
                    <label htmlFor="fatigue">Fatigue: Scale of 0 - 10 (10 is the highest, rate your fatigue level over the last 24 hours) </label>
                    <div className="text-center w-[50%]">            
                        <input 
                            type="range"
                            id="fatigue" 
                            min="0" 
                            max="10" 
                            className="mt-2"
                            step="1"
                            value={range_}
                            onChange={(e)=>setRange_(e.target.value)}
                        /><br/>
                        <b>{range_}</b>
                    </div>
                </div>
                <div className='mb-6'>
                    <label htmlFor="otherSymptom">Other symptoms you would like to discuss? </label>
                    <textarea id="otherSymptom" {...register('otherSymptoms')} rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-blue-700 dark:border-blue-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>
                    {errors.otherSymptoms && <p className="text-red-800">{errors.otherSymptoms.message}</p>}            
                </div>
                <div className='mb-6'>
                    <label htmlFor="concern">What are your concerns right now? </label>
                    <textarea id="concern" {...register('concern')} rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-blue-700 dark:border-blue-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>
                    {errors.concern && <p className="text-red-800">{errors.concern.message}</p>} 
                </div>
                <div className='mb-6'>
                    <label htmlFor="help">What can we help you, your family and/or caregiver with right now? </label>
                    <textarea id="help" {...register('help')} rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-blue-700 dark:border-blue-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>
                    {errors.help && <p className="text-red-800">{errors.help.message}</p>} 
                </div>

            </div>
            <div className='mb-6'>
                <label htmlFor="nutritionScreen" className='font-bold'>Nutrition Screen:</label>
                <div className="me-2 mt-2"><label htmlFor="lostWeight">1.	Have you recently lost weight without trying?</label></div>
                <div className="mt-1 mb-6">
                    <div className="mb-2">
                        <input 
                        type="radio" 
                        id="Yes4" 
                        name="lostWeight" 
                        className="me-1"
                        value="Yes4"
                        onChange={handleLostWeight}
                        />
                        <label htmlFor="Yes4">Yes</label><br/>
                    </div>
                    <div className="mb-2">
                        <input 
                        type="radio" 
                        id="No4"  
                        name="lostWeight" 
                        className="me-1"
                        value="No4"
                        onChange={handleLostWeight}
                        />
                        <label htmlFor="No4">No</label><br/>
                    </div>
                    {lostWeight && (
                        <>
                        <div className="me-2 mt-2"><label htmlFor="weightLost">How much weight have you lost?</label></div>
                        <div className="mt-1 mb-6">
                            <div className="mb-2">
                                <input 
                                type="radio" 
                                id="lb1" 
                                name="weightLost" 
                                className="me-1"
                                value="lb1"
                                />
                                <label htmlFor="lb1">2-13 lb</label><br/>
                            </div>
                            <div className="mb-2">
                                <input 
                                type="radio" 
                                id="lb2" 
                                name="weightLost" 
                                className="me-1"
                                value="lb2"
                                />
                                <label htmlFor="lb2">14-23 lb</label><br/>
                            </div>
                            <div className="mb-2">
                                <input 
                                type="radio" 
                                id="lb3" 
                                name="weightLost" 
                                className="me-1"
                                value="lb3"
                                />
                                <label htmlFor="lb3">24-33 lb</label><br/>
                            </div>
                            <div className="mb-2">
                                <input 
                                type="radio" 
                                id="lb3" 
                                name="weightLost" 
                                className="me-1"
                                value="lb3"
                                />
                                <label htmlFor="lb3">24-33 lb</label><br/>
                            </div>
                            <div className="mb-2">
                                <input 
                                type="radio" 
                                id="lb4" 
                                name="weightLost" 
                                className="me-1"
                                value="lb4"
                                />
                                <label htmlFor="lb4">34 lb</label><br/>
                            </div>
                            <div className="mb-2">
                                <input 
                                type="radio" 
                                id="unsure" 
                                name="weightLost" 
                                className="me-1"
                                value="unsure"
                                />
                                <label htmlFor="unsure2">Unsure</label><br/>
                            </div>
                        </div>
                        </>
                    )}
                </div>
                <div className="me-2 mt-2"><label htmlFor="appetite">2.	Have you been eating poorly because of a decreased appetite?</label></div>
                <div className="mt-1 mb-6">
                    <div className="mb-2">
                        <input 
                        type="radio" 
                        id="Yes5" 
                        name="appetite" 
                        className="me-1"
                        value="Yes5"
                        />
                        <label htmlFor="Yes5">Yes</label><br/>
                    </div>
                    <div className="mb-2">
                        <input 
                        type="radio" 
                        id="No5"  
                        name="appetite" 
                        className="me-1"
                        value="No5"
                        />
                        <label htmlFor="No5">No</label><br/>
                    </div>
                </div>
                             
            </div>
            <div className='mb-6'>
                <label htmlFor="nutritionScreen" className='font-bold'>Barriers to Care:</label>
                <div className="me-2"><label htmlFor="lostWeight">Please check off any of the following items that you feel could prevent you from getting the care you need.</label></div>
                <div className="relative z-0 w-full mt-3 mb-1 group flex items-center">
                    <label htmlFor="financialConcern" className='me-3'>Financial concerns:</label>
                        <input 
                            type="radio" 
                            name="financialConcern" 
                            id="Yes6" 
                            className='me-1 ms-2'
                            value="Yes6"
                            onChange={handleFinancialConcern}
                        />
                        <label htmlFor="Yes6">Yes</label>
                        <input 
                            type="radio" 
                            name="financialConcern" 
                            id="No6" 
                            className='me-1 ms-2'
                            value="No6"
                            onChange={handleFinancialConcern}
                        />
                        <label htmlFor="No6">No</label>
                </div>
                {financialConcern && (
                    <div className="mt-1 mb-6 ms-4">
                        <div className="mb-2">
                            <input 
                            type="radio" 
                            id="insurance" 
                            name="answerFC" 
                            className="me-1"
                            value="insurance"
                            />
                            <label htmlFor="insurance">High co-pays with insurance </label><br/>
                        </div>
                        <div className="mb-2">
                            <input 
                            type="radio" 
                            id="coverage"  
                            name="answerFC" 
                            className="me-1"
                            value="coverage"
                            />
                            <label htmlFor="coverage">High co-pays with medication coverage</label><br/>
                        </div>
                        <div className="mb-2">
                            <input 
                            type="radio" 
                            id="noCoverage"  
                            name="answerFC" 
                            className="me-1"
                            value="noCoverage"
                            />
                            <label htmlFor="noCoverage">No medication coverage </label><br/>
                        </div>
                        <div className="mb-2">
                            <input 
                            type="radio" 
                            id="inability"  
                            name="answerFC" 
                            className="me-1"
                            value="inability"
                            />
                            <label htmlFor="inability">Inability to pay bills</label><br/>
                        </div>
                    </div>        
                )}
                <div className="relative z-0 w-full mb-1 group flex items-center">
                    <label htmlFor="transConcern" className='me-3'>Transportation concerns:</label>
                        <input 
                            type="radio" 
                            name="transConcern" 
                            id="Yes7" 
                            className='me-1 ms-2'
                            value="Yes7"
                        />
                        <label htmlFor="Yes7">Yes</label>
                        <input 
                            type="radio" 
                            name="transConcern" 
                            id="No7" 
                            className='me-1 ms-2'
                            value="No7"
                        />
                        <label htmlFor="No7">No</label>
                </div>
                <div className="relative z-0 w-full mb-1 group flex items-center">
                    <label htmlFor="hoConcern" className='me-3'>Homeless or housing concerns:</label>
                        <input 
                            type="radio" 
                            name="hoConcern" 
                            id="Yes8" 
                            className='me-1 ms-2'
                            value="Yes8"
                        />
                        <label htmlFor="Yes8">Yes</label>
                        <input 
                            type="radio" 
                            name="hoConcern" 
                            id="No8" 
                            className='me-1 ms-2'
                            value="No8"
                        />
                        <label htmlFor="No8">No</label>
                </div>
                <div className="relative z-0 w-full mb-1 group flex items-center">
                    <label htmlFor="CECare" className='me-3'>Child/Elder care:</label>
                        <input 
                            type="radio" 
                            name="CECare" 
                            id="Yes9" 
                            className='me-1 ms-2'
                            value="Yes9"
                        />
                        <label htmlFor="Yes9">Yes</label>
                        <input 
                            type="radio" 
                            name="CECare" 
                            id="No9" 
                            className='me-1 ms-2'
                            value="No9"
                        />
                        <label htmlFor="No9">No</label>
                </div>
                <div className="relative z-0 w-full mb-1 group flex items-center">
                    <label htmlFor="interpretCare" className='me-3'>Interpretation concerns:</label>
                        <input 
                            type="radio" 
                            name="interpretCare" 
                            id="Yes10" 
                            className='me-1 ms-2'
                            value="Yes10"
                        />
                        <label htmlFor="Yes10">Yes</label>
                        <input 
                            type="radio" 
                            name="interpretCare" 
                            id="No10" 
                            className='me-1 ms-2'
                            value="No10"
                        />
                        <label htmlFor="No10">No</label>
                </div>
                <div className="relative z-0 w-full mb-1 group flex items-center">
                        <input 
                            type="checkbox"  
                            id="anotherLanguage" 
                            className='me-1 ms-2'
                            value="anotherLanguage"
                        />
                        <label htmlFor="anotherLanguage"> Speaks another language?</label>
                </div>
                <div className="relative z-0 w-full group flex items-center">
                    <label htmlFor="preferredLanguage">Preferred language:</label>
                    <input 
                        type="text" 
                        name="preferredLanguage" 
                        id="preferredLanguage" 
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " 
                        {...register('preferredLanguage')}    
                    />
                </div>
                <div className="text-center">
                    {errors.preferredLanguage && <p className="text-red-800">{errors.preferredLanguage.message}</p>}
                </div>       
            </div>    
            <div className="relative z-0 w-full mt-3 mb-1 group flex items-center">
                    <label htmlFor="culturalConcern" className='me-3'>Cultural concerns :</label>
                        <input 
                            type="radio" 
                            name="culturalConcern" 
                            id="Yes11" 
                            className='me-1 ms-2'
                            value="Yes11"
                        />
                        <label htmlFor="Yes11">Yes</label>
                        <input 
                            type="radio" 
                            name="culturalConcern" 
                            id="No11" 
                            className='me-1 ms-2'
                            value="No11"
                        />
                        <label htmlFor="No11">No</label>
            </div>    
            <div className="relative z-0 w-full mb-1 group flex items-center">
                    <label htmlFor="inability" className='me-3'>Inability to read or write :</label>
                        <input 
                            type="radio" 
                            name="inability" 
                            id="Yes12" 
                            className='me-1 ms-2'
                            value="Yes12"
                        />
                        <label htmlFor="Yes12">Yes</label>
                        <input 
                            type="radio" 
                            name="inability" 
                            id="No12" 
                            className='me-1 ms-2'
                            value="No12"
                        />
                        <label htmlFor="No12">No</label>
            </div>
            <div className="relative z-0 w-full mb-1 group flex items-center">
                    <label htmlFor="fearFatal" className='me-3'>Fear and fatalism :</label>
                        <input 
                            type="radio" 
                            name="fearFatal" 
                            id="Yes13" 
                            className='me-1 ms-2'
                            value="Yes13"
                        />
                        <label htmlFor="Yes13">Yes</label>
                        <input 
                            type="radio" 
                            name="fearFatal" 
                            id="No13" 
                            className='me-1 ms-2'
                            value="No13"
                        />
                        <label htmlFor="No13">No</label>
            </div>
            <div className="relative z-0 w-full mb-1 group flex items-center">
                    <label htmlFor="mistrut" className='me-3'>Mistrust of the health care system :</label>
                        <input 
                            type="radio" 
                            name="mistrut" 
                            id="Yes14" 
                            className='me-1 ms-2'
                            value="Yes14"
                        />
                        <label htmlFor="Yes14">Yes</label>
                        <input 
                            type="radio" 
                            name="mistrut" 
                            id="No14" 
                            className='me-1 ms-2'
                            value="No14"
                        />
                        <label htmlFor="No14">No</label>
            </div>
            <div className="relative z-0 w-full mb-1 group flex items-center">
                    <label htmlFor="misconception" className='me-3'>Misconceptions about cancer :</label>
                        <input 
                            type="radio" 
                            name="misconception" 
                            id="Yes15" 
                            className='me-1 ms-2'
                            value="Yes15"
                        />
                        <label htmlFor="Yes15">Yes</label>
                        <input 
                            type="radio" 
                            name="misconception" 
                            id="No15" 
                            className='me-1 ms-2'
                            value="No15"
                        />
                        <label htmlFor="No15">No</label>
            </div>
            <div className="relative z-0 w-full mb-1 group flex items-center">
                    <label htmlFor="lackOf" className='me-3'>Lack of knowledge regarding treatment plan :</label>
                        <input 
                            type="radio" 
                            name="lackOf" 
                            id="Yes16" 
                            className='me-1 ms-2'
                            value="Yes16"
                        />
                        <label htmlFor="Yes16">Yes</label>
                        <input 
                            type="radio" 
                            name="lackOf" 
                            id="No16" 
                            className='me-1 ms-2'
                            value="No16"
                        />
                        <label htmlFor="No16">No</label>
            </div>
            <div className="relative z-0 w-full mb-1 group flex items-center">
                    <label htmlFor="lackOfSupport" className='me-3'>Lack of support :</label>
                        <input 
                            type="radio" 
                            name="lackOfSupport" 
                            id="Yes17" 
                            className='me-1 ms-2'
                            value="Yes17"
                        />
                        <label htmlFor="Yes17">Yes</label>
                        <input 
                            type="radio" 
                            name="lackOfSupport" 
                            id="No17" 
                            className='me-1 ms-2'
                            value="No17"
                        />
                        <label htmlFor="No17">No</label>
            </div>
            <div className="relative z-0 w-full mb-1 group flex items-center">
                    <label htmlFor="painSymptom" className='me-3'>Pain or symptom management :</label>
                        <input 
                            type="radio" 
                            name="painSymptom" 
                            id="Yes18" 
                            className='me-1 ms-2'
                            value="Yes18"
                        />
                        <label htmlFor="Yes18">Yes</label>
                        <input 
                            type="radio" 
                            name="painSymptom" 
                            id="No18" 
                            className='me-1 ms-2'
                            value="No18"
                        />
                        <label htmlFor="No18">No</label>
            </div>
            <div className="relative z-0 w-full mb-1 group flex items-center">
                    <label htmlFor="healthConcerns" className='me-3'>Mental health concerns :</label>
                        <input 
                            type="radio" 
                            name="healthConcerns" 
                            id="Yes19" 
                            className='me-1 ms-2'
                            value="Yes19"
                            onChange={handleHealthConcerns}
                        />
                        <label htmlFor="Yes19">Yes</label>
                        <input 
                            type="radio" 
                            name="healthConcerns" 
                            id="No19" 
                            className='me-1 ms-2'
                            value="No19"
                            onChange={handleHealthConcerns}
                        />
                        <label htmlFor="No19">No</label>
            </div>
            {healthConcerns && (
                <div className="relative z-0 w-full mb-6 group flex items-center">
                    <label htmlFor="specify">Specify:</label>
                    <input type="text" name="specify" id="specify" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                </div>
            )}
            <div className="relative z-0 w-full mb-1 group flex items-center">
                    <label htmlFor="physicalDisability" className='me-3'>Physical Disability :</label>
                        <input 
                            type="radio" 
                            name="physicalDisability" 
                            id="Yes20" 
                            className='me-1 ms-2'
                            value="Yes20"
                            onChange={handlePhysicalDisability}
                        />
                        <label htmlFor="Yes20">Yes</label>
                        <input 
                            type="radio" 
                            name="physicalDisability" 
                            id="No20" 
                            className='me-1 ms-2'
                            value="No20"
                            onChange={handlePhysicalDisability}
                        />
                        <label htmlFor="No20">No</label>
            </div>
            {physicalDisability && (
                <div className='ms-4'>
                    <div className="mt-1 mb-6">
                        <div className="mb-2">
                            <input 
                                type="radio" 
                                id="IW" 
                                name="PD" 
                                className="me-1"
                                value="IW"
                                onChange={handlePhysDisChoice}
                            />
                            <label htmlFor="IW">Inability to walk</label><br/>
                        </div>
                        <div className="mb-2">
                            <input 
                                type="radio" 
                                id="AD"  
                                name="PD" 
                                className="me-1"
                                value="AD"
                                onChange={handlePhysDisChoice}
                            />
                            <label htmlFor="AD">Assistive Devices</label><br/>
                        </div>
                        {physDisChoice && (
                           <div className='mb-6'>
                                <label htmlFor='list'>Please list:</label>
                                <textarea id="list" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-blue-700 dark:border-blue-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>
                           </div>    
                        )}
                    </div>
                </div>
            )}
            <div className="relative z-0 w-full mb-1 group flex items-center">
                    <label htmlFor="substanceAbuse" className='me-3'>Substance Abuse :</label>
                        <input 
                            type="radio" 
                            name="substanceAbuse" 
                            id="Yes21" 
                            className='me-1 ms-2'
                            value="Yes21"
                            onChange={handleSubstanceAbuse}
                        />
                        <label htmlFor="Yes21">Yes</label>
                        <input 
                            type="radio" 
                            name="substanceAbuse" 
                            id="No21" 
                            className='me-1 ms-2'
                            value="No21"
                            onChange={handleSubstanceAbuse}
                        />
                        <label htmlFor="No21">No</label>
            </div>
            {substanceAbuse && (    
                <div className="relative z-0 w-full mb-6 group flex items-center">
                    <label htmlFor="specifyAbuse">Specify:</label>
                    <input type="text" name="specifyAbuse" id="emergencyContact" className="ms-2 block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                </div>
            )}
            <div className='mb-6'>
                <label htmlFor='list'>Others:</label>
                <textarea id="list" rows="4" {...register('other1')} class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-blue-700 dark:border-blue-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>
                {errors.other1 && <p className="text-red-800">{errors.other1.message}</p>}
            </div> 
            <div className='mb-6'>
                <label htmlFor="" className='font-bold'>Patient Education: </label>
                <div className="relative z-0 w-full mb-1 group flex items-center">
                    <label htmlFor="journalEducational" className='me-3'>Patient Treatment Journal and Educational Materials Provided: </label>
                        <input 
                            type="radio" 
                            name="journalEducational" 
                            id="Yes22" 
                            className='me-1 ms-2'
                            value="Yes22"
                            onChange={handleJournalEducational}
                        />
                        <label htmlFor="Yes22">Yes</label>
                        <input 
                            type="radio" 
                            name="journalEducational" 
                            id="No22" 
                            className='me-1 ms-2'
                            value="No22"
                            onChange={handleJournalEducational}
                        />
                        <label htmlFor="No22">No</label>
                </div>
                 {journalEducational && (
                    <div className='mb-6'>
                        <label htmlFor='educationalMaterial'>What educational materials were provided? </label>
                        <textarea id="educationalMaterial" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-blue-700 dark:border-blue-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>
                    </div> 
                 )

                 }
            </div>
            <div className='mb-6'>
                <label htmlFor="" className='font-bold'>National and Government Oncology Resources for Patients, Families and/or Caregivers:</label>
                <div className="mt-1 mb-6 ms-4">
                        <div className="mb-2">
                            <input 
                            type="radio" 
                            id="TCSC" 
                            name="ressources" 
                            className="me-1"
                            value="TCSC"
                            />
                            <label htmlFor="TCSC">The Cancer Support Community  </label><br/>
                        </div>
                        <div className="mb-2">
                            <input 
                            type="radio" 
                            id="TACS"  
                            name="ressources" 
                            className="me-1"
                            value="TACS"
                            />
                            <label htmlFor="TACS">The American Cancer Society </label><br/>
                        </div>
                        <div className="mb-2">
                            <input 
                            type="radio" 
                            id="TLLS"  
                            name="ressources" 
                            className="me-1"
                            value="TLLS"
                            />
                            <label htmlFor="TLLS">The Leukemia and Lymphoma Society </label><br/>
                        </div>
                        <div className="mb-2">
                            <input 
                            type="radio" 
                            id="NCI"  
                            name="ressources" 
                            className="me-1"
                            value="NCI"
                            />
                            <label htmlFor="NCI">National Cancer Institute </label><br/>
                        </div>
                        <div className="mb-2">
                            <input 
                            type="radio" 
                            id="NCCN"  
                            name="ressources" 
                            className="me-1"
                            value="NCCN"
                            />
                            <label htmlFor="NCCN">National Comprehensive Cancer Network </label><br/>
                        </div>
                        <div className="mb-2">
                            <input 
                            type="radio" 
                            id="CC"  
                            name="ressources" 
                            className="me-1"
                            value="CC"
                            />
                            <label htmlFor="CC">Commission on Cancer </label><br/>
                        </div>
                </div>
            </div>
            <div className='mb-6'>
                <label htmlFor="" className='font-bold'>Only ask the following questions if the patient has a Recurrent Cancer Diagnosis</label>
                <div className="relative z-0 w-full mb-1 group flex items-center">
                    <label htmlFor="goalsTreatment" className='me-3'>Do you have any questions about the goals of treatment?</label>
                        <input 
                            type="radio" 
                            name="goalsTreatment" 
                            id="Yes23" 
                            className='me-1 ms-2'
                            value="Yes23"
                            onChange={handleGoalsTreatment}
                        />
                        <label htmlFor="Yes23">Yes</label>
                        <input 
                            type="radio" 
                            name="goalsTreatment" 
                            id="No23" 
                            className='me-1 ms-2'
                            value="No23"
                            onChange={handleGoalsTreatment}
                        />
                        <label htmlFor="No23">No</label>
                </div>
                {goalsTreatment && (
                    <div className='mb-6'>
                        <textarea id="goalTreatment" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-blue-700 dark:border-blue-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>
                    </div>
                )}
                <div className="relative z-0 w-full mb-1  mt-2 group flex items-center">
                    <label htmlFor="prevCancerTreatment" className='me-3'>Are you experiencing symptoms from your previous cancer treatment?</label>
                        <input 
                            type="radio" 
                            name="prevCancerTreatment" 
                            id="Yes24" 
                            className='me-1 ms-2'
                            value="Yes24"
                            onChange={handlePrevCancerTreatment}
                        />
                        <label htmlFor="Yes24">Yes</label>
                        <input 
                            type="radio" 
                            name="prevCancerTreatment" 
                            id="No24" 
                            className='me-1 ms-2'
                            value="No24"
                            onChange={handlePrevCancerTreatment}
                        />
                        <label htmlFor="No24">No</label>
                </div>
                {prevCancerTreatment && (
                    <div className='mb-6'>
                        <label htmlFor='curentlyExperiencing'>Please tell us what symptoms you are currently experiencing </label>
                        <textarea id="curentlyExperiencing" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-blue-700 dark:border-blue-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>
                    </div>
                )}
                <div className="relative z-0 w-full mb-1  mt-2 group flex items-center">
                    <label htmlFor="diffDiagnosis" className='me-3'>Are you experiencing difficulty coping with your diagnosis?</label>
                        <input 
                            type="radio" 
                            name="diffDiagnosis" 
                            id="Yes25" 
                            className='me-1 ms-2'
                            value="Yes25"
                            onChange={handleDiffDiagnosis}
                        />
                        <label htmlFor="Yes25">Yes</label>
                        <input 
                            type="radio" 
                            name="diffDiagnosis"
                            id="No25" 
                            className='me-1 ms-2'
                            value="No25"
                            onChange={handleDiffDiagnosis}
                        />
                        <label htmlFor="No25">No</label>
                </div>
                {diffDiagnosis && (
                    <div className='mb-6'>
                        <div className="relative z-0 w-full mb-1  mt-2 group flex items-center">
                            <label htmlFor="adressConcern" className='me-3'>Would you like a referral to a provider or supportive team member to address your concerns?</label>
                                <input 
                                    type="radio" 
                                    name="adressConcern" 
                                    id="Yes26" 
                                    className='me-1 ms-2'
                                    value="Yes26"
                                    onChange={handleAdressConcern}
                                />
                                <label htmlFor="Yes26">Yes</label>
                                <input 
                                    type="radio" 
                                    name="adressConcern"
                                    id="No26" 
                                    className='me-1 ms-2'
                                    value="No26"
                                    onChange={handleAdressConcern}
                                />
                                <label htmlFor="No26">No</label>
                        </div>
                        {adressConcern && (
                            <div className="mt-1 mb-6 ms-4">
                                <label htmlFor="appropriateReferral">Please make appropriate referral to Social Work or Psychiatry</label>
                                    <div className="mb-1 mt-2">
                                        <input 
                                        type="radio" 
                                        id="RSW" 
                                        name="appropriateReferral" 
                                        className="me-1"
                                        value="RSW"
                                        />
                                        <label htmlFor="RSW">Referral to Social Worker</label><br/>
                                    </div>
                                    <div className="mb-2">
                                        <input 
                                        type="radio" 
                                        id="RP"  
                                        name="appropriateReferral" 
                                        className="me-1"
                                        value="RP"
                                        />
                                        <label htmlFor="RP">Referral to Psychiatry</label><br/>
                                    </div>
                                
                            </div>
                        )}
                    </div>
                )}

            </div>
            <div className='mb-6'>
                <label htmlFor="" className='font-bold'>Refer patients to Support Staff and Services Available at Your Cancer Program:</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2 mb-6 mt-4">
                    <div className="flex items-center">
                        <input type="checkbox" name="availableService" id="patientNavigator"/>
                        <label htmlFor="patientNavigator" className="ms-2">Patient Navigator</label>
                    </div>
                    <div className="flex items-center">
                        <input type="checkbox" name="availableService" id="geneticCounselor"/>
                        <label htmlFor="geneticCounselor" className="ms-2">Genetic Counselor</label>
                    </div>
                    <div className="flex items-center">
                        <input type="checkbox" name="availableService" id="PSM"/>
                        <label htmlFor="PSM" className="ms-2">Pain and Symptom Management</label>
                    </div>
                    <div className="flex items-center">
                        <input type="checkbox" name="availableService" id="PSM"/>
                        <label htmlFor="SW" className="ms-2">Social Worker</label>
                    </div>
                    <div className="flex items-center">
                        <input type="checkbox" name="availableService" id="PC"/>
                        <label htmlFor="PC" className="ms-2">Pastoral Care</label>
                    </div>
                    <div className="flex items-center">
                        <input type="checkbox" name="availableService" id="PaC"/>
                        <label htmlFor="PaC" className="ms-2">Palliative Care</label>
                    </div>
                    <div className="flex items-center">
                        <input type="checkbox" name="availableService" id="FA"/>
                        <label htmlFor="FA" className="ms-2">Financial Assistant</label>
                    </div>
                    <div className="flex items-center">
                        <input type="checkbox" name="availableService" id="SurvProgram"/>
                        <label htmlFor="SurvProgram" className="ms-2">Survivorship Program</label>
                    </div>
                    <div className="flex items-center">
                        <input type="checkbox" name="availableService" id="SG"/>
                        <label htmlFor="SG" className="ms-2">Support Groups</label>
                    </div>
                    <div className="flex items-center">
                        <input type="checkbox" name="availableService" id="Rdietitian"/>
                        <label htmlFor="Rdietitian" className="ms-2">Registered Dietitian</label>
                    </div>
                    <div className="flex items-center">
                        <input type="checkbox" name="availableService" id="rehabilitation"/>
                        <label htmlFor="rehabilitation" className="ms-2">Rehabilitation</label>
                    </div>
                    <div className="flex items-center">
                        <input type="checkbox" name="availableService" id="educationalPrograms"/>
                        <label htmlFor="educationalPrograms" className="ms-2">Educational programs</label>
                    </div>
                    <div className="flex items-center">
                        <input type="checkbox" name="availableService" id="PP"/>
                        <label htmlFor="PP" className="ms-2">Psychologist/Psychiatry</label>
                    </div>
                    <div className="flex items-center">
                        <input type="checkbox" name="availableService" id="WB"/>
                        <label htmlFor="WB" className="ms-2">Wig Bank</label>
                    </div>
                    <div className="flex items-center">
                        <input type="checkbox" name="availableService" id="ACS"/>
                        <label htmlFor="ACS" className="ms-2">ACS</label>
                    </div>
                </div>
                <div className="relative z-0 w-full group flex items-center">
                    <label htmlFor="Other4">Other:</label>
                    <input 
                        type="text" 
                        name="Other4" 
                        id="Other4" 
                        className="ms-2 block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                        {...register('other2')}    
                    />
                </div>
                <div className="text-center">
                    {errors.other2 && <p className="text-red-800">{errors.other2.message}</p>}
                </div>    
                <div className="relative z-0 w-full mb-1  mt-2 group flex items-center">
                    <label htmlFor="specificSupport" className='me-3'>Any specific support staff or services needed right now:</label>
                    <input 
                        type="radio" 
                        name="specificSupport" 
                        id="Yes27" 
                        className='me-1 ms-2'
                        value="Yes27"
                        onChange={handleSpecificSupport}
                    />
                    <label htmlFor="Yes27">Yes</label>
                    <input 
                        type="radio" 
                        name="specificSupport"
                        id="No27" 
                        className='me-1 ms-2'
                        value="No27"
                        onChange={handleSpecificSupport}
                    />
                    <label htmlFor="No27">No</label>
                </div>
                {specificSupport && (
                    <div className='mb-6'>
                        <label htmlFor="specifySupport">Specify:</label>
                        <textarea id="specifySupport" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-blue-700 dark:border-blue-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>
                    </div>   
                )}

            </div>
            <div className='flex items-center justify-center w-full'>
                <button type="submit" className="w-[50%] text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                    Submit
                </button>
            </div>        
        </form>            


    </div>
    
  )
}
export default GeneralForm