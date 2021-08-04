import fetch from "node-fetch";
import { JSDOM } from "jsdom";

const API_URL = "https://codequiz.azurewebsites.net/";

const getWebsiteContent = async () => {
  const response = await fetch(API_URL, {
    method: "GET",
    headers: {
      cookie: "hasCookie=true;",
    },
  });

  return response.text();
};

export const getNavValue = (
  content: string,
  fundCode: string
): Promise<string | null> => {
  return new Promise((resolve, reject) => {
    const dom = new JSDOM(content);

    dom.window.document
      .querySelectorAll("tr:not(:first-child)") // skip header table row
      .forEach((element) => {
        const fundCodeContent = element.querySelector("td")?.textContent;

        const isNotMatchFunCode = !fundCodeContent?.includes(fundCode);

        if (!fundCodeContent || isNotMatchFunCode) return;

        const navValue = element.querySelectorAll("td")?.[1]?.textContent; // get first child from each row which is fundcode eg. BM70SSF, BEQSSF
        resolve(navValue);
      });

    reject(null);
  });
};

const run = async () => {
  if (process.argv.length < 3) {
    throw Error("require fund code");
  }

  const content = await getWebsiteContent();

  const fundCode = process.argv[2];

  const navValue = await getNavValue(content, fundCode);
  if (!navValue) throw Error("not found nav value");

  console.log("[Nav value result] => ", navValue);
};
run();
