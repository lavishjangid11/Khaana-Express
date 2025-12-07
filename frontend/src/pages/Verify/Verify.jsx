import React, { useContext, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { StoreContext } from '../../components/context/StoreContext';
import './Verify.css';

const Verify = () => {
    const [searchParams] = useSearchParams();
    const success = searchParams.get('success');
    const orderId = searchParams.get('orderId');
    const navigate = useNavigate();
    const { url, token, clearCart } = useContext(StoreContext);

    useEffect(() => {
        const verifyPayment = async () => {
            if (!orderId || !token) {
                navigate('/');
                return;
            }

            try {
                const response = await axios.post(
                    `${url}/api/order/verify-payment`,
                    { orderId, success },
                    { headers: { token } }
                );

                if (response.data.success) {
                    clearCart();
                    setTimeout(() => {
                        navigate('/myorders');
                    }, 3000);
                } else {
                    setTimeout(() => {
                        navigate('/');
                    }, 3000);
                }
            } catch (error) {
                console.error('Error verifying payment:', error);
                setTimeout(() => {
                    navigate('/');
                }, 3000);
            }
        };

        verifyPayment();
    }, [orderId, success, token, url, navigate, clearCart]);

    return (
        <div className='verify'>
            <div className="spinner"></div>
            <p>{success === 'true' ? 'Payment Successful! Redirecting to your orders...' : 'Payment Cancelled. Redirecting...'}</p>
        </div>
    );
};

export default Verify;
