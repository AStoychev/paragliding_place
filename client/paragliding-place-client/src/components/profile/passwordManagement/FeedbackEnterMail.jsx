import { Link } from "react-router-dom"
import "../profile.modules.css"

export const FeedbackEnterMail = () => {
    return (
        <>
            <div className="container">
                <div className="twoColumGrid">
                    {/* <div className="leftSide"></div> */}
                        <div className="rightSide">
                            <div className="topAndBottom">
                                <div className="containerItem">
                                    Check your email for next step!
                                    Or 
                                    Go to <Link to="/">Home Page</Link>
                                </div>
                            </div>

                        </div>
                </div>

            </div >
        </>
    )
}