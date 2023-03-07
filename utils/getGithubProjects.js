import path from 'path'
import { cwd } from 'node:process'
import fetch from 'node-fetch'
import dotenv from 'dotenv'
import fs from 'node:fs'

(async () => {
  dotenv.config()
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

 

})()
