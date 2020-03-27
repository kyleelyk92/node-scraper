const cheerio = require('cheerio');
const puppeteer = require('puppeteer');

const url = 'https://www.reddit.com/r/news/';

console.log(`Scraping ${url}`);

puppeteer
  .launch()
  .then(browser => browser.newPage())
  .then(page => {
    return page.goto(url).then(function () {
      return page.content();
    });
  })
  .then(html => {
    const $ = cheerio.load(html);
    $('h3').each((i, elem) => {

      console.log(`Title ${i + 1} -- ${elem.children[0].data}`);
    })


    // const newsHeadlines = [];
    // $('a[href*="/r/news/comments"] > h2').each(function () {
    //   newsHeadlines.push({
    //     title: $(this).text(),
    //   });
    // });

    // console.log(newsHeadlines);
  })
  .catch(console.error);