import React, { useState } from 'react'
import './pagination.scss'
import { useAppDispatch } from '../../hooks/reduxHooks'
import { setCurrentPage } from '../../store/courseSlice'

interface IPaginationProps {
  totalPage: number
  pageNumber: number
}

export const Pagination: React.FC<IPaginationProps> = ({ totalPage, pageNumber }) => {
  let [active, setActive] = useState<number>(pageNumber)
  const dispatch = useAppDispatch()

  const handleClick = (numberPage: number) => {
    dispatch(setCurrentPage(numberPage))
    setActive(numberPage)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  
  return (
    <div className="pagination">
      {Array.from(Array(totalPage).keys()).map((page, i) => {
        return (
          <div
            key={i}
            className={`${active === page + 1 ? 'active' : ''} pagination__item`}
            onClick={() => handleClick(page + 1)}>
            <span>{page + 1}</span>
          </div>
        )
      })}
    </div>
  )
}
