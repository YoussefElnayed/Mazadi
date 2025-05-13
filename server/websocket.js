const WebSocket = require('ws');
const auctionModel = require('./models/auctions');

let wss;

// Initialize WebSocket server
const initWebSocket = (server) => {
  wss = new WebSocket.Server({ server });
  
  wss.on('connection', (ws) => {
    console.log('Client connected to WebSocket');
    
    // Send initial message
    ws.send(JSON.stringify({
      type: 'connection',
      message: 'Connected to Mazadi auction server'
    }));
    
    // Handle messages from clients
    ws.on('message', async (message) => {
      try {
        const data = JSON.parse(message);
        
        // Handle different message types
        switch (data.type) {
          case 'subscribe':
            // Subscribe to auction updates
            ws.auctionId = data.auctionId;
            console.log(`Client subscribed to auction: ${data.auctionId}`);
            
            // Send current auction data
            if (data.auctionId) {
              const auction = await auctionModel.findById(data.auctionId)
                .populate("product", "pName pImages")
                .populate("bids.user", "name");
              
              if (auction) {
                ws.send(JSON.stringify({
                  type: 'auction_data',
                  auction: {
                    id: auction._id,
                    currentPrice: auction.currentPrice,
                    endTime: auction.endTime,
                    bids: auction.bids.map(bid => ({
                      user: bid.user.name,
                      amount: bid.amount,
                      timestamp: bid.timestamp
                    })),
                    status: auction.status
                  }
                }));
              }
            }
            break;
            
          default:
            console.log(`Unknown message type: ${data.type}`);
        }
      } catch (error) {
        console.error('Error processing WebSocket message:', error);
      }
    });
    
    ws.on('close', () => {
      console.log('Client disconnected from WebSocket');
    });
  });
  
  console.log('WebSocket server initialized');
  return wss;
};

// Broadcast auction update to all subscribed clients
const broadcastAuctionUpdate = async (auctionId) => {
  if (!wss) return;
  
  try {
    const auction = await auctionModel.findById(auctionId)
      .populate("product", "pName pImages")
      .populate("bids.user", "name");
    
    if (!auction) return;
    
    const auctionData = {
      type: 'auction_update',
      auction: {
        id: auction._id,
        currentPrice: auction.currentPrice,
        endTime: auction.endTime,
        bids: auction.bids.map(bid => ({
          user: bid.user.name,
          amount: bid.amount,
          timestamp: bid.timestamp
        })),
        status: auction.status
      }
    };
    
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN && client.auctionId === auctionId.toString()) {
        client.send(JSON.stringify(auctionData));
      }
    });
  } catch (error) {
    console.error('Error broadcasting auction update:', error);
  }
};

// Notify a specific user about being outbid
const notifyOutbid = (userId, auctionId, newBidAmount) => {
  if (!wss) return;
  
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN && client.userId === userId.toString()) {
      client.send(JSON.stringify({
        type: 'outbid_notification',
        auctionId: auctionId,
        newBidAmount: newBidAmount,
        message: `You have been outbid! The current bid is now $${newBidAmount}`
      }));
    }
  });
};

module.exports = {
  initWebSocket,
  broadcastAuctionUpdate,
  notifyOutbid
};
