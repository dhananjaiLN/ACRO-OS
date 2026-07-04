import Header from "./Header";
import Sidebar from "./Sidebar";

import GridBackground from "../effects/GridBackground";
import GlowOverlay from "../effects/GlowOverlay";
import ScanLines from "../effects/ScanLines";
import { Outlet } from "react-router-dom";

function MainLayout({ children }) {

    return (

        <div className="min-h-screen bg-[#050816] text-white relative overflow-hidden">

            <GridBackground/>

            <GlowOverlay/>

            <ScanLines/>

            <Header/>

            <div className="flex">

                <Sidebar/>

                <main

                    className="

flex-1

p-8

overflow-y-auto

h-[calc(100vh-80px)]

"

                >

                    <Outlet />

                </main>

            </div>

        </div>

    );

}

export default MainLayout;