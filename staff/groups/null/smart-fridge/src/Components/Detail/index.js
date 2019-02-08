import React from 'react'
import './index.sass'

class Detail extends React.Component {

    handleBackToRecipes=()=>{
        this.props.backToRecipes()
    }

    render() {
        const { props: { recipe, ingredients } } = this

        return <section className="detail row ml-5 mr-5">
            <div className='col-12 col-lg-4 mt-2 detail__result'>
                <div className="card p-2">
                    <div className="card-body">
                        <h5 className="card-title text-center mb-5">{recipe.label}</h5>
                        <div className='results__image-favorite'>
                            <img className="card-img-top" alt="recipe" src={recipe.image}></img><i class="far fa-heart"></i>
                        </div>

                        <div className='row mt-4'>
                            <button className="btn btn-outline-dark inline mt-2 col-6" onClick={this.handleBackToRecipes}>Back to Recipes</button>
                            <div className="col-6 pr-2">
                                <a className="btn btn-dark inline mt-2" href={recipe.url} target="_blank" >Preparation</a>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div className='col-12 col-lg-8 mt-2 detail__box '>
            <div className='row ml-2 mr-2'>
                <div className="col-12 col-sm-6">
                    <h5 className="card-title text-center mb-5 mt-4">Fridge</h5>
                    <ul className="list-group mb-2">
                        {
                            ingredients.fridge.map(ingredient => (
                                <li class="list-group-item list-group-item-success">{ingredient}</li>
                            ))
                        }

                    </ul>
                </div>
                <div className="col-12 col-sm-6">
                    <h5 className="card-title text-center mb-5 mt-4">Go Shopping</h5>
                    <ul className="list-group mb-2">
                        {
                            ingredients.shopping.map(ingredient => (
                                <li class="list-group-item list-group-item-danger">{ingredient}</li>
                            ))
                        }

                    </ul>
                </div>
            </div>
            </div>
        </section>
    }

}



export default Detail