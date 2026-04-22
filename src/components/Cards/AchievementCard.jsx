import React, { useState } from 'react'
import styled from 'styled-components'
import { Modal } from '@mui/material';
import { CloseRounded } from '@mui/icons-material';

const Document = styled.img`
    display: none;
    height: 70px;
    width: fit-content;
    background-color: #000;
    border-radius: 10px;
    &:hover{
        cursor: pointer;
        opacity: 0.8;
    }
`

const DocsContainer = styled.div`
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    margin-top: 8px;
`

const ModalContainer = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: #000000a7;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.5s ease;
`;

const ModalImage = styled.img`
    max-width: 90%;
    max-height: 90%;
    object-fit: contain;
    border-radius: 12px;
    box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.3);
`;

const Description = styled.div`
    width: 100%;
    font-size: 15px;
    font-weight: 400;
    color: ${({ theme }) => theme.text_primary + 99};
    margin-bottom: 10px;
    @media only screen and (max-width: 768px){
        font-size: 12px;
    }
`

const Span = styled.span`
overflow: hidden;
display: -webkit-box;
max-width: 100%;
-webkit-line-clamp: 4;
-webkit-box-orient: vertical;
text-overflow: ellipsis;
`

const Card = styled.div`
    width: 650px;
    border-radius: 10px;
    box-shadow: 0px 0px 10px rgba(0,0,0,0.1);
    padding: 12px 16px;
    justify-content: space-between;
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    gap: 12px;
    transition: all 0.3s ease-in-out;
    &:hover{
        box-shadow: 0px 0px 20px rgba(0,0,0,0.2);
        transform: translateY(-5px);
    }
    @media only screen and (max-width: 768px){
        padding: 10px;
        gap: 8px;
        width: 300px;
    }

    &:hover ${Document}{
        display: flex;
    }

    &:hover ${Span}{
        overflow: visible;
        -webkit-line-clamp: unset;

    }

    border: 0.1px solid #306EE8;
    box-shadow: rgba(23, 92, 230, 0.15) 0px 4px 24px;
`

const Top = styled.div`
    width: 100%;
    display: flex;
    gap: 12px
`

const Image = styled.img`
    height: 50px;
    background-color: #000;
    border-radius: 10px;
    margin-top: 4px;
    @media only screen and (max-width: 768px){
        height: 40px;
    }
`

const Body = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column; 
`


const Role = styled.div`
    font-size: 18px;
    font-weight: 600;
    color: ${({ theme }) => theme.text_primary + 99};
    @media only screen and (max-width: 768px){
        font-size: 14px;
    }
`

const Company = styled.div`
    font-size: 14px;
    font-weight: 500;
    color: ${({ theme }) => theme.text_secondary + 99};
    @media only screen and (max-width: 768px){
        font-size: 12px;
    }
`

const Date = styled.div`
    font-size: 12px;
    font-weight: 400;
    color: ${({ theme }) => theme.text_secondary + 80};
    @media only screen and (max-width: 768px){
        font-size: 10px;
    }
`


const Skills = styled.div`
    width: 100%;
    display: flex;
    gap: 12px;
    margin-top: -10px;
`

const ItemWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
`

const Skill = styled.div`
    font-size: 15px;
    font-weight: 400;
    color: ${({ theme }) => theme.text_primary + 99};
    @media only screen and (max-width: 768px){
        font-size: 12px;
    }
`

const AchievementCard = ({ achievement }) => {
    const [openModal, setOpenModal] = useState(false);
    const [selectedDoc, setSelectedDoc] = useState(null);

    const handleOpen = (doc) => {
        setSelectedDoc(doc);
        setOpenModal(true);
    };

    return (
        <Card>
            <Top>
                <Image src={achievement.img} />
                <Body>
                    <Role>{achievement.role}</Role>
                    <Company>{achievement.company}</Company>
                    <Date>{achievement.date}</Date>
                </Body>
            </Top>
            <Description>
                {achievement?.desc && <Span>{achievement?.desc}</Span>}
                {achievement?.skills && (
                    <>
                        <br />
                        <Skills>
                            <b>Skills:</b>
                            <ItemWrapper>
                                {achievement?.skills?.map((skill, index) => (
                                    <Skill key={index}>• {skill}</Skill>
                                ))}
                            </ItemWrapper>
                        </Skills>
                    </>
                )}
            </Description>
            {achievement?.docs && (
                <DocsContainer>
                    {achievement.docs.map((doc, index) => (
                        <div key={index} onClick={() => handleOpen(doc)} style={{cursor: 'pointer'}}>
                            <Document src={doc} />
                        </div>
                    ))}
                </DocsContainer>
            )}
            {achievement.doc && (
                <div onClick={() => handleOpen(achievement.doc)} style={{cursor: 'pointer'}}>
                    <Document src={achievement.doc} />
                </div>
            )}

            <Modal open={openModal} onClose={() => setOpenModal(false)}>
                <ModalContainer onClick={() => setOpenModal(false)}>
                    <CloseRounded
                        style={{
                            position: "absolute",
                            top: "20px",
                            right: "20px",
                            cursor: "pointer",
                            color: "white",
                            fontSize: "32px",
                            zIndex: 1000
                        }}
                        onClick={() => setOpenModal(false)}
                    />
                    <ModalImage src={selectedDoc} onClick={(e) => e.stopPropagation()} />
                </ModalContainer>
            </Modal>
        </Card>
    );
};

export default AchievementCard;

