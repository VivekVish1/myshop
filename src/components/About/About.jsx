import React from 'react'
import { useState } from 'react'
import './About.css'
import IssueOptions from './IssueOptions'
import ManageOrderFAQ from './ManageOrderFAQ'

function About() {

    const [activeScreen, setActiveScreen] = useState("issues");

    return (
        <div className='about-contaiiner'>
            <h1>Shipzy Help Center | 24x7 Customer Care Support</h1>
            <p>The Shipzy Help Centre page lists out various types of issues that you may have encountered so that there can be quick resolution and you can go back to shopping online. For example, you can get more information regarding order tracking, delivery date changes, help with returns (and refunds), and much more. The Shipzy Help Centre also lists out more information that you may need regarding Shipzy Plus, payment, shopping, and more. The page has various filters listed out on the left-hand side so that you can get your queries solved quickly, efficiently, and without a hassle. You can get the Shipzy Help Centre number or even access Shipzy Help Centre support if you need professional help regarding various topics. The support executive will ensure speedy assistance so that your shopping experience is positive and enjoyable. You can even inform your loved ones of the support page so that they can properly get their grievances addressed as well. Once you have all your queries addressed, you can pull out your shopping list and shop for all your essentials in one place. You can shop during festive sales to get your hands on some unbelievable deals online. This information is updated on 06-Jan-26</p>

            <div className="help-container">
                <aside className="sidebar card">
                    <h4>TYPE OF ISSUE</h4>
                    <ul>
                        <li>Help with your issues</li>
                        <li>Help with your order</li>
                        <li>Help with other issues</li>
                    </ul>

                    <h4>HELP TOPICS</h4>
                    <ul>
                        <li>Delivery related</li>
                        <li>Login and my account</li>
                        <li>Refunds related</li>
                        <li>EMI</li>
                        <li>Payment</li>
                        <li>Returns & pickup related</li>
                        <li>Cancellation related</li>
                        <li>Grocery</li>
                        <li>Plush</li>
                        <li>Travel</li>
                        <li>BLACK</li>
                        <li>2 Wheeler</li>
                        <li>Others</li>
                        <li>Personal Loan</li>
                        <li>Recharge</li>
                        <li>2 Wheeler Insurance</li>
                        <li>UPI</li>
                        <li>Minutes</li>
                        <li>Fees</li>
                        <li>SuperPay Later</li>
                        <li>SuperPay in 3</li>
                    </ul>
                </aside>

                <main className="content">
                    {activeScreen === "issues" && (
                        <IssueOptions onSelect={setActiveScreen} />
                    )}

                    {activeScreen === "manageOrder" && (
                        <ManageOrderFAQ onBack={() => setActiveScreen("issues")} />
                    )}
                </main>
            </div>
        </div>
    )
}

export default About