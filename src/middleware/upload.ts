import multer from "multer";
import path from "path";
import fs from "fs";

// On Railway the container filesystem is ephemeral: anything written to the
// working directory is wiped on every deploy/restart. To keep uploads, mount a
// Railway Volume and point UPLOAD_DIR at it (e.g. UPLOAD_DIR=/data/uploads).
// Falls back to a local "uploads" folder for development.
export const UPLOAD_DIR = process.env.UPLOAD_DIR || "uploads";

// Ensure the target directory exists before multer tries to write to it.
fs.mkdirSync(UPLOAD_DIR, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOAD_DIR);
  },

  filename: (req, file, cb) => {
    const uniqueName = Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

export const upload = multer({
  storage,
  // Cap upload size so a large file can't fill the disk and crash the container.
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
});
