import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import toast,{Toaster} from 'react-hot-toast';
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import fetchUserDetails from "./utils/fetchUserDetails";

function App() {
  const dispatch = useDispatch()
  // const location = useLocation()
  

  const fetchUser = async()=>{
    const userData = await fetchUserDetails()
    dispatch(setUserDetails(userData.data))
}

 const fetchCategory = async()=>{
    try {
        dispatch(setLoadingCategory(true))
        const response = await Axios({
            ...SummaryApi.getCategory
        })
        const { data : responseData } = response

        if(responseData.success){
           dispatch(setAllCategory(responseData.data.sort((a, b) => a.name.localeCompare(b.name)))) 
        }
    } catch (error) {
        
    }finally{
      dispatch(setLoadingCategory(false))
    }
  }

useEffect(()=>{
    fetchUser()
    fetchCategory()
    // fetchSubCategory()
    // fetchCartItem()
  },[])

  return (
    <>
      <Header />
      <main className='min-h-[78vh]'>
        <Outlet />
      </main>
      <Footer />
      <Toaster/>
    </>
  );
}

export default App;
