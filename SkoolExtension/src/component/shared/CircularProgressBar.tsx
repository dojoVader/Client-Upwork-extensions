import React, {useEffect} from "react";
import * as url from "url";


export interface CircularProgressBarProps {
    currentCount?: number;
    totalCount?: number;
    textContent?: any;
}

export const CircularProgressBar = (props: CircularProgressBarProps) => {
    const svgRef = React.useRef(null);
    const {currentCount, totalCount, textContent} = props;

    const isFinished = ()=> (currentCount === totalCount && totalCount > 0);


    let circumference = 0;
    let radius = 0;
        if(svgRef.current !== null){
            let progressCircle = svgRef.current;
            radius = progressCircle.r.baseVal.value;
            circumference = radius * 2 * Math.PI;
            svgRef.current.style.strokeDasharray = circumference;
        }



        const setProgress = (percent: number,ref: SVGCircleElement) =>  {
            ref.style.strokeDashoffset = String(circumference - (percent / 100) * circumference);
        }





    useEffect(() => {

        //circumference of a circle = 2πr;

        if(svgRef.current){
            setProgress(totalCount === 0 ? 0 : (currentCount / totalCount) * 100,svgRef.current);
        }




    }, [currentCount]);

    return (
        <div>
            <svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <filter id="drop-shadow-filter-0" colorInterpolationFilters="sRGB" x="-50%" y="-50%"
                            width="200%" height="200%">
                        <feGaussianBlur in="SourceAlpha" stdDeviation="6"></feGaussianBlur>
                        <feOffset dx="0" dy="0"></feOffset>
                        <feComponentTransfer result="offsetblur">
                            <feFuncA id="spread-ctrl" type="linear" slope="1"></feFuncA>
                        </feComponentTransfer>
                        <feFlood floodColor="rgba(0,0,0,0.3)"></feFlood>
                        <feComposite in2="offsetblur" operator="in"></feComposite>
                        <feMerge>
                            <feMergeNode></feMergeNode>
                            <feMergeNode in="SourceGraphic"></feMergeNode>
                        </feMerge>
                    </filter>
                </defs>
                <ellipse width="200" height="200" cx="240.798" cy="230.368" rx="165.546" ry="165.546"
                         style={{
                             fillRule: "nonzero",
                             paintOrder: "fill",
                             fill: "rgb(255 255 255)",
                             filter: 'url("#drop-shadow-filter-0")',
                             stroke: "rgb(255, 255, 255)"
                         }}></ellipse>
                <ellipse
                    style={{
                        fillRule: "nonzero",
                        paintOrder: "fill",
                        fill: "#C0C2E3",
                        stroke: "rgb(255, 255, 255)"
                    }}
                    cx="240.798" cy="230.368" rx="147.546" ry="147.546"></ellipse>
                <ellipse style={{
                    stroke: "rgb(255, 255, 255)",
                    fill: "rgb(255,255,255)"
                }} cx="240.798" cy="230.368"
                         rx="123.006" ry="123.006"></ellipse>


                <>
                    {!isFinished() && (
                        <>
                            <circle r="138" cx="268.798" cy="242.368" ref={svgRef} className="progress"></circle>
                            <text x="49%" y="51%" textAnchor="middle" dy=".3em"
                                  className="progress-text">{currentCount}/{totalCount}</text>
                            <text x="49%" y="51%" textAnchor="middle" dy=".3em" className="progress-small-text">
                                {textContent}
                            </text>
                        </>
                    )}
                </>
            </svg>
            {isFinished() && (
                <div id={"checkmark"} style={{
                    width: '100px',
                    height: '100px',
                }}>
                    <img src={`${chrome.runtime.getURL('img.png')}`} style={{
                        width: "69px",
                        position: "absolute",
                        left: "127px",
                        top: "132px"
                    }} alt=""/>
                </div>
            )}

        </div>


    );
}