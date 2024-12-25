const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors({
  origin: 'https://your-react-app-url.com', 
  methods: ['POST'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());

app.post('/factcheck', (req, res) => {
  const { fact } = req.body;

  // Sadə fact-checking məntiqini buraya əlavə edin
  const score = calculateFactScore(fact);

  res.json({
    score: score,
    message: 'Fact check completed',
    details: 'Əlavə məlumatlar'
  });
});

function calculateFactScore(fact) {
  // Faktın etibarlılığını qiymətləndirən sadə alqoritm
  const keywords = ['fake', 'false', 'true', 'verified'];
  const score = keywords.some(keyword => 
    fact.toLowerCase().includes(keyword)
  ) ? 80 : 50;

  return score;
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});