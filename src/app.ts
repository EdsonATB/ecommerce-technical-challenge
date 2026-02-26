import express, { Application, Request, Response, NextFunction} from 'express';
import cors from 'cors';
import routes from './routes';

const app: Application = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({extended:true}));

app.use((req: Request, res: Response, next: NextFunction) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});

//rotas

app.get('/', (req: Request, res: Response)=> {
    res.status(200).json({
        success: true,
        message: 'E-Commerce Test',
        version: '1.0.0',
        endpoints: {
            health: '/api/health',
            customers: 'api/customers',
            products: '/api/products',
            orders: '/api/orders',
        }
    })
});

app.use('/api', routes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(`Error: ${err}.`);
    
    res.status(500).json({
        success: false,
        error: 'Internal server error',
        message: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

export default app;