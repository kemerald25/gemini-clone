import './Sidebar.css';
import { assets } from '../../assets/assets';
import { useState } from 'react';
import { useContext } from 'react';
import { Context } from '../../context/context';

const Sidebar = () => {

    const [extended, setExtended] = useState(false);
    const { onSent, prevPrompts, setRecentPrompt, newChat } = useContext(Context);

    const loadPrompt = async (prompt) => {
        setRecentPrompt(prompt);
        // Runs the async function called onset
        await onSent(prompt)
    }

    return (
        <div className={`sidebar ${extended ? 'extended' : ''}`}>
            <div className='top'>
                <img onClick={() => setExtended(prev => !prev)} className='menu' src={assets.menu_icon} alt="menu_icon" />
                <div onClick={() => newChat()} className='new-chat'>
                    <img src={assets.plus_icon} alt="new_chat_icon" />
                    {extended ? <p>New Chat</p> : null}
                </div>

                <div className="recent">
                    <p className="recent-title">Recent</p>
                    {prevPrompts.map((item, index) => {
                        return (
                            <div onClick={() => loadPrompt(item)} className='recent-entry'>
                                <img src={assets.message_icon} alt="Message_icon" />
                                <p>{item.slice(0, 18)} ...</p>
                            </div>
                        )
                    })}

                </div>
            </div>

            <div className='bottom'>
                <div className='bottom-item recent-entry'>
                    <img src={assets.question_icon} alt="question_icon" />
                    <p>Help</p>
                </div>
                <div className='bottom-item recent-entry'>
                    <img src={assets.history_icon} alt="history_icon" />
                    <p>Activity</p>
                </div>
                <div className='bottom-item recent-entry'>
                    <img src={assets.setting_icon} alt="question_icon" />
                    <p>Settings</p>
                </div>
            </div>
        </div>
    )
}

export default Sidebar;
