import React from 'react';

const Pagination = ({ totalCount, pageSize, page, setPage }) => {
	let pages = [];

	for (let i = 1; i <= Math.ceil(totalCount / pageSize); i++) {
		pages.push(i);
	}

	const fetchPageData = (item) => {
		setPage(item);
	};

	console.log(pages);
	return (
		<>
			{pages.map((item) => (
				<li key={item}>
					<a
						
						href='#'
						className={page === item ? 'active' : ''}
						onClick={() => fetchPageData(item)}
					>
						{item}
					</a>
				</li>
			))}
		</>
	);
};

export default Pagination;
