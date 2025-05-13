const express = require("express");
const router = express.Router();
const auctionController = require("../controller/auctions");
const { loginCheck } = require("../middleware/auth");

// Get all auctions
router.get("/all-auctions", auctionController.getAllAuctions);

// Get active auctions
router.get("/active-auctions", auctionController.getActiveAuctions);

// Get auction by ID
router.get("/auction/:auctionId", auctionController.getAuctionById);

// Create a new auction (admin only)
router.post("/create-auction", loginCheck, auctionController.createAuction);

// Place a bid
router.post("/place-bid", loginCheck, auctionController.placeBid);

// End an auction (admin only)
router.post("/end-auction/:auctionId", loginCheck, auctionController.endAuction);

module.exports = router;
