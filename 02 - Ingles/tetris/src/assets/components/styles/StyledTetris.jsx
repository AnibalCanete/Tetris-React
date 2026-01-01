
import styled from "styled-components";
// BG Image
import bgImage from "../../images/bg.jpg";

export const StyledTetrisWrapper = styled.div`
    width: 100vw;
    height: 100vh;
    background: url(${bgImage}) #000;
    background-size: cover;
    overflow: hidden;

    @media (max-width: 600px) {
        background-position: center;
    }

`;

export const StyledTetris = styled.div`
    display: flex;
    align-items: flex-start;
    padding: 40px;
    margin: 0 auto;
    max-width: 900px;

    aside {
        width: 100%;
        max-width: 200px;
        display: block;
        padding: 0 20px;
    }

    @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
    padding: 20px;

        aside {
        max-width: 100%;
        margin-top: 20px;
        text-align: center;
        }
    }

    /* 📲 Tablet */
    @media (min-width: 601px) and (max-width: 900px) {
        padding: 30px;
        aside {
        max-width: 180px;
        }
    }

    /* 💻 Escritorio medio */
    @media (min-width: 901px) and (max-width: 1199px) {
        padding: 40px;
        aside {
        max-width: 200px;
        }
    }

    /* 🖥️ Escritorio amplio */
    @media (min-width: 1200px) {
        padding: 60px;
        aside {
        max-width: 250px;
        }
    }
}

`;
