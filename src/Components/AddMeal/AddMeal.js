import React, { useEffect, useState } from "react";
import "./AddMeal.css";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import AddFoodCard from "../../pages/Nutrition/AddFoodCard";

function AddMeal({ serverData, entireFood, setEntireFood, type, classes }) {
  return (
    <div className="addMeal">
      <div className="addMeal__typeOfMeal">
        {entireFood.map((ent, index) => (
          <div className="addMealfood__container">
            <FormControl className={classes.formControl}>
              <div
                style={{
                  fontWeight: 500,
                  fontSize: 18,
                }}
              >
                Select Meal Type
              </div>
              <InputLabel id="meal-select-label"></InputLabel>
              <Select
                labelId="meal-select-label"
                id="meal-select-label"
                value={ent.meal}
                onChange={(e) => {
                  let temp = [...entireFood];
                  temp[index].meal = e.target.value;
                  setEntireFood(temp);
                }}
              >
                <MenuItem value={"Breakfast"}>Breakfast</MenuItem>
                <MenuItem value={"Lunch"}>Lunch</MenuItem>
                <MenuItem value={"Snack"}>Snack</MenuItem>
                <MenuItem value={"Pre Workout"}>Pre Workout</MenuItem>
                <MenuItem value={"Post Workout"}>Post Workout</MenuItem>
                <MenuItem value={"Dinner"}>Dinner</MenuItem>
              </Select>
            </FormControl>

            {ent.food?.map((item, idx) => {
              return (
                <AddFoodCard
                  type={type}
                  item={item}
                  idx={idx}
                  key={idx}
                  ent={ent}
                  entireFood={entireFood}
                  index={index}
                  serverData={serverData}
                  setEntireFood={setEntireFood}
                />
              );
            })}

            <div className="foodCard__addButtons">
              <div
                className="foodCard__addfoodButton"
                onClick={() => {
                  let foodData = [...entireFood];
                  let temp = [...ent.food];
                  temp.push({
                    foodName: "",
                    proteins: 0,
                    carbs: 0,
                    fat: 0,
                    calories: 0,
                    quantity: 1,
                  });
                  foodData[index].food = temp;

                  setEntireFood(foodData);
                }}
              >
                <h3>Add Food</h3>
              </div>

              <div
                className="foodCard__addmealButton"
                onClick={() => {
                  setEntireFood([
                    ...entireFood,
                    {
                      meal: "",
                      description: "",
                      food: [
                        {
                          foodName: "",
                          quantity: 1,
                        },
                      ],
                    },
                  ]);
                }}
              >
                <h3>Add Meal</h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AddMeal;
