import app from './app.js'
import { PORT } from './config.js'
//app.listen(PORT); //3000
//console.log('servidor esta ejecutando', PORT)

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor ejecutándose en http://192.168.1.165:${PORT}`);
});