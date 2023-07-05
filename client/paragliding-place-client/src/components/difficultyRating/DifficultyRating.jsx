import { useState } from "react"
import { TbCircleLetterA, TbCircleLetterB, TbCircleLetterC, TbCircleLetterD } from "react-icons/tb";

import styles from "./DifficultyRating.module.css"

export const DifficultyRating = () => {

    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);

    return (
        <div className={styles.ratingContainer}>
                <label className={styles.labelRating} >
                    <input
                        type="radio"
                        name="rating"
                    />
                    <TbCircleLetterA className={styles.ratingLetter} onClick={() => setRating("A")} color={"A" <= (hover || rating) ? "#ffc107" : "#e4e5e9"} onMouseEnter={() => setHover("A")} onMouseLeave={() => setHover(null)}/>
                    <TbCircleLetterB className={styles.ratingLetter} onClick={() => setRating("B")} color={"B" <= (hover || rating) ? "#ffc107" : "#e4e5e9"} onMouseEnter={() => setHover("B")} onMouseLeave={() => setHover(null)}/>
                    <TbCircleLetterC className={styles.ratingLetter} onClick={() => setRating("C")} color={"C" <= (hover || rating) ? "#ffc107" : "#e4e5e9"} onMouseEnter={() => setHover("C")} onMouseLeave={() => setHover(null)}/>
                    <TbCircleLetterD className={styles.ratingLetter} onClick={() => setRating("D")} color={"D" <= (hover || rating) ? "#ffc107" : "#e4e5e9"} onMouseEnter={() => setHover("D")} onMouseLeave={() => setHover(null)}/>
                </label>
                <p className={styles.ratingParagraph}>Your rating is: <span className={styles.chooseRating}>{rating}</span></p>
            </div>
    )
}