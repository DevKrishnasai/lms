import React from "react";
import "./custom.css";
import Link from "next/link";
// <section className="page_404 h-screen">
//   <div className="container">
//     <div className="row">
//       <div className="col-sm-12 ">
//         <div className="col-sm-10 col-sm-offset-1  text-center">
//           <div className="four_zero_four_bg">
//             <h1 className="text-center text-black">404</h1>
//           </div>

//           <div className="contant_box_404">
//             <h3 className="h2">Look like you're lost</h3>

//             <p>the page you are looking for not avaible!</p>

//             <Link href="/courses" className="link_404">
//               Go to Home
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
// </section>

const NotFound = () => {
  return (
    <main className="bl_page404">
      <h1>Error 404. The page does not exist</h1>
      <p>
        Sorry! The page you are looking for can not be found. Perhaps the page
        you requested was moved or deleted. It is also possible that you made a
        small typo when entering the address. Go to the main page.
      </p>
      <div className="bl_page404__wrapper">
        <img
          src="https://github.com/BlackStar1991/Pictures-for-sharing-/blob/master/404/bigBoom/cloud_warmcasino.png?raw=true"
          alt="cloud_warmcasino.png"
        />
        <div className="bl_page404__el1"></div>
        <div className="bl_page404__el2"></div>
        <div className="bl_page404__el3"></div>
        <Link className="bl_page404__link" href="/">
          go home
        </Link>
      </div>
    </main>
  );
};

export default NotFound;
