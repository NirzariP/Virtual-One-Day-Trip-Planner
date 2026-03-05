import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Page2 from "./pages/Page-2";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import { ChakraProvider } from "@chakra-ui/react";
import Plans from "./pages/Plans";
import Customize from "./pages/Customize";
import EditPlan from "./pages/EditPlan";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import UserInterest from "./pages/UserInterest";
import UserInterest2 from "./pages/UserInterest2";
import Carousel from "./pages/Carousel";
import Favorites from "./pages/Favorites";

function App() {
    return (
        <ChakraProvider>
        <BrowserRouter>
            <Routes>
                <Route path="/home" element={<Dashboard />}/>
                <Route path="/carousel" element={<Carousel />}/>
                <Route path="/" element={<Signup />}/>
                <Route path="/signin" element={<Signin />}/>
                <Route path="/userInterest" element={<UserInterest />}/>
                <Route path="/userInterest2" element={<UserInterest2 />}/>
                <Route path="/plans" element={<Plans/>}/>
                <Route path="/customize" element={<Customize/>}/>
                <Route path='/editplan' element={<EditPlan />}/>
                <Route path='/favorites' element={<Favorites />}/>
                <Route element={<NotFound/>}/>
            </Routes>
        </BrowserRouter>
        </ChakraProvider>
    )
}

export default App;