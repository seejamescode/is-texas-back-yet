const fetch = require("node-fetch");
const HTMLParser = require("node-html-parser");

let schedule = [
  {
    opponent: "Maryland",
    context: "at",
    date: "Sep 1 ",
    result: "L",
    score: "29-34"
  },
  {
    opponent: "Tulsa",
    context: "vs",
    date: "Sep 8 ",
    result: "W",
    score: "28-21"
  },
  {
    opponent: "USC",
    context: "vs",
    date: "Sep 15 ",
    result: "W",
    score: "37-14"
  },
  {
    opponent: "TCU",
    context: "vs",
    date: "Sep 22 ",
    result: "W",
    score: "31-16"
  },
  {
    opponent: "Kansas State",
    context: "at",
    date: "Sep 29 ",
    result: "W",
    score: "19-14"
  },
  {
    opponent: "Oklahoma",
    context: "vs",
    date: "Oct 6 ",
    result: "W",
    score: "48-45"
  },
  {
    opponent: "Baylor",
    context: "vs",
    date: "Oct 13 ",
    result: "W",
    score: "23-17"
  },
  {
    opponent: "Oklahoma State ",
    context: "at",
    date: "Oct 27 ",
    result: "L",
    score: "35-38"
  },
  {
    opponent: "West Virginia ",
    context: "vs",
    date: "Nov 3 ",
    result: "L",
    score: "41-42"
  },
  {
    opponent: "Texas Tech",
    context: "at",
    date: "Nov 10 ",
    result: "W",
    score: "41-34"
  },
  {
    opponent: "Iowa State",
    context: "vs",
    date: "Nov 17 ",
    result: "W",
    score: "24-10"
  },
  {
    opponent: "Kansas",
    context: "at",
    date: "Nov 23 ",
    result: "W",
    score: "24-17"
  },
  {
    opponent: "Oklahoma",
    context: "vs",
    date: "Dec 1 ",
    result: "L",
    score: "27-39"
  },
  {
    opponent: "Georgia",
    context: "vs",
    date: "Jan 1 ",
    result: "W",
    score: "28-21"
  }
];

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

// Commented out for fastest response of being back

// updateSchedule();
// setInterval(() => {
//   updateSchedule();
// }, 60000);

module.exports = app => {
  app.get("/schedule", (req, res) => {
    res.send(schedule);
  });
};
