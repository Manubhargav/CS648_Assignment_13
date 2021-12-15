const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

// Express config
const PORT = 3000;
app.use(express.static(__dirname + "/build"));
app.use(express.json());
app.use(cors());

// DB config
mongoose.connect("mongodb+srv://pavan:o2MjWS9rj9EQVgRK@648-assn-13-7v19x.mongodb.net/assn?retryWrites=true&w=majority", {
	useNewUrlParser: true,
	useUnifiedTopology: true
}, (err) => {
	if (err) return console.error(err);
	console.log('Connected successfully');
})

// Mongoose model
const Product = mongoose.model("products", {
	"id": Number,
	"product": {
		"productid": Number,
		"category": String,
		"price": Number,
		"name": String,
		"instock": Boolean
	}
})


// Routes and handlers
app.get("/products/get", (req, res) => {
	Product.find({}, (err, products) => {
		if (err) {
			console.error(err);
			return res.send({
				success: 0,
				message: err
			})
		}
		res.send({
			success: 1,
			data: products
		});
	})
})

app.post("/products/create", (req, res) => {
	const { body } = req;

	Product.find({}, { id: 1 })
	.sort({"id": -1})
	.limit(1)
	.then((maxProduct) => {
		const id = (maxProduct[0]) ? maxProduct[0].id + 1 : 0;
		
		const newProduct = new Product({
			id: id,
			product: {
				productid: id,
				category: body.category,
				price: body.price,
				name: body.name,
				instock: body.instock
			}
		})

		newProduct.save().then((product) => {
			res.send({
				success: 1,
				data: product
			});
		}).catch((err) => {
			console.error(err);
			return res.send({
				success: 0,
				message: err
			})
		})

	}).catch((err) => {
		console.error(err);
		return res.send({
			success: 0,
			message: err
		})
	})
})

app.post("/products/update/:id", (req, res) => {
	Product.updateOne({id: req.params.id}, { product: req.body })
	.then((updateRes) => {
		if(updateRes.nModified == 0) throw "Values not updated";
		res.send({
			success: 1,
			message: "Updated successfully"
		});
	})
	.catch((err) => {
		console.error(err);
		return res.send({
			success: 0,
			message: err
		})
	})
})

app.get("/products/delete/:id", (req, res) => {
	Product.deleteOne({id: req.params.id})
	.then((deleteRes) => {
		res.send({
			success: 1,
			message: "Deleted successfully"
		})
	})
	.catch((err) => {
		console.error(err);
		return res.send({
			success: 0,
			message: err
		})
	})
})


// Server initialization
app.listen(PORT, () => {
	console.log('Listening on PORT', PORT, "\nOpen http://localhost:" + PORT, "in the browser");
})