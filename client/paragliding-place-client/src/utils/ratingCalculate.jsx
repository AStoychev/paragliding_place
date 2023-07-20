import { inPercentage } from "../validators/validators";

export const ratingCalculate = (place, placeId, userId) => {
    let alreadyRate = false
    let rate = "";
    let rateA = 0;
    let rateB = 0;
    let rateC = 0;
    let rateD = 0;

    place.rate && place.rate.map(x => {

        if (x.place_id_rating === placeId) {

            if (x.user_id === userId) {
                rate = x.rating
                alreadyRate = true
            }

            // rate.push(x.rating)
            if (x.rating === "A") {
                rateA += 1
            } else if (x.rating === "B") {
                rateB += 1
            } else if (x.rating === "C") {
                rateC += 1
            } else if (x.rating === "D") {
                rateD += 1
            }
        }
    })

    let allPeopleRate = rateA + rateB + rateC + rateD
    // let digits = [rateA, rateB, rateC, rateD]
    // let maxDigit = digits.indexOf(Math.max(...digits))
    // let maxRate = digits[maxDigit]

    rateA = inPercentage(rateA, allPeopleRate);
    rateB = inPercentage(rateB, allPeopleRate);
    rateC = inPercentage(rateC, allPeopleRate);
    rateD = inPercentage(rateD, allPeopleRate);

    return [rateA, rateB, rateC, rateD, alreadyRate, rate]
}