export const config = {
  db: {
    host: process.env.DB_HOST,
    port: process.env.PORT || 3036,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  },
  upload: {
    dir: process.env.UPLOAD_DIR || "uploads",
    maxImportSizeMB: Number(process.env.MAX_IMPORT_SIZE) || 5,
  },
};
