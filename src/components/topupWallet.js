const SKEY = 'sk_test_51OxNDPBK6mv0zNj2vmXV5L4DYIXElFCmYMSbk1ZYZGDULSUfuWEnwZBRsPB6hdmtzt6jbEPltlZk47jCtTHOWTBF00DNOna9Mx';

const topUp = async (params, walletValue) => {
    try {
        if (params.has('checkout_session_id')) {
            const session_id = params.get('checkout_session_id');
            const stripe = require('stripe')(SKEY);
            const session = await stripe.checkout.sessions.retrieve(session_id);
            const value = (session.amount_total / 100).toFixed(2);
            return parseFloat(walletValue + value);
        };
    } catch (error) {
        console.error('Error top-up', error);
        throw error;
    }
};

export default topUp;