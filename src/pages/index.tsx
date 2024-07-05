import Head from "next/head";
import styles from "@/styles/Home.module.css";
import { useState } from "react";
import { Kaisei_Tokumin, VT323 } from "next/font/google";
import { useRecoilState } from "recoil";
import { modeState } from "@/atoms/state";
import { Icon } from "@iconify/react";

const enFont = VT323({
  weight: "400",
  style: "normal",
  display: "block",
  subsets: ["latin"],
});

const jaFont = Kaisei_Tokumin({
  weight: "700",
  style: "normal",
  display: "block",
  subsets: ["latin"],
});

type Colors = {
  brown: string[];
  yellow: string[];
  green: string[];
  gray: string[];
};

type Themes = "yellow" | "brown" | "gray" | "green";

type Tile = {
  rotate: boolean;
  theme: Themes;
};

export default function Home() {
  const createTileMap: Tile[][] = [];
  const themes: Themes[] = ["yellow", "brown", "gray", "green"];
  const colors: Colors = {
    yellow: ["#F1CB84", "#7D7D7D"],
    brown: ["#933F3F", "#414141"],
    gray: ["#D2D2D2", "#848484"],
    green: ["#759870", "#555555"],
  };

  for (let i: number = 0; i < 50; i++) {
    createTileMap[i * 2] = [];
    createTileMap[i * 2 + 1] = [];
    for (let j: number = 0; j < 4; j++) {
      if ((i % 2) + (j % 2) === 1) {
        createTileMap[i * 2][j * 2] = { rotate: true, theme: "yellow" };
        createTileMap[i * 2][j * 2 + 1] = { rotate: true, theme: "yellow" };
        createTileMap[i * 2 + 1][j * 2] = { rotate: true, theme: "yellow" };
        createTileMap[i * 2 + 1][j * 2 + 1] = { rotate: true, theme: "yellow" };
      } else {
        createTileMap[i * 2][j * 2] = { rotate: false, theme: "yellow" };
        createTileMap[i * 2][j * 2 + 1] = { rotate: false, theme: "yellow" };
        createTileMap[i * 2 + 1][j * 2] = { rotate: false, theme: "yellow" };
        createTileMap[i * 2 + 1][j * 2 + 1] = { rotate: false, theme: "yellow" };
      }
    }
  }

  const [tileMap, setTileMap] = useState<Tile[][]>(createTileMap);
  const [isOpenFaq, setIsOpenFaq] = useState<boolean>(false);
  const [isOpenCommand, setIsOpenCommand] = useState<boolean>(false);
  const [defaultMode, setDefaultMode] = useRecoilState<boolean>(modeState);

  const handleRotateClick = (
    e: React.MouseEvent<HTMLDivElement>,
    i: number,
    j: number
  ) => {
    console.log("rotate");
    const newTileMap = tileMap.map((row) => row.slice());
    newTileMap[i][j] = {
      ...newTileMap[i][j],
      rotate: !newTileMap[i][j].rotate,
    };
    setTileMap(newTileMap);
  };

  const handleColorClick = (
    e: React.MouseEvent<HTMLDivElement>,
    i: number,
    j: number
  ) => {
    const newTileMap = tileMap.map((row) => row.slice());
    const nextThemeIndex =
      (themes.indexOf(newTileMap[i][j].theme) + 1) % themes.length;
    newTileMap[i][j] = { ...newTileMap[i][j], theme: themes[nextThemeIndex] };
    setTileMap(newTileMap);
  };

  const handleClick = (
    e: React.MouseEvent<HTMLDivElement>,
    i: number,
    j: number,
    isRightClick: boolean
  ) => {
    console.log(defaultMode, isRightClick);
    e.preventDefault();
    if (isRightClick) {
      if (defaultMode) {
        handleRotateClick(e, i, j);
      } else {
        handleColorClick(e, i, j);
      }
    } else {
      if (!defaultMode) {
        handleRotateClick(e, i, j);
      } else {
        handleColorClick(e, i, j);
      }
    }
  };

  const handleChangeMode = () => {
    setDefaultMode(!defaultMode);
  };

  const handleToggleFaq = () => {
    setIsOpenFaq(!isOpenFaq);
  };

  const handleToggleCommand = () => {
    setIsOpenCommand(!isOpenCommand);
  };

  const handleClickTemplate = (index: number) => () => {
    const newTileMap: Tile[][] = [...tileMap];
    console.log(index, newTileMap);
    switch (index) {
      case 0:
        for (let i: number = 0; i < 50; i++) {
          for (let j: number = 0; j < 4; j++) {
            if ((i % 2) + (j % 2) === 1) {
              newTileMap[i * 2][j * 2].rotate = true;
              newTileMap[i * 2][j * 2 + 1].rotate = true;
              newTileMap[i * 2 + 1][j * 2].rotate = true;
              newTileMap[i * 2 + 1][j * 2 + 1].rotate = true;
            } else {
              newTileMap[i * 2][j * 2].rotate = false;
              newTileMap[i * 2][j * 2 + 1].rotate = false;
              newTileMap[i * 2 + 1][j * 2].rotate = false;
              newTileMap[i * 2 + 1][j * 2 + 1].rotate = false;
            }
          }
        }
        break;
      case 1:
        for (let i: number = 0; i < 100; i++) {
          for (let j: number = 0; j < 8; j++) {
            newTileMap[i][j].rotate = true;
          }
        }
        break;
      case 2:
        for (let i: number = 0; i < 100; i++) {
          for (let j: number = 0; j < 8; j++) {
            newTileMap[i][j].theme = "yellow";
          }
        }
        break;
      case 3:
        for (let i: number = 0; i < 50; i++) {
          for (let j: number = 0; j < 4; j++) {
            if ((i % 2) + (j % 2) === 1) {
              newTileMap[i * 2][j * 2].theme = "green";
              newTileMap[i * 2][j * 2 + 1].theme = "green";
              newTileMap[i * 2 + 1][j * 2].theme = "green";
              newTileMap[i * 2 + 1][j * 2 + 1].theme = "green";
            } else {
              newTileMap[i * 2][j * 2].theme = "yellow";
              newTileMap[i * 2][j * 2 + 1].theme = "yellow";
              newTileMap[i * 2 + 1][j * 2].theme = "yellow";
              newTileMap[i * 2 + 1][j * 2 + 1].theme = "yellow";
            }
          }
        }
        break;
      default:
        break;
    }
    setTileMap(newTileMap);
  };

  return (
    <>
      <Head>
        <title>Tile Simulator</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.content}>
          <div className={styles.header}>
            <div className={`${enFont.className} ${styles.title}`}>
              Tile Simulator
              <Icon
                onClick={handleToggleFaq}
                className={styles.openFaq}
                icon="mdi:question-mark-circle-outline"
              />
            </div>
            <div className={styles.setting}>
              <div
                className={`${styles.mode} ${
                  defaultMode ? styles.color : styles.rotate
                }`}
                onClick={handleChangeMode}
              >
                <div className={styles.indicator}></div>
                <div className={styles.modeIcons}>
                  <Icon icon="mdi:format-rotate-90" />
                  <Icon icon="mdi:color" />
                </div>
              </div>
            </div>
          </div>
          <div className={styles.tileMap}>
            {tileMap.map((row, i) => (
              <div className={styles.tileRow} key={i}>
                {row.map((tile, j) => (
                  <div
                    onClick={(e) => handleClick(e, i, j, false)}
                    onContextMenu={(e) => handleClick(e, i, j, true)}
                    className={`${styles.tile} ${
                      tile.rotate ? styles.tileRotate : ""
                    }`}
                    key={`${i}-${j}`}
                  >
                    <svg
                      width="100"
                      height="100"
                      viewBox="0 0 100 100"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        width="100"
                        height="100"
                        fill={colors[tile.theme][0]}
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M100 47.5V100H47.5C47.7694 71.1255 71.1255 47.7694 100 47.5Z"
                        fill={colors[tile.theme][1]}
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M100 52.5V99.9974H52.5C52.7693 73.8849 73.8872 52.7679 100 52.5Z"
                        fill={colors[tile.theme][0]}
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M3.8147e-06 52.5L3.8147e-06 3.48247e-05L52.5 3.48247e-05C52.2306 28.8745 28.8745 52.2306 3.8147e-06 52.5Z"
                        fill={colors[tile.theme][1]}
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M0 47.4974L0 6.69872e-06L47.5 6.69872e-06C47.2307 26.1125 26.1128 47.2295 0 47.4974Z"
                        fill={colors[tile.theme][0]}
                      />
                    </svg>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className={`${jaFont.className} ${styles.command} ${isOpenCommand && styles.isOpenCommand}`}>
            <div className={`${enFont.className}`}>
              <h3>Template</h3>
              <div className={styles.commands}>
                <p onClick={handleClickTemplate(0)}>&lt;R:0&gt;</p>
                <p onClick={handleClickTemplate(1)}>&lt;R:1&gt;</p>
                <p onClick={handleClickTemplate(2)}>&lt;C:0&gt;</p>
                <p onClick={handleClickTemplate(3)}>&lt;C:1&gt;</p>
              </div>
            </div>
            {/* <div className={`${enFont.className}`}>
              <h3>ChangeAll</h3>
              <div className={styles.commands}>
                <p>&lt;R&gt;</p>
                <p>&lt;C:Y&rarr;B&gt;</p>
              </div>
            </div> */}
          </div>
          <div
            className={`${enFont.className} ${styles.openCommand}`}
            onClick={handleToggleCommand}
          >
            <h2>Command <span>{isOpenCommand ? <>&or;</> : <>&and;</>}</span> </h2>
          </div>
          <div
            onClick={handleToggleFaq}
            className={`${styles.faqWrapper} ${isOpenFaq && styles.isOpenFaq}`}
          >
            <div className={`${jaFont.className} ${styles.faq}`}>
              <h1 className={styles.faqTitle}>遊び方</h1>
              <ol>
                <li>
                  タイルを左クリックすると回転できます
                  </li>
                <li>
                  タイルを右クリックすると色が変わります
                  </li>
                <li>
                  右上のトグルから左クリックと右クリックの機能を逆にすることができます
                </li>
                <li>
                  モバイル端末で遊ぶ時には&uarr;を都度切り替えて操作しましょう
                </li>
                <li>
                  画面下部の<span className={enFont.className}>Command</span>から<span className={enFont.className}>Command</span>を実行できます
                </li>
                <li>
                  画面の任意の場所をクリックするとこの「遊び方」を非表示にできます
                </li>
              </ol>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
