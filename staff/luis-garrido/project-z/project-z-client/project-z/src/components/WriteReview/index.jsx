import React, { Fragment, useState, useEffect } from "react";
import { Route, withRouter, Link } from "react-router-dom";

import logic from "../../logic";
import "./index.sass";

// import Feedback from "../Feedback";

const Login = ({ history, gameId, gameInfo, refresh }) => {
    const fullStar = "game-review-stars fas fa-star";
    const emptyStar = "game-review-stars far fa-star";

    // FULL STAR // <i class="fas fa-star"></i>
    // EMPTY STAR // <i class="far fa-star"></i>
    // HALF STAR // <i class="fas fa-star-half-alt"></i>

    const [reviewText, setReviewText] = useState("");
    const [reviewScore, setReviewScore] = useState("");
    const [preScore, setPreScore] = useState('')

    useEffect(() => {
        getPreScore()
    },[])

    const getPreScore = async () => {
        const _preScore = await logic.getPreScore(gameId, gameInfo)
        console.log(_preScore)
        setPreScore(_preScore)

    }
    
    const [starClass, setStarClass] = useState([emptyStar, emptyStar, emptyStar, emptyStar, emptyStar]);

    const star = score => (
        <i
                className={starClass[score-1]}
                key={score}
                onClick={() => {
                    let paintArray = [emptyStar, emptyStar, emptyStar, emptyStar, emptyStar]
                    for (let i = 0; i<score; i++) {
                        paintArray[i]=fullStar
                    }
                    setStarClass(paintArray)
                    setReviewScore(score);
                }}
            />
    )

    const scoreWithStars = () => [star(1),star(2),star(3),star(4),star(5)];

    const handleReviewTextInput = ({ target: { value: reviewText } }) => {
        setReviewText(reviewText);
    };

    const handleReviewScoreInput = ({ target: { value: reviewScore } }) => {
        setReviewScore(reviewScore);
    };

    const handleReviewSubmit = event => {
        event.preventDefault();

        try {
            let reviewTextFix
            if (reviewText === '') reviewTextFix = 'no text'
            else reviewTextFix = reviewText
            logic
                .postReview(gameId, reviewTextFix, reviewScore)
                .then(() => {
                    setReviewText("");
                    setReviewScore("");
                    refresh(gameId);
                })
                .catch(error => {
                    console.log(error)
                });
        } catch ({ message }) {
            console.log(message)
        }
    };

    return (
        <Fragment>
            <div className="forms">
                <form className="review-form" onSubmit={handleReviewSubmit}>
                    <div>
                        <input
                            className="review-form__input"
                            type="text"
                            name="reviewText"
                            placeholder="Write your review..."
                            autoComplete="off"
                            autoCorrect="off"
                            spellCheck="false"
                            value={reviewText}
                            onChange={handleReviewTextInput}
                        />
                    </div>
                    <div>
                        <p>{scoreWithStars()}</p>
                    </div>
                    <div>
                        <input
                            className="review-form__input"
                            type="text"
                            name="reviewScore"
                            placeholder="score"
                            autoComplete="off"
                            autoCorrect="off"
                            spellCheck="false"
                            required
                            value={reviewScore}
                            onChange={handleReviewScoreInput}
                        />
                    </div>
                    <button className="review-form__button">Rate!</button>
                </form>
                <div>
                    <h3>Precog data : {preScore.toString()}</h3>
                </div>
            </div>
        </Fragment>
    );
};

export default withRouter(Login);
