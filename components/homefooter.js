import React from 'react'

const HomeFooter = () => {
    return (
        <footer className='darkgrey mt-5 pb-4 pb-4'>
            <div className="container max814 text-center">
                <div className="row row-cols-1 row-cols-md-3 g-2 g-lg-3">
                    <div className="col">
                        <span className='footer_line1'>
                            Templates
                        </span>
                        <h3 className="mt-3">
                            2,400+
                        </h3>
                    </div>
                    <div className="col footer_middle">
                        <span className='footer_line1'>
                            Users
                        </span>
                        <h3 className="mt-3">
                            1,323,000
                        </h3>
                    </div>
                    <div className="col">
                        <span className='footer_line1'>
                            Downloads
                        </span>
                        <h3 className="mt-3">
                            3,454,688
                        </h3>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default HomeFooter