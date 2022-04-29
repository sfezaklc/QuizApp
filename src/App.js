import './App.css';
import { Grid, styled, Paper, FormControlLabel, Button, FormControl, FormLabel, RadioGroup, Radio } from '@mui/material';
import { useState, useEffect } from 'react';
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
function App() {
  const questions = [
    {
      question: 'En güzel şehir Neresidir?', answerId: 3, answer: [{
        id: 1, title: 'Ankara',
      }, {
        id: 2, title: 'İstanbul'
      }, {
        id: 3, title: 'İzmir'
      }, {
        id: 4, title: 'Adana'
      }]
    }, {
      question: 'Hangisinde eş anlamlı kelimeler vardır?', answerId: 3, answer: [{
        id: 1, title: 'kara-ak'
      }, {
        id: 2, title: 'siyah-beyaz'
      }, {
        id: 3, title: 'al-kırmızı'
      }, {
        id: 4, title: 'kuzey-güney'
      }]
    }, {
      question: 'Mustafa Kemal Atatürk kaç yılında vefat etmiştir?', answerId: 4, answer: [{
        id: 1, title: '1881'
      }, {
        id: 2, title: '1913'
      }, {
        id: 3, title: '1936'
      }, {
        id: 4, title: '1938'
      }]
    }, {
      question: "React ın geliştiricisi kimdir?", answerId: 4, answer: [{
        id: 1, title: "Google",
      }, {
        id: 2, title: "Amazon",
      }, {
        id: 3, title: "Apple",
      }, {
        id: 4, title: "Facebook",
      },],
    }, {
      question: 'Dünyanın yüzölçümü en büyük ülkesi hangisidir?', answerId: 4, answer: [{
        id: 1, title: 'Türkiye'
      }, {
        id: 2, title: 'Amerika'
      }, {
        id: 3, title: 'Çin'
      }, {
        id: 4, title: 'Rusya'
      }]
    }, {
      question: "Lozan anlaşmasının gizli maddesi hangisidir?", answerId: 4, answer: [{
        id: 1, title: "2023'e kadar bor kullanılamaz",
      }, {
        id: 2, title: "Ekonomide şahlanma yasak",
      }, {
        id: 3, title: "MEB ABD tarafından yönetilecek",
      }, {
        id: 4, title: "Hiçbiri",
      }]
    }
  ]
  const [value, setValue] = useState()
  const [score, setScore] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [joker, setJoker] = useState(2)
  const [isFinished, setIsFinished] = useState(false)
  const [color, setColor] = useState('#DB4437')
  console.log(color)
  const handleChange = (e) => {
    setValue(e.target.value)
  }
  const NextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      let nextQuestion = currentQuestion + 1
      setCurrentQuestion(nextQuestion)
      if (value == questions[currentQuestion].answerId) {
        setScore(score + 10)
      }
    }
    else {
      setIsFinished(true)
      if (value == questions[currentQuestion].answerId) {
        setScore(score + 10)
      }
    }

  }
  const useJoker = () => {
    setJoker(joker - 1)
    setScore(score + 10)
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
    else {
      setIsFinished(true)
    }
  }

  useEffect(() => {
    if (score > 20) {
      const newColor = score > 50 ? '#0F9D58' : '#ffff40'
      setColor(newColor)
    }
  }, [score])


  return (
    <div className="App" >
      <Grid container spacing={2} sx={{ mt: 2 }} textAlign={'center'} justifyContent={'center'}>
        <Grid item xs={8} >
          <Item sx={{ backgroundColor: color }}>SCORE: {score}</Item>
        </Grid>
        {!isFinished ?
          <>
            <Grid item xs={8}>
              <FormControl>
                <FormLabel id="demo-controlled-radio-buttons-group">
                  {questions[currentQuestion].question}
                </FormLabel>
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={value}
                  onChange={handleChange}
                >
                  {questions[currentQuestion].answer.map(el => (
                    <FormControlLabel value={el.id} key={el.id} control={<Radio />} label={el.title} />
                  ))}
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={8}>
              <Button sx={{ mr: 2 }} color="secondary" variant="contained" onClick={useJoker} disabled={joker === 0}>Joker({joker})</Button>
              <Button variant="contained" onClick={NextQuestion}>Cevapla</Button>
            </Grid>
          </>
          : <Grid item xs={8}>Soruların hepsini cevapladınız</Grid>}
      </Grid>
    </div >
  );
}

export default App;
