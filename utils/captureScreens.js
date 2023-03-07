import path from 'path'
import { cwd } from 'node:process'
import puppeteer from 'puppeteer'
import projects from '../gh_projects_data/projects.json' assert { type: 'json' };

// (async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  // Set the viewport's width and height
  await page.setViewport({ width: 1280, height: 800 })

  try {
    const projectsData = projects.projects
    // iterate all the websites ans save the screenshot
    for (const project of projectsData) {
      await page.goto(project.homepage_url)
      await page.waitForTimeout(1000)
      await page.screenshot({ path: path.join(cwd(), 'public', 'screens', `${project.name}.jpg`) })
      console.log('Screenshot saved', { path: path.join(cwd(), 'public', 'screens', `${project.name}.jpg`) });
    }

  } catch (error) {
    console.log(`Error: ${error.message}`)
  } finally {
    await browser.close()
    console.log('Finished');
  }
// })