import getCoinList from '../../components/api/api';

const FETCH_COINS = 'api/coinsData/FETCH_COINS';
const DISPLAY_COINS = 'api/coinsData/DISPLAY_COINS';

const initialState = [];

const extractCoins = (data) => {
  const coinsData = data.data;

  const allCoins = [];

  const topGainers = {
    name: 'Top Gainers',
    coinArr: [],
    display: false,
  };

  const allCoinsArr = {
    name: 'All Coins',
    coinArr: [],
    display: false,
  };

  const topLosers = {
    name: 'Top 10 Losers',
    coinArr: [],
    display: false,
  };

  const topRated = {
    name: 'Top 20 Rated',
    coinArr: [],
    display: false,
  };

  const leastRated = {
    name: 'Least Rated',
    coinArr: [],
    display: false,
  };

  const testCoins = coinsData.sort((a, b) => b.changePercent24Hr - a.changePercent24Hr);
  topGainers.coinArr = testCoins.slice(0, 10);
  topLosers.coinArr = testCoins.slice(testCoins.length - 10, testCoins.length);
  allCoinsArr.coinArr = coinsData.sort((a, b) => a.rank - b.rank);
  topRated.coinArr = coinsData.slice(0, 20);
  leastRated.coinArr = coinsData.slice(coinsData.length - 20, coinsData.length);

  allCoins[allCoins.length] = allCoinsArr;
  allCoins[allCoins.length] = topGainers;
  allCoins[allCoins.length] = topLosers;
  allCoins[allCoins.length] = topRated;
  allCoins[allCoins.length] = leastRated;
  return allCoins;
};

export const fetchCoins = () => async (dispatch) => {
  try {
    const data = await getCoinList();

    dispatch({ type: FETCH_COINS, payload: data });
  } catch (error) {
    throw new Error(error.err);
  }
};

export const displayCoins = (id) => ({ type: DISPLAY_COINS, payload: id });

const coinReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COINS:
      return extractCoins(action.payload);

    case DISPLAY_COINS:
      return state.map((coin) => {
        if (coin.name === action.payload) {
          return {
            ...coin,
            display: !coin.display,
          };
        } return coin;
      });

    default:
      return state;
  }
};

export default coinReducer;
