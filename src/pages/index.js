import Footer from "@/component/Footer";
import Nav from "@/component/Nav";
import React from "react";
import HomeImg from "./homeImg/HomeIng";
import Categories from "./category/Categories";
import Color from "./Color/Color";
import Shop_size from "./Shop_size/Shop_size";
import Story from "./Story/Story";
import Customize from "./CustomizeHome/Customize";
import Video from "./Video/Video";
import Blog from "./Blog/Blog";
export default function Home() {
  return (
    <>
   <Nav/>
   <HomeImg/>
   <Categories/>
   <Color/>
   <Shop_size/>
   <Story/>
   <Customize/>
   <Video/>
   <Blog/>
   <Footer/>
    </>
  );
}
