import React from 'react'
import Image from 'next/image';

const Answer = (props) => {
    return (
        <div className="middle-content-box-section-1  p-3 rounded-3 mt-2">
            <div className="row">
                <div className="col-1">
                    <Image src="/images/you.png" alt="My Image" width={30}
                        height={30} />
                </div>
                <div className="col-11">
                    <p className="text-start">
                        {props.text}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Answer