import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { MdArrowBackIos } from 'react-icons/md';
import { FiSettings } from 'react-icons/fi';
import { AiFillAudio } from 'react-icons/ai';
import styles from '../styles/moreDetails.module.css';

const MoreDetails = () => {
  const coinArrData = useSelector((state) => state.detailsReducer);
  const detCoin = coinArrData.filter((coin) => coin.show === true)[0];

  const approxTo = (value) => Number(value).toFixed(4);

  /* eslint-disable no-nested-ternary */
  const approx2 = (value) => (value >= 1.0e+12
    ? `$ ${(value / 1.0e+12).toFixed(2)}T`
    : value >= 1.0e+9
      ? `$ ${(value / 1.0e+9).toFixed(2)}B`
      : value >= 1.0e+6
        ? `$ ${(value / 1.0e+6).toFixed(2)}M`
        : value >= 1.0e+3
          ? `$ ${(value / 1.0e+3).toFixed(2)}K`
          : `$ ${value}`
  );

  return (
    <div className={styles.backg}>
      <header className={styles.header}>
        <Link className={styles.link} to="/crypto-trend">
          <MdArrowBackIos />
          <span>2021</span>
        </Link>
        <span>coin details</span>
        <div>
          <AiFillAudio />
          <FiSettings />
        </div>
      </header>
      <h2 className={styles.name}>
        {detCoin.name}
        &nbsp;
        &#40;
        {detCoin.symbol}
        &#41;
      </h2>
      <p>
        Rank:
        &nbsp;
        {detCoin.rank}
      </p>
      <p>
        Price:
        &nbsp;
        {approxTo(detCoin.priceUsd)}
      </p>
      <p>
        Market Cap:
        &nbsp;
        {approx2(detCoin.marketCapUsd)}
      </p>
      <p>
        24Hr Vol:
        &nbsp;
        {approx2(detCoin.volumeUsd24Hr)}
      </p>
      <p>
        24Hr Change:
        &nbsp;
        {approxTo(detCoin.changePercent24Hr)}
      </p>
    </div>
  );
};

export default MoreDetails;
