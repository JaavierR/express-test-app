import express from 'express'
import { chromium } from 'playwright'

const app = express()

app.use(express.json())

const PORT = 3000

app.get('/', async (req, res) => {
  console.log('someone pinged me')
  // const books = []
  const id = req.query.id ?? 1
  console.log(id)

  const browser = await chromium.launch()
  const page = await browser.newPage()

  // Also use .click() to click on the button
  const [download] = await Promise.all([
    page.waitForEvent('download'),
    page
      .goto(
        'https://www.dailleventos.cl/wp-content/uploads/2020/08/Catalogo_Dailleventos_compressed.pdf'
      )
      .catch((e) => e)
  ])

  console.log(await download.path())
  await browser.close()

  // await page.screenshot({ path: 'books1.png' })

  // const titles = page.locator('a[title]')

  // for (let i = 0; i < (await titles.count()); i++) {
  //   const text = await titles.nth(i).textContent()
  //   books.push({ title: text })
  // }

  await browser.close()

  // res.json({ message: books })
  res.json({ message: 'ok' })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
