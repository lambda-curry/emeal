import React, { useState, useEffect } from 'react';
import { get, post } from '../utils/api';
import { CouponResponse, CouponDto } from '../../../shared';
import { ImageLoader } from '../components/Image/ImageLoader';
import './redeem-page.scss';
import { useParams } from 'react-router-dom';

export const RedeemPage = () => {
  const [redeemStatus, setRedeemStatus] = useState<
    'loading' | 'waiting' | 'redeemed' | 'error'
  >('loading');
  const [coupon, setCoupon] = useState<CouponDto>();

  const { couponToken } = useParams();

  const alreadyExpired = (coupon: CouponDto) =>
    new Date(coupon?.expirationDate) < new Date(new Date().toDateString());

  const fetchCoupon = async () => {
    const [couponRepsonse, couponError] = await get<CouponResponse>(
      `coupon/${couponToken}`
    );
    if (couponError) return setRedeemStatus('error');
    setCoupon(couponRepsonse.coupon);

    // To test expired coupon state comment out the setRedeemStatus('redeemed') and uncomment the next line
    // couponRepsonse.coupon.expirationDate = '2020-02-05T03:36:05.988Z';

    if (couponRepsonse.coupon.redeemedDate) return setRedeemStatus('redeemed');
    setRedeemStatus('waiting');
  };

  useEffect(() => {
    fetchCoupon();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const redeemCoupon = async () => {
    if (!couponToken) return setRedeemStatus('error');

    const [couponRepsonse, redeemError] = await post<
      CouponResponse,
      { couponToken: string }
    >(`coupon/${couponToken}/redeem`, { couponToken });
    if (redeemError) return setRedeemStatus('error');

    setCoupon(couponRepsonse.coupon);
    setRedeemStatus('redeemed');
  };

  if (!coupon) return null;

  return (
    <div className='page redeem'>
      <div className='page-container'>
        <div className='page-item'>
          {redeemStatus === 'loading' ? (
            <h2 className='redeem-title'>Loading...</h2>
          ) : null}

          {redeemStatus === 'waiting' ? (
            <>
              <ImageLoader src={coupon.image} alt='coupon graphic' />
              <h2 className='redeem-title'>{coupon.title}</h2>
              <p className='redeem-description'>{coupon.description}</p>

              {alreadyExpired(coupon) ? (
                <>
                  <button className='redeem-button button-primary' disabled>
                    Expired
                  </button>

                  <div className='redeem-expires'>
                    Expired on{' '}
                    <b>{new Date(coupon.expirationDate).toDateString()}</b>
                  </div>
                </>
              ) : (
                <>
                  <div className='redeem-question'>
                    Are you at the restaurant now?
                  </div>
                  <button
                    className='redeem-button button-primary'
                    onClick={redeemCoupon}
                  >
                    Redeem
                  </button>

                  <div className='redeem-expires'>
                    Expires on{' '}
                    <b>{new Date(coupon.expirationDate).toDateString()}</b>
                  </div>
                </>
              )}
            </>
          ) : null}

          {coupon.redeemedDate && redeemStatus === 'redeemed' ? (
            <>
              <ImageLoader src={coupon.image} alt='coupon graphic' />
              <h2 className='redeem-title'>Redeemed!</h2>
              <p className='redeem-description'>
                Show this confirmation to your server.
                <br />
                <br />
                {coupon.projectName}
              </p>

              <div className='redeemed-on'>
                This coupon was redeemed on{' '}
                <b>{new Date(coupon.redeemedDate).toDateString()}</b>
              </div>
            </>
          ) : null}

          {redeemStatus === 'error' ? (
            <p className='redeem-question'>
              Error loading your coupon, better luck next time!
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
};
