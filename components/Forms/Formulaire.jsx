'use client'
import {useState} from 'react';
import {useForm} from 'react-hook-form';
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from 'zod';

const schemaValidation = z.object({
    date: z.string().nonempty('Date is required').regex(/^\d{4}-\d{2}-\d{2}$/, 'Le format de la date doit être YYYY-MM-DD'),
    name: z.string().nonempty('Name is required'),
    dateOfBirth: z.string().nonempty('Date Of Birth is required').regex(/^\d{4}-\d{2}-\d{2}$/, 'Le format de la date doit être YYYY-MM-DD'), 
    address: z.string().nonempty('Address is required'),
    zipCode: z.string().nonempty('Zip Code is required'),
    phoneNumber: z.string().nonempty('Phone Number is required').regex(/^\d{10}$/, { message: 'Invalid Tel' }),
    addressEmail: z.string().email({ message: 'Invalid Email' }).optional(),
    nameReferring: z.string().nonempty('Name is required'),
    phoneMD: z.string().nonempty('Phone Number is required').regex(/^\d{10}$/, { message: 'Invalid Tel' }), 
    fax: z.string().nonempty('Fax is required'),
    dateOther_: z.string().min(1, 'Date is required').regex(/^\d{4}-\d{2}-\d{2}$/, 'Le format de la date doit être YYYY-MM-DD').optional(),
    
});

const defaultValues = () => {
    firstName: athlete?.account?.firstname || "valeur par défaut du prénom",
    lastName: athlete?.account?.lastname || "valeur par défaut du prénom",
    email: athlete?.account?.email || "valeur par défaut du prénom",
}; 

const Formulaire = () => {
  
    
    
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
    setRepBiopsy(event.target.value === 'YesBiopsy');
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
    reset
} = useForm({
    resolver: zodResolver(schemaValidation),
});

const [dataList, setDataList] = useState([]);

const onSubmit = (data) => {
   console.log(data);
   setDataList([...dataList, data]);
   reset();

};

  return (
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
                <div className="relative z-0 w-full group flex items-center">
                    <label htmlFor="states">State:</label>
                    <select id="states" name="states" className="block w-full mt-1 ms-2 py-2 border-gray-300 border rounded-md shadow-sm focus:ring focus:ring-opacity-50 focus:ring-blue-600 focus:border-blue-600">
                        <option value="new-york">New York</option>
                        <option value="alabama">Alabama</option>
                        <option value="texas">Texas</option>
                    </select>
                    
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
                <div className="relative z-0 w-full group flex items-center">
                    <label htmlFor="countries">Country:</label>
                    <select id="countries" name="countries" className="block w-full mt-1 ms-2 py-2 border-gray-300 border rounded-md shadow-sm focus:ring focus:ring-opacity-50 focus:ring-blue-600 focus:border-blue-600">
                        <option value="new-york">USA</option>
                        <option value="alabama">Canada</option>
                        <option value="texas">Mexique</option>
                    </select>
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
                            
                        />
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
                        <input type="text" {...register('fax')} name="fax" id="fax" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                    </div>
                    <div className="text-center">
                        {errors.fax && <p className="text-red-800">{errors.fax.message}</p>}
                    </div>
                </div>
            </div>

            <div className="font-bold ml-5 mb-2 mt-5"><h3>Insurance Information</h3> </div> 
            <div className="border border-slate-900">
                <div className="relative z-0 w-full mb-2 group flex items-center">
                    <label htmlFor="insurance" className="me-1">Do you have Insurance? </label>
                    <input 
                        type="radio"
                        name="answ"
                        value="yes"
                        id="yes1" 
                    />
                    <label htmlFor="yes1">Yes</label>
                    <input
                        className="ms-2" 
                        type="radio"
                        name="answ"
                        value="no"
                        id="no1" 
                    />
                    <label htmlFor="no1">No</label>
                </div>
                <div className="relative z-0 w-full mb-3 group flex items-center">
                    <label htmlFor="insurance" className="me-2">Self Play?</label>
                    <input 
                        type="radio"
                        name="answer"
                        value="yes"
                        id="yes2" 
                    />
                    <label htmlFor="yes2">Yes</label>
                    <input
                        className="ms-2" 
                        type="radio"
                        name="answer"
                        value="no"
                        id="no2" 
                    />
                    <label htmlFor="no2">No</label>
                </div>
            </div>
            <div className="font-bold ml-5 mb-2 mt-5"><h3>Reason for visit</h3> </div> 
            <div className="border border-slate-900">
                <div className="mb-2"><label htmlFor="">Please choose from answers below:</label></div>
                <div className="grid md:grid-cols-3 md:gap-6">
                    <div className="relative z-0 w-full mb-3 group flex items-center">
                        <label htmlFor="phoneMD" className="me-2">New Patient Visit:</label>
                        <input 
                            type="radio" 
                            name="rep" 
                            id="YesNP"
                        />
                        <label htmlFor="YesNP">Yes</label>
                        <input 
                            className="ms-2" 
                            type="radio" 
                            name="rep" 
                            id="NoNP"
                        />
                        <label htmlFor="NoNP">No</label>                    
                    </div>
                    <div className="relative z-0 w-full mb-3 group flex items-center">
                        <label htmlFor="phoneMD" className="me-2">Second Opinion:</label>
                        <input 
                            type="radio" 
                            name="response"  
                            id="YesSO" 
                        />
                        <label htmlFor="YesSO">Yes</label>
                        <input 
                            className="ms-2" 
                            type="radio" 
                            name="response" 
                            id="NoSO" 
                        />
                        <label htmlFor="NoSO">No</label>                    
                    </div>
                    <div className="relative z-0 w-full mb-3 group flex items-center">
                        <label htmlFor="phoneMD" className="me-2">Recurrent Cancer:</label>
                        <input 
                            type="radio" 
                            name="respRC" 
                            id="YesRC" 
                        />
                        <label htmlFor="YesRC">Yes</label>
                        <input 
                            className="ms-2" 
                            type="radio" 
                            name="respRC" 
                            id="NoRC" 
                        />
                        <label htmlFor="NoRC">No</label>                    
                    </div>
                </div>
            </div>
            <div className="font-bold ml-5 mb-2 mt-5"><h3>History of Present Illness</h3></div> 
            <div className="relative z-0 w-full mt-2 group flex items-center">
                <div className="me-2"><label htmlFor="">Did you have a biopsy perfomed?</label></div>
                <input 
                    type="radio" 
                    name="repBiopsy" 
                    id="YesBiopsy"
                    value="YesBiopsy"
                    onChange={handleBiopsyPerformed} 
                />
                <label htmlFor="YesBiopsy">Yes</label>
                <input 
                    className="ms-2"
                    type="radio" 
                    name="repBiopsy" 
                    id="NoBiopsy"
                    value="NoBiopsy"
                    onChange={handleBiopsyPerformed} 
                />
                <label htmlFor="NoBiopsy">No</label>     
            </div>
            {repBiopsy && (
                <div className="mb-6">
                    <div className="relative z-0 w-full mt-1 group flex items-center">
                        <label htmlFor="dateBiopsy">Date biopsy performed:</label>
                        <input 
                            type="date" 
                            name="dateBiopsy" 
                            id="dateBiopsy" 
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " 
                                
                        />
                    </div>
                    <div className="relative z-0 w-full mt-2 group flex items-center">
                        <label htmlFor="hospitalBiopsy">Name of hospital/institution where biopsy was performed:</label>
                        <input 
                            type="text" 
                            name="hospitalBiopsy" 
                            id="hospitalBiopsy" 
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " 
                               
                        />
                    </div>
                    <div className="me-2 mt-2"><label htmlFor="">What part of the body was the biopsy performed?</label></div>
                    <div className="mt-1 mb-6">
                            <div className="mb-2">
                                <input type="checkbox" id="colon" name="perfomed" className="me-1"/>
                                <label htmlFor="colon">Colon</label><br/>
                            </div>
                            <div className="mb-2">
                                <input type="checkbox" id="liver" name="performed" className="me-1"/>
                                <label htmlFor="liver">Liver</label><br/>
                            </div>
                            <div className="mb-2">
                                <input type="checkbox" id="lung" name="perfomed" className="me-1"/>
                                <label htmlFor="lung">Lung</label><br/>
                            </div>
                            <div className="mb-2">
                                <input type="checkbox" id="bone" name="performed" className="me-1"/>
                                <label htmlFor="bone">Bone</label><br/>
                            </div>
                            <div className="mb-2">
                                <input type="checkbox" id="lymphNode" name="performed" className="me-1"/>
                                <label htmlFor="lymphNode">Lymph Node</label><br/>
                            </div>
                            <div className="mb-1">
                                <input 
                                    type="checkbox" 
                                    id="Other" 
                                    name="performed" 
                                    className="me-1"
                                    value="Other"
                                    checked={choiceBiopsyPerformed.includes("Other")}
                                    onChange={handleChoiceBiopsyPerformed}

                                />
                                <label htmlFor="Other">Other</label><br/>
                                {choiceBiopsyPerformed.includes("Other") && (
                                    <div>
                                        <div className="relative z-0 w-full group flex items-center">
                                            <input 
                                                type="text" 
                                                name="otherBiopsy" 
                                                id="otheBiopsy" 
                                                className="ms-2 block py-2.5 px-0 w-[50%] text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " 
                                                
                                            />
                                        </div>
                                    </div>    
                                )}
                            </div>
                    </div>
                </div>
            )}

            <div className="relative z-0 w-full mt-2 group flex items-center">
                <div className="me-2"><label htmlFor="">Was labs drawn in the last 2 weeks of diagnosis? </label></div>
                <input 
                    type="radio" 
                    name="repDiagno" 
                    id="YesDiagno" 
                />
                <label htmlFor="YesDiagno">Yes</label>
                <input 
                    className="ms-2"
                    type="radio" 
                    name="repDiagno" 
                    id="NoDiagno"

                />
                <label htmlFor="NoDiagno">No</label>     
            </div>
            <div className="relative z-0 w-full mt-2 group flex items-center">
                <div className="me-2"><label htmlFor="">Was imaging studies performed?</label></div>
                <input 
                    type="radio" 
                    name="repSP" 
                    id="YesSP"
                    value="YesSP"
                    onChange={handleStudiesPerformed}  
                />
                <label htmlFor="YesSP">Yes</label>
                <input 
                    className="ms-2"
                    type="radio" 
                    name="repSP" 
                    id="NoSP"
                    value="NoSP"
                    onChange={handleStudiesPerformed} 
                />
                <label htmlFor="NoSP">No</label>     
            </div>
            {studiesPerformed && (
                <div className="mt-1 mb-6">
                        <div className="mb-2">
                            <input 
                                type="checkbox" 
                                id="ctScan" 
                                name="choiceStudiesPerfomed" 
                                className="me-1"
                                value="ctScan"
                                checked={choiceStudiesPerformed.includes("ctScan")}
                                onChange={handleChoiceStudiesPerformed}
                           />
                            <label htmlFor="ctScan">CT Scans</label><br/>
                            {choiceStudiesPerformed.includes("ctScan") && (
                                <div>
                                    <div className="relative z-0 w-full group flex items-center">
                                        <label htmlFor="dateCtScan">Date:</label>
                                        <input 
                                            type="date" 
                                            name="dateCtScan" 
                                            id="dateCtScan" 
                                            className="ms-2 block py-2.5 px-0 w-[50%] text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " 
                                                
                                        />
                                    </div>   
                                </div>    
                            )

                            }
                        </div>
                        <div className="mb-2">
                            <input 
                                type="checkbox" 
                                id="mri" 
                                name="choiceStudiesPerfomed" 
                                className="me-1"
                                value="mri"
                                checked={choiceStudiesPerformed.includes("mri")}
                                onChange={handleChoiceStudiesPerformed}
                            />
                            <label htmlFor="mri">MRI</label><br/>
                            {choiceStudiesPerformed.includes("mri") && (
                                <div>    
                                    <div className="relative z-0 w-full group flex items-center">
                                        <label htmlFor="dateMRI">Date:</label>
                                        <input 
                                            type="date" 
                                            name="dateMRI" 
                                            id="dateMRI" 
                                            className="ms-2 block py-2.5 px-0 w-[50%] text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " 
                                             
                                        />
                                    </div>
                                </div>
                            )

                            }
                        </div>
                        <div className="mb-2">
                            <input 
                                type="checkbox" 
                                id="petScan" 
                                name="choiceStudiesPerfomed" 
                                className="me-1"
                                value="petScan"
                                checked={choiceStudiesPerformed.includes("petScan")}
                                onChange={handleChoiceStudiesPerformed}
                            />
                            <label htmlFor="petScan">PET Scan</label><br/>
                            {choiceStudiesPerformed.includes("petScan") && (
                                <div>
                                    <div className="relative z-0 w-full group flex items-center">
                                        <label htmlFor="datePetScan">Date:</label>
                                        <input 
                                            type="date" 
                                            name="datePetScan" 
                                            id="datePetScan" 
                                            className="ms-2 block py-2.5 px-0 w-[50%] text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " 
                                             
                                        />
                                    </div>
                                </div>    
                            )}   
                        </div>
                        <div className="mb-2">
                            <input 
                                type="checkbox" 
                                id="endoscopy" 
                                name="choiceStudiesPerfomed" 
                                className="me-1"
                                value="endoscopy"
                                checked={choiceStudiesPerformed.includes("endoscopy")}
                                onChange={handleChoiceStudiesPerformed}
                            />
                            <label htmlFor="endoscopy">Endoscopy</label><br/>
                            {choiceStudiesPerformed.includes("endoscopy") && (
                                <div>
                                    <div className="relative z-0 w-full group flex items-center">
                                        <label htmlFor="dateEndoscopy">Date:</label>
                                        <input 
                                            type="date" 
                                            name="dateEndoscopy" 
                                            id="dateEndoscopy" 
                                            className="ms-2 block py-2.5 px-0 w-[50%] text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                            
                                        />
                                    </div> 
                                </div>
                            )}
                        </div>
                        <div className="mb-2">
                            <input 
                                type="checkbox" 
                                id="colonoscopy" 
                                name="choiceStudiesPerfomed" 
                                className="me-1"
                                value="colonoscopy"
                                checked={choiceStudiesPerformed.includes("colonoscopy")}
                                onChange={handleChoiceStudiesPerformed}
                            />
                            <label htmlFor="colonoscopy">Colonoscopy</label><br/>
                            {choiceStudiesPerformed.includes("colonoscopy") && (
                                <div>
                                    <div className="relative z-0 w-full group flex items-center">
                                        <label htmlFor="dateColonoscopy">Date:</label>
                                        <input 
                                            type="date" 
                                            name="dateColonoscopy" 
                                            id="dateColonoscopy" 
                                            className="ms-2 block py-2.5 px-0 w-[50%] text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " 
                                            
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="mb-2">
                            <input 
                                type="checkbox" 
                                id="other" 
                                name="choiceStudiesPerfomed" 
                                className="me-1"
                                value="other"
                                checked={choiceStudiesPerformed.includes("other")}
                                onChange={handleChoiceStudiesPerformed}
                            />
                            <label htmlFor="other">Other</label><br/>
                            {choiceStudiesPerformed.includes("other") && (
                                <div>
                                    <div className="relative z-0 w-full group flex items-center">
                                        <label htmlFor="dateOther">Date:</label>
                                        <input 
                                            type="date" 
                                            name="dateOther" 
                                            id="dateOther" 
                                            className="ms-2 block py-2.5 px-0 w-[50%] text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " 
                                            
                                        />
                                    </div>    
                                </div>    
                            )

                            }
                        </div>
                </div>
            )}
            <div className="relative z-0 w-full mt-2 group flex items-center">
                <div className="me-2"><label htmlFor="">Have you started treatment for your cancer?</label></div>
                <input 
                    type="radio" 
                    name="repTreatment" 
                    id="YesTreatment"
                    value="YesTreatment"
                    onChange={handleTreatmentCancer}

                />
                <label htmlFor="YesTreatment">Yes</label>
                <input 
                    className="ms-2"
                    type="radio" 
                    name="repTreatment" 
                    id="NoTreatment"
                    value="NoTreatment"
                    onChange={handleTreatmentCancer}
                />
                <label htmlFor="NoTreatment">No</label>     
            </div>
            {treatmentCancer && (
                <div className="mt mb-6">
                        <div className="mb-2">
                            <input 
                                type="checkbox" 
                                id="chemotherapy" 
                                name="choiceTreatmentCancer" 
                                className="me-1"
                                value="chemotherapy"
                                checked={choiceTreatmentCancer.includes("chemotherapy")}
                                onChange={handleChoiceTreatmentCancer}

                           />
                            <label htmlFor="chemotherapy">Chemotherapy</label><br/>
                            {choiceTreatmentCancer.includes("chemotherapy") && (
                                <div className="grid md:grid-cols-2 md:gap-6">
                                    <div classname="flex flex-col">
                                        <div className="relative z-0 w-full group flex items-center">
                                            <label htmlFor="dateStartedChemo">Date Started:</label>
                                            <input 
                                                type="date" 
                                                name="dateStartedChemo" 
                                                id="dateStartedChemo" 
                                                className="ms-2 block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " 
                                                
                                            />                   
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
                                                
                                            />
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
                                value="immunotherapy"
                                checked={choiceTreatmentCancer.includes("immunotherapy")}
                                onChange={handleChoiceTreatmentCancer}
                            />
                            <label htmlFor="immunotherapy">Immunotherapy</label><br/>
                            {choiceTreatmentCancer.includes("immunotherapy") && (
                                <div className="grid md:grid-cols-2 md:gap-6">
                                        <div classname="flex flex-col">
                                            <div className="relative z-0 w-full group flex items-center">
                                                <label htmlFor="dateStartedImmuno">Date Started:</label>
                                                <input 
                                                    type="date" 
                                                    name="dateStartedImmuno" 
                                                    id="dateStartedImmuno" 
                                                    className="ms-2 block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " 
                                                    
                                                />                   
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
                                                   
                                                />
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
                                value="radiation"
                                checked={choiceTreatmentCancer.includes("radiation")}
                                onChange={handleChoiceTreatmentCancer}
                            />
                            <label htmlFor="radiation">Radiation</label><br/>
                            {choiceTreatmentCancer.includes("radiation") && (
                                <div className="grid md:grid-cols-2 md:gap-6">
                                        <div classname="flex flex-col">
                                            <div className="relative z-0 w-full group flex items-center">
                                                <label htmlFor="dateStartedRadiation">Date Started:</label>
                                                <input 
                                                    type="date" 
                                                    name="dateStartedRadiation" 
                                                    id="dateStartedRadiation" 
                                                    className="ms-2 block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " 
                                                    
                                                />                   
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
                                                    
                                                />
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
                                value="protonTreatment"
                                checked={choiceTreatmentCancer.includes("protonTreatment")}
                                onChange={handleChoiceTreatmentCancer}
                            />
                            <label htmlFor="protonTreatment">Proton Treatment</label><br/>
                            {choiceTreatmentCancer.includes("protonTreatment") && (
                                <div className="grid md:grid-cols-2 md:gap-6">
                                        <div classname="flex flex-col">
                                            <div className="relative z-0 w-full group flex items-center">
                                                <label htmlFor="dateStartedProtonTreatment">Date Started:</label>
                                                <input 
                                                    type="date" 
                                                    name="dateStartedProtonTreatment" 
                                                    id="dateStartedProtonTreatment" 
                                                    className="ms-2 block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " 
                                                    
                                                />                   
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
                                                    
                                                />
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
                                value="surgery"
                                checked={choiceTreatmentCancer.includes("surgery")}
                                onChange={handleChoiceTreatmentCancer}
                            />
                            <label htmlFor="surgery">Surgery</label><br/>
                            {choiceTreatmentCancer.includes("surgery") && (
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
                                        </div>
                                        <div className="flex flex-col">
                                            <div className="relative z-0 w-full group flex items-center">
                                                <label htmlFor="dateEndSurgery">Date End:</label>
                                                <input 
                                                    type="date" 
                                                    name="dateEndSurgery" 
                                                    id="dateEndSurgery" 
                                                    className="ms-2 block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " 
                                                    
                                                />
                                            </div>
                                        </div>
                                    
                                </div>

                            )}
                        </div>
                        
                </div>
            )}
            <div className="mt-2">
                <div className='mb-1'>Chose from below procedure/surgical procedure if performed</div>
                        <div className="mb-2">
                            <input 
                                type="checkbox" 
                                id="RAL" 
                                name="choiceStudiesPerfomed" 
                                className="me-1"
                                value="RAL"
                                checked={choiceStudiesPerformed.includes("RAL")}
                                onChange={handleChoiceStudiesPerformed}

                           />
                            <label htmlFor="RAL">Radiofrequency Ablation of liver</label><br/>
                            {choiceStudiesPerformed.includes("RAL") && (
                                <div>
                                    <div className="relative z-0 w-full group flex items-center">
                                        <label htmlFor="dateRAL">Date:</label>
                                        <input 
                                            type="date" 
                                            name="dateRAL" 
                                            id="dateRAL" 
                                            className="ms-2 block py-2.5 px-0 w-[50%] text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " 
                                            
                                        />
                                    </div>   
                                </div>    
                            )

                            }
                        </div>
                        <div className="mb-2">
                            <input 
                                type="checkbox" 
                                id="CE" 
                                name="choiceStudiesPerfomed" 
                                className="me-1"
                                value="CE"
                                checked={choiceStudiesPerformed.includes("CE")}
                                onChange={handleChoiceStudiesPerformed}
                            />
                            <label htmlFor="CE">Chemo Embolization</label><br/>
                            {choiceStudiesPerformed.includes("CE") && (
                                <div>
                                    <div className="relative z-0 w-full group flex items-center">
                                        <label htmlFor="dateCE">Date:</label>
                                        <input 
                                            type="date" 
                                            name="dateCE" 
                                            id="dateCE" 
                                            className="ms-2 block py-2.5 px-0 w-[50%] text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " 
                                            
                                        />
                                    </div>   
                                </div>
                            )

                            }
                        </div>
                        <div className="mb-2">
                            <input 
                                type="checkbox" 
                                id="YMT" 
                                name="choiceStudiesPerfomed" 
                                className="me-1"
                                value="YMT"
                                checked={choiceStudiesPerformed.includes("YMT")}
                                onChange={handleChoiceStudiesPerformed}
                            />
                            <label htmlFor="YMT">Y-90 Microsphere Therapy</label><br/>
                            {choiceStudiesPerformed.includes("YMT") && (
                                <div>
                                    <div className="relative z-0 w-full group flex items-center">
                                        <label htmlFor="dateYMT">Date:</label>
                                        <input 
                                            type="date" 
                                            name="dateYMT" 
                                            id="dateYMT" 
                                            className="ms-2 block py-2.5 px-0 w-[50%] text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " 
                                            
                                        />
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
                                value="other_"
                                checked={choiceStudiesPerformed.includes("other_")}
                                onChange={handleChoiceStudiesPerformed}
                            />
                            <label htmlFor="other_">Other</label><br/>
                            {choiceStudiesPerformed.includes("other_") && (
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
                            )

                            }
                        </div>
            </div>
            <div className='flex items-center justify-center w-full mt-6'>
                <button type="submit" className="w-[50%] text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                    Submit
                </button>
            </div>

        </form>
        
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <div className="ml-3">
                <h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">Details:</h2>
                
                {dataList.map((data, index) => (
                <ul key={index} className="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
                    <li>
                        {data.date}
                    </li>
                    <li>
                        {data.name}
                    </li>
                    <li>
                        {data.dateOfBirth}
                    </li><br />
                </ul>
              ))}           
            </div>                
        </div>


    </div>

  )
}
export default Formulaire