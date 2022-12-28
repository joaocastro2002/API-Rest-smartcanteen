/**
 * @module editMealService
 */
require('dotenv').config();
import { createClient } from "../../../config/db";
import { IMeal } from "../../../models/IMeal";
import { IMealAllowedChange } from "../../../models/IMealAllowedChanges";
import { checkMealExists, checkMealExistsBar, getEmployeeBar, getMealBar } from "../../../validations/employee/meal/editMealValidation";

/**
 * Class responsible for the service that serves to edit the data of a meal
 */
export class EditMealService {
    /**
     * Method that allows you to edit the data of a meal
     */
    async execute({
        uId,
        mealId,
        name,
        preparationTime,
        description,
        canTakeaway,
        price,
        allowedChanges
    }:IMeal) {
        const mealIdExists = await checkMealExists(mealId)

        if(!mealIdExists){
            throw new Error('Meal does not exists')
        }

        // get the bar where the employee works
        const userBarId = await getEmployeeBar(uId);
        const mealBarId = await getMealBar(mealId);

        if(userBarId != mealBarId) {
            throw new Error('Bars are not the same')
        }

        // check if a meal already exists in that bar (they can't be repeated)
        const meal = await checkMealExistsBar(name, userBarId)
        if(meal){
            throw new Error('Meal already exists in this bar')
        }

        const editMealDBClient= createClient();
        await editMealDBClient.query(`UPDATE meals
                                    SET name = $1, preparationTime = $2, description = $3, canTakeAway = $4, price = $5
                                    WHERE mealid = $6`, [name, preparationTime, description, canTakeaway, price, mealId])
        
        await editMealDBClient.query(`DELETE FROM allowedchanges 
                                    WHERE mealid = $1`, [mealId])

        // TODO: incrementedlimit e decrementedlimit não está a ter nenhum valor mesmo passado por body
        allowedChanges.forEach( async (currentvalue:IMealAllowedChange,index,array)=>{
            console.log(currentvalue)
            console.log(currentvalue.incrementlimit)
            console.log(currentvalue.decrementlimit)
            await editMealDBClient.query(`INSERT INTO allowedchanges (mealid,ingname,ingdosage,isremoveonly,canbeincremented,canbedecremented,incrementlimit,decrementlimit) 
                                        VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`, [mealId, currentvalue.ingname, currentvalue.ingdosage, currentvalue.isremoveonly, currentvalue.canbedecremented, currentvalue.canbedecremented, currentvalue.incrementlimit, currentvalue.decrementlimit])
        })

        return { msg: "Meal edited successfully" , status: 200 }
    }
}