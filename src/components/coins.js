import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { MdArrowBackIos } from 'react-icons/md';
import { FiSettings } from 'react-icons/fi';
import { AiFillAudio } from 'react-icons/ai';
import styles from '../styles/coin.module.css';
import { getList, showCoinDet } from '../redux/details/details';

const CoinsData = () => {
  const coinsdat = useSelector((state) => state.coinReducer);
  const selCoin = coinsdat.filter((league) => league.display === true)[0];
  const coinList = selCoin.coinArr;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getList(coinList));
  }, []);

  /* eslint-disable no-nested-ternary */
  const approx = (value) => (value >= 1.0e+12
    ? `$ ${(value / 1.0e+12).toFixed(2)}T`
    : value >= 1.0e+9
      ? `$ ${(value / 1.0e+9).toFixed(2)}B`
      : value >= 1.0e+6
        ? `$ ${(value / 1.0e+6).toFixed(2)}M`
        : value >= 1.0e+3
          ? `$ ${(value / 1.0e+3).toFixed(2)}K`
          : `$ ${value}`
  );

  const othApprox = (value) => Number(value).toFixed(4);

  const positive = {
    color: 'green',
  };

  const negative = {
    color: 'red',
  };

  const filterCoin = () => {
    let coinName = '';
    const userInput = document.getElementById('coinSearch');
    const coindata = userInput.value.toLowerCase();
    const coinDetails = document.getElementsByClassName('coin-class');
    [...coinDetails].forEach((coinnam) => {
      const helpVar = coinnam;
      coinName = helpVar.textContent || helpVar.inneText;
      if (coinName.toLowerCase().indexOf(coindata) > -1) {
        helpVar.style.display = '';
      } else {
        helpVar.style.display = 'none';
      }
    });
  };

  return (
    <div className={styles.backg}>
      <header className={styles.header}>
        <Link className={styles.link} to="/crypto-trend">
          <MdArrowBackIos />
          <span>2021</span>
        </Link>
        <p>coin details</p>
        <div>
          <AiFillAudio />
          <FiSettings />
        </div>
      </header>
      <input type="text" className={styles.search} id="coinSearch" placeholder="Search Coin..." onKeyDown={filterCoin} />
      <h2 className={styles.main}>{selCoin.name}</h2>
      <ul className={styles.list}>
        {coinList.map((coin) => (
          <Link key={coin.id} to={`/details/more/${coin.name}`} onClick={() => dispatch(showCoinDet(coin.id))}>
            <li className="coin-class">
              <div className={styles.listItems}>
                <h3>{coin.name}</h3>
                <div>
                  <p>
                    <span>Price: </span>
                    <span>{othApprox(coin.priceUsd)}</span>
                  </p>
                  <p>
                    <span>Market Cap: </span>
                    <span>{approx(coin.marketCapUsd)}</span>
                  </p>
                  <p>
                    <span>24Hr Change: </span>
                    <span style={coin.changePercent24Hr > 0
                      ? positive
                      : coin.changePercent24Hr < 0
                        ? negative
                        : null}
                    >
                      {othApprox(coin.changePercent24Hr)}
                    </span>
                  </p>
                </div>
              </div>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default CoinsData;
