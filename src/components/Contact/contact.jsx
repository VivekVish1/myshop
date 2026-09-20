import React from "react";
import "./contact.css";
import { useState } from "react";

const ContactPage = () => {


    const [activeIndex, setActiveIndex] = useState(null);
    const [question, setQuestion] = useState("");
    const [faqList, setFaqList] = useState([
        {
            question: "How do I track my order?",
            answer: 'You can track your order from the "My Orders" section.'
        },
        {
            question: "How do I return a product?",
            answer: 'Go to your order details and click on "Return Item".'
        },
        {
            question: "How do I contact customer care?",
            answer: "You can call, chat or email us using the options above."
        }
    ]);

    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const handleAskQuestion = (e) => {
        e.preventDefault();

        if (question.trim() === "") return;

        const newQuestion = {
            question: question,
            answer: "Thank you! Our team will respond to your question soon."
        };

        setFaqList([...faqList, newQuestion]);
        setQuestion("");
    };

    return (
        <div className="contact-container">
            <div className="contact-header">
                <h1 style={{ color: "#fff" }}>Contact Us</h1>
                <p style={{ color: "#ddd" }}>We're here to help you 24/7</p>
            </div>

            <div className="contact-content">
                <div className="contact-sidebar">
                    <h3>Help Topics</h3>
                    <ul>
                        <li>Orders</li>
                        <li>Returns & Refunds</li>
                        <li>Payments</li>
                        <li>Account</li>
                        <li>Delivery</li>
                    </ul>
                </div>

                <div className="contact-main">
                    <h2>How would you like to reach us?</h2>

                    <div className="contact-cards">
                        <div className="contact-card">
                            <h3>📞 Call Us</h3>
                            <p>Talk to our customer care</p>
                            <button>Call Now</button>
                        </div>

                        <div className="contact-card">
                            <h3>💬 Live Chat</h3>
                            <p>Chat with our support team</p>
                            <button>Start Chat</button>
                        </div>

                        <div className="contact-card">
                            <h3>📧 Email Support</h3>
                            <p>Send us your query anytime</p>
                            <button>Email Us</button>
                        </div>
                    </div>

                    <div className="faq-section">
                        <h2>Frequently Asked Questions</h2>

                        {faqList.map((faq, index) => (
                            <div
                                key={index}
                                className={`faq-item ${activeIndex === index ? "active" : ""}`}
                            >
                                <div
                                    className="faq-question"
                                    onClick={() => toggleFAQ(index)}
                                >
                                    <h4>{faq.question}</h4>
                                    <span>{activeIndex === index ? <i className="fa-solid fa-angle-up"></i> : <i className="fa-solid fa-angle-down"></i>}</span>
                                </div>

                                {activeIndex === index && (
                                    <p className="contact-faq-answer">{faq.answer}</p>
                                )}
                            </div>
                        ))}

                        <div className="ask-section">
                            <h3 style={{ color: "#fff" }}>Still have a question?</h3>
                            <form onSubmit={handleAskQuestion}>
                                <input
                                    type="text"
                                    placeholder="Type your question here..."
                                    value={question}
                                    onChange={(e) => setQuestion(e.target.value)}
                                />
                                <button type="submit">Ask Question</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
