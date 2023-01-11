/**
 * @module seeTradesService
 */
import { createClient } from "../../../config/db";
import { getUserCampus } from "../../../validations/consumer/trades/seeTradesValidation";

/**
 * Class responsible for the service that allows you to see the available trades
 */
export class SeeTradesService {
    /**
    * Method that allows to see all the tickets that are available to trade in the campus of the user
    * @param uId authenticated user id
    */
    async execute(uId: string) {
        const selectTicket = createClient();

        const campusId = await getUserCampus(uId)


        const verifyUser = await selectTicket.query(`SELECT bar.name,tickets.ticketid,users.name,states.name,tickets.cartid,tickets.emissiondate,tickets.pickuptime,tickets.ticketamount, tickets.total,tickets.nencomenda FROM campus
                                                        JOIN bar on bar.campusid=campus.campusid
                                                        JOIN tickets on tickets.barid=bar.barid
                                                        JOIN states on states.stateid=tickets.stateid
                                                        JOIN users on users.uid = tickets.uid
                                                        LEFT JOIN tickettrade on tickets.ticketid=tickettrade.ticketid
                                                        WHERE campus.campusid=$1
                                                        AND tickets.istrading = true 
                                                        AND tickets.isdirecttrade=false
                                                        AND tickettrade.receptordecision <> 1`, [campusId])

        const data = verifyUser["rows"]

        return { data, status: 200 }
    }
}