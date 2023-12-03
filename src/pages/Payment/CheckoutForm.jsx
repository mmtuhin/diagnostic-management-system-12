import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";

const CheckoutForm = ({ test }) => {
    const [clientSecret, setClientSecret] = useState('')
    const [transactionId, setTransactionId] = useState('');
    const {user} = useAuth();
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState("");
  const axiosSecure = useAxiosSecure();
  const [promoCode, setPromoCode] = useState("");
  const [discountedPrice, setDiscountedPrice] = useState(test.cost);
 console.log(test.cost);

  const axiosPublic = useAxiosPublic();
  const { data: activeBanner = [] } = useQuery({
    queryKey: ["banners"],
    queryFn: async () => {
      const res = await axiosPublic.get("/banners/active");
      return res.data;
    },
  });

  const handlePromoCodeSubmit = (event) => {
    event.preventDefault();
    // Check if the entered promo code matches any active banner's coupon code
    const matchedBanner = activeBanner[0].couponCodeName === promoCode;

    if (matchedBanner) {
      // If promo code matches, calculate discounted price (let's say 20% discount)
      const discountPercentage = activeBanner[0].couponCodeRate/100; // Example: 20% discount
      const calculatedDiscount = test.cost * discountPercentage;
      const newTotalPrice = test.cost - calculatedDiscount;

      // Set the discounted price in state
      setDiscountedPrice(newTotalPrice);

      console.log("Coupon Matched:", matchedBanner);
      console.log("DiscountedPrice", discountedPrice);
      setError("")

    } else {
      // Promo code doesn't match any active banner's code
      setError("Invalid promo code. Please try again.");
      setDiscountedPrice(0); // Reset discounted price if invalid promo code
    }
  };

  useEffect(() => {
    console.log("DiscountedPrice", discountedPrice);
  }, [discountedPrice]);

  useEffect(() => {
    axiosSecure.post('/create-payment-intent', {price: discountedPrice})
    .then(res => {
        console.log(res.data.clientSecret);
        setClientSecret(res.data.clientSecret)
    })
  }, [axiosSecure, discountedPrice]);

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
      setError(error.message);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
      setError("");
    }

    // Confirm Payment
    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
            card: card,
            billing_details: {
                email: user?.email || 'anonymous',
                name: user?.displayName || 'anonymous'
            }
        }
    })

    if (confirmError) {
        console.log('confirm error')
    }
    else {
        console.log('payment intent', paymentIntent)
        if (paymentIntent.status === 'succeeded'){
            setTransactionId(paymentIntent.id)
            const booking = {
                email: user.email,
                amount: paymentIntent.amount,
                testId: test._id,
                testName: test.testName,
                transactionId: paymentIntent.id,
                date: test.testStartDate,
            }

            const res = await axiosSecure.post('/bookings', booking)
            console.log(res);
        }
    }
    //Hello
  };
  return (
    <div>
      <form onSubmit={handlePromoCodeSubmit}>
        <input
          type="text"
          name="promoCode"
          placeholder="Enter Promo Code"
          value={promoCode}
          onChange={(e) => setPromoCode(e.target.value)}
        />
        <input type="submit" value="Submit" />
      </form>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button className="btn btn-primary btn-sm" type="submit" disabled={!stripe || !clientSecret}>
          Pay
        </button>
        <p className="text-red-500">{error}</p>
        {transactionId && <p className="text-green-600">Payment sucess! Your transaction id: {transactionId}</p>}
      </form>
    </div>
  );
};

export default CheckoutForm;
