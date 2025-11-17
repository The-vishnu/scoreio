import { Router } from "express";
import multer from "multer";

const router = Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, `${uniqueSuffix}-${file.filename}`);
  }
});

const upload = multer({ storage });

router.post("/upload/pdf", upload.single('pdf') ,(req, res) => {
    return res.json({message: "File uploaded succesfully"});
});

export default router;
