import express from "express";
const consumerRouter = express.Router();
import { validateToken } from "../middlewares/validateToken";
import { validateRefreshToken } from "../middlewares/validateRefreshToken";
import { isConsumer } from "../middlewares/isConsumer";

import { AddFavController } from "../controllers/consumer/favoriteMeal/addFavController";
import { AddMealCartController } from "../controllers/consumer/cart/addMealCartController";
import { SeeFavController } from "../controllers/consumer/favoriteMeal/seeFavController";
import { SeeOneFavController } from "../controllers/consumer/favoriteMeal/seeOneFavController";
import { RemoveFavController } from "../controllers/consumer/favoriteMeal/removeFavController";
import { SeeMealsCartController } from "../controllers/consumer/cart/seeMealCartController";
import { RemoveMealsCartController } from "../controllers/consumer/cart/removeMealsCartController";
import { SeeTradesHistoryController } from "../controllers/consumer/trades/seeTradesHistoryController";
import { RemoveTicketController } from "../controllers/consumer/ticket/removeTicketController";
import { SeeTicketsHistoryController } from "../controllers/consumer/ticket/seeTicketsHistoryController";
import { AcceptTradeController } from "../controllers/consumer/trades/acceptTradeController";
import { SeeTradesController } from "../controllers/consumer/trades/seeTradesController";
import { GetNotificationsController } from "../controllers/consumer/notifications/getNotificationsController";
import { DirectTicketTradeController } from "../controllers/consumer/trades/directTicketTradeController";
import { GeneralTicketTradeController } from "../controllers/consumer/trades/generalTicketTradeController";
import { CancelTradingController } from "../controllers/consumer/trades/cancelTradingController";
import { CompleteCartController } from "../controllers/consumer/cart/completeCartController";

const addFavController = new AddFavController();
const removeFavController = new RemoveFavController();
const seeFavController = new SeeFavController();
const seeOneFavController = new SeeOneFavController();
const addMealCartController = new AddMealCartController();
const seeMealsCartController = new SeeMealsCartController();
const removeMealsCartController = new RemoveMealsCartController();
const seeTradesHistoryController = new SeeTradesHistoryController();
const removeTicketController = new RemoveTicketController();
const seeTicketsHistoryController = new SeeTicketsHistoryController();
const acceptTradeController = new AcceptTradeController();
const seeTradesController = new SeeTradesController();
const getNotificationsController = new GetNotificationsController()
const directTicketTradeController = new DirectTicketTradeController()
const generalTicketTradeController = new GeneralTicketTradeController()
const cancelTradingController = new CancelTradingController()
const completeCartController = new CompleteCartController()

//adicionar aos favoritos refeição
consumerRouter.post("/favoriteMeals/:mealId", validateToken, validateRefreshToken, isConsumer, addFavController.handle);
consumerRouter.delete("/favoriteMeals/:favoriteMealId", validateToken, validateRefreshToken, isConsumer, removeFavController.handle);
consumerRouter.get("/favoriteMeals", validateToken, validateRefreshToken, isConsumer, seeFavController.handle);
consumerRouter.get("/favoriteMeals/:favoriteMealId", validateToken, validateRefreshToken, isConsumer, seeOneFavController.handle);
consumerRouter.post("/cart/:mealId", validateToken, validateRefreshToken, isConsumer, addMealCartController.handle);
consumerRouter.get("/cart/meals", validateToken, validateRefreshToken, isConsumer, seeMealsCartController.handle);
consumerRouter.delete("/meals/:cartMealId", validateToken, validateRefreshToken, isConsumer, removeMealsCartController.handle);
consumerRouter.get("/trades", validateToken, validateRefreshToken, isConsumer, seeTradesHistoryController.handle);
consumerRouter.delete("/tickets/:ticketId", validateToken, validateRefreshToken, isConsumer, removeTicketController.handle);
consumerRouter.get("/tickets", validateToken, validateRefreshToken, isConsumer, seeTicketsHistoryController.handle);
consumerRouter.put("/trades/:ticketId", validateToken, validateRefreshToken, isConsumer, acceptTradeController.handle);
consumerRouter.get("/trades/available/:campusid", validateToken, validateRefreshToken, isConsumer, seeTradesController.handle);
consumerRouter.get("/notifications", validateToken, validateRefreshToken, isConsumer, getNotificationsController.handle);
consumerRouter.put("/trades/:ticketId/direct/:receiverId", validateToken, validateRefreshToken, isConsumer, directTicketTradeController.handle);
consumerRouter.put("/trades/:ticketId/general", validateToken, validateRefreshToken, isConsumer, generalTicketTradeController.handle);
consumerRouter.delete("/trades/:ticketId/", validateToken, validateRefreshToken, isConsumer, cancelTradingController.handle);
consumerRouter.post("/cart/:cartId/complete", validateToken, validateRefreshToken, isConsumer, completeCartController.handle);


export { consumerRouter }
