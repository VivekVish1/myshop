import React from "react";
import "./IssueOptions.css";

function IssueOptions({ onSelect }) {
    return (
        <div className="card section">
            <div className="issue-header">
                <h3>Which item are you facing issues with?</h3>
                <div className="issue-intro">
                    <button>View More</button>
                </div>
            </div>

            <div className="issue-list">
                <div className="solution" onClick={() => onSelect("manageOrder")}>
                    <div>
                        <div className="solution-title">I want to manage my order</div>
                        <div className="solution-small-title">
                            View, cancel or return an order
                        </div>
                    </div>
                    <i className="fa-solid fa-angle-right"></i>
                </div>

                <div className="solution" onClick={() => onSelect("returns")}>
                    <div>
                        <div className="solution-title">
                            I want help with returns & refunds
                        </div>
                        <div className="solution-small-title">
                            Manage and track returns
                        </div>
                    </div>
                    <i className="fa-solid fa-angle-right"></i>
                </div>

                <div className="solution" onClick={() => onSelect("other")}>
                    <div className="solution-title">
                        I want help with other issues
                    </div>
                    <i className="fa-solid fa-angle-right"></i>
                </div>
            </div>
        </div>
    );
}

export default IssueOptions;
