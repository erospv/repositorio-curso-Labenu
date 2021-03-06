import styled from 'styled-components';

export const Profile = styled.div`
    display: flex;
    position: relative;
    align-items: center;
    box-shadow: rgba(117, 117, 117, 0.8) 0px 1px 10px;
    width: 100%;
    height: 390px;
    border-radius: 5px;
    box-sizing: border-box;
    overflow: hidden;
    animation-name: ${props => props.userChoice === true ? "slideRigth" : "slideLeft" };
    animation-duration: 4s;
    @keyframes slideRigth {
       from {  margin-left: 0px;}
       to { margin-left: 100px;}
    }   

`

export const FilterBlur = styled.div`
    position: absolute;
    filter: blur(40px);
    width: 100%;
    height: 100%;
    background-image: url(${props => props.urlPhoto});
    box-sizing: border-box;
`

export const Photo = styled.img`
    display: flex;
    width: 100%;
    z-index: 1;
    box-sizing: border-box;
`
export const Bio = styled.div`
    box-sizing: border-box;
    margin: 0 0 4px;
`
export const Info = styled.div`
    display: flex;

`
export const Name = styled.p`
    margin: 0 0 4px;
    font-weight: bold;
    font-size: 24px;
`
export const Age = styled.p`
    margin: 0 0  4px 8px;
    font-size: 24px;
`

export const PersonalData = styled.div`
    color: white;
    background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.6), transparent );
    position: absolute;
    box-sizing: border-box;
    padding: 16px;
    width: 100%;
    bottom: 0px;
    display: flex;
    flex-direction: column;
    z-index: 2;
`