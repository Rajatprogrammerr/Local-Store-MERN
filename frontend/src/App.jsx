import { Route, Routes } from "react-router-dom"
import MainPage from "./pages/MainPage"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import CreatePage from "./pages/CreatePage"
import { Toaster } from "react-hot-toast"
import UpdatePage from "./pages/UpdatePage"


function App() {


  return (
    <>
      <div className=" fixed top-0 w-full z-10">
        <Navbar />
      </div>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/update/:id" element={<UpdatePage />} />

      </Routes>
      
        
      {/* <Footer /> */}
    
      <Toaster />
    </>
  )
}

export default App
