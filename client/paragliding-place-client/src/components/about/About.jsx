import "./About.modules.css"

export const About = () => {
   return (
      <div className="service">
         <div className="containers">
         <h2 className="headerAbout">About</h2>
            {/* <div className="row">
               <div className="col-md-12">
                  <div className="titlepage">
                     <h2 className="headerAbout">About <span className="green">Application</span></h2>
                  </div>
               </div>
            </div> */}
            <div className="row">
               <div className="col-md-13 offset-md-1" style={{marginLeft: "3%"}}>
                  <div className="row">
                     <div className="col-md-5 col-sm-6">
                        <div className="service_box">
                           <h3>SpotFly<i><img src="images/routes.png" alt="#"/></i></h3>
                           <p>
                              SpotFly is web application who is created to help a junior paragliding pilot, but not only,
                              to find suitable place for their first fligt without instructor to guide them. In this application
                              you can find information about where is the launch and landing zone, coordinates, description,
                              difficulty level of the place, wing direction for launch.
                           </p>
                        </div>
                     </div>
                     <div className="col-md-5 offset-md-1 col-sm-6">
                        <div className="service_box">
                           <h3>Idea<i><img className="idea" src="images/idea-about.png" alt="#" /></i> </h3>
                           <p>
                              As a pilot with not much experience I never knew whether a place was suitable ot nor, what its a 
                              characteristics to the place, what wind direction is suitable for launch. So I decide to develop this application
                              and of course it's one of my biggest project at the moment in the field of web development. In addition to information
                              about the place, you can also vote about difficulty level on place according to your experience and leave your comment. And of course if you
                              know or find a new place to practice our beautiful sport, don't hesitate to share it with us.
                           </p>
                        </div>
                     </div>
                     <div className="col-md-5 offset-md-1 col-sm-6 mar_top" style={{marginLeft: "5%"}}>
                        <div className="service_box">
                           <h3>About Launch<i><img src="images/launch.png" alt="#" /></i></h3>
                           <p>
                              The icon of Launch show you place where you can start your flight. When you see on the map, you can click on details
                              to see more information about the chosen place. After your flight you can comment the place and give a opinion or description
                              about you fligh. You can point out features of the place that would help future visitors.
                           </p>
                        </div>
                     </div>
                     <div className="col-md-5 offset-md-1 col-sm-6 mar_top">
                        <div className="service_box">
                           <h3>About Landing<i><img src="images/landing.png" alt="#" /></i></h3>
                           <p>
                              The icon of Landing show you place where can landing after start yout flight. When you see this icon on the map, you 
                              can click on details and also can see information about the chosen place. After your flight you can leave comment about the
                              flight and its features. If you find a more suitable landing spot, pleas feel free to share in the comment and we'll mark 
                              the spot on the map.
                           </p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}