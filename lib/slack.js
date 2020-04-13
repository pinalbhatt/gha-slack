const axios = require('axios').default;

const getCatOb = (cat) => {
  let catMsg;
  let img;
  switch (cat) {
    case 'broadcast': {
      catMsg = 'Message Broadcast';
      img = 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR0syM84yMHZY6ZpmKgMIlUpEj5vibeBi_897KKvMX37lms_ZsI&usqp=CAU';
      break;
    }
    case 'failure': {
      catMsg = 'Oops! you have a failure';
      img = 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTghhv4H4t4ufRvtzJAXGscEsiZ0ANiKNWEK_Cnu2TgymW0Dwd-&usqp=CAU';
      break;
    }
    default: {
      catMsg = 'You have notification';
      img = 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQass1mZPNJmdfHfaUt0z5VY78bG0z79Y2S28MRzt8fyzipRAz_&usqp=CAU';
      break;
    }
  }
  return { catMsg, img };
};

const getGhOb = () => {
  const repo = process.env.GITHUB_REPOSITORY;
  const branch = (process.env.GITHUB_REF).replace('refs/heads/', '');
  const event = process.env.GITHUB_EVENT_NAME;
  const author = process.env.GITHUB_ACTOR;
  const workFlow = process.env.GITHUB_WORKFLOW;
  const link = `https://github.com/${process.env.GITHUB_REPOSITORY}/commit/${process.env.GITHUB_SHA}/checks`;
  return {
    repo, branch, event, author, workFlow, link,
  };
};

const getPayload = (cat, msg) => {
  const catOb = getCatOb(cat);
  const ghOb = getGhOb();
  const payload = {
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `:github: Actions - *${catOb.catMsg}*`,
        },
        accessory: {
          type: 'image',
          image_url: catOb.img,
          alt_text: catOb.catMsg,
        },
      },
      {
        type: 'section',
        fields: [
          {
            type: 'mrkdwn',
            text: `*Repo:*\n${ghOb.repo}`,
          },
          {
            type: 'mrkdwn',
            text: `*Branch:*\n${ghOb.branch}`,
          },
          {
            type: 'mrkdwn',
            text: `*Event:*\n${ghOb.event}`,
          },
          {
            type: 'mrkdwn',
            text: `*Author:*\n${ghOb.author}`,
          },
          {
            type: 'mrkdwn',
            text: `*Workflow:*\n${ghOb.workFlow}`,
          },
        ],
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*Message:*\n${msg}, \n*<${ghOb.link}|Link to Logs>*`,
        },
      },
      {
        type: 'context',
        elements: [
          {
            type: 'mrkdwn',
            text: ':github: Actions Notification - Powered by Dragon.',
          },
        ],
      },
    ],
  };
  return payload;
};

const postMsg = async (url, cat, msg) => {
  const payload = getPayload(cat, msg);
  await axios.post(url, payload);
};

module.exports = {
  postMsg,
};
