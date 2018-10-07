const fetch = require("node-fetch");
const HTMLParser = require("node-html-parser");

let schedule = {};
const updateSchedule = () => {
  fetch("https://texassports.com/schedule.aspx?schedule=386")
    .then(res => res.text())
    .then(html => {
      schedule = HTMLParser.parse(html)
        .querySelectorAll(".sidearm-schedule-game")
        .map(gameRow => {
          let result = null;
          let score = null;

          if (gameRow.querySelector(".sidearm-schedule-game-result") !== null) {
            const resultRows = gameRow.querySelector(
              ".sidearm-schedule-game-result"
            ).childNodes;
            for (let i = 0; i < resultRows.length; i++) {
              if (
                resultRows[i].rawText.includes("L") ||
                resultRows[i].rawText.includes("W")
              ) {
                result = resultRows[i].rawText.replace(",", "");
              }

              if (resultRows[i].rawText.includes("-")) {
                score = resultRows[i].rawText;
              }
            }
          }

          const context = gameRow.querySelector(
            ".sidearm-schedule-game-conference-vs"
          ).childNodes[1]
            ? gameRow.querySelector(".sidearm-schedule-game-conference-vs")
                .childNodes[1].childNodes[0].rawText
            : null;

          const date = gameRow
            .querySelector(".sidearm-schedule-game-opponent-date")
            .childNodes[1].childNodes[0].rawText.split("(")[0];

          return {
            opponent: gameRow.querySelector(
              ".sidearm-schedule-game-opponent-name a"
            ).childNodes[0].rawText,
            context,
            date,
            result,
            score
          };
        });
    });
};

updateSchedule();
setInterval(() => {
  updateSchedule();
}, 60000);

module.exports = app => {
  app.get("/schedule", (req, res) => {
    res.send(schedule);
  });
};
