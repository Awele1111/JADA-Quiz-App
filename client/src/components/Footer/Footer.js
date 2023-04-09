import React, { useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useLazyQuery } from '@apollo/client';
import { QUERY_DONATE } from '../../utils/queries';
import { useQuizContext } from '../../utils/quizContext';
import './footer.css';
const stripePromise = loadStripe('pk_test_51MujM1INNDbfLrrCUrGEsa9TKUfAnfFpzbYjy8HlPt41JTjQDdEWV8XgKEFr4JISJeAKNReNjc6LV44y4U8a0s5300Jg18hMRS');

const Footer = () => {
    const [state] = useQuizContext();

    const [goToDonate, { data }] = useLazyQuery(QUERY_DONATE);

    useEffect(() => {
        if (data) {
          stripePromise.then((res) => {
            res.redirectToCheckout({ sessionId: data.donate.session });
          });
        }
      }, [data]);

    const handleDonationLink = () => {
        document.getElementById('paymentAmountError').innerHTML = '';
        let dollars = document.getElementById('donationAmount').value * 1;
        if(isNaN(dollars)){
            document.getElementById('paymentAmountError').innerHTML = 'You must input a valid number!';
        } else {
            let cents = dollars * 100;
            let donationAmount = cents.toFixed(0) * 1;
            if(donationAmount < 50){
                document.getElementById('paymentAmountError').innerHTML = 'Donations must be at least $0.50';
            } else {
                document.getElementById('paymentAmountError').innerHTML = 'Loading...';
                goToDonate({
                    variables: { donationAmount },
                });
            }
        }
    }

    const resetDonationInfo = () => {
        document.getElementById('paymentAmountError').innerHTML = '';
        document.getElementById('donationAmount').value = '';
    }

    return (
        <>
            {!state.takingQuiz ? (
                <>
                    <footer className='footer'>
                        <h5 className="m-3" id="donationLink" data-bs-toggle="modal" data-bs-target="#donateModal">Click here if you would like to donate to Education Charities!</h5>
                    </footer>
                    <div className="modal fade" id="donateModal" data-bs-backdrop="static" tabIndex="-1" aria-labelledby="donateModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header d-flex justify-content-center">
                                    <h1 className="modal-title fs-5" id="donateModalLabel">Donate</h1>
                                </div>
                                <div className="modal-body d-flex flex-column justify-content-center">
                                    <p>All donations go to education charities.</p>
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">$</span>
                                        </div>
                                        <input type="text" className="form-control" aria-label="Amount" id="donationAmount" placeholder='5.00'></input>
                                    </div>
                                    <p id='paymentAmountError'></p>
                                </div>
                                <div className="modal-footer d-flex justify-content-between">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={resetDonationInfo}>Cancel</button>
                                    <button type="button" className="btn btn-success" onClick={handleDonationLink}>Pay</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ):null
            }   
        </>
    )
}

export default Footer;