import React from "react";
import { format, parseJSON } from "date-fns";
import styled from "styled-components";

const Anchor = styled.a`
  color: inherit;
  font-weight: 600;
  text-decoration: none;
`;

const Bar = styled.div`
  border-radius: ${({ theme }) => theme.sizing.lg}rem;
  background: linear-gradient(270deg, #ffffff, #e6e6e6);
  height: ${({ theme }) => theme.sizing.xl}rem;
  margin-top: ${({ theme }) => theme.sizing.lg}rem;
  overflow: hidden;
  width: 100%;
  position: relative;

  :after {
    content: "${({ progress }) => progress}";
    left: ${({ theme }) => theme.sizing.sm}rem;
    height: 100%;
    position: absolute;
    top: 35%;
  }

  :before {
    background: linear-gradient(315deg, #e2ac6b 0%, #cba36d 74%);
    content: "";
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    transform: skewX(-10deg) scale(1.05);
    width: ${({ progress }) => progress};
  }
`;

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 95vh;
`;

const Game = styled.li`
  display: flex;
  justify-content: space-between;
  padding-bottom: ${({ theme }) => theme.sizing.xs}rem;
`;

const Grid = styled.div`
  display: grid;
  grid-gap: ${({ theme }) => theme.sizing.xl}rem;
  min-height: 0;
  padding: ${({ theme }) => theme.sizing.lg}rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}rem) {
    grid-template-columns: 2fr 1fr;
    padding: ${({ theme }) => theme.sizing.xl}rem;
  }
`;

const GridItem = styled.div`
  @media (min-width: ${({ theme }) => theme.breakpoints.md}rem) {
    grid-column: ${({ gridColumn }) => gridColumn};
  }
`;

const Half = styled.div`
  display: grid;
  grid-gap: ${({ theme }) => theme.sizing.xl}rem;
`;

const Section = styled.section`
  @media (min-width: ${({ theme }) => theme.breakpoints.md}rem) {
    padding: ${({ noVerticalPadding, theme }) =>
      noVerticalPadding ? `0 ${theme.sizing.lg}` : theme.sizing.lg}rem;
  }
`;

const SectionPanel = styled(Section)`
  background: ${({ theme }) => theme.colors.orange};
  overflow: hidden;
  position: relative;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}rem) {
    border-radius: ${({ theme }) => theme.sizing.lg}rem;
    box-shadow: 20px 20px 60px #a94700, -20px -20px 60px #ef6300;
  }
`;

const Schedule = styled.ul`
  list-style: none;
  margin-top: 0;
  padding-left: 0;
`;

const Stadium = styled.img`
  bottom: 0;
  display: none;
  left: 0;
  opacity: 10%;
  pointer-events: none;
  position: absolute;
  width: 100%;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}rem) {
    display: flex;
  }
`;

const TextLg = styled.h1`
  font-size: ${({ theme }) => theme.sizing.lg}rem;
  margin: 0;
  text-align: ${({ textAlign }) => textAlign};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}rem) {
    font-size: ${({ theme }) => theme.sizing.xl}rem;
  }
`;

const TextMd = styled.h2`
  font-size: ${({ theme }) => theme.sizing.md}rem;
  margin-top: 0;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}rem) {
    font-size: ${({ theme }) => theme.sizing.lg}rem;
  }
`;

const TextSm = styled.p`
  font-size: ${({ theme }) => theme.sizing.sm}rem;
  line-height: 1.65;
  margin: ${({ textAlign }) => textAlign === "center" && "auto"};
  max-width: 33rem;
  text-align: ${({ textAlign }) => textAlign};
`;

const TextXs = styled(TextSm)`
  font-size: ${({ theme }) => theme.sizing.xs}rem;
  padding-bottom: ${({ theme }) => theme.sizing.lg}rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}rem) {
    padding-bottom: ${({ theme }) => theme.sizing.xl}rem;
  }
`;

const Home = ({ progress, schedule, status }) => (
  <Container>
    <Grid>
      <GridItem>
        <Half>
          <Section>
            <TextLg>Is Texas back yet?</TextLg>
            <TextSm>
              2020 is a difficult season for Texas Football with a lot of
              potential. With potentially only ten regular season games plus
              postseason, let’s see if we can get ten wins.
            </TextSm>
          </Section>
          <SectionPanel>
            <TextLg as="h2" textAlign="center">
              {status}
            </TextLg>
            <Bar progress={progress} />
          </SectionPanel>
        </Half>
      </GridItem>
      <GridItem>
        <Half>
          <SectionPanel>
            <TextMd>Do your part to keep the football season going.</TextMd>
            <TextSm>
              Wear a mask, social distance, and enjoy the games from the comfort
              of your home. Don’t make exceptions around family and friends. We
              can collectively help our neighbors, including Texas Football.
              Check out{" "}
              <Anchor
                href="https://www.bmj.com/content/bmj/370/bmj.m3223/F3.large.jpg"
                rel="noopener noreferrer"
                target="_blank"
              >
                this chart from MIT
              </Anchor>{" "}
              to assess the risk of different activities.
            </TextSm>
            <picture>
              <source srcset="static/stadium.webp" type="image/webp" />
              <source srcset="static/stadium.png" type="image/png" />
              <Stadium src="static/stadium.png" alt="football stadium" />
            </picture>
          </SectionPanel>
          <Section noVerticalPadding>
            <Schedule>
              {schedule.map(
                ({
                  datetime,
                  id,
                  isFinished,
                  isTimeScheduled,
                  isWin,
                  opponent,
                  pointsOpponent,
                  pointsTexas,
                }) => (
                  <Game key={id}>
                    <span>{opponent}</span>
                    <span>
                      {isFinished
                        ? `${
                            isWin ? "W" : "L"
                          } ${pointsTexas}-${pointsOpponent}`
                        : `${
                            isTimeScheduled
                              ? format(parseJSON(datetime), "M/d @ h:mmaaaa")
                              : format(parseJSON(datetime), "M/d")
                          }`}
                    </span>
                  </Game>
                )
              )}
            </Schedule>
          </Section>
        </Half>
      </GridItem>
    </Grid>
    <TextXs textAlign="center">
      Made for the sake of a<br />
      meme by{" "}
      <Anchor
        href="https://twitter.com/seejamescode"
        rel="noopener noreferrer"
        target="_blank"
      >
        James Y Rauhut
      </Anchor>
      .
    </TextXs>
  </Container>
);

export async function getStaticProps() {
  const resSchedule = await fetch(
    `https://api.collegefootballdata.com/games?year=2020&team=Texas`
  );
  const dataSchedule = await resSchedule.json();
  const schedule = dataSchedule.map(
    ({
      away_points,
      away_team,
      home_points,
      home_team,
      id,
      start_date,
      start_time_tbd,
      venue,
    }) => {
      const isHome = home_team === "Texas";

      return {
        datetime: start_date,
        id,
        isTimeScheduled: !start_time_tbd,
        isFinished: home_points !== null && away_points !== null,
        isWin: isHome ? away_points < home_points : away_points > home_points,
        opponent: isHome ? away_team : home_team,
        pointsOpponent: isHome ? away_points : home_points,
        pointsTexas: isHome ? home_points : away_points,
        venue,
      };
    }
  );

  const wins = schedule.filter(({ isFinished, isWin }) => isFinished && isWin)
    .length;
  const status =
    wins >= 10
      ? "Texas is back!"
      : wins === 9
      ? "So, so, close!"
      : wins === 8
      ? "Almost..."
      : wins === 7
      ? "Getting there."
      : wins === 6
      ? "Not yet."
      : wins === 5
      ? "Halfway back."
      : wins === 4
      ? "Nay"
      : wins === 3
      ? "Not close."
      : wins === 2
      ? "Nope."
      : wins === 1
      ? "Naw."
      : "No.";

  return {
    props: {
      progress: `${wins * 10}%`,
      schedule,
      status,
    },
    revalidate: 300,
  };
}

export default Home;
