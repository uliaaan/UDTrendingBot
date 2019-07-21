const cheerio = require('cheerio');
const { simpleRequest } = require('../utils/request');

const getHTML = async () => await simpleRequest(process.env.MAIN_URL);

const parseHTML = async data => {
  const $ = cheerio.load(data);
  const list = [];
  $('.trending-words-panel ul li a').each(function(i, e) {
    list.push(
      $(this)
        .text()
        .trim()
    );
  });

  return list;
};

const getTrendingList = async () => {
  const data = await getHTML();
  const parsedList = await parseHTML(data);
  return parsedList;
};

const getDefinitions = async () => {
  const list = await getTrendingList();
  const promiseList = await list.map(item =>
    simpleRequest(process.env.WORD_URL + item)
  );
  const fullDefinitionsList = await Promise.all(promiseList);

  const definitions = [];
  fullDefinitionsList.forEach(item => {
    if (!item) return;
    const p = JSON.parse(item);
    definitions.push(p.list[0]);
  });

  return definitions;
};

module.exports = getDefinitions;
