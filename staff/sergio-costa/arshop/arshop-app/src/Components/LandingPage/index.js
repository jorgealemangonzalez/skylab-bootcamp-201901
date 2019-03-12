import React, { Component } from 'react'
import logic from '../../logic'
import Feedback from '../Feedback'
import './index.sass'
import Product from '../Product';

class LandingPage extends Component {

    state = { products: [], feedback: null }

    componentDidMount() {
        try {
            logic.retrieveProducts()
                .then(products => {
                    this.setState({ products })
                    console.log(this.state.products)
                })
                .catch(({ message }) => {
                    this.setState({ feedback: message })
                })
        } catch ({ message }) {
            this.setState({ feedback: message })
        }
    }

    render() {

        const { state: { feedback, products } } = this


        return <section>
            {feedback && <Feedback message={feedback} />}
                {products.map(({ id, tittle, description, price, imageUrl, sold }) => {
                    return <Product id={id} tittle={tittle} description={description} price={price} imageUrl={imageUrl} sold={sold} />
                })}
        </section>
    }
}
export default LandingPage