import './ManageOrderFAQ.css'

function ManageOrderFAQ({ onBack }) {


    return (
        <div className="manage-order-faq">
            <div
                className="manage-order-faq__breadcrumb"
                onClick={onBack}
            >
                ← Help Centre &gt; Help with your order
            </div>

            <h2 className="manage-order-faq__title">
                Frequently asked questions
            </h2>

            <div className="manage-order-faq__list">
                <div className="manage-order-faq__item">
                    <span className="manage-order-faq__question">
                        I want to change the address for delivery of my order.
                    </span>
                    <i className="fa-solid fa-angle-down manage-order-faq__icon"></i>
                </div>

                <div className="manage-order-faq__item">
                    <span className="manage-order-faq__question">
                        How can I modify/add an alternate number?
                    </span>
                    <i className="fa-solid fa-angle-down manage-order-faq__icon"></i>
                </div>
            </div>

            <div className="manage-order-faq__footer">
                Want to reach us old style? Here is our <a href="/">postal address</a>
            </div>
        </div>
    );
}

export default ManageOrderFAQ;
