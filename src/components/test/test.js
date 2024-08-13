import React from "react"; 
import { TitlePage } from "../templates/templates"; 
const Test= ({MenuCollapse,theme,logo}) => {
   return(
       <div className={!MenuCollapse ? "content" : "contentCollapse"}>
           <TitlePage theme={theme} title="Test"/>
           <div className="card shadow">
               <div className="card-body">
                   Lorem ipsum dolor sit amet consectetur, adipisicing elit. Possimus vero eum unde cum reprehenderit nulla corrupti? Sed maxime voluptatem nam voluptatum velit nobis nisi. Error quam ipsum, iusto vel culpa velit, sunt maiores architecto eligendi ratione numquam neque explicabo similique quibusdam saepe. Culpa at fugit ut in aut exercitationem praesentium sed. Sint nam explicabo cumque amet veniam. Nam explicabo deserunt ab, dolores facere reiciendis debitis quis. At est reiciendis totam, laboriosam tenetur voluptate reprehenderit a, similique ducimus culpa libero veritatis, facere provident nobis! Veritatis iure consectetur voluptate eveniet vel repudiandae doloremque corporis culpa amet quia. Odit porro facilis natus magnam.
               </div>
           </div>
       </div>
   );
};
export default Test;