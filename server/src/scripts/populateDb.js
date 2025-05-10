const fs = require('fs');
const axios = require('axios');
//Did't commit data.json since is scrapped data
const data = JSON.parse(fs.readFileSync('data.json', 'utf8'));

data.forEach(async (item) => {
  try {
    const data = {
        name: item.jobTitle,
        link: item.jobLink,
        description: item.description,
        skills: [...item.tags.hardSkills, ...item.tags.softSkills, ...item.tags.technologies],
        companyName: item.company,
    }
    const response = await axios.post('http://localhost:4000/internship/create', {
    ...data});


    console.log(`Success for item :`, response.data);
  } catch (error) {
    console.error(`Error for item $:`, error);
  }
});
