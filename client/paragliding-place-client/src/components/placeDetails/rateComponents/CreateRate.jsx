import { useState } from "react";
import { TbCircleLetterA, TbCircleLetterB, TbCircleLetterC, TbCircleLetterD } from "react-icons/tb";

import { useForm } from "../../../hooks/useForm";

import { onHoverLetter } from "../../../utils/onHoverLetter";

import styles from "../rateComponents/RateComponent.module.css";

export const CreateRate = ({
    onRateSubmit,
}) => {

    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);

    const { changeHandler, onSubmit } = useForm({
    }, onRateSubmit);

    return (
        <div className={styles.ratingSystem}>
            <p className={styles.placeLabel}>Difficulty Level</p>
            <form className={styles.rateForm} onSubmit={onSubmit}>
                <label className={styles.labelRating}>

                    <input
                        type="radio"
                        name="rating"
                        value={"A"}
                        onChange={changeHandler}
                    />
                    <TbCircleLetterA className={styles.ratingLetter}
                        onClick={() => setRating("A")}
                        color={rating === "A" ? "#ffc107" : "#e4e5e9"
                            &&
                            onHoverLetter("A", hover)}
                        onMouseEnter={() => setHover("A")}
                        onMouseLeave={() => setHover(null)}
                    />
                </label>

                <label className={styles.labelRating}>

                    <input
                        type="radio"
                        name="rating"
                        value="B"
                        onChange={changeHandler}
                    />
                    <TbCircleLetterB className={styles.ratingLetter}
                        onClick={() => setRating("B")}
                        color={rating === "B" ? "#ffc107" : "#e4e5e9"
                            &&
                            onHoverLetter("B", hover)}
                        onMouseEnter={() => setHover("B")}
                        onMouseLeave={() => setHover(null)}
                    />
                </label>

                <label className={styles.labelRating}>

                    <input
                        type="radio"
                        name="rating"
                        value="C"
                        onChange={changeHandler}
                    />
                    <TbCircleLetterC className={styles.ratingLetter}
                        onClick={() => setRating("C")}
                        color={rating === "C" ? "#ffc107" : "#e4e5e9"
                            &&
                            onHoverLetter("C", hover)}
                        onMouseEnter={() => setHover("C")}
                        onMouseLeave={() => setHover(null)}
                    />
                </label>
                <label className={styles.labelRating}>

                    <input
                        type="radio"
                        name="rating"
                        value="D"
                        onChange={changeHandler}
                    />
                    <TbCircleLetterD className={styles.ratingLetter}
                        onClick={() => setRating("D")}
                        color={rating === "D" ? "#ffc107" : "#e4e5e9"
                            &&
                            onHoverLetter("D", hover)}
                        onMouseEnter={() => setHover("D")}
                        onMouseLeave={() => setHover(null)} />
                </label>

                <p className={styles.ratingParagraph}>You choose: <span className={styles.chooseRating}>{rating}</span></p>
                <input className={styles.submitRating} type="submit" value="Rate"></input>

            </form>
        </div>
    )
}