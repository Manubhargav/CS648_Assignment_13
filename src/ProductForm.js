import React, { Component } from 'react'

const RESET_VALUES = { productid: null, category: '', price: '', name: '', instock: null }

class ProductForm extends Component {
	constructor(props) {
		super(props)
		this.handleChange = this.handleChange.bind(this)
		this.handleSave = this.handleSave.bind(this)
		this.handleReset = this.handleReset.bind(this)
		this.state = {
			product: (this.props.product && this.props.product.product) || Object.assign({}, RESET_VALUES),
			errors: {}
		}
	}

	handleChange(e) {
		const target = e.target
		const name = target.name
		const value = (name === "instock") ? (target.value === "true") : target.value

		this.setState((prevState) => {
			prevState.product[name] = value
			return { product: prevState.product }
		})
	}

	handleSave(e) {
		e.preventDefault();
		this.props.onSave(this.state.product);
		this.handleReset();
	}

	handleReset() {
		this.setState({
			product: Object.assign({}, RESET_VALUES)
		})
	}

	render() {
		const { product } = this.state;
		return (
			<form onSubmit={this.handleSave}>
				<h4>{((product.productid != null) ? "Edit the existing product" : "Add a new product")}</h4>
				<p>
					<label>Name <br />
						<input type="text" className="form-control" name="name" onChange={this.handleChange} value={product.name} required />
					</label>
				</p>
				<p>
					<label>Category <br />
						<input type="text" className="form-control" name="category" onChange={this.handleChange} value={product.category} required />
					</label>
				</p>
				<p>
					<label>Price <br />
						<input type="number" className="form-control" name="price" onChange={this.handleChange} value={product.price} required />
					</label>
				</p>
				<label className="d-block mb-3">
					In stock <br />
					<div className="form-check form-check-inline">
						<input className="form-check-input" type="radio" name="instock" id="yes" onChange={this.handleChange} value="true" checked={(product.instock === true)} required />
						<label className="form-check-label" htmlFor="yes">Yes</label>
					</div>
					<div className="form-check form-check-inline">
						<input className="form-check-input" type="radio" name="instock" id="no" onChange={this.handleChange} value="false" checked={(product.instock === false)} required />
						<label className="form-check-label" htmlFor="no">No</label>
					</div>
				</label>
				<input type="submit" className="btn btn-info mr-2" value="Save"></input>
				<input type="reset" onClick={this.handleReset} className="btn btn-danger" value="Clear"></input>
			</form>
		)
	}
}

export default ProductForm