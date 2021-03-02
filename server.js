import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Cards from './dbCards.js';
import Cors from 'cors';

//app config
const app = express();
dotenv.config();

const PORT = process.env.PORT || 8001;
const CONNECTION_URL = process.env.DBCONSTRING;

//middleware
app.use(express.json());
app.use(Cors());

//db config
mongoose.connect(CONNECTION_URL, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true
});

//api endpoints

app.get('/', (req, res) => res.status(200).send('hellow world'));

app.post('/cards', (req, res) => {
	const dbCard = req.body;

	Cards.create(dbCard, (err, data) => {
		if (err) {
			res.status(500).send(err);
		} else {
			res.status(201).send(data);
		}
	});
});

app.get('/cards', (req, res) => {
	Cards.find((err, data) => {
		if (err) {
			res.status(500).send(err);
		} else {
			res.status(200).send(data);
		}
	});
});

//listener

app.listen(PORT, () => console.log(`listening on localhost: ${PORT}`));
