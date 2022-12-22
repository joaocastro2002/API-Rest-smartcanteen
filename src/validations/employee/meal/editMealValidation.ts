import { createClient } from "../../../config/db";

export async function checkMealExists(mealId: string) {
    const checkMealExistsDBClient = createClient();
    const query = await checkMealExistsDBClient.query(`SELECT mealid FROM meals
                                                        WHERE mealid = $1`, [mealId]);

                                                        
    return query['rows'].length != 0
}

export async function getMealBar(mealId: string) {
    const getMealBarDBClient = createClient();
    const query = await getMealBarDBClient.query(`SELECT barid FROM meals
                                                    WHERE mealid = $1`, [mealId]);

    return query['rows'][0]["barid"]
}

export async function getEmployeeBar(uId: string) {
    const checkMealExistsDBClient = createClient();
    const query = await checkMealExistsDBClient.query(`SELECT preferredbar FROM users
                                                        WHERE uid = $1`, [uId]);

                                                        
    return query['rows'][0]["preferredbar"]
}

export async function checkMealExistsBar(name: string, barId: string) {
    const MealExists = createClient();
    const query = await MealExists.query(`SELECT * FROM meals 
                                        WHERE name=$1 AND barId=$2`,[name, barId])
                                           
    return query['rows'].length != 0
}


