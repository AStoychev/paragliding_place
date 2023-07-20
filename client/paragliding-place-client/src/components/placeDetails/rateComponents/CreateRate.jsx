import { useState } from "react";
import { TbCircleLetterA, TbCircleLetterB, TbCircleLetterC, TbCircleLetterD } from "react-icons/tb";

import { useForm } from "../../../hooks/useForm";

import styles from "../rateComponents/CreateRate.modules.css";

export const CreateRate = ({
    onRateSubmit,
}) => {

    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);

    const {changeHandler, onSubmit } = useForm({
    }, onRateSubmit);

    return (
        <div className="ratingContainer">
            <form onSubmit={onSubmit}>
                <label className="labelRating">

                    <input
                        type="radio"
                        name="rating"
                        value={"A"}
                        onChange={changeHandler}
                    />
                    <TbCircleLetterA className="ratingLetter" onClick={() => setRating("A")} color={"A" <= (hover || rating) ? "#ffc107" : "#e4e5e9"} onMouseEnter={() => setHover("A")} onMouseLeave={() => setHover(null)} />

                    <label className="labelRating">

                        <input
                            type="radio"
                            name="rating"
                            value="B"
                            onChange={changeHandler}
                        />
                        <TbCircleLetterB className="ratingLetter" onClick={() => setRating("B")} color={"B" <= (hover || rating) ? "#ffc107" : "#e4e5e9"} onMouseEnter={() => setHover("B")} onMouseLeave={() => setHover(null)} />
                    </label>

                    <label className="labelRating">

                        <input
                            type="radio"
                            name="rating"
                            value="C"
                            onChange={changeHandler}
                        />
                        <TbCircleLetterC className="ratingLetter" onClick={() => setRating("C")} color={"C" <= (hover || rating) ? "#ffc107" : "#e4e5e9"} onMouseEnter={() => setHover("C")} onMouseLeave={() => setHover(null)} />
                    </label>
                    <label className="labelRating">

                        <input
                            type="radio"
                            name="rating"
                            value="D"
                            onChange={changeHandler}
                        />
                        <TbCircleLetterD className="ratingLetter" onClick={() => setRating("D")} color={"D" <= (hover || rating) ? "#ffc107" : "#e4e5e9"} onMouseEnter={() => setHover("D")} onMouseLeave={() => setHover(null)} />
                    </label>

                    <p className="ratingParagraph">You choose: <span className="chooseRating">{rating}</span></p>
                    <input className="submitRating" type="submit" value="Rate"></input>

                </label>
            </form>
        </div>
    )
}