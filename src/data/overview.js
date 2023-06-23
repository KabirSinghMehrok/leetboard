function fetchUsers() {
  return ["kabir20382", "Uttkxrrsh", "shoumiklodh2001"];
}

async function fetchOverviewData(userList) {
  const baseurl = "https://leetcode-stats-api.herokuapp.com/";
  const fetchedData = {
    users: [],
    easy: [],
    medium: [],
    hard: [],
    total: [],
    userCount: 0
  };

  for (let user of userList) {
    await fetch(baseurl + user)
      .then((response) => response.json())
      .then((dataObject) => {
        const { totalSolved, easySolved, mediumSolved, hardSolved } = dataObject;
        fetchedData['users'].push(user);
        fetchedData['easy'].push(easySolved);
        fetchedData['medium'].push(mediumSolved);
        fetchedData['hard'].push(hardSolved);
        fetchedData['total'].push(totalSolved);
        fetchedData['userCount'] += 1;
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }

  return fetchedData;
}


function parseOverviewData(rawData) {
  // declare the parameters
  
  const barThickness = 10;
  const easyColor = '#96ffaf';
  const mediumColor = '#ffe396';
  const hardColor = '#ff9d96';
  const dataSize = rawData.userCount;
  console.log('the size of the data is: ' + dataSize);
  console.log(rawData);
  console.log(rawData.users.length);
  const data = {}

  data['labels'] = rawData['users']
  data['datasets'] = []

  const easyObject = {
    label: 'Easy done',
    data: rawData['easy'],
    backgroundColor: Array(dataSize).fill(easyColor),
    barThickness
  }

  const mediumObject = {
    label: 'Medium done',
    data: rawData['medium'],
    backgroundColor: Array(dataSize).fill(mediumColor),
    barThickness
  }

  const hardObject = {
    label: 'Hard done',
    data: rawData['hard'],
    backgroundColor: Array(dataSize).fill(hardColor),
    barThickness
  }

  data['datasets'].push(easyObject, mediumObject, hardObject);

  // console.log('printing from parse overview data');
  // console.log(data);
  return data;
}


async function fillOverviewData() {
  const rawData = await fetchOverviewData(fetchUsers());
  return parseOverviewData(rawData);
}

export default fillOverviewData;
