import Nav from "@/component/Nav";
import Footer from "@/component/Footer";
import BlogView from "./BlogView";
import Blog_cart from "./Blog_cart";
export default function Blog(params) {
    return(
        <>
        <Nav/>
        {/* <BlogView/> */}
        <Blog_cart/>
        <Footer/>
        </>
    );
}