import { TbCircleLetterA, TbCircleLetterB, TbCircleLetterC, TbCircleLetterD } from "react-icons/tb";

import './createEditPlace.modules.css';

export const RatingSystem = ({
    values,
    changeHandler,
    onRatingChange,
    setRating,
}) => {

    return (
        <div className="ratingContainer">
            <label className="labelRating" onChange={changeHandler} >
                <input
                    type="radio"
                    name="rating"
                    value={values.difficulty_level}
                    onChange={onRatingChange}
                />
                <TbCircleLetterA className="ratingLetter" onClick={() => setRating("A")} color={values.difficulty_level === "A" ? "#ffc107" : "#e4e5e9"} />
            </label>
            <label className="labelRating" onChange={changeHandler} >
                <input
                    type="radio"
                    name="rating"
                    value={values.difficulty_level}
                    onChange={onRatingChange}
                />
                <TbCircleLetterB className="ratingLetter" onClick={() => setRating("B")} color={values.difficulty_level === "B" ? "#ffc107" : "#e4e5e9"} />
            </label>
            <label className="labelRating" onChange={changeHandler} >
                <input
                    type="radio"
                    name="rating"
                    value={values.difficulty_level}
                    onChange={onRatingChange}
                />
                <TbCircleLetterC className="ratingLetter" onClick={() => setRating("C")} color={values.difficulty_level === "C" ? "#ffc107" : "#e4e5e9"} />
            </label>
            <label className="labelRating" onChange={changeHandler} >
                <input
                    type="radio"
                    name="rating"
                    value={values.difficulty_level}
                    onChange={onRatingChange}
                />
                <TbCircleLetterD className="ratingLetter" onClick={() => setRating("D")} color={values.difficulty_level === "D" ? "#ffc107" : "#e4e5e9"} />
            </label>
        </div>
    )
}



















{/* <TbCircleLetterA className={styles.ratingLetter} onClick={() => setRating("A")} color={"A" <= (hover || rating) ? "#ffc107" : "#e4e5e9"} onMouseEnter={() => setHover("A")} onMouseLeave={() => setHover(null)} /> */ }