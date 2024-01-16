import React from "react";
import ChipComponent from "./components/ChipComponent/ChipComponent";
import styled from "styled-components";

interface DemoData {
  [key: string]: string;
}

function App() {
  // TODO: Can be improved by adding unique ids as 2 same names can be there
  const demoData: DemoData = {
    "Catrina Pemberton":
      "https://robohash.org/set_set3/bgset_bg1/rationeetdeleniti.png?size=50x50&set=set1",
    "Nikolaos Snowling":
      "https://robohash.org/set_set3/bgset_bg1/sequifacereaut.png?size=50x50&set=set1",
    "Gabriel Hatherill":
      "https://robohash.org/set_set3/bgset_bg1/temporeconsequaturipsum.png?size=50x50&set=set1",
    "Wandis Weddup":
      "https://robohash.org/set_set3/bgset_bg1/autnonin.png?size=50x50&set=set1",
    "Delphine Moogan":
      "https://robohash.org/set_set3/bgset_bg1/perspiciatisetmollitia.png?size=50x50&set=set1",
  };
  return (
    <Wrapper>
      <SubWrapper>
        <TitleWrapper>
          <h1>Pick Users</h1>
        </TitleWrapper>
        <ChipComponentWrapper>
          <ChipComponent data={demoData} />
        </ChipComponentWrapper>
      </SubWrapper>
      <section id="flying">
        <div className="grid"></div>
      </section>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  z-index: 1;
  min-height: 100vh;
  min-width: 100vw;

  background-color: #0e1416;
  @keyframes grid {
    to {
      background-position: center -24px;
    }
  }

  #flying {
    position: fixed;
    /* z-index: -1; */
    -webkit-perspective: 500px;
    perspective: 500px;
    min-height: 100vh;
    min-width: 100vw;
  }
  #flying .grid {
    position: absolute;
    z-index: 2;
    right: -20%;
    bottom: 0;
    left: -20%;
    height: 256px;
    -webkit-transform: rotateX(70deg);
    transform: rotateX(70deg);
    -webkit-transform-origin: center bottom;
    transform-origin: center bottom;
    -webkit-animation: grid 1s linear infinite;
    animation: grid 1s linear infinite;
    background-image: linear-gradient(
        rgba(7, 203, 121, 0.3) 0px,
        rgba(7, 203, 121, 0.3) 1px,
        transparent 2px
      ),
      linear-gradient(
        90deg,
        rgba(7, 203, 121, 0.3) 0px,
        rgba(7, 203, 121, 0.3) 1px,
        transparent 2px
      );
    background-position: center 0;
    background-size: 24px 24px;
  }
  #flying .grid:before {
    position: absolute;
    z-index: 2;
    top: 0;
    right: 0;
    left: 0;
    height: 80%;
    content: "";
    background-image: -webkit-gradient(
      linear,
      left top,
      left bottom,
      from(#0e1416),
      to(transparent)
    );
    background-image: linear-gradient(#0e1416, transparent);
  }
`;

const ChipComponentWrapper = styled.div`
  flex: 1;
  width: 25%;
  /* display: inline; */
`;

const SubWrapper = styled.div`
  z-index: 1;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100%;
  min-width: 100%;
  gap: 1rem;
`;
const TitleWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  h1 {
    color: #fff;
    font-size: 3rem;
    font-weight: 700;
  }
`;

export default App;
