import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useLoaderData } from "react-router-dom";
import CheckoutForm from "./CheckoutForm";

// TODO: add publishable key
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);
const Payment = () => {
    const test = useLoaderData();
    // console.log(test);
    return (
        <div>
            <h1 className="text-center my-8">Make you payment to order</h1>
            <div className="">
                <Elements stripe={stripePromise}>
                    <CheckoutForm test={test}></CheckoutForm>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;