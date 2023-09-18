'use client'
import { useState } from "react";
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function Header() {
    const router = useRouter();
    const [selectedOption, setSelectedOption] = useState('');

    const handleOptionChange = (event) => {
        const selectedValue = event.target.value
        setSelectedOption(selectedValue);
        toast(`Option ${selectedValue} choisi`, { 
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
        router.push(`/forms/${selectedValue}`);
        
    };

    return (
        <div>

            <section class="bg-white dark:bg-gray-900 bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern.svg')] dark:bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern-dark.svg')]">
                <div class="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 z-10 relative">
                    <h1 class="mb-4 mt-6 text-4xl font-extrabold tracking-tight leading-none text-blue-700 md:text-5xl lg:text-6xl dark:text-white">Medical Test form</h1>
                    <p class="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-200">Please select and fill in the fields proposed at the level of each form.</p>
                    <form class="w-full max-w-md mx-auto">
                        <label for="default-email" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Email sign-up</label>
                        <div class="relative rounded-full justify-center items-center">
                            <select value={selectedOption} onChange={handleOptionChange} id="underline_select" className="text-blue-700 bg-blue-100 pl-4 rounded-full text-base font-bold block py-2.5 px-0 w-full  bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer">
                                <option selected>Select a form</option>
                                <option value="colon_cancer">Colon Cancer</option>
                                <option value="breast">Breast</option>
                                <option value="head_and_neck">Head and Neck</option>
                                <option value="liver_cancer">Liver Cancer</option>
                                <option value="pancreatic">Pancreatic</option>
                            </select>
                            <ToastContainer/>
                        </div>
                    </form>
                </div>
                <div class="bg-gradient-to-b from-blue-50 to-transparent dark:from-blue-900 w-full h-full absolute top-0 left-0 z-0"></div>
            </section>


        </div>
    )
}
export default Header