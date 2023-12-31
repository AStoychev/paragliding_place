import { useState } from "react";

import { onHoverLetter } from "../onHoverLetter";
import { TbCircleLetterA, TbCircleLetterB, TbCircleLetterC, TbCircleLetterD } from "react-icons/tb";

import styles from './createEditPlace.module.css';

export const RatingSystemCreate = ({
    values,
    changeHandler,
    onRatingChange,
    setRating,
}) => {

    const [hover, setHover] = useState(null);

    return (
        <div className={styles.ratingContainerCreate}>
            <label className={styles.labelRating} onChange={changeHandler} >
                <input
                    type="radio"
                    name="rating"
                    value={values.difficulty_level}
                    onChange={onRatingChange}
                />
                <TbCircleLetterA
                    className={styles.ratingLetter}
                    onClick={() => setRating("A")}
                    color={values.difficulty_level === "A" ? "#ffc107" : "#e4e5e9"
                        &&
                        onHoverLetter("A", hover)}
                    onMouseEnter={() => setHover("A")}
                    onMouseLeave={() => setHover(null)}
                />
            </label>
            <label className={styles.labelRating} onChange={changeHandler} >
                <input
                    type="radio"
                    name="rating"
                    value={values.difficulty_level}
                    onChange={onRatingChange}
                />
                <TbCircleLetterB
                    className={styles.ratingLetter}
                    onClick={() => setRating("B")}
                    color={values.difficulty_level === "B" ? "#ffc107" : "#e4e5e9"
                        &&
                        onHoverLetter("B", hover)}
                    onMouseEnter={() => setHover("B")}
                    onMouseLeave={() => setHover(null)}
                />
            </label>
            <label className={styles.labelRating} onChange={changeHandler} >
                <input
                    type="radio"
                    name="rating"
                    value={values.difficulty_level}
                    onChange={onRatingChange}
                />
                <TbCircleLetterC
                    className={styles.ratingLetter}
                    onClick={() => setRating("C")}
                    color={values.difficulty_level === "C" ? "#ffc107" : "#e4e5e9"
                        &&
                        onHoverLetter("C", hover)}
                    onMouseEnter={() => setHover("C")}
                    onMouseLeave={() => setHover(null)}
                />
            </label>
            <label className={styles.labelRating} onChange={changeHandler} >
                <input
                    type="radio"
                    name="rating"
                    value={values.difficulty_level}
                    onChange={onRatingChange}
                />
                <TbCircleLetterD
                    className={styles.ratingLetter}
                    onClick={() => setRating("D")}
                    color={values.difficulty_level === "D" ? "#ffc107" : "#e4e5e9"
                    &&
                    onHoverLetter("D", hover)}
                    onMouseEnter={() => setHover("D")}
                    onMouseLeave={() => setHover(null)}
                    />
            </label>
        </div>
    )
}



















{/* <TbCircleLetterA className={styles.ratingLetter} onClick={() => setRating("A")} color={"A" <= (hover || rating) ? "#ffc107" : "#e4e5e9"} onMouseEnter={() => setHover("A")} onMouseLeave={() => setHover(null)} /> */ }