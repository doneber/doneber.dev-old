import puppeteer from 'puppeteer'
import path from 'path'
import { cwd } from 'node:process'
import fetch from 'node-fetch'
import fs from 'node:fs'

(async () => {

  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  // Set the viewport's width and height
  await page.setViewport({ width: 1280, height: 800 })

  const username = "doneber"
  const url = `https://api.github.com/users/${username}/repos?sort=pushed&direction=desc&per_page=5`
  const githubProjects = await fetch(url).then((res) => res.json())
  const projectsData = githubProjects.map((project) => {
    return {
      name: project.name,
      description: project.description,
      html_url: project.html_url,
      homepage_url: project.homepage,
      image: `${project.name}.jpg`,
    }
  })

  // Save the data in a json file
  const jsonString = JSON.stringify({ projects: projectsData })
  fs.writeFile(path.join(cwd(), 'gh_projects_data', 'projects.json'), jsonString, (err) => {
    if (err) {
      console.log('Error writing file:', err);
    } else {
      console.log('File saved successfully');
    }
  })

  try {
    // iterate all the websites ans save the screenshot
    for (const project of projectsData) {
      await page.goto(project.homepage_url)
      await page.screenshot({ path: path.join(cwd(), 'gh_projects_data', 'screens', `${project.name}.jpg`) })
    }

  } catch (error) {
    console.log(`Error: ${error.message}`)
  } finally {
    await browser.close()
    console.log('Finished');
  }

})()
