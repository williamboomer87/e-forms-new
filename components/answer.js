import React, { useEffect } from 'react'
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { updateUpdateAnswerId } from '../redux/actions/index';


const Answer = (props) => {

    const updateAnswer = useSelector((state) => state.updateAnswer);
    const updateAnswerId = useSelector((state) => state.updateAnswerId);
    const dispatch = useDispatch();

    const handleUpdate = event => {
        const { id } = event.currentTarget;
        dispatch(updateUpdateAnswerId(id));
        dispatch({ type: 'updateAnswerTrue' });
    }

    return (
        <div className="middle-content-box-section-1  p-3 rounded-3 mt-2">
            <div className="row">
                <div className="col-1">
                    <Image src="/images/you.png" alt="My Image" width={30}
                        height={30} />
                </div>

                {(props.object && props.object.editable) ? (
                    <>
                        <div className="col-9">
                            <p className="text-start">
                                {props.text}
                            </p>
                        </div>
                        <div className="col-2">
                            <button type="button"
                                id={props.object.id}
                                className="btn btn-outline-secondary btn-sm"
                                onClick={handleUpdate}
                            >Update</button>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="col-11">
                            <p className="text-start">
                                {props.text}
                            </p>
                        </div>
                    </>
                )}


            </div>
        </div>
    )
}

export default Answer