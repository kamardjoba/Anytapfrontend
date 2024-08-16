import React, { useState, useEffect } from 'react';
import '../Css/Quests.css';
import TgQuest from '../Quests/questTg';
import TgOctiesQuest from '../Quests/questOctiesTg';
import XQuest from '../Quests/questX';
import MintStartNft from '../Quests/questStartNft';
import FrendsQuest from '../Quests/questFriends';
import WeeklyNft from '../Quests/questWeeklyNft';
import TonTrans from '../Quests/questTon';
import TonW from '../Quests/questTonWallet';
import InstQuest from '../Quests/questInst';

function Quests() {
    const [VisiblaBasedTask, setVisiblaBasedTask] = useState(true);
    const [VisiblaWeekTask, setVisiblaWeekTask] = useState(true);
    const [VisiblaComplatedTask, setVisiblaComplatedTask] = useState(false);

    const [TgChanel_val, setTgChanel_val] = useState(false);
    const [TgOcties_val, setTgOcties_val] = useState(false);
    const [X_val, setX_val] = useState(false);
    const [StartNft_val, setStartNft_val] = useState(false);
    const [Frends_val, setFrends_val] = useState(false);
    const [WeeklyNft_val, setWeeklyNft_val] = useState(false);
    const [TonTran_val, setTonTran_val] = useState(false);
    const [Wallet_val, setWallet_val] = useState(false);
    const [Inst_val, setInst_val] = useState(false);

    function GoInst() {
        setInst_val(true);
    }

    function GoWallet() {
        setWallet_val(true);
    }

    function GoTg() {
        setTgChanel_val(true);
    }

    function GoOct() {
        setTgOcties_val(true);
    }

    function GoX() {
        setX_val(true);
    }

    function GoStartNft() {
        setStartNft_val(true);
    }

    function GoFrands() {
        setFrends_val(true);
    }

    function GoWeekNft() {
        setWeeklyNft_val(true);
    }
    
    function GoTon() {
        setTonTran_val(true);
    }

    useEffect(() => {
        if (TgChanel_val ||
            TgOcties_val || 
            X_val ||
            StartNft_val || 
            Frends_val ||
            Wallet_val || 
            WeeklyNft_val || 
            TonTran_val) {
            setVisiblaComplatedTask(true);
        }
    }, [TgChanel_val, 
        TgOcties_val, 
        X_val, 
        StartNft_val, 
        Frends_val, 
        Wallet_val, 
        TonTran_val, 
        WeeklyNft_val]);


    useEffect(() => {
        if (TgChanel_val && TgOcties_val && X_val && StartNft_val && Frends_val && Wallet_val) {
            setVisiblaBasedTask(false);
        }
    }, [TgChanel_val, TgOcties_val, X_val, StartNft_val, Frends_val, Wallet_val]);

    useEffect(() => {
        if (WeeklyNft_val && TonTran_val) {
            setVisiblaWeekTask(false);
        }
    }, [WeeklyNft_val, TonTran_val]);



    return (
        <div className='questsPage'>
            {VisiblaBasedTask && <div className='basedtask'>
                <div className='txtNf'>
                    <p>Based task</p>
                </div>
                {!Wallet_val && <TonW GoWallet={GoWallet}/>}
                {!TgChanel_val && <TgQuest GoTg={GoTg} />}
                {!TgOcties_val && <TgOctiesQuest GoOct={GoOct} />}
                {!X_val && <XQuest GoX={GoX} />}
                {!Inst_val && <InstQuest GoInst={GoInst} />}
                {!StartNft_val && <MintStartNft GoStartNft={GoStartNft} />}
                {!Frends_val && <FrendsQuest GoFrands={GoFrands} />}
            </div>}

            {VisiblaWeekTask &&<div className='basedtask'>
                <div className='txtNf'>
                    <p>Weekly task</p>
                </div>
                {!WeeklyNft_val && <WeeklyNft GoWeekNft={GoWeekNft}/>}
                {!TonTran_val && <TonTrans GoTon={GoTon}/>}
            </div>}

            {VisiblaComplatedTask && <div id='complatedtask'>
                <div className='txtNf'>
                    <p>Complated task</p>
                </div>
                {Wallet_val && <TonW Wallet_val={Wallet_val}/>}
                {TgChanel_val && <TgQuest TgChanel_val={TgChanel_val} />}
                {TgOcties_val && <TgOctiesQuest TgOcties_val={TgOcties_val} />}
                {X_val && <XQuest X_val={X_val} />}
                {StartNft_val && <MintStartNft StartNft_val={StartNft_val} />}
                {Frends_val && <FrendsQuest Frends_val={Frends_val} />}
                {WeeklyNft_val && <WeeklyNft WeeklyNft_val={WeeklyNft_val} />}
                {TonTran_val && <TonTrans TonTran_val={TonTran_val} />}
                {Inst_val && <InstQuest Inst_val={Inst_val}/>}
            </div>}
        </div>
    );
}

export default Quests;
