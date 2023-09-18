'use client'
import PatientForm from '../components/Forms/formulaire_patient_colon_cancer'
import GeneralForm from '../components/Forms/formulaire_general'
import FormTest from '../components/Forms/FormTest'
import MyForm from '../components/Forms/EmptyForm'
import PancreaticForm from '../components/Forms/formulaire_patient_pancreatic'
import LiverCancerForm from '../components/Forms/formulaire_patient_liver_cancer'
import BreastForm from '../components/Forms/formulaire_patient_breast'
import HeadNeckForm from '../components/Forms/formulaire_patient_head_and_neck'
import EditPatientForm from '../components/Forms/formulaire_edit_patient_colon_cancer'
import Header from '../components/header'
import { useRouter } from 'next/navigation'
import Link from 'next/link'


export default function Home() {
  return (
    <div>
      <Header/>
    </div>

  )
}
