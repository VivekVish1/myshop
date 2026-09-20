import React from 'react'
import { useState, useEffect } from 'react';
import "./FAQ.css"

const FAQ = () => {

    const [newQuestion, setNewQuestion] = useState("");
    const [active, setActive] = useState(null);
    const [editQuestion, setEditQuestion] = useState(null);
    const [editText, setEditText] = useState("");

    const defaultQuestions = [
        {
            question: "How do I track my order?",
            answer: "Once your order is shipped, you will receive a confirmation email with a tracking number and a link to track your package in real time.",
            important: false,
            isDefault: true
        },
        {
            question: "How do I cancel my order?",
            answer: "Open My Orders and click Cancel.",
            important: false,
            isDefault: true
        },
        {
            question: "Can I return or exchange a product?",
            answer: "Yes, we offer a return and exchange policy. Items can typically be returned within 14–30 days of delivery, provided they are unused and in their original packaging. Please check our Return Policy page for full details.",
            important: false,
            isDefault: true
        },
        {
            question: "What payment methods do you accept?",
            answer: "We accept major credit and debit cards such as Visa, Mastercard, and American Express, as well as online payment options like PayPal, Apple Pay, and Google Pay (availability may vary by region).",
            important: false,
            isDefault: true
        },
        {
            question: "How can I place an order?",
            answer: "To place an order, browse through our products, select the item you like, choose the size or quantity (if applicable), and click “Add to Cart.” Once you're ready, go to your cart and click “Checkout” to complete your purchase by entering your shipping and payment details.",
            important: false,
            isDefault: true
        }
    ];

    const [questions, setQuestions] = useState(() => {
        const saved = localStorage.getItem("supportQuestions");
        if (saved) {
            const parsed = JSON.parse(saved);
            return parsed && parsed.length > 0 ? parsed : defaultQuestions;
        } else {
            return defaultQuestions;
        }
    });

    useEffect(() => {
        localStorage.setItem("supportQuestions", JSON.stringify(questions));
    }, [questions])

    const handleSubmit = () => {
        if (newQuestion.trim() === "") return;

        const newItem = {
            id: Date.now(),
            question: newQuestion,
            answer: "We will get back to you soon.",
            important: false,
            isDefault: false
        }

        setQuestions((prev) => [...prev, newItem]);
        setNewQuestion("");
    };

    const deleteQuestion = (index) => {
        if (questions[index].isDefault) return;
        const updatedQuestions = questions.filter((item, i) => i !== index);
        setQuestions(updatedQuestions)
        setActive(null)
    };

    const clearAll = () => {
        setQuestions(defaultQuestions)
        localStorage.setItem("supportQuestions", JSON.stringify(defaultQuestions));
        setActive(null)
    };

    const toggleAnswer = (index) => {
        if (active === index) {
            setActive(null);
        } else {
            setActive(index)
        }
    };

    const startEdit = (index) => {
        setEditQuestion(index)
        setEditText(questions[index].question);
    };

    const saveEdit = () => {
        const updated = [...questions];
        updated[editQuestion].question = editText;
        setQuestions(updated);
        setEditQuestion(null);
        setEditText("");
    }

    const toggleImportant = (index) => {
        const updated = [...questions];

        if (updated[index].important === true) {
            updated[index].important = false;
        } else {
            updated[index].important = true;
        }
        setQuestions(updated);
    }

    return (
        <div className='support-container'>
            <h2 className="support-title">Help Center</h2>

            <div className='question-container'>
                <input
                    type="text"
                    placeholder="Ask your question..."
                    value={newQuestion}
                    onChange={(e) => setNewQuestion(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            handleSubmit();
                        }
                    }}
                    className="question-input"
                />

                <div className="save_buttons">
                    <button onClick={handleSubmit} className="submit-btn">
                        Submit
                    </button>

                    <button onClick={clearAll} className="clear-btn">
                        Clear All
                    </button>
                </div>
            </div>

            <div className='accordion-wrapper'>
                {questions.map((item, index) => {
                    return (
                        <div key={index}
                            className={`accordion-item 
                                ${item.important ? "highlight" : ""} 
                                ${active === index ? "active" : ""}`}
                        >

                            <div className='accordion-question'>
                                {editQuestion === index && (
                                    <div>
                                        <input
                                            value={editText}
                                            onChange={(e) => setEditText(e.target.value)}
                                        />
                                        <button onClick={saveEdit}>Save</button>
                                    </div>
                                )}

                                {editQuestion !== index && (
                                    <div style={{ width: "100%" }}>
                                        <span onClick={() => toggleAnswer(index)}>
                                            {item.important === true && <i className="fa-solid fa-star"></i>}
                                            {item.question}
                                        </span>
                                        {item.isDefault === false && (
                                            <div style={{ float: "right" }}>
                                                <button onClick={() => toggleImportant(index)}>
                                                    <i className="fa-regular fa-star"></i>
                                                </button>
                                                <button onClick={() => startEdit(index)}>
                                                    <i className="fa-regular fa-pen-to-square"></i>
                                                </button>
                                                <button onClick={() => deleteQuestion(index)}>
                                                    <i className="fa-solid fa-xmark"></i>
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>

                            {active === index && (
                                <div className="accordion-answer">
                                    {item.answer}
                                </div>
                            )}

                        </div>
                    );
                })}
            </div>
        </div>
    )
}

export default FAQ