import express from "express";
import TicketController from "../controllers/TicketController";

import { isAdmin, verifyToken } from "../utils/middlewares";

const ticketRouter = express.Router();

/**
 * @swagger
 * tags:
 *  name: Tickets
 *  description: Ticket management
 */
/**
 * @swagger
 * /api/tickets:
 *   post:
 *     summary: Create a new ticket
 *     description: Endpoint to create a new ticket
 *     tags:
 *       - Tickets
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Title of the ticket
 *                 example: Sample Ticket Title
 *               description:
 *                 type: string
 *                 description: Description of the ticket
 *                 example: Sample Ticket Description
 *               priority:
 *                 type: string
 *                 enum: [low, medium, high]
 *                 description: Priority level of the ticket (low, medium, high)
 *                 example: low
 *     responses:
 *       201:
 *         description: Ticket created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Ticket'
 *       400:
 *         description: Invalid request payload
 *       500:
 *         description: Internal server error
 */
ticketRouter.post("/tickets", verifyToken, TicketController.createTicket);

/**
 * @swagger
 * /tickets:
 *   get:
 *     summary: Get all tickets
 *     description: Retrieve all tickets from the system
 *     tags:
 *       - Tickets
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: An array of tickets
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/Ticket'
 *       401:
 *         description: Unauthorized, authentication token is missing or invalid
 *       403:
 *         description: Forbidden, user does not have access to this resource
 *       500:
 *         description: Internal server error
 */

ticketRouter.get(
  "/tickets",
  verifyToken,
  isAdmin,
  TicketController.getAllTickets
);

/**
 * @swagger
 * /tickets/{id}:
 *   get:
 *     summary: Get a ticket by ID
 *     description: Retrieve a ticket by its ID
 *     tags:
 *       - Tickets
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the ticket to retrieve
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: A ticket object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Ticket'
 *       400:
 *         description: Invalid request data
 *       401:
 *         description: Unauthorized, authentication token is missing or invalid
 *       403:
 *         description: Forbidden, user does not have access to this resource
 *       404:
 *         description: Ticket not found
 *       500:
 *         description: Internal server error
 */
ticketRouter.get("/tickets/:id", verifyToken, TicketController.getTicket);

/**
 * @swagger
 * /tickets/{id}:
 *   put:
 *     summary: Update a ticket by ID
 *     description: Update a ticket's details by its ID
 *     tags:
 *       - Tickets
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the ticket to update
 *       - in: body
 *         name: body
 *         description: Updated ticket object
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Ticket'
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Updated ticket object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Ticket'
 *       400:
 *         description: Invalid request data
 *       401:
 *         description: Unauthorized, authentication token is missing or invalid
 *       403:
 *         description: Forbidden, user does not have access to this resource
 *       404:
 *         description: Ticket not found
 *       500:
 *         description: Internal server error
 */
ticketRouter.put("/tickets/:id", verifyToken, TicketController.updateTicket);

/**
 * @swagger
 * /tickets/{id}:
 *   delete:
 *     summary: Delete a ticket by ID
 *     description: Delete a ticket by its ID
 *     tags:
 *       - Tickets
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the ticket to delete
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       204:
 *         description: Ticket deleted successfully
 *       401:
 *         description: Unauthorized, authentication token is missing or invalid
 *       403:
 *         description: Forbidden, user does not have access to this resource
 *       404:
 *         description: Ticket not found
 *       500:
 *         description: Internal server error
 */
ticketRouter.delete("/tickets/:id", verifyToken, TicketController.deleteTicket);

/**
 * @swagger
 * /my-tickets:
 *   get:
 *     summary: Get tickets created by the authenticated user
 *     description: Retrieve tickets created by the authenticated user
 *     tags:
 *       - Tickets
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: An array of tickets created by the authenticated user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/Ticket'
 *       401:
 *         description: Unauthorized, authentication token is missing or invalid
 *       500:
 *         description: Internal server error
 */
ticketRouter.get("/my-tickets", verifyToken, TicketController.getMyTickets);

export default ticketRouter;
