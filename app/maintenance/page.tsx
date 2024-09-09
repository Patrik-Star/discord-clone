"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  emojiCursor,
  ghostCursor,
  rainbowCursor,
  fairyDustCursor,
  trailingCursor,
  textFlag,
  bubbleCursor,
  snowflakeCursor,
  clockCursor,
  characterCursor,
} from "cursor-effects";

interface CursorEffectConfig {
  effect: Function;
  params?: any;
}

enum CursorEffectName {
  Emoji = "Emoji",
  Ghost = "Ghost",
  Rainbow = "Rainbow",
  FairyDust = "FairyDust",
  Trailing = "Trailing",
  TextFlag = "TextFlag",
  Bubble = "Bubble",
  Snowflake = "Snowflake",
  Clock = "Clock",
  Character = "Character",
}

const getCursorEffectConfig = (
  effectName: CursorEffectName
): CursorEffectConfig | null => {
  const cursorEffects: { [key in CursorEffectName]: CursorEffectConfig } = {
    [CursorEffectName.Emoji]: {
      effect: emojiCursor,
      params: { emoji: ["🔥", "🐬", "🦆"] },
    },
    [CursorEffectName.Ghost]: { effect: ghostCursor },
    [CursorEffectName.Rainbow]: { effect: rainbowCursor },
    [CursorEffectName.FairyDust]: { effect: fairyDustCursor },
    [CursorEffectName.Trailing]: { effect: trailingCursor },
    [CursorEffectName.TextFlag]: {
      effect: textFlag,
      params: {
        text: "Discord Clone",
        color: "gray",
        size: 20,
        font: "Arial",
        textSize: 60,
        gap: 40,
      },
    },
    [CursorEffectName.Bubble]: { effect: bubbleCursor },
    [CursorEffectName.Snowflake]: { effect: snowflakeCursor },
    [CursorEffectName.Clock]: {
      effect: clockCursor,
      params: {
        dateColor: "red",
        faceColor: "blue",
        hoursColor: "green",
        minutesColor: "yellow",
        secondsColor: "purple",
      },
    },
    [CursorEffectName.Character]: {
      effect: characterCursor,
      params: { characters: ["test", "test2"], colors: ["red", "green"] },
    },
  };

  return cursorEffects[effectName] || null;
};

let CURSOR_EFFECT: any;

// TODO: Fix the cursor effect. its adding every cursor effect at the same time
const MaintenancePage = () => {
  const [cursorEffectConfig, setCursorEffectConfig] = useState(getCursorEffectConfig(CursorEffectName.Emoji));
  const [cursorEffect, setCursorEffect] = useState(cursorEffectConfig?.effect(cursorEffectConfig.params));

  const handleRefresh = () => {
    window.location.reload();
  };

  const CursorKeys = Object.keys(CursorEffectName).filter((v) =>
    isNaN(Number(v))
  );

  const handleChangeCursor = (effectName: CursorEffectName) => {
    setCursorEffectConfig(getCursorEffectConfig(CursorEffectName[effectName]));
    setCursorEffect(cursorEffectConfig?.effect(cursorEffectConfig.params));
  };

  useEffect(() => {
    CURSOR_EFFECT = cursorEffectConfig?.effect(cursorEffectConfig.params);
    return () => {
      CURSOR_EFFECT?.destroy();
    };
  }, [cursorEffect, cursorEffectConfig]);

  return (
    <div className="container flex flex-col h-screen items-center justify-center">
      <Image
        src="/images/discord_logo.png"
        alt="Maintenance"
        width={400}
        height={400}
      />
      <div className="text-center max-w-md mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-zinc-100">
          We’ll be back soon!
        </h1>
        <p className="text-zinc-400 text-lg mb-8">
          Our site is currently undergoing maintenance. We’re working hard to
          improve your experience and we will be back online shortly. Thank you
          for your patience.
        </p>

        <Button onClick={handleRefresh} variant="primary">
          Refresh
        </Button>
      </div>

      <div className="w-3/4 flex flex-wrap justify-center items-center mt-10">
        {CursorKeys.map((key) => {
          const effectName =
            CursorEffectName[key as keyof typeof CursorEffectName];
          return (
            <Button
              key={effectName}
              onClick={() => handleChangeCursor(effectName)}
              variant="secondary"
              className="mr-4 my-2 "
            >
              {effectName}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default MaintenancePage;

// const emoji = emojiCursor({ emoji: ["🔥", "🐬", "🦆"]});
// const ghost = ghostCursor();
// const ranbow = rainbowCursor();
// const fairyDust = fairyDustCursor();
// const trailing = trailingCursor();
// const cursor = textFlag({text: "Discord Clone", color:"gray", size: 20, font: "Arial", textSize: 60, gap: 40});
// const bubble = bubbleCursor();
// const snowflake = snowflakeCursor();
// const clock = clockCursor({dateColor: "red",faceColor: "blue", hoursColor: "green", minutesColor: "yellow", secondsColor: "purple"});
// const character = characterCursor({characters: ["test", "test2"], colors: ["red", "green"]});
