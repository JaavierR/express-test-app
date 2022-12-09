import express from 'express'
import { chromium } from 'playwright'

const app = express()

app.use(express.json())

const PORT = 3000

app.get('/', async (req, res) => {
  console.log('someone pinged me')
  const books = []
  const id = req.query.id
  console.log(id)

  const browser = await chromium.launch()
  const page = await browser.newPage()

  await page.goto(`https://books.toscrape.com/catalogue/page-${id}.html`)
  await page.screenshot({ path: 'books.png' })

  const titles = page.locator('a[title]')

  for (let i = 0; i < (await titles.count()); i++) {
    const text = await titles.nth(i).textContent()
    books.push({ title: text })
  }

  await browser.close()

  res.json({ message: books })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
