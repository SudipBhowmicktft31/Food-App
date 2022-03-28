import React from "react";
import MealSummary from "./MealSummary";
import AvailableMeals from "./AvailableMeals";
import { Fragment } from "react/cjs/react.production.min";

const Meals=()=>{
    return <Fragment>
        <MealSummary/>
        <AvailableMeals/>
    </Fragment>
}
export default Meals;