import apiClient from './apiClient';

// WebSocket connection
let socket = null;
let socketReconnectTimer = null;

// WebSocket event listeners
const listeners = {
  auction_update: [],
  outbid_notification: [],
  connection: []
};

// Initialize WebSocket connection
export const initWebSocket = () => {
  if (socket) {
    socket.close();
  }

  const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
  const host = window.location.hostname;
  const port = process.env.NODE_ENV === 'production' ? window.location.port : '8000';

  socket = new WebSocket(`${protocol}://${host}:${port}`);

  socket.onopen = () => {
    console.log('WebSocket connection established');
    clearTimeout(socketReconnectTimer);

    // Notify listeners
    listeners.connection.forEach(callback => callback({ connected: true }));
  };

  socket.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);

      // Call appropriate listeners based on message type
      if (data.type && listeners[data.type]) {
        listeners[data.type].forEach(callback => callback(data));
      }
    } catch (error) {
      console.error('Error parsing WebSocket message:', error);
    }
  };

  socket.onclose = () => {
    console.log('WebSocket connection closed');

    // Notify listeners
    listeners.connection.forEach(callback => callback({ connected: false }));

    // Attempt to reconnect after 5 seconds
    socketReconnectTimer = setTimeout(() => {
      initWebSocket();
    }, 5000);
  };

  socket.onerror = (error) => {
    console.error('WebSocket error:', error);
  };

  return socket;
};

// Subscribe to auction updates
export const subscribeToAuction = (auctionId) => {
  if (!socket || socket.readyState !== WebSocket.OPEN) {
    console.error('WebSocket not connected');
    return;
  }

  socket.send(JSON.stringify({
    type: 'subscribe',
    auctionId: auctionId
  }));
};

// Add event listener
export const addEventListener = (type, callback) => {
  if (!listeners[type]) {
    listeners[type] = [];
  }

  listeners[type].push(callback);

  // Return a function to remove the listener
  return () => {
    listeners[type] = listeners[type].filter(cb => cb !== callback);
  };
};

// Get all auctions
export const getAllAuctions = async () => {
  try {
    const response = await apiClient.get('/auction/all-auctions');
    return response.auctions;
  } catch (error) {
    throw error;
  }
};

// Get active auctions
export const getActiveAuctions = async () => {
  try {
    const response = await apiClient.get('/auction/active-auctions');
    return response.auctions;
  } catch (error) {
    throw error;
  }
};

// Get auction by ID
export const getAuctionById = async (auctionId) => {
  try {
    const response = await apiClient.get(`/auction/auction/${auctionId}`);
    return response.auction;
  } catch (error) {
    throw error;
  }
};

// Place a bid
export const placeBid = async (auctionId, userId, bidAmount) => {
  try {
    const response = await apiClient.post('/auction/place-bid', {
      auctionId,
      userId,
      bidAmount
    });
    return response;
  } catch (error) {
    throw error;
  }
};

// Get user bids
export const getUserBids = async () => {
  try {
    const response = await apiClient.get('/auction/user-bids');
    return response.bids;
  } catch (error) {
    throw error;
  }
};

// Get user won auctions
export const getUserWonAuctions = async () => {
  try {
    const response = await apiClient.get('/auction/user-won-auctions');
    return response.auctions;
  } catch (error) {
    throw error;
  }
};

// Get user watchlist
export const getUserWatchlist = async () => {
  try {
    const response = await apiClient.get('/auction/user-watchlist');
    return response.watchlist;
  } catch (error) {
    throw error;
  }
};

// Add to watchlist
export const addToWatchlist = async (auctionId) => {
  try {
    const response = await apiClient.post('/auction/add-to-watchlist', { auctionId });
    return response;
  } catch (error) {
    throw error;
  }
};

// Remove from watchlist
export const removeFromWatchlist = async (auctionId) => {
  try {
    const response = await apiClient.post('/auction/remove-from-watchlist', { auctionId });
    return response;
  } catch (error) {
    throw error;
  }
};
