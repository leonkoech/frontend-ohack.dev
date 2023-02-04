import React, { useEffect, useState } from "react";
import {  
  ButtonStyled,
  ButtonBasicStyle,
  GridStyled,
  TextStyled,
  TitleStyled,
  TitleContainer,
  CaptionContainer,
  ButtonContainers,
  SpanText,
  BlankContainer,
  BackgroundGrid,
} from "./styles";
import Typewriter from "typewriter-effect";
import { Player } from "@lottiefiles/react-lottie-player";

import * as ga from '../../lib/ga'

function HeroBanner() {
  const JOIN_SLACK_LINK =
    "https://join.slack.com/t/opportunity-hack/shared_invite/zt-1db1ehglc-2tR6zpmszc5898MhiSxHig";
  const openCodeSample = () => {
    gaButton("slack_button", "open_join_slack");
    window.open(JOIN_SLACK_LINK, "_blank", "noopener noreferrer");
  };

  const gaButton = (action, actionName) => {
    ga.event({
      action: action,
      params: {
        action_name: actionName,
      },
    });
  };

  // get width of window on resize
  const [width, setWidth] = useState();
  const functionName = () => {
    setInterval(() => {
      setWidth(window.screen.width);
    }, 500);
  };

  window.addEventListener("resize", functionName);

  useEffect(() => {
    setWidth(window.screen.width);
  }, []);

  return (
    <GridStyled
      container
      direction="row"
      justifyContent="center"
      alignItem="center"
    >
      <BackgroundGrid />
      {/* Left Container */}
      <BlankContainer xs={12} md={7} lg={7}>
        <TitleContainer container>
          <TitleStyled variant="h1">
            The place where
            <SpanText variant="h1">
              <Typewriter
                options={{
                  strings: ["Nonprofits", "Hackers", "Mentors", "Volunteers"],
                  autoStart: true,
                  loop: true,
                }}
              />
            </SpanText>
            unite
          </TitleStyled>
        </TitleContainer>

        <CaptionContainer right={"true"} container>
          <TextStyled>
            Interested in joining? Click to find out more!
          </TextStyled>
          <ButtonContainers container>
            <ButtonStyled onClick={gaButton("button_build_ohack", "find_a_problem")} href="/nonprofit/tRK5YPrc8vpHQabMYIDO">Help us build ohack.dev</ButtonStyled>
            <ButtonStyled onClick={openCodeSample}>Join us on Slack to get involved</ButtonStyled>
            <ButtonBasicStyle onClick={gaButton("button_see_all", "see_all_nonprofit_projects")} href="/nonprofits">See all nonprofit projects</ButtonBasicStyle>
          </ButtonContainers>
        </CaptionContainer>
      </BlankContainer>
      {/* Right Container */}
      <BlankContainer xs={12} md={5} lg={5}>
        {width >= 900 && (
          <Player
            src="https://assets1.lottiefiles.com/packages/lf20_vnikrcia.json"
            className="player"
            loop
            autoplay
            speed={1}
            style={{
              width: width >= 1200 ? "100%" : "100%",
              height: "50rem",
              padding: "0 0",
              right: "0",
              position: "absolute",
            }}
          />
        )}
      </BlankContainer>
    </GridStyled>
  );
}

export default HeroBanner;
