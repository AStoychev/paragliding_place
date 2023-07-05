import { useState } from "react"
import { DifficultyRating } from "../difficultyRating/DifficultyRating"

import styles from "./profile.modules.css"

export const Profile = () => {

    // const [rate, setRace] = useState("A")

    // const rateLevel = (rating) => {
    //     console.log(1111111, rating)
    //     setRace(rating)

    // }

    const isOwner = (placeOwner, ownerId) => {
        if (placeOwner === ownerId) {
            return true
        }
    }

    // console.log(rate)

    return (
        <>
            <div className="container">
                <div className="twoColumGrid">
                    <div className="rightSide">
                        <div className="topAndBottom">
                            <div>
                                <div className="itemDirection">
                                    <h1>
                                        Profile Name
                                    </h1>
                                </div>
                            </div>
                            <div className="containerItem">

                                <div className="item">
                                    <h3>Launch Coordinates</h3>
                                    <p>Latitude: </p>
                                    <p>Longitute:</p>
                                    <h3>Description</h3>
                                    <p></p>
                                </div>

                                <div className="item">
                                    <h3>Landing Coordinates</h3>
                                    <p>Latitude: </p>
                                    <p>Longitute:</p>
                                    <h3>Description</h3>
                                    <p></p>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>

            </div >

            {/* levels = {
                Beginner
                Novice
                Intermediate
                Advanced
            } */}

            <DifficultyRating />


            {/* <div className="ratingContainer">
                <label className="labelRating" >
                    <input
                        type="radio"
                        name="rating"
                    />
                    <TbCircleLetterA className="ratingLetter" onClick={() => setRating("A")} color={"A" <= (hover || rating) ? "#ffc107" : "#e4e5e9"} onMouseEnter={() => setHover("A")} onMouseLeave={() => setHover(null)}/>
                    <TbCircleLetterB className="ratingLetter" onClick={() => setRating("B")} color={"B" <= (hover || rating) ? "#ffc107" : "#e4e5e9"} onMouseEnter={() => setHover("B")} onMouseLeave={() => setHover(null)}/>
                    <TbCircleLetterC className="ratingLetter" onClick={() => setRating("C")} color={"C" <= (hover || rating) ? "#ffc107" : "#e4e5e9"} onMouseEnter={() => setHover("C")} onMouseLeave={() => setHover(null)}/>
                    <TbCircleLetterD className="ratingLetter" onClick={() => setRating("D")} color={"D" <= (hover || rating) ? "#ffc107" : "#e4e5e9"} onMouseEnter={() => setHover("D")} onMouseLeave={() => setHover(null)}/>
                </label>
                <p className="ratingParagraph">Your rating is: <span className="chooseRating">{rating}</span></p>
            </div> */}


        </>
    )
}