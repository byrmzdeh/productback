import express from 'express'
import mongoose,{Schema} from 'mongoose'
import cors from 'cors'
const app = express()
const port = 8000


app.use(express.json())
app.use(cors())


const productSchema = new Schema({
    name: String,
    price: Number,
    desc: String
});

const ProductModel = mongoose.model('product', productSchema);



app.get('/', async (req, res) => {
    try {
        const product = await ProductModel.find({})
        res.json(product)
    } catch (error) {
        res.send(error.message)
    }
})

app.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const product = await ProductModel.findById(id)
        res.json(product)
    } catch (error) {
        res.send(error.message)
    }

})

app.post('/', async (req, res) => {
    try {
        const {name,price ,desc} = req.body
        const product = new ProductModel({ name, price, desc })
        await product.save()
        res.json(product)
    } catch (error) {
        res.send(error.message)
    }
})

app.put('/:id', async(req, res) => {
    try {
        const { id } = req.params
        const {name,price ,desc} = req.body
        const product = await ProductModel.findByIdAndUpdate(id, { name, price, desc })
        res.json(product)
    } catch (error) {
        res.send(error.message)
    }
})

app.delete('/:id',async (req, res) => {
    try {
        const { id } = req.params
        const product = await ProductModel.findByIdAndDelete(id)
        res.json(product)
    } catch (error) {
        res.send(error.message)
    }
})

mongoose.connect('mongodb+srv://aydan:aydan@cluster0.ccton5y.mongodb.net/')
    .then(() => console.log('Connected!'));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})