const MORE_DETAILS = 'coins/details/MORE_DETAILS';
const SHOW_DETAILS = 'coins/details/SHOW_DETAILS';

const initState = [];

const handleData = (data) => {
  const arr = [];

  data.map((coin) => {
    const coinObj = coin;
    coinObj.show = false;
    arr[arr.length] = coinObj;
    return arr;
  });
  return arr;
};

export const getList = (data) => ({ type: MORE_DETAILS, payload: data });

export const showCoinDet = (id) => ({ type: SHOW_DETAILS, payload: id });

const detailsReducer = (state = initState, action) => {
  switch (action.type) {
    case MORE_DETAILS:
      return handleData(action.payload);

    case SHOW_DETAILS:
      return state.map((coin) => {
        if (coin.id === action.payload) {
          return {
            ...coin,
            show: !coin.show,
          };
        } return coin;
      });

    default:
      return state;
  }
};

export default detailsReducer;
