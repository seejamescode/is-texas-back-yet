import React, { useContext, useState } from "react";
import { format, getYear, isBefore, parseISO } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import styled, { ThemeContext } from "styled-components";
import Image from "next/image";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Back from "../components/back";

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
  background: linear-gradient(270deg, #e9e9e9, #e6e6e6);
  height: ${({ theme }) => theme.sizing.xl}rem;
  margin-top: ${({ theme }) => theme.sizing.sm}rem;
  overflow: hidden;
  width: 100%;
  position: relative;
  z-index: 1;

  :after {
    color: ${({ isZero, theme }) =>
      isZero ? theme.colors.white : theme.colors.orange};
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
  padding: ${({ theme }) => theme.sizing.xl}rem
    ${({ theme }) => theme.sizing.sm}rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}rem) {
    grid-template-columns: 2fr 1fr;
    padding: ${({ theme }) => theme.sizing.xl}rem;
  }
`;

const GridItem = styled.div`
  @media (min-width: ${({ theme }) => theme.breakpoints.md}rem) {
    grid-column: ${({ gridColumn }) => gridColumn};
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;

const Half = styled.div`
  display: grid;
`;

const ImageContainer = styled.div`
  display: flex;
  margin-top: -${({ theme }) => theme.sizing.lg}rem;
  max-width: ${({ theme }) => theme.breakpoints.md}rem;
  padding: 0 ${({ theme }) => theme.sizing.sm}rem;
  transform: translateY(6%);

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}rem) {
    margin-top: -3rem;
    transform: translateY(6%);
  }
`;

const PleaseWear = styled.a`
  background: #3c486b;
  background: linear-gradient(45deg, #3c486b, #516090);
  border-radius: 1rem;
  display: flex;
  gap: 2rem;
  margin: auto;
  margin-bottom: 1rem;
  max-width: 20rem;
  padding: 1rem 2rem;
  position: relative;
  text-decoration: none;
  z-index: 1;

  * {
    color: #f0f0f0;
    font-size: 1rem;
    margin: 0;
    text-align: left !important;
  }

  .carousel-root {
    flex: 1;
    transform: scale(1.75);
    transform-origin: center center;
  }
`;

const PleaseWearText = styled.div`
  display: flex;
  flex: 2;
  flex-direction: column;
  gap: 0.5rem;
  justify-content: center;
`;

const Section = styled(motion.section)`
  align-items: center;
  display: flex;
  flex-direction: column;
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
  padding: ${({ theme }) => theme.sizing.md}rem
    ${({ theme }) => theme.sizing.sm}rem;
  position: relative;
`;

const Schedule = styled.ul`
  list-style: none;
  margin-top: 0;
  padding-left: 0;
  width: 100%;
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
  line-height: 1;
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
  opacity: 75%;
`;

const Home = ({ isBack, progress, schedule, scheduleYear, status }) => {
  const {
    colors: { orange },
  } = useContext(ThemeContext);

  const sectionPanelProps = {
    initial: {
      boxShadow: `0px 0px -60px ${orange}, 0px 0px -60px ${orange}`,
    },
    animate: {
      boxShadow: "20px 20px 60px #cfcfcf, -20px -20px 60px #cacaca",
    },
  };

  return (
    <>
      <Container>
        <picture>
          <source srcSet="static/stadium.webp" type="image/webp" />
          <source srcSet="static/stadium.png" type="image/png" />
          <Stadium src="static/stadium.png" alt="football stadium" />
        </picture>
        <Grid>
          <GridItem>
            <Half>
              <Section noVerticalPadding style={{ zIndex: 1 }}>
                <TextLg>Is Texas Back Yet?</TextLg>
                <TextLg
                  as="h4"
                  style={{
                    fontSize: "2rem",
                    marginTop: "-.25rem",
                  }}
                >
                  <i>Big 12 Farewell Tour</i>
                </TextLg>
                <ImageContainer>
                  <Image
                    src="/static/big-12-farewell-tour.png"
                    width={4689}
                    height={2374}
                  />
                </ImageContainer>
                {/* <TextSm>
                For Texas Football to truly be back, we must maintain ten wins
                each season. This is pure science, so share with any misinformed
                colleagues.
              </TextSm> */}
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
                  <BarContainer
                    isZero={progress == 0}
                    progress={`${progress}% back`}
                  >
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
                      record,
                    }) => (
                      <Game key={id}>
                        <div>
                          <span>
                            {isHome ? "" : "@ "}
                            <span
                              dangerouslySetInnerHTML={{ __html: opponent }}
                            />
                          </span>
                          <br />
                          <TextXs>{record.join("-")}</TextXs>
                        </div>
                        <span>
                          {isFinished
                            ? `${
                                isWin ? "W" : "L"
                              } ${pointsTexas}-${pointsOpponent}`
                            : isTimeScheduled
                            ? format(parseISO(datetime), "M/d, h:mmaaaaa'm'")
                            : format(
                                parseISO(datetime.substring(0, 10)),
                                "M/d"
                              )}
                        </span>
                      </Game>
                    )
                  )}
                </Schedule>
              </Section>
            </Half>
          </GridItem>
          <Footer>
            <PleaseWear href="https://pleasewear.co" target="_blank">
              <Carousel
                autoPlay
                infiniteLoop
                interval={4000}
                showArrows={false}
                showStatus={false}
                showIndicators={false}
                showThumbs={false}
                transitionTime={2000}
              >
                <div>
                  <img src="/static/please/1.png" />
                </div>
                <div>
                  <img src="/static/please/5.png" />
                </div>
                <div>
                  <img src="/static/please/2.png" />
                </div>
                <div>
                  <img src="/static/please/6.png" />
                </div>
                <div>
                  <img src="/static/please/3.png" />
                </div>
                <div>
                  <img src="/static/please/4.png" />
                </div>
              </Carousel>
              <PleaseWearText>
                <Image
                  alt="please wear .co"
                  src="/static/please/please-wear-white.png"
                  height={304}
                  width={2188}
                />
                <p>Sustainable styles to provoke politely. →</p>
              </PleaseWearText>
            </PleaseWear>
          </Footer>
        </Grid>
      </Container>
      {isBack ? <Back /> : null}
    </>
  );
};

export async function getStaticProps() {
  const year = getYear(new Date());
  const scheduleYear = isBefore(new Date(), new Date(year, 6, 1))
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
  const promiseSchedule = dataSchedule
    .map(
      async ({
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
        const isWin =
          (isHome ? away_points < home_points : away_points > home_points) ||
          true; // TODO: Remove true for publish
        const opponent = isHome ? away_team : home_team;

        const resRecord = await fetch(
          `https://api.collegefootballdata.com/teams/matchup?team1=Texas&team2=${opponent}`,
          {
            headers: {
              Authorization: `Bearer ${process.env.COLLEGE_FOOTBALL_API_KEY}`,
            },
          }
        ).catch((error) => {
          // Your error is here!
          console.log(error);
        });
        const dataRecord = await resRecord.json();

        return {
          datetime: start_date,
          id,
          isTimeScheduled: !start_time_tbd,
          isFinished: home_points !== null && away_points !== null,
          isHome,
          isWin,
          opponent:
            opponent === "Alabama" && isWin
              ? "We <s>Want</s> <i>Beat</i> <strong>Bama</strong>"
              : opponent === "Baylor"
              ? "Bye Bye <strong>Baylor</strong>"
              : opponent === "Kansas"
              ? "Call us, <strong>Kansas</strong>"
              : opponent === "Oklahoma" && isWin
              ? "<strong>OU</strong> still sucks"
              : opponent === "Oklahoma"
              ? "y<strong>OU</strong> and me 4ever"
              : opponent === "Houston"
              ? "Hi and bye <strong>Houston</strong>"
              : opponent === "BYU"
              ? "BYE <strong>BYU</strong>"
              : opponent === "Kansas State"
              ? "Kiss <strong>Kansas State</strong> goodbye"
              : opponent === "TCU"
              ? "Write you, <strong>TCU</strong>"
              : opponent === "Iowa State"
              ? "I-won't-miss <strong>Iowa State</strong>"
              : opponent === "Texas Tech"
              ? "Take care, <strong>Texas Tech</strong>"
              : `<strong>${opponent}</strong>`,
          pointsOpponent: isHome ? away_points : home_points,
          pointsTexas: isHome ? home_points : away_points,
          record: [dataRecord.team1Wins, dataRecord.team2Wins, dataRecord.ties],
          venue,
        };
      }
    )
    .sort((a, b) => new Date(a.datetime) - new Date(b.datetime));
  const schedule = await Promise.all(promiseSchedule);

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
      isBack: wins >= 10,
      progress: wins * 10,
      schedule,
      scheduleYear,
      status,
    },
    revalidate: 300,
  };
}

export default Home;
