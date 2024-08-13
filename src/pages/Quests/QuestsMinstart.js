import React from 'react';
import xchan from './../../images/x_chan.svg';
import mint from './../../images/mint.svg';
import telegram from './../../images/telegram.svg';
import invite from './../../images/invite.svg';
import arrows from './../../images/arrows.svg';
import wallet from './../../images/wallet.svg';

function QuestsMinstart(props) {
    return (
        <div className='questsPage'>
            <div className='questsPageSpecialContainer'>
                <div className='whiteContainerQuest'>
                    <h4 className='taskTitle'>Based Task</h4>

                    <div className='questItem'>
                        <div className='questItemLeft'>
                            <div className='questIcon'>
                                <img src={invite} alt=""/>
                            </div>
                            <div className='questItemLeftContent'>
                                <p className='questTitle'>Invite 10 friends</p>
                                <p className='questSubtitle'>+5000 Points and Referral NFT</p>
                            </div>
                        </div>
                        <div className='questItemRight'>
                            <button className='questBtn'>Link</button>
                        </div>
                    </div>
                </div>
                <div className='whiteContainerQuest weeklyTaskContainer'>
                    <h4 className='taskTitle'>Weekly Task</h4>
                    <div className='questItem'>
                        <div className='questItemLeft'>
                            <div className='questIcon'>
                                <img src={arrows} alt=""/>
                            </div>
                            <div className='questItemLeftContent'>
                                <p className='questTitle'>Mint Weekly NFT</p>
                                <p className='questSubtitle'>+2500 Points and Weekly NFT</p>
                            </div>
                        </div>
                        <div className='questItemRight'>
                            <button className='questBtn'>Mint</button>
                        </div>
                    </div>
                    <div className='questItem'>
                        <div className='questItemLeft'>
                            <div className='questIcon'>
                                <img src={arrows} alt=""/>
                            </div>
                            <div className='questItemLeftContent'>
                                <p className='questTitle'>Make Ton transactions</p>
                                <p className='questSubtitle'>+5000 Points</p>
                            </div>
                        </div>
                        <div className='questItemRight'>
                            <button className='questBtn'>GO!</button>
                        </div>
                    </div>
                </div>
                <div className='blueContainerQuest'>
                    <h4 className='taskTitle'>Completed Task</h4>
                    <div className='questItem'>
                        <div className='questItemLeft'>
                            <div className='questIcon'>
                                <img src={wallet} alt=""/>
                            </div>
                            <div className='questItemLeftContent'>
                                <p className='questTitle'>Ton Wallet Connect</p>
                                <p className='questSubtitle'>+500 points</p>
                            </div>
                        </div>
                        <div className='questItemRight'>
                        </div>
                    </div>
                    <div className='questItem'>
                        <div className='questItemLeft'>
                            <div className='questIcon'>
                                <img src={telegram} alt=""/>
                            </div>
                            <div className='questItemLeftContent'>
                                <p className='questTitle'>Subscribe Telegram channel</p>
                                <p className='questSubtitle'>+200 points</p>
                            </div>
                        </div>
                        <div className='questItemRight'>
                        </div>
                    </div>
                    <div className='questItem'>
                        <div className='questItemLeft'>
                            <div className='questIcon'>
                                <img src={xchan} alt=""/>
                            </div>
                            <div className='questItemLeftContent'>
                                <p className='questTitle'>Subscribe X channel</p>
                                <p className='questSubtitle'>+200 points</p>
                            </div>
                        </div>
                        <div className='questItemRight'>
                        </div>
                    </div>
                    <div className='questItem'>
                        <div className='questItemLeft'>
                            <div className='questIcon'>
                                <img src={mint} alt=""/>
                            </div>
                            <div className='questItemLeftContent'>
                                <p className='questTitle'>Mint Start NFT</p>
                                <p className='questSubtitle'>+1000 points and free NFT</p>
                            </div>
                        </div>
                        <div className='questItemRight'>
                        </div>
                    </div>


                </div>
            </div>
        </div>

    );
}

export default QuestsMinstart;