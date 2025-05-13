const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const bidSchema = new mongoose.Schema(
  {
    user: {
      type: ObjectId,
      ref: "users",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    }
  }
);

const auctionSchema = new mongoose.Schema(
  {
    product: {
      type: ObjectId,
      ref: "products",
      required: true,
    },
    startingPrice: {
      type: Number,
      required: true,
    },
    currentPrice: {
      type: Number,
      required: true,
    },
    startTime: {
      type: Date,
      required: true,
    },
    endTime: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["upcoming", "active", "ended", "cancelled"],
      default: "upcoming",
    },
    bids: [bidSchema],
    winningBid: {
      user: { type: ObjectId, ref: "users" },
      amount: Number,
      timestamp: Date,
    },
  },
  { timestamps: true }
);

// Method to check if auction is active
auctionSchema.methods.isActive = function() {
  const now = new Date();
  return now >= this.startTime && now <= this.endTime && this.status === "active";
};

// Method to check if auction has ended
auctionSchema.methods.hasEnded = function() {
  const now = new Date();
  return now > this.endTime || this.status === "ended" || this.status === "cancelled";
};

const auctionModel = mongoose.model("auctions", auctionSchema);
module.exports = auctionModel;
