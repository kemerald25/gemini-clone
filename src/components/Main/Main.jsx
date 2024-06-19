import './Main.css';
import { assets } from '../../assets/assets';
import { useContext } from 'react';
import { Context } from '../../context/context';

const Main = () => {

    const { onSent, recentPrompt, showResult, loading, resultData, setInput, input } = useContext(Context);

    return (
        <div className='main'>
            <div className='nav'>
                <p>Gemini</p>
                <img src={assets.user_icon} alt="user_icon" />
            </div>

            <div className='main-container'>

                {/* Ternary operator saying showresults not true */}
                {!showResult
                    ? (
                        <>
                            <div className='greet'>
                                <p><span>Hello, Armstrong</span></p>
                                <p>How can i help you today?</p>
                            </div>

                            <div className='cards'>
                                {/* #1 */}
                                <div className='card'>
                                    <p>Suggest a beautiful place for a tourist visit in America</p>
                                    <img src={assets.compass_icon} alt="compass_icon" />
                                </div>

                                {/* #2 */}
                                <div className='card'>
                                    <p>Act like Mowgli from The Jungle Book and answer questions.</p>
                                    <img src={assets.bulb_icon} alt="bulb_icon" />
                                </div>

                                {/* #3 */}
                                <div className='card'>
                                    <p>Help me write an email to Solar Toothbrush Co. requesting a refund for a product that came damaged.</p>
                                    <img src={assets.message_icon} alt="message_icon" />
                                </div>

                                {/* #4 */}
                                <div className='card'>
                                    <p>Adapt the css classnames of this code to reflect the BEM_Model.</p>
                                    <img src={assets.code_icon} alt="code_icon" />
                                </div>
                            </div>
                        </>
                    )
                    : (<div className="result">
                        <div className="result-title">
                            <img src={assets.user_icon} alt="user_icon" />
                            <p>{recentPrompt}</p>
                        </div>

                        <div className='result-data'>
                            <img src={assets.gemini_icon} alt="gemini_icon" />
                            {loading
                                ? (<div className='loader'>
                                    <hr />
                                    <hr />
                                    <hr />
                                </div>) : (
                                    <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
                                )
                            }

                        </div>
                    </div>)
                }



                <div className="main-bottom">
                    <div className='search-box'>
                        <input onChange={(e) => setInput(e.target.value)} value={input} type="text" placeholder='Enter a prompt here' />
                        <div>
                            <img src={assets.gallery_icon} alt="gallery_icon" />
                            <img src={assets.mic_icon} alt="mic_icon" />
                            {input?<img onClick={() => onSent()} src={assets.send_icon} alt="send_icon" />:null}
                        </div>
                    </div>
                    <p className="bottom-info">Gemini may display inaccurate info, including about people, so double-check its responses. <a href="#"><span>Your privacy & Gemini Apps</span></a></p>
                </div>
            </div>
        </div>
    )
}

export default Main
