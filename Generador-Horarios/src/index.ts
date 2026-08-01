import express from 'express';
import cors from "cors";
import courseRoutes from './routes/course.routes.js';
import scheduleRoutes from './routes/schedule.routes.js';

const app = express();
const PORT = 3001;

app.use(cors())
app.use(express.json());

app.use("/courses", courseRoutes);
app.use('/schedules', scheduleRoutes);

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`)
});