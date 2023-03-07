import puppeteer from 'puppeteer'
import path from 'path'
import { cwd } from 'node:process'
import fetch from 'node-fetch'
import dotenv from 'dotenv'
import fs from 'node:fs'

(async () => {
  dotenv.config()
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  // Set the viewport's width and height
  await page.setViewport({ width: 1280, height: 800 })

  const username = "doneber"
  const endpoint = 'https://api.github.com/graphql';
  const query = `{
  user(login: "${username}") {
    pinnedItems(first: 6, types: REPOSITORY) {
      nodes {
        ... on Repository {
          name
          description
          repo_url: url
          homepage_url: homepageUrl
        }
      }
    }
  }
}`;

  const headers = {
    'Authorization': `Bearer ${process.env.GH_TOKEN_ACCESS}`,
    'Content-Type': 'application/json'
  };

  const githubProjects = await fetch(endpoint, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({ query: query })
  })
    .then(response => response.json())
    .then(data => data['data']['user']['pinnedItems']['nodes'])
    .catch(error => console.error(error));
    
  const projectsData = githubProjects.map((project) => {
    return {
      ...project,
      image: `${project.name}.jpg`
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
      await page.screenshot({ path: path.join(cwd(), 'public', 'screens', `${project.name}.jpg`) })
    }

  } catch (error) {
    console.log(`Error: ${error.message}`)
  } finally {
    await browser.close()
    console.log('Finished');
  }

})()
