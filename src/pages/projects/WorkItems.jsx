import React from 'react'

const WorkItems = ({ item }) => {
    return (
        <div className="work__card" key={item.id}>
            <img src={item.image} alt="" className='work__img' />
            <div className="work__content">
                <h3 className="work__title">{item.title}</h3>
                <p className="work__description">{item.description}</p>

                <p className="work__category-title">Project Info</p>
                <div className="work__category-item">
                    <p>Year</p>
                    <p>{item.year}</p>
                </div>
                <div className="work__category-item">
                    <p>Role</p>
                    <p>{item.role}</p>
                </div>

                <div className="work__buttons">
                    <a href={item.demo} className="work__button">
                        Live demo <i className="bx bx-right-arrow-alt work__button-icon"></i>
                    </a>
                    <a href={item.link} className="work__button">
                        See on Github <i className="bx bx-right-arrow-alt work__button-icon"></i>
                    </a>
                </div>
                
            </div>
        </div>
    )
}

export default WorkItems