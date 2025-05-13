const auctionModel = require("../models/auctions");
const productModel = require("../models/products");
const { broadcastAuctionUpdate, notifyOutbid } = require("../websocket");

class Auction {
  async getAllAuctions(req, res) {
    try {
      let auctions = await auctionModel
        .find({})
        .populate("product", "pName pImages pDescription pCategory")
        .populate("bids.user", "name email")
        .populate("winningBid.user", "name email")
        .sort({ endTime: 1 });

      if (auctions) {
        return res.json({ auctions });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Server error" });
    }
  }

  async getActiveAuctions(req, res) {
    try {
      const now = new Date();
      let auctions = await auctionModel
        .find({
          startTime: { $lte: now },
          endTime: { $gte: now },
          status: "active"
        })
        .populate("product", "pName pImages pDescription pCategory")
        .populate("bids.user", "name email")
        .sort({ endTime: 1 });

      if (auctions) {
        return res.json({ auctions });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Server error" });
    }
  }

  async getAuctionById(req, res) {
    let { auctionId } = req.params;
    if (!auctionId) {
      return res.status(400).json({ error: "Auction ID is required" });
    }

    try {
      let auction = await auctionModel
        .findById(auctionId)
        .populate("product", "pName pImages pDescription pCategory pPrice")
        .populate("bids.user", "name email")
        .populate("winningBid.user", "name email");

      if (!auction) {
        return res.status(404).json({ error: "Auction not found" });
      }

      return res.json({ auction });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Server error" });
    }
  }

  async createAuction(req, res) {
    let { productId, startingPrice, startTime, endTime } = req.body;

    if (!productId || !startingPrice || !startTime || !endTime) {
      return res.status(400).json({ error: "All fields are required" });
    }

    try {
      // Check if product exists
      const product = await productModel.findById(productId);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      // Validate dates
      const startDate = new Date(startTime);
      const endDate = new Date(endTime);
      const now = new Date();

      if (startDate < now) {
        return res.status(400).json({ error: "Start time must be in the future" });
      }

      if (endDate <= startDate) {
        return res.status(400).json({ error: "End time must be after start time" });
      }

      // Create new auction
      const newAuction = new auctionModel({
        product: productId,
        startingPrice,
        currentPrice: startingPrice,
        startTime: startDate,
        endTime: endDate,
        status: startDate <= now ? "active" : "upcoming",
      });

      const savedAuction = await newAuction.save();
      if (savedAuction) {
        return res.json({
          success: "Auction created successfully",
          auction: savedAuction
        });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Server error" });
    }
  }

  async placeBid(req, res) {
    let { auctionId, userId, bidAmount } = req.body;

    if (!auctionId || !userId || !bidAmount) {
      return res.status(400).json({ error: "All fields are required" });
    }

    try {
      // Find the auction
      const auction = await auctionModel.findById(auctionId);
      if (!auction) {
        return res.status(404).json({ error: "Auction not found" });
      }

      // Check if auction is active
      if (!auction.isActive()) {
        return res.status(400).json({ error: "Auction is not active" });
      }

      // Check if bid amount is higher than current price
      if (bidAmount <= auction.currentPrice) {
        return res.status(400).json({ error: "Bid amount must be higher than current price" });
      }

      // Add the bid
      const newBid = {
        user: userId,
        amount: bidAmount,
        timestamp: new Date()
      };

      auction.bids.push(newBid);
      auction.currentPrice = bidAmount;

      const updatedAuction = await auction.save();
      if (updatedAuction) {
        // Broadcast the auction update to all clients
        await broadcastAuctionUpdate(auctionId);

        // If there were previous bids, notify the previous highest bidder
        if (auction.bids.length > 1) {
          const previousBids = auction.bids.slice(0, -1); // All bids except the newest one
          const highestPreviousBid = previousBids.reduce((prev, current) =>
            (prev.amount > current.amount) ? prev : current
          );

          // Notify the previous highest bidder that they've been outbid
          notifyOutbid(highestPreviousBid.user, auctionId, bidAmount);
        }

        return res.json({
          success: "Bid placed successfully",
          currentPrice: bidAmount
        });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Server error" });
    }
  }

  async endAuction(req, res) {
    let { auctionId } = req.params;

    if (!auctionId) {
      return res.status(400).json({ error: "Auction ID is required" });
    }

    try {
      // Find the auction
      const auction = await auctionModel.findById(auctionId);
      if (!auction) {
        return res.status(404).json({ error: "Auction not found" });
      }

      // Check if auction can be ended
      if (auction.status === "ended" || auction.status === "cancelled") {
        return res.status(400).json({ error: "Auction is already ended or cancelled" });
      }

      // Find the winning bid (highest bid)
      if (auction.bids.length > 0) {
        const highestBid = auction.bids.reduce((prev, current) =>
          (prev.amount > current.amount) ? prev : current
        );

        auction.winningBid = {
          user: highestBid.user,
          amount: highestBid.amount,
          timestamp: highestBid.timestamp
        };
      }

      auction.status = "ended";

      const updatedAuction = await auction.save();
      if (updatedAuction) {
        // Broadcast the auction update to all clients
        await broadcastAuctionUpdate(auctionId);

        return res.json({
          success: "Auction ended successfully",
          auction: updatedAuction
        });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Server error" });
    }
  }
}

const auctionController = new Auction();
module.exports = auctionController;
