import React from "react";
import './TimeTable.css'


export default function TimeTable(coursesData) {

    console.log(coursesData);

    return (
        <>
            <section className="timetable">
                <ol className="timings">
                    <li></li>
                    <li>08:00</li>
                    <li>09:00</li>
                    <li>10:00</li>
                    <li>11:00</li>
                    <li>12:00</li>
                    <li>13:00</li>
                    <li>14:00</li>
                    <li>15:00</li>
                    <li>16:00</li>
                    <li>17:00</li>
                    <li>18:00</li>
                    <li>19:00</li>
                    <li>20:00</li>
                    <li>21:00</li>
                    <li>22:00</li>
                    <li>23:00</li>
                    <li>00:00</li>
                </ol>
                <ol className="week">
                    <li className="day">
                        <span className="name">Mon</span>
                        <div className="hour hour__10 class1">
                            <div className="title">ST2334</div>
                            <div>LEC[SL1]</div>
                        </div>
                        <div className="hour hour__12 class2">
                            <div className="title">CFG1010</div>
                            <div>TUT[02]</div>
                        </div>
                        <div className="hour hour__12 class2">
                            <div className="title">CFG1010</div>
                            <div>TUT[02]</div>
                        </div>
                    </li>
                    <li className="day">
                        <span className="name">Tue</span>
                        <div className="hour hour__08 hour--two class3">
                            <div className="title">MA2213</div>
                            <div>LEC[SL1]</div>
                        </div>
                        <div className="hour hour__12 class4">
                            <div className="title">CS2020</div>
                            <div>TUT[02]</div>
                        </div>
                        <div className="hour hour__15 class3">
                            <div className="title">MA2213</div>
                            <div>LAB[B04]</div>
                        </div>
                        <div className="hour hour__15 class3">
                            <div className="title">MA2213</div>
                            <div>TUT[04]</div>
                        </div>
                    </li>
                    <li className="day">
                        <span className="name">Wed</span>
                        <div className="hour hour__10 class4">
                            <div className="title">CS2020</div>
                            <div>LEC[01]</div>
                        </div>
                        <div className="hour hour__14 class1">
                            <div className="title">ST2334</div>
                            <div>TUT[08]</div>
                        </div>
                    </li>
                    <li className="day">
                        <span className="name">Thu</span>
                        <div className="hour hour__10 class1">
                            <div className="title">ST2334</div>
                            <div>LEC[SL1]</div>
                        </div>
                        <div className="hour hour__14 hour--two class5">
                            <div className="title">GES1011</div>
                            <div>TUT[D3]</div>
                        </div>
                    </li>
                    <li className="day">
                        <span className="name">Fri</span>
                        <div className="hour hour__08 class3">
                            <div className="title">MA2213</div>
                            <div>LEC[SL1]</div>
                        </div>
                        <div className="hour hour__10 hour--two class4">
                            <div className="title">CS2020</div>
                            <div>LEC[01]</div>
                        </div>
                        <div className="hour hour__13 class4">
                            <div className="title">CS2020</div>
                            <div>REC[01]</div>
                        </div>
                        <div className="hour hour__14 hour--two class5">
                            <div className="title">GES1011</div>
                            <div>LEC[01]</div>
                        </div>
                    </li>
                </ol>
            </section>
        </>
    )
}