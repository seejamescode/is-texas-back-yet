import React, { useContext } from "react";
import { format, getYear, isBefore, parseISO } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import styled, { ThemeContext } from "styled-components";

const Anchor = styled.a`
  color: inherit;
  font-weight: 600;
  text-decoration: none;
`;

const Bar = styled(motion.div)`
  background: linear-gradient(315deg, #e2ac6b 0%, #cba36d 74%);
  content: "";
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  transform: skewX(-10deg) scale(1.05);
`;

const BarContainer = styled.div`
  border-radius: ${({ theme }) => theme.sizing.lg}rem;
  background: linear-gradient(270deg, #ffffff, #e6e6e6);
  height: ${({ theme }) => theme.sizing.xl}rem;
  margin-top: ${({ theme }) => theme.sizing.lg}rem;
  overflow: hidden;
  width: 100%;
  position: relative;

  :after {
    color: ${({ isZero, theme }) =>
      isZero ? theme.colors.orange : theme.colors.white};
    content: "${({ progress }) => progress}";
    left: ${({ theme }) => theme.sizing.sm}rem;
    height: 100%;
    position: absolute;
    top: 35%;
  }
`;

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 95vh;
`;

const Footer = styled.footer`
  grid-column: 1 / -1;
`;

const Game = styled.li`
  display: flex;
  justify-content: space-between;
  padding-bottom: ${({ theme }) => theme.sizing.xs}rem;
`;

const Grid = styled.div`
  display: grid;
  grid-gap: ${({ theme }) => theme.sizing.xl}rem;
  max-width: 100rem;
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

const Section = styled(motion.section)`
  grid-row: ${({ firstOnMobile }) => (firstOnMobile ? 1 : "unset")};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}rem) {
    padding: ${({ noVerticalPadding, theme }) =>
      noVerticalPadding ? `0 ${theme.sizing.lg}` : theme.sizing.lg}rem;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}rem) {
    grid-row: unset;
  }
`;

const SectionPanel = styled(Section)`
  background: ${({ theme }) => theme.colors.orange};
  border-radius: ${({ theme }) => theme.sizing.lg}rem;
  overflow: hidden;
  padding: ${({ theme }) => theme.sizing.lg}rem;
  padding-bottom: ${({ theme }) => theme.sizing.lg}rem;
  position: relative;
`;

const Schedule = styled.ul`
  list-style: none;
  margin-top: 0;
  padding-left: 0;
`;

const Stadium = styled.img`
  bottom: 0;
  display: flex;
  left: 0;
  opacity: 10%;
  pointer-events: none;
  position: fixed;
  width: 100%;
`;

const TextLg = styled.h1`
  font-size: ${({ theme }) => theme.sizing.lg}rem;
  margin-bottom: ${({ theme }) => theme.sizing.sm}rem;
  margin-top: 0;
  text-align: ${({ textAlign }) => textAlign};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}rem) {
    font-size: ${({ theme }) => theme.sizing.xl}rem;
  }
`;

const TextMd = styled.h2`
  font-size: ${({ theme }) => theme.sizing.sm}rem;
  margin-top: 0;
  text-align: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}rem) {
    font-size: ${({ theme }) => theme.sizing.sm}rem;
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
  margin: 0 auto;
`;

const Home = ({ progress, schedule, scheduleYear, status }) => {
  const {
    colors: { orange },
  } = useContext(ThemeContext);
  const sectionPanelProps = {
    initial: {
      boxShadow: `0px 0px -60px ${orange}, 0px 0px -60px ${orange}`,
    },
    animate: {
      boxShadow: "20px 20px 60px #a94700, -20px -20px 60px #ef6300",
    },
  };

  return (
    <Container>
      <Grid>
        <GridItem>
          <Half>
            <Section noVerticalPadding>
              <picture>
                <source srcSet="static/stadium.webp" type="image/webp" />
                <source srcSet="static/stadium.png" type="image/png" />
                <Stadium src="static/stadium.png" alt="football stadium" />
              </picture>
              <TextLg>Is Texas Back Yet?</TextLg>
              <TextSm>
                For Texas Football to truly be back, we must maintain ten wins
                each season. This is pure science, so share with any misinformed
                colleagues.
              </TextSm>
            </Section>
            <AnimatePresence>
              <SectionPanel
                {...sectionPanelProps}
                key="status"
                transition={{ duration: 1 }}
              >
                <TextLg as="h2" textAlign="center">
                  {status}
                </TextLg>

                <BarContainer isZero={progress == 0} progress={`${progress}%`}>
                  <AnimatePresence>
                    <Bar
                      initial={{
                        width: `${progress - 15}%`,
                      }}
                      animate={{
                        width: `${progress}%`,
                      }}
                      key="bar"
                      transition={{ delay: 0.5, duration: 0.5 }}
                      progress={progress}
                    />
                  </AnimatePresence>
                </BarContainer>
              </SectionPanel>
            </AnimatePresence>
          </Half>
        </GridItem>
        <GridItem>
          <Half>
            <Section firstOnMobile noVerticalPadding>
              <Schedule>
                <TextMd>{scheduleYear} Longhorn Season</TextMd>
                {schedule.map(
                  ({
                    datetime,
                    id,
                    isFinished,
                    isHome,
                    isTimeScheduled,
                    isWin,
                    opponent,
                    pointsOpponent,
                    pointsTexas,
                  }) => (
                    <Game key={id}>
                      <span>
                        {isHome ? "" : "@ "}
                        {opponent}
                      </span>
                      <span>
                        {isFinished
                          ? `${
                              isWin ? "W" : "L"
                            } ${pointsTexas}-${pointsOpponent}`
                          : isTimeScheduled
                          ? format(parseISO(datetime), "M/d, h:mmaaaaa'm'")
                          : format(parseISO(datetime.substring(0, 10)), "M/d")}
                      </span>
                    </Game>
                  )
                )}
              </Schedule>
            </Section>
          </Half>
        </GridItem>
        <Footer>
          <TextXs textAlign="center">
            Made for the sake of a<br />
            meme by{" "}
            <Anchor
              href="https://seejamesdesign.com"
              rel="noopener noreferrer"
              target="_blank"
            >
              James Y Rauhut
            </Anchor>
            .
          </TextXs>
        </Footer>
      </Grid>
    </Container>
  );
};

export async function getStaticProps() {
  const year = getYear(new Date());
  const scheduleYear = isBefore(new Date(), new Date(year, 7, 1))
    ? year - 1
    : year;
  const resSchedule = await fetch(
    `https://api.collegefootballdata.com/games?year=${scheduleYear}&team=Texas&seasonType=both`,
    {
      headers: {
        Authorization: `Bearer ${process.env.COLLEGE_FOOTBALL_API_KEY}`,
      },
    }
  ).catch((error) => {
    // Your error is here!
    console.log(error);
  });
  const dataSchedule = await resSchedule.json();
  const schedule = dataSchedule
    .map(
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
        const isWin = isHome
          ? away_points < home_points
          : away_points > home_points;
        const opponent = isHome ? away_team : home_team;

        return {
          datetime: start_date,
          id,
          isTimeScheduled: !start_time_tbd,
          isFinished: home_points !== null && away_points !== null,
          isHome,
          isWin,
          opponent: opponent === "Oklahoma" && isWin ? "OU Sucks" : opponent,
          pointsOpponent: isHome ? away_points : home_points,
          pointsTexas: isHome ? home_points : away_points,
          venue,
        };
      }
    )
    .sort((a, b) => new Date(a.datetime) - new Date(b.datetime));

  const wins = schedule.filter(
    ({ isFinished, isWin }) => isFinished && isWin
  ).length;
  const status =
    wins >= 10
      ? "Texas is back!"
      : wins === 9
      ? "So, so, close."
      : wins === 8
      ? "Almost..."
      : wins === 7
      ? "Not really."
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
      progress: wins * 10,
      schedule,
      scheduleYear,
      status,
    },
    revalidate: 300,
  };
}

export default Home;
