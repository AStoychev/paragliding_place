// export const rateComponentCreatePlace = ({
//     onRatingChange,
//     value,
// }) => {
//     return (
//         < div className={styles.ratingContainer} >

//             <label className={styles.labelRating} onChange={changeHandler} >
//                 <input
//                     type="radio"
//                     name="rating"
//                     value={values.difficulty_level}
//                     onChange={onRatingChange}
//                 />
//                 <TbCircleLetterA className={styles.ratingLetter} onClick={() => setRating("A")} color={"A" <= (hover || rating) ? "#ffc107" : "#e4e5e9"} onMouseEnter={() => setHover("A")} onMouseLeave={() => setHover(null)} />
//             </label>
//             <label className={styles.labelRating} onChange={changeHandler} >
//                 <input
//                     type="radio"
//                     name="rating"
//                     value={values.difficulty_level}
//                     onChange={onRatingChange}
//                 />
//                 <TbCircleLetterB className={styles.ratingLetter} onClick={() => setRating("B")} color={"B" <= (hover || rating) ? "#ffc107" : "#e4e5e9"} onMouseEnter={() => setHover("B")} onMouseLeave={() => setHover(null)} />
//             </label>
//             <label className={styles.labelRating} onChange={changeHandler} >
//                 <input
//                     type="radio"
//                     name="rating"
//                     value={values.difficulty_level}
//                     onChange={onRatingChange}
//                 />
//                 <TbCircleLetterC className={styles.ratingLetter} onClick={() => setRating("C")} color={"C" <= (hover || rating) ? "#ffc107" : "#e4e5e9"} onMouseEnter={() => setHover("C")} onMouseLeave={() => setHover(null)} />
//             </label>
//             <label className={styles.labelRating} onChange={changeHandler} >
//                 <input
//                     type="radio"
//                     name="rating"
//                     value={values.difficulty_level}
//                     onChange={onRatingChange}
//                 />
//                 <TbCircleLetterD className={styles.ratingLetter} onClick={() => setRating("D")} color={"D" <= (hover || rating) ? "#ffc107" : "#e4e5e9"} onMouseEnter={() => setHover("D")} onMouseLeave={() => setHover(null)} />
//             </label>
//         </div >
//     )
// }