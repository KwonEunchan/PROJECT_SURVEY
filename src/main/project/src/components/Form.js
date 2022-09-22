import '../styles/Form.scss'
import {useEffect, useState} from "react";
import axios from "axios";

export default function Form() {
    const [formPtr, setFormPtr] = useState(1)
    const [focusPtr, setFocusPtr] = useState([false, false])
    const [inputComplete, setInputComplete] = useState([false, false])
    const [surveyPtr, setSurveyPtr] = useState(-1)
    const [resultView, setResultView] = useState(false)
    const [resultData,setResultData] = useState([0,0,0,0])
    const [resultTotal,setResultTotal] = useState(0)

    useEffect(() => {
        const inputBoxes = document.querySelectorAll('.inputBox')
        inputBoxes.forEach((inputBox, index) => {
            focusPtr[index] ? inputBox.classList.add('focus') : inputBox.classList.remove('focus')
        })
    }, [focusPtr])

    useEffect(() => {
        const btnStart = document.querySelector('.btnStart')
        !inputComplete.includes(false) ? btnStart.classList.add('active') : btnStart.classList.remove('active')
    }, [inputComplete])

    useEffect(() => {
        const formSeqs = document.querySelectorAll('.formSeq')
        formSeqs.forEach((formSeq, index) => {
            index < formPtr && (formSeq.style.color = `#183F9E`)
        }, [formPtr])
    })

    useEffect(() => {
        const surveyEls = document.querySelectorAll('.surveyEl')
        const btnSurvey = document.querySelector('.btnSurvey')
        surveyEls.forEach((surveyEl, index) => {
            surveyPtr === index ? surveyEl.classList.add('focus') : surveyEl.classList.remove('focus')
        })

        surveyPtr != -1 && btnSurvey.classList.add('active')
    }, [surveyPtr])

    useEffect(()=>{
        const dataBars = document.querySelectorAll('.resultBar')
        let total = 0

        resultData.forEach((data,index)=>{
            total += data
        })
        setResultTotal(total)

        dataBars.forEach((dataBar,index)=>{
            dataBar.style.height = `${(resultData[index]/resultTotal)*100}%`
        })
    })

    return (<div id="form">
        {
            resultView &&
            <div className="resultPage">
                <span className="material-symbols-outlined btnCancel" onClick={() => {
                    setResultView(!resultView)
                }
                }>
                    close
                </span>
                <div className="resultForm">
                    <div className="resultHeader">
                        <h5>전체 투표 수</h5>
                        <h4><span className="surveyNum">{resultTotal}</span>표</h4>
                    </div>
                    <div className="resultBody">
                        {
                            [1, 2, 3, 4].map((value) => {
                                return (
                                    <div className="resultBar"></div>
                                )
                            })
                        }
                        {
                            [1, 2, 3, 4].map((value) => {
                                return (
                                    <div className="resultName">{value}</div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>}
        <div className="formNav">
            {['looks_one', 'horizontal_rule', 'looks_two', 'horizontal_rule', 'looks_3'].map((value, index) => {
                return (<span key={index} className="material-symbols-outlined formSeq">
                            {value}
                        </span>)
            })}
        </div>
        {formPtr === 1 && <div className="formBody">
            <h1>환영합니다!</h1>
            <h2>아래에 본인 식별 정보를 입력해주세요</h2>
            <div className="inputContainer">
                <div className="inputBox">
                    <span className="material-symbols-outlined inputLogo">
                        person
                    </span>
                    <input type="text" className="inputValue" placeholder="이름을 입력하세요"
                           onFocus={() => {
                               let copy = [...focusPtr]
                               copy[0] = true;
                               setFocusPtr(copy)
                           }}
                           onBlur={() => {
                               let copy = [...focusPtr]
                               copy[0] = false;
                               setFocusPtr(copy)
                           }}
                           onKeyUp={(e) => {
                               let copy = [...inputComplete]
                               copy[0] = (e.target.value != "")
                               setInputComplete(copy)
                           }}/>
                </div>
                <div className="inputBox">
                    <span className="material-symbols-outlined inputLogo">
                        smartphone
                    </span>
                    <input type="text" className="inputValue" autoComplete="none"
                           placeholder="휴대폰 번호를 입력하세요 ( ' - ' 제외 )"
                           onFocus={() => {
                               let copy = [...focusPtr]
                               copy[1] = true;
                               setFocusPtr(copy)
                           }}
                           onBlur={() => {
                               let copy = [...focusPtr]
                               copy[1] = false;
                               setFocusPtr(copy)
                           }}
                           onKeyUp={(e) => {
                               let copy = [...inputComplete]
                               copy[1] = (e.target.value != "")
                               setInputComplete(copy)
                           }}/>
                </div>
            </div>
        </div>}
        {formPtr === 3 && <div className="formBody">
            아래 선택지 중 하나에 투표해주세요
            <div className="surveyBox">
                {[1, 2, 3, 4].map((value, index) => {
                    return (<div key={index} className="surveyEl" onClick={() => {
                        setSurveyPtr(index)
                    }}>
                        선택 {index + 1}.
                    </div>)
                })}

            </div>
        </div>}
        {formPtr === 5 && <div className="formBody">
            소중한 한 표 감사합니다.
        </div>}
        <div className="formFooter">
            {formPtr === 1 && <div className="btnStart btn" onClick={(e) => {
                e.target.classList.contains('active') && axios.get("http://localhost:8010/join",
                    {
                        params: {
                            "name": document.querySelectorAll('.inputValue')[0].value,
                            "phone": document.querySelectorAll('.inputValue')[1].value
                        }
                    }).then((response) => {
                    response.data ? setFormPtr(formPtr + 2) : alert("이미 투표에 참여하셨습니다!")
                })
            }}>
                인 증
            </div>}
            {formPtr === 3 && <div className="btnSurvey btn" onClick={(e) => {
                e.target.classList.contains('active') && axios.get("http://localhost:8010/vote",
                    {
                        params: {
                            "name": surveyPtr+1
                        }
                    }).then((response) => {
                    response.data ? setFormPtr(formPtr+2) : alert("투표 결과가 제대로 반영되지 않았습니다!")
                })
            }}>
                투 표
            </div>}
            {formPtr === 5 && <div className="btnResult btn active" onClick={(e) => {
                setResultView(!resultView)
                axios.get("http://localhost:8010/result").then((response)=>{
                    setResultData(response.data)
                })
            }}>
                결과 보기
            </div>}
        </div>
    </div>)
}