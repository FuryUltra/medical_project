'use client'
import { useParams } from "next/navigation"
import { useState, useEffect } from "react";

function EditPatientForm() {
    const [blogs, setBlogs] = useState(
        { title: "MacBook 60", description:"A Good PC with a good price", id: 1},
        { title: "Shoes", description:"A Good Shoes with a good price", id: 2},
        { title: "Cell Phone", description:"A Good Phone with a good price", id: 3},
    );

    return (
        <div className="ml-20 mr-20 mt-5 mb-5 bg-slate-25">
            <div className="text-slate-400 text-center text-xl pt-10">EPNIA Patient Intake Form: Primary Colon Cancer</div>
            {blogs.map((item) => {
                <div key={item.id}>
                    {item.title} <br/>
                    {item.description}
                </div>
            })

            }
        </div>
    )
}
export default EditPatientForm