import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import multer from "multer";
import {dirname, join} from "path";
import { fileURLToPath } from "url";

import { upload } from "./config/multer.js";

import fs from "fs";

import authRoutes from "./routes/auth.routes.js";
import productsRoutes from "./routes/product.routes.js";
// import { FRONTEND_URL } from "./config.js";

import dotenv from "dotenv";

dotenv.config();


const FRONTEND_URL = process.env.FRONTEND_URL;

const __dirname = dirname(fileURLToPath(import.meta.url));



const app = express();

app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
  })
);

const storagePath = join(__dirname, "storage/uploads");

// // Verificar si la carpeta de destino existe, si no, crearla
if (!fs.existsSync(storagePath)) {
  fs.mkdirSync(storagePath, { recursive: true });
}


// const multerUpload = multer({
//   dest: join(__dirname, "storage/uploads"),
//   limits: {
//     fieldSize: 10000000
//   }
// });

// app.post('/upload', multerUpload.single('productImage'), (req, res) => {
//   console.log(req.file);
//   res.sendStatus(200);
// })

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, join(__dirname, "storage/uploads"));
  },
  filename: (req, file, cb) => {
    cb(
      null,
      new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname
    );
  },
  limits: {
    fieldSize: 10000000
  }
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/webp" ||
    file.mimetype === "image/avif"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(
  multer({ storage: storage, fileFilter: fileFilter }).single("productImage")
);

app.use('/uploads', express.static(join(__dirname, 'storage/uploads'))); 



app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.use("/api", authRoutes);
app.use("/api", productsRoutes);

app.post('/create-user', upload.fields([{name: 'image', maxCount: 1}]), (req, res) => {
  const body = req.body;
  const image = req.files.image[0];

  if(image && image.length > 0) {

  }
  return res.json({message: "User created"});
})

app.get('/users', (req, res) => {
  return res.json({message: "Users"});
})


export default app;
