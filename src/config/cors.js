// Setting dynamic origins
import 'dotenv/config';

const corsOptionForCredentials = {
  origin: process.env.CLIENT_BASE_URL,
  methods: ["GET", "POST", "DELETE", "PUT", "OPTIONS"],
  credentials: true,
};

export default corsOptionForCredentials;
