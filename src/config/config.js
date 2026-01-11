export const config = {
  db: {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 3036,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    ssl: {
      rejectUnauthorized: true,
      minVersion: "TLSv1.2",
    },
  },
  upload: {
    dir: process.env.UPLOAD_DIR || "uploads",
    maxImportSizeMB: Number(process.env.MAX_IMPORT_SIZE) || 5,
  },
};
