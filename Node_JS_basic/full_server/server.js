import app from './routes/index';

const port = 1245;

app.listen(port, () => {
  console.log(`Servidor corriendo en el pueto: ${port}`);
});

export default app;
