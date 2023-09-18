import Header from "@/components/header"
import LiverCancerForm from "@/components/Forms/formulaire_patient_liver_cancer"

function LiverCancer() {
  return (
    <div>
      <LiverCancerForm />
      <div className='flex items-center justify-center w-full'>
        <a href="/forms/liver_cancer/list_items" className="w-[45%] text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
          List Items
        </a>
      </div>
    </div>
  )
}
export default LiverCancer